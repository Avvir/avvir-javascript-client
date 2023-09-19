import {describe} from "mocha";
import {User} from "../../source/models/domain/user";
// @ts-ignore
import fetchMock from "fetch-mock";
import {UserAuthType} from "../../source/models/enums/user_auth_type";
import {UserRole} from "../../source/models/enums/user_role";
import Http from "../../source/utilities/http";
import {expect} from "chai";
import ReportApi from "../../source/api/report_api";
import {ApiInspectReport, ApiInspectReportEntry, ApiPlannedElement} from "../../source";

describe("ReportApi", () => {
    let user: User;
    beforeEach(() => {
        fetchMock.resetBehavior();
        user = {
            authType: UserAuthType.FIREBASE,
            firebaseUser: {uid: "some-uid", role: UserRole.SUPERADMIN, idToken: "some-firebase.id.token"}
        };
    });
    describe("listInspectReports", () => {
        beforeEach(() => {
            fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/reports`, 200);
        });
        it('makes a request to the gateway', () => {
            ReportApi.listInspectReports({projectId: "some-project-id"}, user);
            const fetchCall = fetchMock.lastCall();
            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/reports`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });
        it("sends the request with Authorization header", () => {
            ReportApi.listInspectReports({projectId: "some-project-id"}, {
                authType: UserAuthType.GATEWAY_JWT,
                gatewayUser: {idToken: "some-firebase.id.token", role: UserRole.USER}
            });
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("createInspectReport", () => {
        beforeEach(() => {
            fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/reports`, 200);
        });

        it("makes a request to the gateway api", () => {
            ReportApi.createInspectReport({
                    projectId: "some-project-id"
                },
                new ApiInspectReport({
                    firebaseProjectId: "some-project-id",
                    name: "some report name",
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/reports`);
            expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
                firebaseProjectId: "some-project-id",
                name: "some report name",
                entries: []
            });
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            ReportApi.createInspectReport({
                    projectId: "some-project-id"
                },
                new ApiInspectReport({
                    firebaseProjectId: "some-project-id",
                    name: "some report name",
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("createInspectReportEntry", () => {
        beforeEach(() => {
            fetchMock.post(`${Http.baseUrl()}/projects/some-project-id/reports/7/inspect-entries`, 200);
        });

        it("makes a request to the gateway api", () => {
            ReportApi.createInspectReportEntries({
                    projectId: "some-project-id",
                    inspectReportId: 7
                },
                new ApiInspectReportEntry({
                    reportId: 7,
                    name: "some entry name",
                    elements: [new ApiPlannedElement({globalId: "Obj2"})]
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/reports/7/inspect-entries`);
            expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
                reportId: 7,
                name: "some entry name",
                elements: [{globalId: "Obj2"}]
            });
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            ReportApi.createInspectReportEntries({
                    projectId: "some-project-id",
                    inspectReportId: 7
                },
                new ApiInspectReportEntry({
                    reportId: 7,
                    name: "some entry name",
                    elementId: 2
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("deleteInspectReportEntry", () => {
        beforeEach(() => {
            fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/reports/7/inspect-entries/9`, 200);
        });
        it("makes a request to the gateway api", () => {
            ReportApi.deleteInspectReportEntry({
                projectId: "some-project-id",
                inspectReportId: 7,
                inspectReportEntryId: 9
            }, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);
            const fetchCall = fetchMock.lastCall();
            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/reports/7/inspect-entries/9`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });
        it("includes the authorization headers", () => {
            ReportApi.deleteInspectReportEntry({
                    projectId: "some-project-id",
                    inspectReportId: 7,
                    inspectReportEntryId: 9
                }, {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);
            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("updateInspectReport", () => {
        beforeEach(() => {
            fetchMock.put(`${Http.baseUrl()}/projects/some-project-id/reports/7`, 200);
        });

        it("makes a request to the gateway api", () => {
            ReportApi.updateInspectReport({
                    projectId: "some-project-id",
                    inspectReportId: 7
                },
                new ApiInspectReport({
                    id: 7,
                    firebaseProjectId: "some-project-id",
                    name: "some report name",
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/reports/7`);
            expect(JSON.parse(fetchCall[1].body as string)).to.deep.eq({
                "entries": [],
                "firebaseProjectId": "some-project-id",
                "id": 7,
                "name": "some report name"
            });
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            ReportApi.updateInspectReport({
                    projectId: "some-project-id",
                    inspectReportId: 7
                },
                new ApiInspectReport({
                    id: 7,
                    firebaseProjectId: "some-project-id",
                    name: "some report name",
                }), {
                    authType: "GATEWAY_JWT",
                    gatewayUser: {idToken: "some-firebase.id.token"}
                } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
    describe("deleteInspectReport", () => {
        beforeEach(() => {
            fetchMock.delete(`${Http.baseUrl()}/projects/some-project-id/reports/7`, 200);
        });

        it("makes a request to the gateway api", () => {
            ReportApi.deleteInspectReport({
                projectId: "some-project-id",
                inspectReportId: 7
            }, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);

            const fetchCall = fetchMock.lastCall();

            expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/reports/7`);
            expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
        });

        it("includes the authorization headers", () => {
            ReportApi.deleteInspectReport({
                projectId: "some-project-id",
                inspectReportId: 7
            }, {
                authType: "GATEWAY_JWT",
                gatewayUser: {idToken: "some-firebase.id.token"}
            } as User);

            expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        });
    });
});