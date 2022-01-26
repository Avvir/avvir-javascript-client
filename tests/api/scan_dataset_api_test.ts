import {expect} from "chai";
import fetchMock from "fetch-mock";
import _ from "underscore";
import moment from "moment";

import ApiScanDataset from "../../source/models/api/api_scan_dataset";
import DateConverter from "../../source/converters/date_converter";
import ScanDatasetApi from "../../source/api/scan_dataset_api";
import {FIREBASE, GATEWAY_JWT} from "../../source/models/enums/user_auth_type";
import {makeStoreContents} from "../test_utils/test_factories";
import {SUPERADMIN, USER} from "../../source/models/enums/user_role";
import {User} from "../../source";
import Config from "../../source/config";
import {sandbox} from "../test_utils/setup_tests";
import Http from "../../source/utilities/http";
import {describe} from "mocha";
import View from "../../source/models/domain/view";

describe("ScanDatasetApi", () => {
  let user: User, fakeGetState;
  beforeEach(() => {
    fetchMock.resetBehavior();
    user = {authType: FIREBASE, firebaseUser: {uid: "some-uid", role: SUPERADMIN, idToken: "some-firebase.id.token"}};
    fakeGetState = () => makeStoreContents({
      user,
    });
  });

  describe("#getScanDataset", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id`, 200);
    });

    it("makes an authenticated call to the scan dataset endpoint", () => {
      ScanDatasetApi.getScanDataset({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#createScanDataset", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets`, {
        status: 200,
        body: {}
      });

      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets?scanDate=2022-01-01T12:34:00.000Z`, {
        status: 200,
        body: {}
      });
    });

    it("makes an authenticated call to the scan dataset creation endpoint", () => {
      ScanDatasetApi.createScanDataset({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    it("adds the scanDate parameter when it exists", () => {
      ScanDatasetApi.createScanDataset({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDate: new Date("2022-01-01T12:34:00.0000Z")
      }, user);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets?scanDate=2022-01-01T12:34:00.000Z`);
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets`,
          {status: 500, body: {some: "body"},
            headers: {"ContentType": "application/json"}
          },
          {overwriteRoutes: true});
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return ScanDatasetApi.createScanDataset({
            projectId: "some-project-id",
            floorId: "some-floor-id",
          },
          user,
        )
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
              // type: API_FAILURE,
            });
          });
      });
    });
  });

  describe("#saveScanAnalysis", () => {
    let analysis;
    beforeEach(() => {
      analysis = [{
        globalId: "some-global-id",
        scanLabel: "DEVIATED",
        deviation: {x: 1, y: 2, z: 3}
      }];
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/analysis?enforceBuiltPersistence=false`, 200);
    });

    it("makes a call to the scan analysis endpoint", () => {
      ScanDatasetApi.saveScanAnalysis({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-id"
        },
        analysis,
        user,
      );
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/analysis?enforceBuiltPersistence=false`);
      expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq([{
        globalId: "some-global-id",
        scanLabel: "DEVIATED",
        deviation: {x: 1, y: 2, z: 3}
      }]);
    });

    it("sends the request with authorization headers", () => {
      ScanDatasetApi.saveScanAnalysis({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, analysis, user);

      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    it("resolves the promise", () => {
      return ScanDatasetApi.saveScanAnalysis({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, analysis, user);
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/analysis?enforceBuiltPersistence=false`,
          {status: 500, body: {some: "body"},
            headers: {"ContentType": "application/json"}
            },
          {overwriteRoutes: true});
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return ScanDatasetApi.saveScanAnalysis({
            projectId: "some-project-id",
            floorId: "some-floor-id",
            scanDatasetId: "some-scan-id"
          },
          analysis,
          user,
        )
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
            });
          });
      });
    });
  });

  describe("#listScanDatasetsForFloor", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets`, 200);
    });

    it("makes a request to the gateway", () => {
      ScanDatasetApi.listScanDatasetsForFloor({projectId: "some-project-id", floorId: "some-floor-id"}, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      ScanDatasetApi.listScanDatasetsForFloor({projectId: "some-project-id", floorId: "some-floor-id"}, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#updateScanDataset", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id`, 200);
    });

    it("makes a request to the gateway", () => {
      const apiScanDataset = new ApiScanDataset({
        coarseAlignmentMatrix: `1 2 3 4
0 0 0 1
0 0 0 1
0 0 0 1.7777`,
        fineAlignmentMatrix: `1 2 3 5
0 0 0 5
0 0 0 5
0 0 0 5.7777`,
        notes: "Some notes",
        name: "Some Name",
        scanDate: moment("2018-04-01").toDate(),
        scanNumber: 1,
        firebaseId: "some-scan-dataset-id",
        firebaseFloorId: "some-floor-id"
      });
      ScanDatasetApi.updateScanDataset({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-dataset-id"
        },
        apiScanDataset, {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      expect(fetchMock.lastUrl()).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id`);
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
      expect(JSON.parse(fetchMock.lastCall()[1].body as string)).to.deep.eq({
        coarseAlignmentMatrix: {
          x1: 1, x2: 2, x3: 3, x4: 4,
          y1: 0, y2: 0, y3: 0, y4: 1,
          z1: 0, z2: 0, z3: 0, z4: 1,
          w1: 0, w2: 0, w3: 0, w4: 1.7777,
        },
        fineAlignmentMatrix: {
          x1: 1, x2: 2, x3: 3, x4: 5,
          y1: 0, y2: 0, y3: 0, y4: 5,
          z1: 0, z2: 0, z3: 0, z4: 5,
          w1: 0, w2: 0, w3: 0, w4: 5.7777,
        },
        notes: "Some notes",
        name: "Some Name",
        scanDate: DateConverter.dateToInstant(moment("2018-04-01")),
        firebaseId: "some-scan-dataset-id",
        firebaseFloorId: "some-floor-id",
        scanNumber: 1
      });
    });

    it("includes the authorization headers", () => {
      ScanDatasetApi.updateScanDataset({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-dataset-id"
      }, null, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#deleteScanDataset", () => {
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id`, 200);
    });

    it("makes a request to the gateway", () => {
      ScanDatasetApi.deleteScanDataset({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-dataset-id"
      }, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastUrl()).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id`);
    });

    it("includes the authorization headers", () => {
      ScanDatasetApi.deleteScanDataset({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-dataset-id"
      }, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#getViewerDetailedElementsForScanDataset", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id/detailed-elements/viewer`, 200);
    });

    it("makes a request to the gateway", () => {
      ScanDatasetApi.getViewerDetailedElementsForScanDataset({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-dataset-id"
        },
        user);

      expect(fetchMock.lastUrl()).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id/detailed-elements/viewer`);
      expect(fetchMock.lastOptions().headers["Accept"]).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      ScanDatasetApi.getViewerDetailedElementsForScanDataset({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-dataset-id"
      }, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#getProgressReportForScanDataset", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id/progress`, 200);
    });

    it("makes a request to the gateway", () => {
      ScanDatasetApi.getProgressReportForScanDataset({
          projectId: "some-project-id",
          floorId: "some-floor-id",
          scanDatasetId: "some-scan-dataset-id"
        },
        user);

      expect(fetchMock.lastUrl()).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id/progress`);
      expect(fetchMock.lastOptions().headers["Accept"]).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      ScanDatasetApi.getProgressReportForScanDataset({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-dataset-id"
      }, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });


  describe("::getScanRepresentation", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/files/scan-representation`, {
        url: "https://example.com/some-scan.glb"
      });
    });

    it("resolves with the scan representation file", () => {
      ScanDatasetApi.getScanRepresentation({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, null)
          .then((scan) => {
            expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/files/scan-representation`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
            expect(scan.url).to.eq("https://example.com/some-scan.glb");
          });
    });

    it("includes the authorization headers", () => {
      ScanDatasetApi.getScanRepresentation({ projectId: "some-project-id", floorId: "some-floor-id", scanDatasetId: "some-scan-id" }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });


  describe("::createView", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id/views`,
          new View({ id: 4, viewAttributes: { camera: { position: { x: 1, y: 1, z: 1 }, target: { x: 0, y: 0, z: 0 } } } }));
    });

    it("makes a call to the endpoint", () => {
      ScanDatasetApi.createView({ projectId: "some-project-id", floorId: "some-floor-id", scanDatasetId: "some-scan-dataset-id" },
          new View({ viewAttributes: { camera: { position: { x: 1, y: 1, z: 1 }, target: { x: 0, y: 0, z: 0 } } } }),
          {
            authType: GATEWAY_JWT,
            gatewayUser: { idToken: "some-firebase.id.token", role: USER }
          });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id/views`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().headers["Content-Type"]).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify(new View({ viewAttributes: { camera: { position: { x: 1, y: 1, z: 1 }, target: { x: 0, y: 0, z: 0 } } } })));
    });

    it("sends the request with an Authorization header", () => {
      ScanDatasetApi.createView({ projectId: "some-project-id", floorId: "some-floor-id", scanDatasetId: "some-scan-dataset-id" },
          new View({ viewAttributes: { camera: { position: { x: 1, y: 1, z: 1 }, target: { x: 0, y: 0, z: 0 } } } }),
          {
            authType: GATEWAY_JWT,
            gatewayUser: { idToken: "some-firebase.id.token", role: USER }
          });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::getView", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id/views/4`,
          new View({ id: 4, viewAttributes: { camera: { position: { x: 1, y: 1, z: 1 }, target: { x: 0, y: 0, z: 0 } } } }));
    });

    it("makes a call to the endpoint", () => {
      ScanDatasetApi.getView({ projectId: "some-project-id", floorId: "some-floor-id", scanDatasetId: "some-scan-dataset-id" },
          4,
          {
            authType: GATEWAY_JWT,
            gatewayUser: { idToken: "some-firebase.id.token", role: USER }
          });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-dataset-id/views/4`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      ScanDatasetApi.getView({ projectId: "some-project-id", floorId: "some-floor-id", scanDatasetId: "some-scan-dataset-id" },
          4,
          {
            authType: GATEWAY_JWT,
            gatewayUser: { idToken: "some-firebase.id.token", role: USER }
          });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#getOrCreatePhotoSession", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/get-or-create-photo-session`, {
        status: 200,
        body: {
          id: 1,
          photoAreaId: 2
        }
      });
    });

    it("makes an authenticated call to the scan dataset creation endpoint", () => {
      ScanDatasetApi.getOrCreatePhotoSession({
        projectId: "some-project-id",
        floorId: "some-floor-id",
        scanDatasetId: "some-scan-id"
      }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/floors/some-floor-id/scan-datasets/some-scan-id/get-or-create-photo-session`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });
});
