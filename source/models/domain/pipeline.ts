import {PipelineName, RunningProcessStatus} from "../enums";
import { DateLike, Modify } from "type_aliases";
import {addDateGetterAndSetterToDomainModel, addReadOnlyPropertiesToModel} from "../../mixins";

interface PipelineArgument extends Partial<Modify<Pipeline, {
  startTime?: DateLike
  endTime?: DateLike
}>> {}

export class Pipeline {
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
                updates,
                status
              }: PipelineArgument = {}) {
    addReadOnlyPropertiesToModel(this, { id });
    addDateGetterAndSetterToDomainModel(this, "startTime");
    addDateGetterAndSetterToDomainModel(this, "endTime");
    this.name = name || null;
    this.externalId = externalId || "";
    this.externalUrl = externalUrl || null;
    // @ts-ignore
    this.startTime = startTime;
    // @ts-ignore
    this.endTime = endTime;
    this.firebaseClientAccountId = firebaseClientAccountId || null;
    this.firebaseProjectId = firebaseProjectId || null;
    this.firebaseFloorId = firebaseFloorId || null;
    this.firebaseScanDatasetId = firebaseScanDatasetId || null;
    this.updates = updates || 0;
    this.status = status || null;
  }

  readonly id: number;
  name: PipelineName;
  externalId: string;
  externalUrl: string;
  startTime: Date;
  endTime: Date;

  firebaseClientAccountId: string;
  firebaseProjectId: string;
  firebaseFloorId: string;
  firebaseScanDatasetId: string;

  status: RunningProcessStatus;
  updates?: number;
}

export default Pipeline;
