import ApiProjectReportVersion from "./api_project_report_version";

export class ApiProjectReport {
    constructor({id, name, url, subcontractorId, reportVersions}: Partial<ApiProjectReport> = {}) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.reportVersions = reportVersions;
        this.subcontractorId = subcontractorId;
    }

    id: number;
    name: string;
    url: string;
    reportVersions: ApiProjectReportVersion[];
    subcontractorId: number;
}

export default ApiProjectReport;