import "../test_utils/setup_tests";
import fetchMock from "fetch-mock";
import {FIREBASE, GATEWAY_JWT} from "../../source/models/enums/user_auth_type";
import {SUPERADMIN, USER} from "../../source/models/enums/user_role";
import { expect } from "chai";
import PhotoAreaApi from "../../source/api/photo_area_api";
import Http from "../../source/utilities/http";

describe("PhotoAreaApi", () => {
  let user;
  beforeEach(() => {
    user = {authType: FIREBASE, firebaseUser: {uid: "some-uid", role: SUPERADMIN, idToken: "some-firebase.id.token"}};
  });

  describe("#createPhotoLocations", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations`, {
        status: 200,
        body: {}
      });
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations?photoSessionId=2`, {
        status: 200,
        body: {}
      });
    });

    it("makes a call to the photo location creation endpoint without the photo session id", () => {
      PhotoAreaApi.createPhotoLocations({
        projectId: "some-project-id",
        photoAreaId: 1
      }, [], user);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations`);
    });

    it("makes a call to the photo location creation endpoint with the photo session id", () => {
      PhotoAreaApi.createPhotoLocations({
        projectId: "some-project-id",
        photoAreaId: 1,
        photoSessionId: 2
      }, [], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations?photoSessionId=2`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#listPhotoAreasForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas`, 200);
    });

    it("makes a request to the gateway", () => {
      PhotoAreaApi.listPhotoAreasForProject({ projectId: "some-project-id" }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      PhotoAreaApi.listPhotoAreasForProject({ projectId: "some-project-id" }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#listPhotoLocations", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/locations`, 200);
    });

    it("makes a request to the gateway", () => {
      PhotoAreaApi.listPhotoLocations({ projectId: "some-project-id", photoAreaId: 4 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/locations`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      PhotoAreaApi.listPhotoLocations({ projectId: "some-project-id", photoAreaId: 4 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });

    describe("when the photo session id is included", () => {
      beforeEach(() => {
        fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/locations?photoSessionId=5`, 200);
      });

      it("adds the photo session id as a query param", () => {
        PhotoAreaApi.listPhotoLocations({ projectId: "some-project-id", photoAreaId: 4, photoSessionId: 5 }, {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        });

        expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/locations?photoSessionId=5`);
      });
    });
  });

  describe("#listPhotoSessionsForPhotoArea", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/sessions`, 200);
    });

    it("makes a request to the gateway", () => {
      PhotoAreaApi.listPhotoSessionsForPhotoArea({ projectId: "some-project-id", photoAreaId: 4 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/4/sessions`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      PhotoAreaApi.listPhotoSessionsForPhotoArea({ projectId: "some-project-id", photoAreaId: 4 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });
});
