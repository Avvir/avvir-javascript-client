import {sand, sandbox} from "./test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";
import _ from "underscore";

import ApiFloor from "../source/models/api/api_floor";
import FloorApi from "../source/floor_api";
import WebGatewayApi from "../source/web_gateway_api";
import { API_FAILURE } from "../source/models/enums/event_types";
import { FIREBASE } from "../source/models/enums/user_auth_type";
import { User } from "../source/get_authorization_headers";
import {makeStoreContents} from "./test_utils/test_factories";
import Config from "../source/config";
import Http from "../source/http";

describe("FloorApi", () => {
  let fakeDispatch, dispatchSpy, fakeGetState, user;
  beforeEach(() => {
    user = {
      authType: FIREBASE,
      firebaseUser: { idToken: "some-firebase.id.token" }
    };
    fakeGetState = () => makeStoreContents({
      user,
    });

    dispatchSpy = sandbox.spy();
  });

  describe("#listFloorsForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl}/projects/some-project-id/floors`, 200);
    });

    it("makes a request to the gateway", () => {
      FloorApi.listFloorsForProject("some-project-id", {
        firebaseUser: {
          idToken: "some-firebase.id.token"
        }
      } as User);

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl}/projects/some-project-id/floors`);
      expect(fetchMock.lastOptions().headers["Accept"]).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      FloorApi.listFloorsForProject("some-project-id", user);

      expect(fetchMock.lastOptions().headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#getFloor", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id`, {
        status: 200,
        body: {
          id: "some-floor-id",
          floorNumber: "2",
          defaultFirebaseScanDatasetId: "some-scan-id",
          scanDatasets: [{
            scanDatasetId: "some-scan-id",
            scanNumber: 1,
            scanDate: 12345,
          }]
        }
      });
    });

    it("makes an authenticated call to the endpoint", () => {
      FloorApi.getFloor({
        projectId: "some-project-id",
        floorId: "some-floor-id",
      }, user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#getViewerFloor", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id/viewer`, 200);
    });

    it("makes a request to the gateway api", () => {
      FloorApi.getViewerFloor({ projectId: "some-project-id", floorId: "some-floor-id" }, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id/viewer`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      FloorApi.getViewerFloor({ projectId: "some-project-id", floorId: "some-floor-id" }, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#createFloor", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl}/projects/some-project-id/floors`, { status: 200, body: {} });
    });

    it("makes a call to the floor creation endpoint", () => {
      FloorApi.createFloor("some-project-id", "14", { firebaseUser: { idToken: "some-firebase.id.token" } } as User, fakeDispatch);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl}/projects/some-project-id/floors`);
      expect(JSON.parse(fetchCall[1].body)).to.deep.eq({ text: "14" });
    });

    it("sends the request with authorization headers", () => {
      FloorApi.createFloor("some-project-id", "14", user, fakeDispatch);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl}/projects/some-project-id/floors`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${Http.baseUrl}/projects/some-project-id/floors`,
          { status: 500, body: { some: "body", message:"some error message" },
            headers: {"ContentType": "application/json"}
          },
          { overwriteRoutes: true });
      });

      it("calls the shared error handler", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FloorApi.createFloor("some-project-id",
          "14",
          {authType: FIREBASE, firebaseUser: {idToken: "some-firebase.id.token"}})
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
              verboseMessage: "500 Internal Server Error: 'some error message' at `.../projects/some-project-id/floors`"
            });
          });
      });
    });
  });

  describe("#updateFloor", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id`, 200);
    });

    it("makes a call to the correct endpoint", () => {
      FloorApi.updateFloor({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, new ApiFloor({
        defaultFirebaseScanDatasetId: "some-scan-id"
      }), { firebaseUser: { idToken: "some-firebase.id.token" } } as User, fakeDispatch);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("Content-Type");
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/vnd.avvir.gateway.UserFloor+json");
      expect(fetchCall[0]).to.eq(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify(new ApiFloor({
        defaultFirebaseScanDatasetId: "some-scan-id"
      })));
    });

    it("sends the request with authorization headers", () => {
      FloorApi.updateFloor({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, new ApiFloor({
        defaultFirebaseScanDatasetId: "some-scan-id"
      }), user, fakeDispatch);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.patch(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id`,
          { status: 500, body: { some: "body" },
            headers: {"ContentType": "application/json"}
          },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return FloorApi.updateFloor({
            projectId: "some-project-id",
            floorId: "some-floor-id"
          },
          new ApiFloor({
            defaultFirebaseScanDatasetId: "some-scan-id"
          }),
          { firebaseUser: { idToken: "some-firebase.id.token" } } as User)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({});
          });
      });
    });
  });

  describe("#updateFloorOrder", () => {
    beforeEach(() => {
      fetchMock.patch(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id/reorder/3`, 200);
    });

    it("makes a call to the correct endpoint", () => {
      FloorApi.updateFloorOrder({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, 3, { firebaseUser: { idToken: "some-firebase.id.token" } } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl}/projects/some-project-id/floors/some-floor-id/reorder/3`);
    });

    it("sends the request with authorization headers", () => {
      FloorApi.updateFloorOrder({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, 3, user);
      const lastFetchOpts = fetchMock.lastOptions();

      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });
});
