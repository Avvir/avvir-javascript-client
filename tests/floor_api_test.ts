import { sandbox } from "./test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";
import _ from "underscore";

import ApiFloor from "../source/models/api/api_floor";
import FloorApi from "../source/floor_api";
import WebGatewayApi from "../source/web_gateway_api";
import { API_FAILURE } from "../source/models/enums/event_types";
import { FIREBASE } from "../source/models/enums/user_auth_type";
import { User } from "../source/get_authorization_headers";

describe("FloorApi", () => {
  let fakeDispatch, dispatchSpy, fakeGetState, user;
  beforeEach(() => {
    user = {
      authType: FIREBASE,
      firebaseUser: { idToken: "some-firebase.id.token" }
    };
    fakeGetState = () => makeStoreContents({
      user,
      locationMetadata: { projectId: "some-project-id", floorId: "some-floor-id" },
    });

    dispatchSpy = sandbox.spy();
  });

  describe("#listFloorsForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors`, 200);
    });

    it("makes a request to the gateway", () => {
      FloorApi.listFloorsForProject("some-project-id", {
        firebaseUser: {
          idToken: "some-firebase.id.token"
        }
      } as User);

      expect(fetchMock.lastCall()[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors`);
      expect(fetchMock.lastOptions().headers["Accept"]).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      FloorApi.listFloorsForProject("some-project-id", user);

      expect(fetchMock.lastOptions().headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#getFloor", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id`, {
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

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#getViewerFloor", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id/viewer`, 200);
    });

    it("makes a request to the gateway api", () => {
      FloorApi.getViewerFloor({ projectId: "some-project-id", floorId: "some-floor-id" }, {
        authType: "GATEWAY_JWT",
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id/viewer`);
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
      fetchMock.post(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors`, { status: 200, body: {} });
    });

    it("makes a call to the floor creation endpoint", () => {
      FloorApi.createFloor("some-project-id", "14", { firebaseUser: { idToken: "some-firebase.id.token" } } as User, fakeDispatch);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors`);
      expect(JSON.parse(fetchCall[1].body)).to.deep.eq({ text: "14" });
    });

    it("sends the request with authorization headers", () => {
      FloorApi.createFloor("some-project-id", "14", user, fakeDispatch);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.post(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors`,
          { status: 500, body: { some: "body" }, sendAsJson: true },
          { overwriteRoutes: true });
      });

      it("calls the shared error handler", () => {
        return FloorApi.createFloor("some-project-id",
          "14",
          { firebaseUser: { idToken: "some-firebase.id.token" } } as User,
          fakeDispatch)
          .catch(_.noop)
          .finally(() => {
            expect(config.sharedErrorHandler).to.have.been.calledWithMatch({
              type: API_FAILURE,
            });
          });
      });
    });
  });

  describe("#updateFloor", () => {
    beforeEach(() => {
      fetchMock.patch(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id`, 200);
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
      expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/json");
      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id`);
      expect(fetchCall[1].body).to.deep.eq(JSON.stringify(new ApiFloor({
        defaultFirebaseScanDatasetId: "some-scan-id"
      })));
    });

    describe("when the user is not a superadmin", () => {
      it("sends the request with UserFloor content-type headers", () => {
        FloorApi.updateFloor({
          projectId: "some-project-id",
          floorId: "some-floor-id"
        }, new ApiFloor({
          defaultFirebaseScanDatasetId: "some-scan-id"
        }), { firebaseUser: { idToken: "some-firebase.id.token" } } as User, fakeDispatch, false);
        const lastFetchOpts = fetchMock.lastOptions();

        expect(lastFetchOpts.headers).to.include.key("Content-Type");
        expect(lastFetchOpts.headers["Content-Type"]).to.eq("application/vnd.avvir.gateway.UserFloor+json");
      });
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

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        fetchMock.patch(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id`,
          { status: 500, body: { some: "body" }, sendAsJson: true },
          { overwriteRoutes: true });
      });

      it("dispatches an api failure notification", () => {
        return FloorApi.updateFloor({
            projectId: "some-project-id",
            floorId: "some-floor-id"
          },
          new ApiFloor({
            defaultFirebaseScanDatasetId: "some-scan-id"
          }),
          { firebaseUser: { idToken: "some-firebase.id.token" } } as User,
          fakeDispatch)
          .catch(_.noop)
          .finally(() => {
            expect(dispatchSpy).to.have.been.calledWithMatch({
              type: API_FAILURE,
            });
          });
      });
    });
  });

  describe("#updateFloorOrder", () => {
    beforeEach(() => {
      fetchMock.patch(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id/reorder/3`, 200);
    });

    it("makes a call to the correct endpoint", () => {
      FloorApi.updateFloorOrder({
        projectId: "some-project-id",
        floorId: "some-floor-id"
      }, 3, { firebaseUser: { idToken: "some-firebase.id.token" } } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/floors/some-floor-id/reorder/3`);
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
