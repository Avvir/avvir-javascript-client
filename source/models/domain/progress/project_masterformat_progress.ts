import addDateGetterAndSetterToDomainModel from "../../../mixins/add_date_getter_and_setter_to_domain_model";
import Masterformat from "../../api/api_masterformat";

export default class ProjectMasterformatProgress {
  constructor(masterformat, percentComplete, scanDate) {
    addDateGetterAndSetterToDomainModel(this, "scanDate");
    this.masterformat = masterformat || null;
    this.percentComplete = percentComplete || null;
    this.scanDate = scanDate;
  }

  masterformat: Masterformat | null = null;
  percentComplete: number | null = null;
  scanDate: Date | null = null;
}
