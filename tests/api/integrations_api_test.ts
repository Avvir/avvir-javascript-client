import {describe} from "mocha";
import {expect} from "chai";
import fetchMock from "fetch-mock";

import {makeStoreContents} from "../test_utils/test_factories";
import {
  ApiIntegrationCredentialsType,
  User,
  UserAuthType,
  UserRole
} from "../../source";
import Http from "../../source/utilities/http";
import {ApiIntegrationCredentials} from "../../source";
import {IntegrationsApi} from "../../source/api";

describe("IntegrationsApi", () => {
  let user: User, fakeGetState;
  beforeEach(() => {
    fetchMock.resetBehavior();
    user = {
      authType: UserAuthType.FIREBASE,
      firebaseUser: {uid: "some-uid", role: UserRole.SUPERADMIN, idToken: "some-firebase.id.token"}
    };
    fakeGetState = () => makeStoreContents({
      user,
    });
  });

  describe("::saveIntegrationCredentials", () => {
    beforeEach(() => {
      let response = new ApiIntegrationCredentials({
        authorId: 1,
        firebaseOrganizationId: "some-org-id",
        firebaseProjectId: "some-project-id",
        username: "some-username",
        password: "some-password",
        credentialsType: ApiIntegrationCredentialsType.DRONE_DEPLOY
      });

      fetchMock.put(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY`, response);
    });

    it("makes a call to the endpoint", () => {
      IntegrationsApi.saveIntegrationCredentials({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        new ApiIntegrationCredentials({
          username: "some-username",
          password: "some-password",
          credentialsType: ApiIntegrationCredentialsType.DRONE_DEPLOY
        }),
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      IntegrationsApi.saveIntegrationCredentials({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        new ApiIntegrationCredentials({
          username: "some-username",
          password: "some-password",
          credentialsType: ApiIntegrationCredentialsType.DRONE_DEPLOY
        }),
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::getIntegrationCredentials", () => {
    beforeEach(() => {
      let response = new ApiIntegrationCredentials({
        authorId: 1,
        firebaseOrganizationId: "some-org-id",
        firebaseProjectId: "some-project-id",
        username: "some-username",
        password: "some-password",
        credentialsType: ApiIntegrationCredentialsType.DRONE_DEPLOY
      });

      fetchMock.get(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY`, response);
    });

    it("makes a call to the endpoint", () => {
      IntegrationsApi.getIntegrationCredentials({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        ApiIntegrationCredentialsType.DRONE_DEPLOY,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      IntegrationsApi.getIntegrationCredentials({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        ApiIntegrationCredentialsType.DRONE_DEPLOY,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::getProjectIntegrationCredentials", () => {
    beforeEach(() => {
      let response = [new ApiIntegrationCredentials({
        authorId: 1,
        firebaseOrganizationId: "some-org-id",
        firebaseProjectId: "some-project-id",
        username: "some-username",
        password: "some-password",
        credentialsType: ApiIntegrationCredentialsType.DRONE_DEPLOY
      })];

      fetchMock.get(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials`, response);
    });

    it("makes a call to the endpoint", () => {
      IntegrationsApi.getProjectIntegrationCredentials({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      IntegrationsApi.getProjectIntegrationCredentials({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

});
