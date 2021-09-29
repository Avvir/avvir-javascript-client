export declare const IN_PLACE = "IN_PLACE";
export declare const NOT_BUILT = "NOT_BUILT";
export declare const INSUFFICIENT_DATA = "INSUFFICIENT_DATA";
export declare const DEVIATED = "DEVIATED";
export declare const DEVIATED_WITHIN_TOLERANCE = "DEVIATED_WITHIN_TOLERANCE";
export declare type ScanLabelValues = typeof IN_PLACE | typeof NOT_BUILT | typeof INSUFFICIENT_DATA | typeof DEVIATED | typeof DEVIATED_WITHIN_TOLERANCE;
export declare type ApiScanLabels = typeof DEVIATED | typeof IN_PLACE | typeof INSUFFICIENT_DATA | typeof NOT_BUILT;
declare const ScanLabel: {
    DEVIATED: string;
    DEVIATED_WITHIN_TOLERANCE: string;
    IN_PLACE: string;
    INSUFFICIENT_DATA: string;
    NOT_BUILT: string;
};
export default ScanLabel;
