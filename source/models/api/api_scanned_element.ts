import {ApiBuiltStatus} from "../enums";
import {ApiElementDeviation} from "./api_element_deviation";

export class ApiScannedElement<Label extends ApiBuiltStatus> {
  constructor({globalId, scanLabel, deviation, detectedInScan}: Partial<ApiScannedElement<Label>> = {}) {
    this.globalId = globalId;
    this.scanLabel = scanLabel;
    this.deviation = deviation;
    this.detectedInScan = detectedInScan;
  }

  globalId?: string;
  scanLabel?: ApiBuiltStatus;
  deviation?: ApiElementDeviation;
  detectedInScan?: boolean;
}

export type InPlaceScanResult = {
  globalId?: string
  scanLabel: typeof ApiBuiltStatus.IN_PLACE
  deviation?: ApiElementDeviation
  detectedInScan?: boolean
}

export type NotBuiltScanResult = {
  globalId?: string
  scanLabel: typeof ApiBuiltStatus.NOT_BUILT
  deviation?: ApiElementDeviation
  detectedInScan?: boolean
}

export type DeviationScanResult = {
  globalId?: string
  scanLabel: typeof ApiBuiltStatus.DEVIATED
  deviation: ApiElementDeviation
  builtConfidence?: number
  detectedInScan?: boolean
}

export type ApiScannedElementTypeMap = {
  [ApiBuiltStatus.DEVIATED]: DeviationScanResult
  [ApiBuiltStatus.IN_PLACE]: InPlaceScanResult
  [ApiBuiltStatus.NOT_BUILT]: NotBuiltScanResult
}

export type ApiScannedElementType<Label extends ApiBuiltStatus> = ApiScannedElementTypeMap[Label]

export const isDeviationScanResult = (scanResult: ApiScannedElementType<ApiBuiltStatus>): scanResult is DeviationScanResult => {
  return scanResult?.scanLabel === ApiBuiltStatus.DEVIATED;
};

export default ApiScannedElement;
