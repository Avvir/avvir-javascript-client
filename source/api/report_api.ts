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
    static listInspectReportEntries({projectId, inspectReportId}: AssociationIds, user: User): Promise<ApiInspectReportEntry[]> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports/${inspectReportId}/inspect-entries`;
        return Http.get(url, user) as unknown as Promise<ApiInspectReportEntry[]>;
    }
    static createInspectReportEntries({ projectId, inspectReportId }: AssociationIds, reportEntries: ApiInspectReportEntry[], user: User): Promise<ApiInspectReportEntry[]> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports/${inspectReportId}/inspect-entries`;
        return Http.post(url, user, reportEntries) as unknown as Promise<ApiInspectReportEntry[]>;
    }
    static updateInspectReportEntry({ projectId, inspectReportId, inspectReportEntryId }: AssociationIds, reportEntry, user): Promise<ApiInspectReportEntry> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports/${inspectReportId}/inspect-entries/${inspectReportEntryId}`;
        return Http.put(url, user, reportEntry) as unknown as Promise<ApiInspectReportEntry>;
    }
    static updateInspectReport({ projectId, inspectReportId }: AssociationIds, report, user): Promise<ApiInspectReport> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports/${inspectReportId}`;
        return Http.put(url, user, report) as unknown as Promise<ApiInspectReport>;
    }
    static deleteInspectReport({ projectId, inspectReportId }: AssociationIds, user): Promise<void> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports/${inspectReportId}`;
        return Http.delete(url, user) as unknown as Promise<void>;
    }
    static deleteInspectReportEntry({ projectId, inspectReportId, inspectReportEntryId}: AssociationIds, user: User): Promise<void> {
        let url = `${Http.baseUrl()}/projects/${projectId}/reports/${inspectReportId}/inspect-entries/${inspectReportEntryId}`;
        return Http.delete(url, user) as unknown as Promise<void>;
    }
}

makeErrorsPretty(ReportApi);