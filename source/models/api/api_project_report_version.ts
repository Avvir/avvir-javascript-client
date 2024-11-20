import addDateGetterAndSetterToDomainModel from "../../mixins/add_date_getter_and_setter_to_domain_model";

import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiProjectReportVersionArgument = ModifyPartial<ApiProjectReportVersion, {
  reportDate: DateLike
}>

export class ApiProjectReportVersion {
  constructor({ id, projectReportId, reportDate, note, url }: ApiProjectReportVersionArgument = {}) {
    addDateGetterAndSetterToDomainModel(this, "reportDate", reportDate);

    this.id = id;
    this.projectReportId = projectReportId;
    this.note = note;
    this.url = url;
  }

  id: number;
  projectReportId: number;
  reportDate: Date;
  note: string;
  url: string;
}

export default ApiProjectReportVersion;
