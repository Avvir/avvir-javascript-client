import "./test_utils/setup_tests";
import fetchMock from "fetch-mock";
import WebGatewayApi from "../source/javascript/services/gateway_api_services/web_gateway_api";
import { GATEWAY_JWT } from "../source/javascript/models/domain/enums/user_auth_type";
import { USER } from "../source/javascript/models/domain/enums/user_role";
import { expect } from "chai";
import PhotoAreaApi from "../source/javascript/services/gateway_api_services/photo_area_api";

describe("PhotoAreaApi", () => {
  describe("#listPhotoAreasForProject", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/photo-areas`, 200);
    });

    it("makes a request to the gateway", () => {
      PhotoAreaApi.listPhotoAreasForProject({ projectId: "some-project-id" }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      }, null);

      expect(fetchMock.lastCall()[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/photo-areas`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      PhotoAreaApi.listPhotoAreasForProject({ projectId: "some-project-id" }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      }, null);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("#listPhotoLocations", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/photo-areas/4/locations`, 200);
    });

    it("makes a request to the gateway", () => {
      PhotoAreaApi.listPhotoLocations({ projectId: "some-project-id", photoAreaId: 4 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      }, null);

      expect(fetchMock.lastCall()[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/photo-areas/4/locations`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      PhotoAreaApi.listPhotoLocations({ projectId: "some-project-id", photoAreaId: 4 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      }, null);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });

    describe("when the photo session id is included", () => {
      beforeEach(() => {
        fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/photo-areas/4/locations?photoSessionId=5`, 200);
      });

      it("adds the photo session id as a query param", () => {
        PhotoAreaApi.listPhotoLocations({ projectId: "some-project-id", photoAreaId: 4, photoSessionId: 5 }, {
          authType: GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token", role: USER }
        }, null);

        expect(fetchMock.lastCall()[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/photo-areas/4/locations?photoSessionId=5`);
      });
    });
  });

  describe("#listPhotoSessionsForPhotoArea", () => {
    beforeEach(() => {
      fetchMock.get(`${WebGatewayApi.baseUrl}/projects/some-project-id/photo-areas/4/sessions`, 200);
    });

    it("makes a request to the gateway", () => {
      PhotoAreaApi.listPhotoSessionsForPhotoArea({ projectId: "some-project-id", photoAreaId: 4 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      }, null);

      expect(fetchMock.lastCall()[0]).to.eq(`${WebGatewayApi.baseUrl}/projects/some-project-id/photo-areas/4/sessions`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      PhotoAreaApi.listPhotoSessionsForPhotoArea({ projectId: "some-project-id", photoAreaId: 4 }, {
        authType: GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token", role: USER }
      }, null);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });
});
