import { addInstantGetterAndSetterToApiModel, addReadOnlyPropertiesToModel } from "../../mixins";
import { ApiInspectReportEntry, ApiInspectReportEntryArgument } from "./api_inspect_report_entry";

import type ApiUser from "./api_user";
import { DateLike, ModifyPartial } from "type_aliases";

export type ApiInspectReportArgument = ModifyPartial<ApiInspectReport, {
  entries: ApiInspectReportEntryArgument[]
  createdAt: DateLike
  createdBy: Partial<ApiUser>
}>

export class ApiInspectReport {
  constructor({ id, firebaseProjectId, name, entries, createdBy, createdAt }: ApiInspectReportArgument) {
    addReadOnlyPropertiesToModel(this, { id, firebaseProjectId, createdBy });
    this.name = name;
    this.entries = entries?.map(entry => new ApiInspectReportEntry(entry)) || [];
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
  }

  readonly id: number;
  readonly firebaseProjectId: string;
  name: string;
  entries: ApiInspectReportEntry[];
  createdAt?: number;
  readonly createdBy?: ApiUser;
}

export default ApiInspectReport;
