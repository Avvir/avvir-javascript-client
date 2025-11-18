import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

import type {DateLike, ModifyPartial} from "type_aliases";
import PipelineLogType from "../enums/pipeline_log_type";

export type ApiPipelineLogArgument = ModifyPartial<ApiPipelineLog, {
  createdAt?: DateLike
}>

export class ApiPipelineLog {
  constructor({
                id,
                pipelineId,
                createdAt,
                logType,
                data,
              }: ApiPipelineLogArgument = {}) {
    addReadOnlyPropertiesToModel(this, {id});
    this.pipelineId = pipelineId || null;
    addInstantGetterAndSetterToApiModel(this, "createdAt");
    this.logType = logType || null;
    this.data = data || null;
  }

  readonly id: number;
  pipelineId: number;
  createdAt: number;
  logType: PipelineLogType;
  data: string;
}

export default ApiPipelineLog;
