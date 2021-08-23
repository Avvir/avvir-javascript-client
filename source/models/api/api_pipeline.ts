import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import RunningProcessStatus from "../enums/running_process_status";
import { DateLike, Modify, ModifyPartial } from "type_aliases";

interface ApiPipelineArgument extends ModifyPartial<ApiPipeline, {
  startTime?: DateLike
  endTime?: DateLike
  status?: RunningProcessStatus
}> {}

export default class ApiPipeline {
  constructor({
    id,
    name,
    externalId,
    externalUrl,
    startTime,
    endTime,
    firebaseProjectId,
    firebaseFloorId,
    firebaseScanDatasetId,
    status
  }: ApiPipelineArgument = {}) {
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
    this.firebaseProjectId = firebaseProjectId || null;
    this.firebaseFloorId = firebaseFloorId || null;
    this.firebaseScanDatasetId = firebaseScanDatasetId || null;
    this.status = status || null;
  }

  readonly id: number;
  name: string;
  externalId: string;
  externalUrl: string;
  startTime: number;
  endTime: number;

  firebaseProjectId: string;
  firebaseFloorId: string;
  firebaseScanDatasetId: string;

  status: RunningProcessStatus;
}
