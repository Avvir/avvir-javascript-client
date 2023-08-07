import makeErrorsPretty from "../utilities/make_errors_pretty";
import {AssociationIds} from "../models";
import {User} from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import {ApiInspectReport, ApiInspectReportEntry} from "../models";

export default class ReportApi {
    static createInspectReport({ projectId }: AssociationIds, report: ApiInspectReport, user: User): Promise<ApiInspectReport> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports`;
        return Http.post(url, user, report) as unknown as Promise<ApiInspectReport>;
    }
    static listInspectReports({projectId}: AssociationIds, user: User): Promise<ApiInspectReport[]> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports`;
        return Http.get(url, user) as unknown as Promise<ApiInspectReport[]>;
    }
    static createInspectReportEntries({ projectId, inspectReportId }: AssociationIds, reportEntries: ApiInspectReportEntry[], user: User): Promise<ApiInspectReportEntry[]> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports/${inspectReportId}/inspect-entries`;
        return Http.post(url, user, reportEntries) as unknown as Promise<ApiInspectReportEntry[]>;
    }
}

makeErrorsPretty(ReportApi);