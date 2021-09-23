import "../test_utils/setup_tests";
import { expect } from "chai";
import fetchMock from "fetch-mock";

import OrganizationApi from "../../source/api/organization_api";
import { FIREBASE } from "../../source/models/enums/user_auth_type";
import Http from "../../source/utilities/http";

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
      fetchMock.post(`${Http.baseUrl()}/client-accounts`, {
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

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/client-accounts`);
      expect(lastFetchOpts.headers).to.include.keys(["firebaseIdToken"]);
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });
});
