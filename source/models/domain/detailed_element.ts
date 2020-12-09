import DeviationStatus from "../enums/deviation_status";
import { ApiScanLabels, DEVIATED, IN_PLACE, INSUFFICIENT_DATA, NOT_BUILT } from "../enums/scan_label";
import { UniformatId } from "uniformat";
import { Vector3Like } from "type_aliases";

export class Deviation {
  deviationVectorMeters: Vector3Like;
  deviationMeters: number;
  status: DeviationStatus;

  constructor() {
    this.deviationVectorMeters = { x: 0.0, y: 0.0, z: 0.0 };
    this.deviationMeters = 0;
    this.status = DeviationStatus.DETECTED;
  }
}

type InPlaceScanResult = {
  globalId?: string
  scanLabel: typeof IN_PLACE
}

type InsufficientDataScanResult = {
  globalId?: string
  scanLabel: typeof INSUFFICIENT_DATA
}

type NotBuiltScanResult = {
  globalId?: string
  scanLabel: typeof NOT_BUILT
}

export type DeviationScanResult = {
  globalId?: string
  scanLabel: typeof DEVIATED
  deviation: Deviation
  builtConfidence?: number
}

type ScanResultByScanLabel = {
  [DEVIATED]: DeviationScanResult
  [IN_PLACE]: InPlaceScanResult
  [INSUFFICIENT_DATA]: InsufficientDataScanResult
  [NOT_BUILT]: NotBuiltScanResult
}

export const isDeviationScanResult = (scanResult: ScanResult<ApiScanLabels>): scanResult is DeviationScanResult => {
  return scanResult?.scanLabel === DEVIATED;
};

export type ScanResult<Label extends ApiScanLabels> = ScanResultByScanLabel[Label]

export default class DetailedElement<Label extends ApiScanLabels = ApiScanLabels> {
  constructor(ifcType: string, globalId: string, scanResult: ScanResult<Label>) {
    this.ifcType = ifcType;
    this.globalId = globalId;
    this.scanResult = scanResult;
  }

  ifcType?: string;
  globalId: string;
  scanResult: ScanResultByScanLabel[Label];
  name?: string;
  itemId?: string | null;
  discipline?: string | null;
  uniformat?: UniformatId | null;
  primaryUnitOfMeasurement?: string;
  primaryMeasurement?: number;
  loaded?: boolean;
}

export type DeviatedDetailedElement = DetailedElement<typeof DEVIATED>
