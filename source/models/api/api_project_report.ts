import ApiProjectReportVersion, { ApiProjectReportVersionArgument } from "./api_project_report_version";

import type { ModifyPartial } from "type_aliases";

export type ApiProjectReportArgument = ModifyPartial<ApiProjectReport, {
  reportVersions: ApiProjectReportVersionArgument[];
}>

export class ApiProjectReport {
  constructor({ id, type, name, url, subcontractorId, reportVersions }: ApiProjectReportArgument = {}) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.url = url;
    this.reportVersions = reportVersions?.map(version => new ApiProjectReportVersion(version)) || [];
    this.subcontractorId = subcontractorId;
  }

  id: number;
  type: string;
  name: string;
  url: string;
  reportVersions: ApiProjectReportVersion[];
  subcontractorId: number;
}

export default ApiProjectReport;
