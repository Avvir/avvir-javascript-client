import {describe} from "mocha";
import fetchMock from "fetch-mock";
import {ApiUserPermission, UserRole, User} from "../../source";
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
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/users/accounts/self`,
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
      UserApi.getUserAccount({
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token"}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/self`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("send the request with an Authorization header", () => {
      UserApi.getUserAccount({
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token"}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });

  describe("::getUserPermissions", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/users/accounts/123/permissions`,
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
      UserApi.getUserPermissions(123, {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/123/permissions`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("send the request with an Authorization header", () => {
      UserApi.getUserPermissions(123, {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });

  describe("::updateUserAccount", () => {
    const apiUser = new ApiUser({
      name: "some-user",
      userOrganization: "some-org",
      role: UserRole.SUBCONTRACTOR
    })
    beforeEach(() => {
      fetchMock.put(`${Http.baseUrl()}/users/accounts/123`,
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
      UserApi.updateUserAccount(123, apiUser,
        {
          authType: GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/123`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    })

    it("sends request with Authorization header", () => {
      UserApi.updateUserAccount(123, apiUser,
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

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/send-password-reset-email`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(`{"email":"some-email%40test.org"}`);
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

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/reset-password`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
      expect(fetchMock.lastOptions().body).to.eq(`{"email":"some-email%40test.org","token":"token","password":"password"}`);
    })
  });

  describe("::deleteUserPermission", () => {
    const permissionId = 456;
    beforeEach(() => {
      fetchMock.delete(`${Http.baseUrl()}/users/accounts/123/permissions/${permissionId}`,
        {
          status: 200,
        })
    });

    it("makes a call to the endpoint", () => {
      UserApi.deleteUserPermission(123, 456, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/123/permissions/456`);
    });

    it("sends the request with an Authorization header", () => {
      UserApi.deleteUserPermission(123, 456, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });

  describe("::createUserPermission", () => {
    const permission: ApiUserPermission = {
      id: 0,
      masterformatCode: "",
      organizationName: "",
      projectFirebaseId: "",
      projectName: "",
      userId: 0,
      workPackageId: 0,
      permissionType: UserPermissionType.ORGANIZATION,
      permissionAction: UserPermissionAction.READ,
      organizationFirebaseId: "some-org"
    };
    beforeEach(() => {
      fetchMock.put(`${Http.baseUrl()}/users/accounts/123/permissions/new`,
        {
          status: 200,
        })
    });

    it("makes a call to the endpoint", () => {
      UserApi.createUserPermission(123, permission, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/users/accounts/123/permissions/new`);
      expect(fetchMock.lastOptions().body).to.eq(JSON.stringify(permission));
    });

    it("sends the request with an Authorization header", () => {
      UserApi.createUserPermission(123, permission, {
        authType: GATEWAY_JWT,
        gatewayUser: {idToken: "some-firebase.id.token", role: USER}
      });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    })
  });
});
