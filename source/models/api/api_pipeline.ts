import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

import type { DateLike, ModifyPartial } from "type_aliases";
import type { PipelineName, RunningProcessStatus } from "../enums";

export type ApiPipelineArgument = ModifyPartial<ApiPipeline, {
  startTime?: DateLike
  endTime?: DateLike
}>

export class ApiPipeline {
  constructor({
                id,
                name,
                externalId,
                externalUrl,
                startTime,
                endTime,
                firebaseClientAccountId,
                firebaseProjectId,
                firebaseFloorId,
                firebaseScanDatasetId,
                options,
                status
              }: ApiPipelineArgument = {})
  {
    addReadOnlyPropertiesToModel(this, { id });
    addInstantGetterAndSetterToApiModel(this, "startTime");
    addInstantGetterAndSetterToApiModel(this, "endTime");
    this.name = name || null;
    this.externalId = externalId || null;
    this.externalUrl = externalUrl || null;
    // @ts-ignore
    this.startTime = startTime;
    // @ts-ignore
    this.endTime = endTime;
    this.firebaseClientAccountId = firebaseClientAccountId || null;
    this.firebaseProjectId = firebaseProjectId || null;
    this.firebaseFloorId = firebaseFloorId || null;
    this.firebaseScanDatasetId = firebaseScanDatasetId || null;
    this.options = options || {};
    this.status = status || null;
  }

  readonly id: number;
  name: PipelineName;
  externalId: string;
  externalUrl: string;
  startTime: number;
  endTime: number;

  firebaseClientAccountId: string;
  firebaseProjectId: string;
  firebaseFloorId: string;
  firebaseScanDatasetId: string;

  options: any;

  status: RunningProcessStatus;
}

export default ApiPipeline;
