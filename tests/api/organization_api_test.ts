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

  describe("#removeOrganizationMember", () => {
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/client-accounts/some-org-id/members/42`, {
        status: 204,
        body: null
      });
    });

    it("makes a DELETE request to the correct URL", () => {
      OrganizationApi.removeOrganizationMember("some-org-id", 42, user);
      expect(fetchMock.lastCall()[0]).to.eq(`${Http.baseUrl()}/client-accounts/some-org-id/members/42`);
    });

    it("includes the user's auth token in the request", () => {
      OrganizationApi.removeOrganizationMember("some-org-id", 42, user);
      expect(fetchMock.lastOptions().headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });

    it("returns a promise that resolves", () => {
      return OrganizationApi.removeOrganizationMember("some-org-id", 42, user).then((result) => {
        expect(result).to.be.empty;
      });
    });
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
      OrganizationApi.createOrganization({firebaseId: "", firebaseProjectIds: undefined, id: 0, name: "Some Organization" }, user);

      const fetchCall = fetchMock.lastCall();
      const lastFetchOpts = fetchMock.lastOptions();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/client-accounts`);
      expect(lastFetchOpts.headers).to.include.keys("firebaseIdToken");
      expect(lastFetchOpts.headers.firebaseIdToken).to.eq("some-firebase.id.token");
    });
  });
});
