import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import ApiMasterformat from "./api_masterformat";
import { DateLike } from "type_aliases";

export class ApiProjectMasterformatProgress {
  constructor(masterformat?: ApiMasterformat, percentComplete?: number, scanDate?: DateLike) {
    addInstantGetterAndSetterToApiModel(this, "scanDate");
    if (masterformat) {
      this.masterformat = new ApiMasterformat(masterformat.version, masterformat.code);
    } else {
      this.masterformat = null;
    }
    if (percentComplete === 0) {
      this.percentComplete = percentComplete;
    } else {
      this.percentComplete = percentComplete || null;
    }
    // @ts-ignore
    this.scanDate = scanDate;
  }

  masterformat: ApiMasterformat | null = null;
  percentComplete: number | null = null;
  scanDate: number | null = null;
}

export default ApiProjectMasterformatProgress;
