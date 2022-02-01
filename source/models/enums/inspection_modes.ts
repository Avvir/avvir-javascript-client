export enum ApiInspectionMode {
    basicBim = "FULL_BIM",
    bimPrep = "BIM_PREP",
    inspectLegacy = "LEGACY_INSPECT",
    inspect = "INSPECT",
    progress = "PROGRESS",
}

export type ApiInspectionModes =
    ApiInspectionMode.basicBim |
    ApiInspectionMode.bimPrep |
    ApiInspectionMode.inspect |
    ApiInspectionMode.inspectLegacy |
    ApiInspectionMode.progress;
