import DeviationStatus from "../enums/deviation_status";
import { ApiScanLabels, DEVIATED, IN_PLACE, INSUFFICIENT_DATA, NOT_BUILT } from "../enums/scan_label";
import { UniformatId } from "uniformat";
import { Vector3Like } from "type_aliases";
export declare class Deviation {
    deviationVectorMeters: Vector3Like;
    deviationMeters: number;
    status: DeviationStatus;
    constructor();
}
declare type InPlaceScanResult = {
    globalId?: string;
    scanLabel: typeof IN_PLACE;
};
declare type InsufficientDataScanResult = {
    globalId?: string;
    scanLabel: typeof INSUFFICIENT_DATA;
};
declare type NotBuiltScanResult = {
    globalId?: string;
    scanLabel: typeof NOT_BUILT;
};
export declare type DeviationScanResult = {
    globalId?: string;
    scanLabel: typeof DEVIATED;
    deviation: Deviation;
    builtConfidence?: number;
};
declare type ScanResultByScanLabel = {
    [DEVIATED]: DeviationScanResult;
    [IN_PLACE]: InPlaceScanResult;
    [INSUFFICIENT_DATA]: InsufficientDataScanResult;
    [NOT_BUILT]: NotBuiltScanResult;
};
export declare const isDeviationScanResult: (scanResult: ScanResult<ApiScanLabels>) => scanResult is DeviationScanResult;
export declare type ScanResult<Label extends ApiScanLabels> = ScanResultByScanLabel[Label];
export default class DetailedElement<Label extends ApiScanLabels = ApiScanLabels> {
    constructor(ifcType: string, globalId: string, scanResult: ScanResult<Label>);
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
export declare type DeviatedDetailedElement = DetailedElement<typeof DEVIATED>;
export {};
