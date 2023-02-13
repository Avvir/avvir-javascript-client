import {describe} from "mocha";
import fetchMock from "fetch-mock";
import ApiUserPermission, {UserRole, User} from "../../source";
import {expect} from "chai";
import {FIREBASE, GATEWAY_JWT} from "../../source/models/enums/user_auth_type";
import {SUPERADMIN, USER} from "../../source/models/enums/user_role";
import Http from "../../source/utilities/http";
import {UserApi} from "../../source/api";
import {ApiUser} from "../../source";
import UserPermissionType from "../../source/models/enums/user_permission_type";
import UserPermissionAction from "../../source/models/enums/user_permission_action";

describe("UserApi", () => {
  let user: User;
  beforeEach(() => {
    fetchMock.resetBehavior();
    user = {
      authType: FIREBASE,
      firebaseUser: {uid: "some-uid", role: SUPERADMIN, idToken: "some-firebase.id.token"}
    };
  });

  describe("::getUserAccount", () => {
    const encodedEmail = encodeURIComponent("some-email@test.org")
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/users/accounts/${encodedEmail}/SUBCONTRACTOR`,
        {
          status: 200, body: {
            name: "some-user",
            userOrganization: "some-org",
            email: "some-email@test.org",
            role: UserRole.SUBCONTRACTOR,
            projectId: "some-project-id"
          }
        })
    })
    it("makes a call to the endpoint", () => {
      UserApi.getUserAccount("some-email@test.org", UserRole.SUBCONTRACTOR,
        {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/${encodedEmail}/SUBCONTRACTOR`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("send the request with an Authorization header", () => {
      UserApi.getUserAccount("some-email@test.org", UserRole.SUBCONTRACTOR,
        {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });

  describe("::getUserPermissions", () => {
    const encodedEmail = encodeURIComponent("some-email@test.org")
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/users/accounts/${encodedEmail}/permissions`,
        {
          status: 200, body: [{
            id: 1,
            userId: 2,
            projectFirebaseId: "some-project-id",
            organizationFirebaseId: "some-org-id",
            permissionType: "PROJECT",
            permissionAction: "READ"
          }
          ]
        })
    })

    it("makes a call to the endpoint", () => {
      UserApi.getUserPermissions("some-email@test.org", {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/${encodedEmail}/permissions`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("send the request with an Authorization header", () => {
      UserApi.getUserPermissions("some-email@test.org", {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });

  describe("::updateUserAccount", () => {
    const encodedEmail = encodeURIComponent("some-email@test.org");
    const apiUser = new ApiUser({
      name: "some-user",
      userOrganization: "some-org",
      role: UserRole.SUBCONTRACTOR
    })
    beforeEach(() => {
      fetchMock.put(`${Http.baseUrl()}/users/accounts/${encodedEmail}/SUBCONTRACTOR`,
        {
          status: 200, body: {
            name: "some-user",
            userOrganization: "some-org",
            email: "some-email@test.org",
            role: UserRole.SUBCONTRACTOR,
            projectId: "some-project-id"
          }
        })
    })

    it("makes a call to the endpoint", () => {
      UserApi.updateUserAccount("some-email@test.org", UserRole.SUBCONTRACTOR, apiUser,
        {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/${encodedEmail}/SUBCONTRACTOR`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    })

    it("sends request with Authorization header", () => {
      UserApi.updateUserAccount("some-email@test.org", UserRole.SUBCONTRACTOR, apiUser,
        {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });


  });

  describe("::sendPasswordResetEmail", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/users/send-password-reset-email`,
        {
          status: 200, body: {}
        });
    })

    it("makes a call to send reset password email", () => {
      UserApi.sendPasswordResetEmail("some-email@test.org");
      const fetchCall = fetchMock.lastCall();
      const encodedEmail = encodeURIComponent("some-email@test.org");

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/send-password-reset-email`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(`{"email":"${encodedEmail}"}`);
    })
  });

  describe("::sendPasswordResetEmail", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/users/reset-password`,
        {
          status: 200, body: {}
        });
    })

    it("makes a call to reset password", () => {
      UserApi.resetPassword("password", "some-email@test.org", "token");
      const fetchCall = fetchMock.lastCall();
      const encodedEmail = encodeURIComponent("some-email@test.org");

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/reset-password`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(`{"email":"${encodedEmail}","token":"token","password":"password"}`);
    })
  });

  describe("::deleteUserPermission", () => {
    const encodedEmail = encodeURIComponent("some-email@test.org")
    const permissionId = 123;
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/users/accounts/${encodedEmail}/permissions/${permissionId}`,
        {
          status: 200,
        })
    });

    it("makes a call to the endpoint", () => {
      UserApi.deleteUserPermission("some-email@test.org", 123, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/${encodedEmail}/permissions/123`);
    });

    it("sends the request with an Authorization header", () => {
      UserApi.deleteUserPermission("some-email@test.org", 123, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });

  describe("::createUserPermission", () => {
    const encodedEmail = encodeURIComponent("some-email@test.org")
    const permission = {
      permissionType: UserPermissionType.ORGANIZATION,
      permissionAction: UserPermissionAction.READ,
      organizationFirebaseId: "some-org",
    };
    beforeEach(() => {
      fetchMock.put(`${Http.baseUrl()}/users/accounts/${encodedEmail}/permissions/new`,
        {
          status: 200,
        })
    });

    it("makes a call to the endpoint", () => {
      UserApi.createUserPermission("some-email@test.org", permission, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/${encodedEmail}/permissions/new`);
      expect(fetchMock.lastOptions().body).to.eq(`{"permissionType":"ORGANIZATION","permissionAction":"READ","organizationFirebaseId":"some-org"}`);
    });

    it("sends the request with an Authorization header", () => {
      UserApi.createUserPermission("some-email@test.org", permission, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });
});