import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";

import type ProcessStatus from "../enums/process_status";
import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiRunningProcessArgument = ModifyPartial<ApiRunningProcess, {
  startDate?: DateLike
  endDate?: DateLike
}>

export class ApiRunningProcess {
  constructor({ id, name, status, startDate, endDate, message, data }: ApiRunningProcessArgument = {}) {
    this.id = id;
    this.name = name;
    this.status = status;
    addInstantGetterAndSetterToApiModel(this, "startDate", startDate);
    addInstantGetterAndSetterToApiModel(this, "endDate", endDate);
    this.message = message;
    this.data = data;
  }

  id: number;
  name: string;
  status: ProcessStatus;
  startDate: number;
  endDate: number;
  message: string;

  // Result payload received from the gateway process when we poll it (checkRunningProcess).
  // For Import Project Data, a FAILED run carries the categorized errors here (an
  // ApiImportProjectDataErrorResponse) for the frontend to render after polling; null otherwise.
  // Typed `any` because the gateway column is a general-purpose JSON slot; narrow it with the
  // isImportProjectDataError type guard before use.
  data: any;
}

export default ApiRunningProcess;
