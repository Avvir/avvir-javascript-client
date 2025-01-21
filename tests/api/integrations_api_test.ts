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
            IntegrationsApi.checkProcoreAccessToken("", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            IntegrationsApi.checkProcoreAccessToken(undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });
    });

    describe("::pushPdfToProcore", () => {
        let dispatchSpy;
        beforeEach(() => {
            dispatchSpy = sandbox.spy();
            fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/push-report-to-procore/progress?procore-project-id=some-procore-project-id&procore-company-id=some-company-id&procore-access-token=some-procore-access-token`,
                200);
        });

        it("includes the authorization headers", () => {
            IntegrationsApi.pushPdfToProcore({
                    projectId: "some-project-id",
                    floorId: "some-floor-id",
                    scanDatasetId: "some-scan-dataset-id"
                },
                "some-procore-project-id",
                "some-company-id",
                "some-procore-access-token",
                "progress",
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                },
            );

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });

        it("makes a request to the gateway api", () => {
            IntegrationsApi.pushPdfToProcore({
                    projectId: "some-project-id",
                    floorId: "some-floor-id",
                    scanDatasetId: "some-scan-dataset-id"
                },
                "some-procore-project-id",
                "some-company-id",
                "some-procore-access-token",
                "progress",
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                },
            );
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0])
                .to
                .eq(`${Http.baseUrl()}/projects/some-project-id/push-report-to-procore/progress?procore-project-id=some-procore-project-id&procore-company-id=some-company-id&procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
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
            try {
                IntegrationsApi.getProcoreProjects("", undefined, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                });
            } catch (error) {
                expect(error.message).to.eq("Procore access token not found");
            }
        });

        it("throws an error if procore access token is undefined when companyId is not given", () => {
            try {
                IntegrationsApi.getProcoreProjects(undefined, undefined, {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                });
            } catch (error) {
                expect(error.message).to.eq("Procore access token not found");
            }
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
            try {
                IntegrationsApi.getProcoreProjects("", "some-company-id", {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                });
            } catch (error) {
                expect(error.message).to.eq("Procore access token not found");
            }
        });

        it("throws an error if procore access token is undefined when companyId is given", () => {
            try {
                IntegrationsApi.getProcoreProjects(undefined, "some-company-id", {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER}
                });
            } catch (error) {
                expect(error.message).to.eq("Procore access token not found");
            }
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
            IntegrationsApi.getProcoreCompanies("", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            })
                .catch((error) => {
                    expect(error.message).to.eq("Procore access token not found");
                });
        });

        it("throws an error if procore access token is undefined", () => {
            IntegrationsApi.getProcoreCompanies(undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
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
            IntegrationsApi.listProcoreObservationTypes("", "some-company-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            IntegrationsApi.listProcoreObservationTypes(undefined, "some-company-id", {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if company id is missing", () => {
            IntegrationsApi.listProcoreObservationTypes("some-access-token", undefined, {
                authType: GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: USER}
            }).catch((error) => {
                expect(error.message).to.eq("company id not found");
            });
        });

    });

    describe("::createProcoreObservation", () => {
        let dispatchSpy;
        beforeEach(() => {
            dispatchSpy = sandbox.spy();
            fetchMock.post(`${Http.baseUrl()}/integrations/procore/some-company-id/some-project-id/create-observation?procore-access-token=some-procore-access-token`,
                200);
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
                    "type_id": 152839
                },
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
                    "type_id": 152839
                },
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }
            );
            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0])
                .to
                .eq(`${Http.baseUrl()}/integrations/procore/some-company-id/some-project-id/create-observation?procore-access-token=some-procore-access-token`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("throws an error if procore access token is missing", () => {
            IntegrationsApi.CreateProcoreObservation("",
                "some-company-id",
                "some-project-id",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839
                },
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if procore access token is undefined", () => {
            IntegrationsApi.CreateProcoreObservation(undefined,
                "some-company-id",
                "some-project-id",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839
                },
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                expect(error.message).to.eq("Procore access token not found");
            });
        });

        it("throws an error if projectId is missing", () => {
            IntegrationsApi.CreateProcoreObservation("some-access-token",
                "some-company-id",
                "",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839
                },
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                expect(error.message).to.eq("project id not found");
            });
        });

        it("throws an error if companyId is missing", () => {
            IntegrationsApi.CreateProcoreObservation("some-access-token",
                "",
                "some-project-id",
                {
                    "description": "Sample Observation Item",
                    "due_date": "2024-11-16",
                    "name": "Test Observation",
                    "personal": "true",
                    "priority": "Low",
                    "status": "initiated",
                    "type_id": 152839
                },
                {
                    authType: GATEWAY_JWT,
                    gatewayUser: {idToken: "some-firebase.id.token", role: USER},
                }).catch((error) => {
                expect(error.message).to.eq("company id not found");
            });
        });
    });

});
