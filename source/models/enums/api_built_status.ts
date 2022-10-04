export enum ApiBuiltStatus {
  DEVIATED = "DEVIATED",
  IN_PLACE = "IN_PLACE",
  NOT_BUILT = "NOT_BUILT"
}

export const IN_PLACE = ApiBuiltStatus.IN_PLACE;
export const NOT_BUILT = ApiBuiltStatus.NOT_BUILT;
export const DEVIATED = ApiBuiltStatus.DEVIATED;

export default ApiBuiltStatus;
