import { ApiPlannedElement } from "./api_planned_element";
import { ApiBuiltStatus } from "../enums";
import { ApiElementDeviation } from "./api_element_deviation";
import { ApiScannedElementTypeMap, isDeviationScanResult } from "./api_scanned_element";
import { addInstantGetterAndSetterToApiModel } from "../../mixins";

export class ApiDetailedElement<Label extends ApiBuiltStatus = ApiBuiltStatus> extends ApiPlannedElement {
  constructor(detailedElement: Partial<ApiDetailedElement<Label>> = {}) {
    super(detailedElement);
    addInstantGetterAndSetterToApiModel(this, "builtAt", detailedElement.builtAt);
    addInstantGetterAndSetterToApiModel(this, "fixedAt", detailedElement.fixedAt);
    this.scanResult = detailedElement.scanResult;
    if (isDeviationScanResult(this.scanResult)) {
      this.scanResult.deviation = { ...new ApiElementDeviation(this.scanResult.deviation) };
    }
    if (detailedElement.fixedDeviation) {
      this.fixedDeviation = { ...new ApiElementDeviation(detailedElement.fixedDeviation) };
    }
  }

  scanResult?: ApiScannedElementTypeMap[Label];
  builtAt?: number;
  fixedAt?: number;
  fixedDeviation?: ApiElementDeviation;
}

export default ApiDetailedElement;
