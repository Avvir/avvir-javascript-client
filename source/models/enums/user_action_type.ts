export enum UserActionType {
  ELEMENTS_STATUSES_UPDATED = "elements_statuses_updated",
  ELEMENT_CHANGED_TO_IN_PLACE = "element_changed_to_in_place",
  ELEMENT_CHANGED_TO_NOT_BUILT = "element_changed_to_not_built",
  ELEMENT_CHANGED_TO_DEVIATED = "element_changed_to_deviated",
  ELEMENT_CHANGED_TO_CLASH = "element_changed_to_clash",
  ELEMENT_CHANGED_TO_EXCLUDE_FROM_ANALYSIS = "element_changed_to_exclude_from_analysis",
  ELEMENT_CHANGED_TO_INCLUDE_IN_ANALYSIS = "element_changed_to_include_in_analysis"
}

export default UserActionType;