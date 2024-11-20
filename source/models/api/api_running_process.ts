import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";

import type ProcessStatus from "../enums/process_status";
import type { DateLike, ModifyPartial } from "./type_aliases";

export type ApiRunningProcessArgument = ModifyPartial<ApiRunningProcess, {
  startDate?: DateLike
  endDate?: DateLike
}>

export class ApiRunningProcess {
  constructor({ id, name, status, startDate, endDate, message }: ApiRunningProcessArgument = {}) {
    this.id = id;
    this.name = name;
    this.status = status;
    addInstantGetterAndSetterToApiModel(this, "startDate", startDate);
    addInstantGetterAndSetterToApiModel(this, "endDate", endDate);
    this.message = message;
  }

  id: number;
  name: string;
  status: ProcessStatus;
  startDate: number;
  endDate: number;
  message: string;
}

export default ApiRunningProcess;
