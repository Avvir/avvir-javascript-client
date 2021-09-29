const enum DeviationStatus {
  DETECTED = "DETECTED",
  DISMISSED = "DISMISSED",
  INCLUDED = "INCLUDED",
  FIXED = "FIXED"
}

export const DETECTED = DeviationStatus.DETECTED;
export const DISMISSED = DeviationStatus.DISMISSED;
export const INCLUDED = DeviationStatus.INCLUDED;
export const FIXED = DeviationStatus.FIXED;

export default DeviationStatus;
