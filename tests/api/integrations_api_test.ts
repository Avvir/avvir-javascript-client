import {describe} from "mocha";
import {expect} from "chai";
import fetchMock from "fetch-mock";

import {
    ApiIntegrationCredentials,
    ApiIntegrationCredentialsType,
    ApiIntegrationProject,
    ApiRunningProcess, GATEWAY_JWT, USER,
    User,
    UserAuthType,
    UserRole
} from "../../source";
import Http from "../../source/utilities/http";
import {IntegrationsApi} from "../../source/api";
import {lastMockedFetchCall} from "../test_utils/fetch_mock_utils";
import {sandbox} from "../test_utils/setup_tests";

import {AutodeskRequest} from "../../source/models/api/integrations/autodesk/api_autodesk_request";
import AutodeskIssue from "../../source/models/api/integrations/autodesk/api_autodesk_issue";


describe("IntegrationsApi", () => {
    let user: User;
    beforeEach(() => {
        fetchMock.resetBehavior();
        user = {
            authType: UserAuthType.FIREBASE,
            firebaseUser: {uid: "some-uid", role: UserRole.SUPERADMIN, idToken: "some-firebase.id.token"}
        };
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
            expect(JSON.parse(fetchCall.body)).to.deep.eq({id: 3});
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

    describe("::checkProcoreAccessToken", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/integrations/procore/access-token?procore-access-token=some-procore-access-token`,
                {status: 200, body: {expiresInSeconds: 3600}});
        });

        it("includes auth headers and makes a request to check access token", () => {
            IntegrationsApi.checkProcoreAccessToken("some-procore-access-token", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            });

            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/procore/access-token?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing", () => {
            return IntegrationsApi.checkProcoreAccessToken("", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            return IntegrationsApi.checkProcoreAccessToken(undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });
    });

    describe("::getProcoreProjects", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/integrations/procore/projects?procore-access-token=some-procore-access-token`,
                {status: 200, body: ["some-procore-project"]});
            fetchMock.get(`${Http.baseUrl()}/integrations/procore/projects?procore-access-token=some-procore-access-token&companyId=some-company-id`,
                {status: 200, body: ["some-procore-project"]});
        });

        it("includes auth headers and makes a request to the gateway", () => {
            IntegrationsApi.getProcoreProjects("some-procore-access-token", undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/procore/projects?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing when companyId is not given", () => {
            return IntegrationsApi.getProcoreProjects("", undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });

        });

        it("throws an error if procore access token is undefined when companyId is not given", () => {
            return IntegrationsApi.getProcoreProjects(undefined, undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("includes auth headers and makes a request to the gateway with companyId", () => {
            IntegrationsApi.getProcoreProjects("some-procore-access-token", "some-company-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER},
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(
                `${Http.baseUrl()}/integrations/procore/projects?procore-access-token=some-procore-access-token&companyId=some-company-id`
            );
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing when companyId is given", () => {
            return IntegrationsApi.getProcoreProjects("", "some-company-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined when companyId is given", () => {
            return IntegrationsApi.getProcoreProjects(undefined, "some-company-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

    });

    describe("::getProcoreCompanies", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/integrations/procore/companies?procore-access-token=some-procore-access-token`,
                {status: 200, body: ["some-procore-company"]});
        });

        it("includes auth headers and makes a request to the gateway", () => {
            IntegrationsApi.getProcoreCompanies("some-procore-access-token", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/procore/companies?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing", () => {
            return IntegrationsApi.getProcoreCompanies("", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            return IntegrationsApi.getProcoreCompanies(undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

    });

    describe("::getProcoreObservationTypes", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/integrations/procore/some-company-id/observation-types?procore-access-token=some-procore-access-token`,
                {status: 200, body: ["some-procore-observation-type"]});
        });

        it("includes auth headers and makes a request to the gateway", () => {
            IntegrationsApi.listProcoreObservationTypes("some-procore-access-token", "some-company-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/procore/some-company-id/observation-types?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing", () => {
            return IntegrationsApi.listProcoreObservationTypes("", "some-company-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            return IntegrationsApi.listProcoreObservationTypes(undefined, "some-company-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if company id is missing", () => {
            return IntegrationsApi.listProcoreObservationTypes("some-access-token", undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("company id not found");
            });
        });

    });

    describe("::getProcoreObservationAssignees", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/integrations/procore/some-company-id/some-project-id/observation-assignees?procore-access-token=some-procore-access-token`,
                {status: 200, body: ["some-procore-observation-assignees"]});
        });

        it("includes auth headers and makes a request to the gateway", () => {
            IntegrationsApi.getObservationAssignees("some-procore-access-token","some-company-id", "some-project-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/procore/some-company-id/some-project-id/observation-assignees?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing", () => {
            IntegrationsApi.getObservationAssignees("","some-company-id", "some-project-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            IntegrationsApi.getObservationAssignees(undefined,"some-company-id", "some-project-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if project id is missing", () => {
            IntegrationsApi.getObservationAssignees("some-access-token","some-company-id", undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("project id not found");
            });
        });

        it("throws an error if company id is missing", () => {
            return IntegrationsApi.getObservationAssignees("some-access-token", undefined,"some-project-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("company id not found");
            });
        });

    });

    describe("::getProcoreRfiAssignees", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/integrations/procore/some-project-id/rfi-assignees?procore-access-token=some-procore-access-token`,
                {status: 200, body: ["some-procore-assignees"]});
        });

        it("includes auth headers and makes a request to the gateway", () => {
            IntegrationsApi.getRfiAssignees("some-procore-access-token", "some-project-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/procore/some-project-id/rfi-assignees?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing", () => {
            return IntegrationsApi.getRfiAssignees("", "some-project-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            return IntegrationsApi.getRfiAssignees(undefined, "some-project-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if project id is missing", () => {
            return IntegrationsApi.getRfiAssignees("some-access-token", undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("project id not found");
            });
        });

    });

    describe("::createProcoreObservation", () => {
        let dispatchSpy, imageBlob;
        beforeEach(() => {
            dispatchSpy = sandbox.spy();
            imageBlob = new Blob(["image content"], {type: "image/png"});
            fetchMock.post(`${Http.baseUrl()}/integrations/procore/some-company-id/some-project-id/create-observation-with-attachment?procore-access-token=some-procore-access-token`,
                200);
        });

        afterEach(() => {
            fetchMock.restore();
        });

        it("includes the authorization headers", () => {
            IntegrationsApi.CreateProcoreObservation(
                "some-procore-access-token",
                "some-company-id",
                "some-project-id",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839,
                    "assignee_id": 1,
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }
            );

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });

        it("makes a request to the gateway api", () => {
            IntegrationsApi.CreateProcoreObservation("some-procore-access-token",
                "some-company-id",
                "some-project-id",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839,
                    "assignee_id": 1,
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }
            );
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0])
                .to
                .eq(`${Http.baseUrl()}/integrations/procore/some-company-id/some-project-id/create-observation-with-attachment?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing", () => {
            return IntegrationsApi.CreateProcoreObservation("",
                "some-company-id",
                "some-project-id",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839,
                    "assignee_id": 1,
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            return IntegrationsApi.CreateProcoreObservation(undefined,
                "some-company-id",
                "some-project-id",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839,
                    "assignee_id": 1,
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if projectId is missing", () => {
            return IntegrationsApi.CreateProcoreObservation("some-access-token",
                "some-company-id",
                "",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839,
                    "assignee_id": 1,
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("project id not found");
            });
        });

        it("throws an error if companyId is missing", () => {
            return IntegrationsApi.CreateProcoreObservation("some-access-token",
                "",
                "some-project-id",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839,
                    "assignee_id": 1,
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("company id not found");
            });
        });
    });

    describe("::createProcoreRfi", () => {
        let dispatchSpy, imageBlob;
        beforeEach(() => {
            dispatchSpy = sandbox.spy();
            imageBlob = new Blob(["image content"], {type: "image/png"});
            fetchMock.post(`${Http.baseUrl()}/integrations/procore/some-company-id/some-project-id/create-rfi-with-attachments?procore-access-token=some-procore-access-token`,
                200);
        });
        afterEach(() => {
            fetchMock.restore();
        });

        it("includes the authorization headers", () => {

            IntegrationsApi.CreateProcoreRfi(
                "some-procore-access-token",
                "some-company-id",
                "some-project-id",
                {
                    "question": {"body": "Sample Observation Item"},
                    "due_date": "2024-11-16",
                    "subject": "Test Subject",
                    "personal": true,
                    "draft": true,
                    "assignee_ids": [152839,12434]
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }
            );

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });

        it("makes a request to the gateway api", () => {
            IntegrationsApi.CreateProcoreRfi(
                "some-procore-access-token",
                "some-company-id",
                "some-project-id",
                {
                    "question": {"body": "Sample Observation Item"},
                    "due_date": "2024-11-16",
                    "subject": "Test Subject",
                    "personal": true,
                    "draft": true,
                    "assignee_ids": [152839,12434]
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }
            );
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0])
                .to
                .eq(`${Http.baseUrl()}/integrations/procore/some-company-id/some-project-id/create-rfi?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing", () => {
            return IntegrationsApi.CreateProcoreRfi(
                "",
                "some-company-id",
                "some-project-id",
                {
                    "question": {"body": "Sample Observation Item"},
                    "due_date": "2024-11-16",
                    "subject": "Test Subject",
                    "personal": true,
                    "draft": true,
                    "assignee_ids": [152839,12434]
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            return IntegrationsApi.CreateProcoreRfi(
                undefined,
                "some-company-id",
                "some-project-id",
                {
                    "question": {"body": "Sample Observation Item"},
                    "due_date": "2024-11-16",
                    "subject": "Test Subject",
                    "personal": true,
                    "draft": true,
                    "assignee_ids": [152839,12434]
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if projectId is missing", () => {
            return IntegrationsApi.CreateProcoreRfi(
                "some-procore-access-token",
                "some-company-id",
                "",
                {
                    "question": {"body": "Sample Observation Item"},
                    "due_date": "2024-11-16",
                    "subject": "Test Subject",
                    "personal": true,
                    "draft": true,
                    "assignee_ids": [152839,12434]
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("project id not found");
            });
        });

        it("throws an error if companyId is missing", () => {
            return IntegrationsApi.CreateProcoreRfi(
                "some-procore-access-token",
                "",
                "some-project-id",
                {
                    "question": {"body": "Sample Observation Item"},
                    "due_date": "2024-11-16",
                    "subject": "Test Subject",
                    "personal": true,
                    "draft": true,
                    "assignee_ids": [152839,12434]
                },
                imageBlob,
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("company id not found");
            });
        });
    });

    describe("::getAutodeskAccessToken", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/integrations/autodesk/access-token?code=some-code&redirect-uri=some-redirect-uri`,
                {status: 200, body: {access_token: "some-access-token"}});
        });

        it("includes auth headers and makes a request to the gateway", () => {
            IntegrationsApi.getAutodeskAccessToken("some-code", "some-redirect-uri", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/autodesk/access-token?code=some-code&redirect-uri=some-redirect-uri`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if code is missing", () => {
            return IntegrationsApi.getAutodeskAccessToken("", "some-redirect-uri", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Invalid client secret or redirectUri");
            });
        });

        it("throws an error if code is undefined", () => {
            return IntegrationsApi.getAutodeskAccessToken(undefined, "some-redirect-uri", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error
            }).then((error) => {
                expect(error.message).to.eq("Invalid client secret or redirectUri");
            });
        });

        it("throws an error if redirectUri is missing", () => {
            return IntegrationsApi.getAutodeskAccessToken("some-code", "", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Invalid client secret or redirectUri");
            });
        });

        it("throws an error if redirectUri is undefined", () => {
            return IntegrationsApi.getAutodeskAccessToken
            ("some-code", undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {
                    idToken: "some-firebase.id.token", role: USER
                }
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.eq("Invalid client secret or redirectUri");
            });
        });
    });

    describe("::getAutoDeskHubs", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/integrations/autodesk/hubs?access-token=some-access-token`,
                {status: 200, body: ["some-autodesk-hubs"]});
        });

        it("includes auth headers and makes a request to the gateway", () => {
            IntegrationsApi.getAutodeskHubs("some-access-token", {
                authType: GATEWAY_JWT,
                gatewayUser: {
                    idToken: "some-firebase.id.token", role: USER
                }
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/autodesk/hubs?access-token=some-access-token`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if access token is missing", () => {
            return IntegrationsApi.getAutodeskHubs("", {
                authType: GATEWAY_JWT,
                gatewayUser: {
                    idToken: "some-firebase.id.token", role: USER
                }
            }).catch((error) => {
                return error
            }).then((error) => {
                expect(error.message).to.include("Invalid access token");
            });
        });

        it("throws an error if access token is undefined", () => {
            return IntegrationsApi.getAutodeskHubs(undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {
                    idToken: "some-firebase.id.token", role: USER
                }
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.include("Invalid access token");
            });
        });
    });

    describe("::getAutoDeskProjects", () => {
        beforeEach(() => {
                fetchMock.get(`${Http.baseUrl()}/integrations/autodesk/projects?access-token=some-access-token&hubId=some-hub-id`,
                    {status: 200, body: ["some-autodesk-project"]});
            }
        );

        it("includes auth headers and makes a request to the gateway", () => {
            IntegrationsApi.getAutodeskProjects("some-access-token", "some-hub-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            });
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/autodesk/projects?access-token=some-access-token&hubId=some-hub-id`);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if access token is missing", () => {
            return IntegrationsApi.getAutodeskProjects("", "some-hub-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.include("Invalid access token or hubId");
            });
        });

        it("throws an error if hubid is missing", () => {
            return IntegrationsApi.getAutodeskProjects("some-access-token", "", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.include("Invalid access token or hubId");
            });
        });

        it("throws an error if access token is undefined", () => {
            return IntegrationsApi.getAutodeskProjects(undefined, "some-hub-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.include("Invalid access token or hubId");
            });
        });

        it("throws an error if hubid is undefined", () => {
            return IntegrationsApi.getAutodeskProjects("some-access-token", undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                return error;
            }).then((error) => {
                expect(error.message).to.include("Invalid access token or hubId");
            });
        });
    });

    describe("::createAutodeskRequest", () => {
        describe("::createAutodeskRequest", () => {
            beforeEach(() => {
                fetchMock.post(`${Http.baseUrl()}/integrations/autodesk/create-request`, 201);
            });

            afterEach(() => {
                fetchMock.restore();
            });

            it("includes auth headers and makes a request to the gateway", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                IntegrationsApi.createAutodeskRequest("some-access-token", "some-hub-id", "some-project-id", autodeskRequest, imageBlob, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                });
                const fetchCall = fetchMock.lastCall();

                expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/integrations/autodesk/create-request`);
                expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
            });

            it("throws an error if access token is missing", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                return IntegrationsApi.createAutodeskRequest("", "some-hub-id", "some-project-id", autodeskRequest, imageBlob, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                }).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid access token");
                });
            });

            it("throws an error if hubId is missing", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                return IntegrationsApi.createAutodeskRequest("some-access-token", "", "some-project-id", autodeskRequest, imageBlob, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                }).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid hubId");
                });
            });

            it("throws an error if projectId is missing", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                return IntegrationsApi.createAutodeskRequest("some-access-token", "some-hub-id", "", autodeskRequest, imageBlob, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                }).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid projectId");
                });
            });

            it("throws an error if access token is undefined", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                return IntegrationsApi.createAutodeskRequest(undefined, "some-hub-id", "some-project-id", autodeskRequest, imageBlob, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                }).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid access token");
                });
            });

            it("throws an error if hubId is undefined", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                return IntegrationsApi.createAutodeskRequest("some-access-token", undefined, "some-project-id", autodeskRequest, imageBlob, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                }).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid hubId");
                });
            });

            it("throws an error if projectId is undefined", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                return IntegrationsApi.createAutodeskRequest("some-access-token", "some-hub-id", undefined, autodeskRequest, imageBlob, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                }).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid projectId");
                });
            });

            it("throws an error if image blob is missing", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });

                return IntegrationsApi.createAutodeskRequest("some-access-token", "some-hub-id", "some-project-id", autodeskRequest, null, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                }).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid imageBlob");
                });
            });

            it("throws an error if image blob is undefined", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });

                return IntegrationsApi.createAutodeskRequest("some-access-token", "some-hub-id", "some-project-id", autodeskRequest, undefined, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                }).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid imageBlob");
                });
            });

            it("throws an error if user is missing", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                return IntegrationsApi.createAutodeskRequest("some-access-token", "some-hub-id", "some-project-id", autodeskRequest, imageBlob, null).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid user");
                });
            });

            it("throws an error if user is undefined", () => {
                const autodeskRequest = new AutodeskRequest({
                    type: "issue",
                    request: new AutodeskIssue({
                        title: "Issue Title",
                        description: "Issue Question",
                        status: "open",
                        priority: "high",
                        dueDate: "2023-12-31"
                    })
                });
                const imageBlob = new Blob(["image content"], {type: "image/png"});

                return IntegrationsApi.createAutodeskRequest("some-access-token", "some-hub-id", "some-project-id", autodeskRequest, imageBlob, undefined).catch((error) => {
                    return error;
                }).then((error) => {
                    expect(error.message).to.include("Invalid user");
                });
            });
        });
    });
});
