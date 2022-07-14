import {describe} from "mocha";
import {expect} from "chai";
import fetchMock from "fetch-mock";

import {makeStoreContents} from "../test_utils/test_factories";
import {
  ApiIntegrationCredentials,
  ApiIntegrationCredentialsType,
  ApiIntegrationProject,
  ApiRunningProcess,
  User,
  UserAuthType,
  UserRole
} from "../../source";
import Http from "../../source/utilities/http";
import {IntegrationsApi} from "../../source/api";
import {lastMockedFetchCall} from "../test_utils/fetch_mock_utils";

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

  describe("::getIntegrationProjectsForCredentials", () => {
    beforeEach(() => {
      let response = [new ApiIntegrationProject({
        id: 1,
        integrationCredentialsId: 2,
        externalName: "Some Name",
        externalId: "some-id"
      }),
        new ApiIntegrationProject({
          id: 2,
          integrationCredentialsId: 2,
          externalName: "Some Other Name",
          externalId: "some-other-id"
        })
      ];

      fetchMock.get(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY/projects`, response);
    });

    it("makes a call to the endpoint", () => {
      IntegrationsApi.getIntegrationProjectsForCredentials({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        ApiIntegrationCredentialsType.DRONE_DEPLOY,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY/projects`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      IntegrationsApi.getIntegrationProjectsForCredentials({
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

  describe("::syncIntegrationProjects", () => {
    beforeEach(() => {
      let response = new ApiRunningProcess({
        id: 1,
        name: "some-process"
      });
      fetchMock.post(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY/sync-projects`, response);
    });

    it("makes a call to the endpoint", () => {
      IntegrationsApi.syncIntegrationProjects({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        ApiIntegrationCredentialsType.DRONE_DEPLOY,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY/sync-projects`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      IntegrationsApi.syncIntegrationProjects({
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

  describe("::syncIntegrationPhotoAreas", () => {
    beforeEach(() => {
      let response = new ApiRunningProcess({
        id: 1,
        name: "some-process"
      });
      fetchMock.post(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY/sync-photo-areas`, response);
    });

    it("makes a call to the endpoint", () => {
      IntegrationsApi.syncIntegrationPhotoAreas({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        ApiIntegrationCredentialsType.DRONE_DEPLOY,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/credentials/DRONE_DEPLOY/sync-photo-areas`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      IntegrationsApi.syncIntegrationPhotoAreas({
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

  describe("::updateProjectIntegrationProject", () => {
    beforeEach(() => {
      fetchMock.post(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/set-integration-project`, "");
    });

    it("makes a call to the endpoint", () => {
      IntegrationsApi.updateProjectIntegrationProject({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        new ApiIntegrationProject({id: 3}),
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = lastMockedFetchCall();

      expect(fetchCall.url).to.eq(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/set-integration-project`);
      expect(JSON.parse(fetchCall.body)).to.deep.eq({ id: 3 });
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("makes a call to the endpoint when the id is null", () => {
      IntegrationsApi.updateProjectIntegrationProject({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        null,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      const fetchCall = lastMockedFetchCall();

      expect(fetchCall.url).to.eq(`${Http.baseUrl()}/integrations/organizations/some-org-id/projects/some-project-id/set-integration-project`);
      expect(fetchCall.body).to.eq(null);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      IntegrationsApi.updateProjectIntegrationProject({
          organizationId: "some-org-id",
          projectId: "some-project-id"
        },
        null,
        {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
        });

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

});
