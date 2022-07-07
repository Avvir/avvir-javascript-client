import "../test_utils/setup_tests";
import fetchMock from "fetch-mock";
import {FIREBASE, GATEWAY_JWT} from "../../source/models/enums/user_auth_type";
import {SUPERADMIN, USER} from "../../source/models/enums/user_role";
import {expect} from "chai";
import PhotoAreaApi from "../../source/api/photo_area_api";
import Http from "../../source/utilities/http";
import {ApiPhotoLocation, ApiPhotoLocation3d, PhotoProjectionType, PhotoRotationType} from "../../source";
import {Matrix4, Vector3} from "three";
import {DateConverter} from "../../source/converters";

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
      fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations?photoSessionId=2,3`, {
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
        photoSessionId: [2,3]
      }, [], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations?photoSessionId=2,3`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });

  describe("#listPhotoAreasForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas`, 200);
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/photo-areas?integrationProjectId=3`, 200);
    });

    it("makes a request to the gateway", () => {
      PhotoAreaApi.listPhotoAreasForProject({ projectId: "some-project-id" }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("makes a request to the gateway with the integration project id", () => {
      PhotoAreaApi.listPhotoAreasForProject({ projectId: "some-project-id", integrationProjectId: 3 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      });

      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas?integrationProjectId=3`);
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

  describe("#updatePhotoLocations", () => {
    beforeEach(() => {
      fetchMock.put(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations`, {
        status: 200,
        body: {}
      });
      fetchMock.put(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations?photoSessionId=2`, {
        status: 200,
        body: {}
      });
    });

    it("makes a call to the update photo locations endpoint", () => {
      PhotoAreaApi.updatePhotoLocations({
        projectId: "some-project-id",
        photoAreaId: 1
      }, [
        new ApiPhotoLocation({
          id: 1,
          photoAreaId: 2,
          photoSessionId: 3,
          minimapX: 0.4,
          minimapY: 0.6,
          minimapBearing: 0,
          projectionType: PhotoProjectionType.EQUIRECTANGULAR,
          cameraWorldMatrix: new Matrix4(),
          bimLocation: new ApiPhotoLocation3d({
            id: 5,
            position: new Vector3(0,0,0),
            orientation: {a: 0, b: 0, c: 0, d: 1}
          }),
          yawOffset: 0,
          rotationType: PhotoRotationType.ABSOLUTE_MINIMAP_BEARING,
          createdAt: DateConverter.dateToInstant(new Date("2022-03-01T00:00Z")),
          updatedAt: DateConverter.dateToInstant(new Date("2022-03-01T01:00Z"))
        }),
        new ApiPhotoLocation({
          id: 2,
          photoAreaId: 2,
          photoSessionId: 3,
          minimapX: 0.6,
          minimapY: 0.7,
          minimapBearing: 0,
          projectionType: PhotoProjectionType.EQUIRECTANGULAR,
          cameraWorldMatrix: new Matrix4(),
          bimLocation: new ApiPhotoLocation3d({
            id: 6,
            position: new Vector3(1,2,3),
            orientation: {a: 0, b: 0, c: 0, d: 1}
          }),
          yawOffset: 0,
          rotationType: PhotoRotationType.ABSOLUTE_MINIMAP_BEARING,
          createdAt: DateConverter.dateToInstant(new Date("2022-03-01T00:00Z")),
          updatedAt: DateConverter.dateToInstant(new Date("2022-03-01T01:00Z"))
        })
      ], user);
      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/photo-areas/1/locations`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");

      const body = JSON.parse(fetchCall[1].body as string);

      expect(body[0]).to.deep.eq(
        {
          id: 1,
          photoAreaId: 2,
          photoSessionId: 3,
          minimapX: 0.4,
          minimapY: 0.6,
          minimapBearing: 0,
          projectionType: PhotoProjectionType.EQUIRECTANGULAR,
          cameraWorldMatrix: {
            elements: [
              1, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 1, 0,
              0, 0, 0, 1
            ]
          },
          bimLocation: {
            id: 5,
            position: {x: 0, y: 0, z: 0},
            orientation: {a: 0, b: 0, c: 0, d: 1}
          },
          yawOffset: 0,
          rotationType: PhotoRotationType.ABSOLUTE_MINIMAP_BEARING,
          createdAt: 1646092800,
          updatedAt: 1646096400
        });

      expect(body[1]).to.deep.eq({
          id: 2,
          photoAreaId: 2,
          photoSessionId: 3,
          minimapX: 0.6,
          minimapY: 0.7,
          minimapBearing: 0,
          projectionType: PhotoProjectionType.EQUIRECTANGULAR,
          cameraWorldMatrix: {
            elements: [
              1, 0, 0, 0, 0, 1,
              0, 0, 0, 0, 1, 0,
              0, 0, 0, 1
            ]
          },
          bimLocation: {
            id: 6,
            position: {x: 1, y: 2, z: 3},
            orientation: {a: 0, b: 0, c: 0, d: 1}
          },
          yawOffset: 0,
          rotationType: PhotoRotationType.ABSOLUTE_MINIMAP_BEARING,
          createdAt: 1646092800,
          updatedAt: 1646096400
        }
      );
    });
  });
});
