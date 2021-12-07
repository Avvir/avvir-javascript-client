export enum InspectionMode {
    qualityControlBimLegacy = "qualityControlBimLegacy",
    qualityControlBim = "qualityControlBim",
    fullBim = "fullBim",
    monitorBim = "monitorBim"
}

export type ApiInspectionModes = "LEGACY_INSPECT" | "INSPECT" | "PROGRESS" | "FULL_BIM";

export const qualityControlBimLegacy = InspectionMode.qualityControlBimLegacy;
export const qualityControlBim = InspectionMode.qualityControlBim;
export const fullBim = InspectionMode.fullBim;
export const monitorBim = InspectionMode.monitorBim;

const inspectionModes: Array<{ displayName: string, value: InspectionMode }> = [
    { displayName: "Avvir Inspect (Legacy)", value: qualityControlBimLegacy },
    { displayName: "Avvir Inspect", value: qualityControlBim },
    { displayName: "Basic BIM", value: fullBim },
    { displayName: "Avvir Progress", value: monitorBim },
];

export default inspectionModes;
