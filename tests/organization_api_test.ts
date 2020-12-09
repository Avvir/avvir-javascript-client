import "./test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";

import OrganizationApi from "../source/javascript/services/gateway_api_services/organization_api";
import WebGatewayApi from "../source/javascript/services/gateway_api_services/web_gateway_api";
import { FIREBASE } from "../source/javascript/models/domain/enums/user_auth_type";

describe("OrganizationApi", () => {
  let user;
  beforeEach(() => {
    user = {
      authType: FIREBASE,
      firebaseUser: {
        idToken: "some-firebase.id.token"
      }
    };
  });

  describe("#createOrganization", () => {
    beforeEach(() => {
      fetchMock.post(`${WebGatewayApi.baseUrl}/client-accounts`, {
        status: 200,
        body: {
          firebaseId: "some-organization-id"
        }
      });
    });

    it("makes an authenticated call to the endpoint", () => {
      OrganizationApi.createOrganization({ name: "Some Organization" }, user);

      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${WebGatewayApi.baseUrl}/client-accounts`);
      expect(lastFetchOpts.headers).to.include.key("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });
});
