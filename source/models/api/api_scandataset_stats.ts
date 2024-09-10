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
   qaStartedOn?: Date;
   qaCompletedOn?: Date;

   constructor(props: ApiScanDatasetStatsProps) {
      if (props.qaCompleteTime) {
         this.qaCompletedOn = new Date(props.qaCompleteTime * 1000);
      }
      if (props.qaStartTime) {
         this.qaStartedOn = new Date(props.qaStartTime * 1000);
      }
      if (props.realityCaptureUploadedOn) {
         this.realityCaptureUploadedOn = new Date(props.realityCaptureUploadedOn * 1000);
      }

      addInstantGetterAndSetterToApiModel(this, 'pipelineStartTime', props.pipelineStartTime);
      addInstantGetterAndSetterToApiModel(this, 'pipelineEndTime', props.pipelineEndTime);
      addInstantGetterAndSetterToApiModel(this, 'qaCompleteTime', props.qaCompleteTime);
      addInstantGetterAndSetterToApiModel(this, 'qaStartTime', props.qaStartTime);
      this.organizationName = props.organizationName;
      this.projectName = props.projectName;
      this.scanDatasetId = props.scanDatasetId;
      this.scanDatasetName = props.scanDatasetName;
      this.pipelineStatus = props.pipelineStatus;
      this.squareFootage = props.squareFootage;

      this.realityCaptureName = props.realityCaptureName;
      this.realityCaptureType = props.realityCaptureType;
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
   realityCaptureUploadedOn?: number;
}