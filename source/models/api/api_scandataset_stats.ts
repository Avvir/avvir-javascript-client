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
   squareFootage: number;

   constructor(props: ApiScanDatasetStatsProps) {
      addInstantGetterAndSetterToApiModel(this, 'pipelineStartTime', props.pipelineStartTime);
      addInstantGetterAndSetterToApiModel(this, 'pipelineEndTime', props.pipelineEndTime);
      addInstantGetterAndSetterToApiModel(this, 'qaCompleteTime', props.qaCompleteTime);
      this.organizationName = props.organizationName;
      this.projectName = props.projectName;
      this.scanDatasetId = props.scanDatasetId;
      this.scanDatasetName = props.scanDatasetName;
      this.pipelineStatus = props.pipelineStatus;
      this.squareFootage = props.squareFootage;
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
}