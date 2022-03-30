import {ApiPlannedElement} from "./api_planned_element";
import {ApiBuiltStatus} from "../enums";
import {ApiElementDeviation} from "./api_element_deviation";
import { ApiScannedElementTypeMap, isDeviationScanResult } from "./api_scanned_element";

export class ApiDetailedElement<Label extends ApiBuiltStatus = ApiBuiltStatus> extends ApiPlannedElement {
  constructor(detailedElement: Partial<ApiDetailedElement<Label>> = {}) {
    super(detailedElement);
    this.scanResult = detailedElement.scanResult;
    if (isDeviationScanResult(this.scanResult)) {
      this.scanResult.deviation = {...new ApiElementDeviation(this.scanResult.deviation)};
    }
  }

  scanResult?: ApiScannedElementTypeMap[Label];
}

export default ApiDetailedElement;