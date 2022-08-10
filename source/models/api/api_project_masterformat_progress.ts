import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import ApiMasterformat from "./api_masterformat";
import { DateLike } from "./type_aliases";

export class ApiProjectMasterformatProgress {
  constructor(masterformat?: ApiMasterformat, percentComplete?: number, scanDate?: DateLike, createdAt?: DateLike) {
    addInstantGetterAndSetterToApiModel(this, "scanDate");
    addInstantGetterAndSetterToApiModel(this, "createdAt");
    if (masterformat) {
      this.masterformat = new ApiMasterformat(masterformat.version, masterformat.code);
    } else {
      this.masterformat = null;
    }
    this.percentComplete = percentComplete ?? null;
    // @ts-ignore
    this.scanDate = scanDate;
    this.createdAt = createdAt;
  }

  masterformat: ApiMasterformat | null = null;
  percentComplete: number | null = null;
  scanDate: number | null | DateLike = null;
  createdAt: number | null | DateLike = null;
}

export default ApiProjectMasterformatProgress;
