import addDateGetterAndSetterToDomainModel from "../../mixins/add_date_getter_and_setter_to_domain_model";

export class ApiProjectReportVersion {
    constructor({id, projectReportId, reportDate, note, url}: Partial<ApiProjectReportVersion> = {}) {
        addDateGetterAndSetterToDomainModel(this, "reportDate");

        this.id = id;
        this.projectReportId = projectReportId;
        this.note = note;
        this.url = url;
        // @ts-ignore
        this.reportDate = reportDate || null;
    }

    id: number;
    projectReportId: number;
    reportDate: Date;
    note: string;
    url: string;
}

export default ApiProjectReportVersion;
