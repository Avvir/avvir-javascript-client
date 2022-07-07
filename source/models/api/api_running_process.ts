import ProcessStatus from "../enums/process_status";
import {DateLike, ModifyPartial} from "type_aliases";
import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";

export interface ApiRunningProcessArgs extends ModifyPartial<ApiRunningProcess, {
  startDate?: DateLike
  endDate?: DateLike
}> { }

export class ApiRunningProcess {
  constructor({id, name, status, startDate, endDate, message}: ApiRunningProcessArgs = {}) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.message = message;
    addInstantGetterAndSetterToApiModel(this, "startDate", startDate);
    addInstantGetterAndSetterToApiModel(this, "endDate", endDate);
  }

  id: number;
  name: string;
  status: ProcessStatus;
  startDate: number;
  endDate: number;
  message: string;
}

export default ApiRunningProcess;
