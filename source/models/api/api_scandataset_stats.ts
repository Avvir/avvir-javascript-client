import { addInstantGetterAndSetterToApiModel } from "../../mixins";

import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiScanDatasetStatsArgument = ModifyPartial<ApiScanDatasetStats, {
  pipelineStartTime: DateLike;
  pipelineEndTime: DateLike;
  qaCompleteTime: DateLike;
  qaStartTime: DateLike;
  realityCaptureUploadedOn: DateLike;
}>


export class ApiScanDatasetStats {
  constructor({
                pipelineStartTime,
                pipelineEndTime,
                qaCompleteTime,
                qaStartTime,
                realityCaptureUploadedOn,
                organizationName,
                projectName,
                floor,
                scanDatasetId,
                scanDatasetName,
                pipelineStatus,
                squareFootage,
                realityCaptureName,
                realityCaptureType
              }: ApiScanDatasetStatsArgument = {})
  {
    addInstantGetterAndSetterToApiModel(this, "pipelineStartTime", pipelineStartTime);
    addInstantGetterAndSetterToApiModel(this, "pipelineEndTime", pipelineEndTime);
    addInstantGetterAndSetterToApiModel(this, "qaCompleteTime", qaCompleteTime);
    addInstantGetterAndSetterToApiModel(this, "qaStartTime", qaStartTime);
    addInstantGetterAndSetterToApiModel(this, "realityCaptureUploadedOn", realityCaptureUploadedOn);
    this.organizationName = organizationName;
    this.projectName = projectName;
    this.floor = floor;
    this.scanDatasetId = scanDatasetId;
    this.scanDatasetName = scanDatasetName;
    this.pipelineStatus = pipelineStatus;
    this.squareFootage = squareFootage;

    this.realityCaptureName = realityCaptureName;
    this.realityCaptureType = realityCaptureType;
  }

  organizationName: string;
  scanDatasetId: number;
  projectName: string;
  floor: string;
  scanDatasetName: string;
  pipelineStartTime: number;
  pipelineEndTime: number;
  pipelineStatus: string;
  qaCompleteTime: number;
  qaStartTime: number;
  squareFootage: number;

  realityCaptureName?: string;
  realityCaptureType?: string;
  realityCaptureUploadedOn?: number;
}
