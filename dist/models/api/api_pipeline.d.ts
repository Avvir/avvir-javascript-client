import RunningProcessStatus from "../enums/running_process_status";
import { DateLike, ModifyPartial } from "type_aliases";
import { PipelineName } from "../enums/pipeline_types";
export interface ApiPipelineArgument extends ModifyPartial<ApiPipeline, {
    startTime?: DateLike;
    endTime?: DateLike;
    options?: object;
    status?: RunningProcessStatus;
}> {
}
export default class ApiPipeline {
    constructor({ id, name, externalId, externalUrl, startTime, endTime, firebaseProjectId, firebaseFloorId, firebaseScanDatasetId, options, status }?: ApiPipelineArgument);
    readonly id: number;
    name: PipelineName;
    externalId: string;
    externalUrl: string;
    startTime: number;
    endTime: number;
    firebaseProjectId: string;
    firebaseFloorId: string;
    firebaseScanDatasetId: string;
    options: object;
    status: RunningProcessStatus;
}
