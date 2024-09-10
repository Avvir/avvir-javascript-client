import {addInstantGetterAndSetterToApiModel} from "../../mixins";

export class ApiScanDatasetStats {
   organizationName: string;
   scanDatasetId: number;
   projectName: string;
   floor: string;
   scanDatasetName: string;
   pipelineStartTime: Date;
   pipelineEndTime: Date;
   pipelineStatus: string;
   qaCompleteTime: Date;
   qaStartTime: Date;
   squareFootage: number;

   realityCaptureName?: string;
   realityCaptureType?: string;
   realityCaptureUploadedOn?: Date;

   constructor(props: ApiScanDatasetStatsProps) {
      addInstantGetterAndSetterToApiModel(this, 'pipelineStartTime', props.pipelineStartTime);
      addInstantGetterAndSetterToApiModel(this, 'pipelineEndTime', props.pipelineEndTime);
      addInstantGetterAndSetterToApiModel(this, 'qaCompleteTime', props.qaCompleteTime);
      addInstantGetterAndSetterToApiModel(this, 'qaStartTime', props.qaStartTime);
      addInstantGetterAndSetterToApiModel(this, 'realityCaptureUploadedOn', props.realityCaptureUploadedOn);
      this.organizationName = props.organizationName;
      this.projectName = props.projectName;
      this.scanDatasetId = props.scanDatasetId;
      this.scanDatasetName = props.scanDatasetName;
      this.pipelineStatus = props.pipelineStatus;
      this.squareFootage = props.squareFootage;

      this.realityCaptureName = props.realityCaptureName;
      this.realityCaptureType = props.realityCaptureType;
      this.realityCaptureUploadedOn = props.realityCaptureUploadedOn;
   }
}


type ApiScanDatasetStatsProps = {
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
   realityCaptureUploadedOn?: Date;
}