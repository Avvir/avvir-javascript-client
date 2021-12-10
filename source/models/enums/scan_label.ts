export enum ScanLabel {
  DEVIATED= "DEVIATED",
  DEVIATED_WITHIN_TOLERANCE="DEVIATED_WITHIN_TOLERANCE",
  IN_PLACE="IN_PLACE",
  INSUFFICIENT_DATA="INSUFFICIENT_DATA",
  NOT_BUILT="NOT_BUILT"
}

export const IN_PLACE = ScanLabel.IN_PLACE;
export const NOT_BUILT = ScanLabel.NOT_BUILT;
export const INSUFFICIENT_DATA = ScanLabel.INSUFFICIENT_DATA;
export const DEVIATED = ScanLabel.DEVIATED;
export const DEVIATED_WITHIN_TOLERANCE = ScanLabel.DEVIATED_WITHIN_TOLERANCE;

export type ScanLabelValues = typeof IN_PLACE | typeof NOT_BUILT | typeof INSUFFICIENT_DATA | typeof DEVIATED | typeof DEVIATED_WITHIN_TOLERANCE;

export type ApiScanLabels = typeof DEVIATED | typeof IN_PLACE | typeof INSUFFICIENT_DATA | typeof NOT_BUILT

export default ScanLabel;
