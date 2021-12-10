export enum EventType {
  ELEMENTS_STATUSES_UPDATED = "elements_statuses_updated",
  API_FAILURE = "api_failure",
  UPLOAD_FAILED = "upload_failed"
}

export const ELEMENTS_STATUSES_UPDATED = EventType.ELEMENTS_STATUSES_UPDATED;
export const API_FAILURE = EventType.API_FAILURE;
export const UPLOAD_FAILED = EventType.UPLOAD_FAILED;

export default EventType;
