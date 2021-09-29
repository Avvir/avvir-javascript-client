export declare enum ProjectPurposeType {
    OTHER = "other",
    RAW_PROJECT_BIM = "rawProjectBim",
    PROJECT_FOLDER_ZIP = "projectFolderZip"
}
export declare enum FloorPurposeType {
    BIM_IFC = "bimIfc",
    BIM_NWD = "bimNwd",
    GRID_IFC = "gridIfc",
    BIM_MESH_GLB = "bimMeshGlb",
    BIM_MESH_OBJ = "bimMeshObj",
    BIM_TEXTURE_MTL = "bimTextureMtl",
    VIEWER_BIM_MESH_OBJ = "viewerBimMeshObj",
    BIM_MINIMAP = "bimMinimap",
    PLANNED_CLOUD_ZIP = "plannedCloudZip",
    SVF = "svf"
}
export declare enum ScanDatasetPurposeType {
    RAW_SCAN = "rawScan",
    SCANNER_PATH = "scannerPath",
    FLOOR_FLATNESS_TOPO_MAP = "floorFlatnessTopoMap",
    BUILT_NOT_BUILT_BIM_IFC = "builtNotBuiltBimIfc",
    NEEDS_FURTHER_ANALYSIS = "needsFurtherAnalysis",
    PREPROCESSED_SCAN = "preprocessedScan",
    INCLUDED_BIM_IFC = "includedBimIfc",
    POTREE = "potree",
    DOWNSAMPLED_SCAN = "downsampledScan",
    ELEMENT_SNAPSHOT = "elementSnapshot",
    SITE_CUBE_PHOTO = "siteCubePhoto"
}
export declare enum PhotoAreaPurposeType {
    MINIMAP = "minimap",
    THREE_SIXTY_PHOTO = "threeSixtyPhoto"
}
export declare type ProjectTypeKeys = "OTHER" | "RAW_PROJECT_BIM" | "PROJECT_FOLDER_ZIP";
export declare type FloorTypeKeys = "OTHER" | "BIM_IFC" | "BIM_NWD" | "GRID_IFC" | "BIM_MESH_OBJ" | "BIM_TEXTURE_MTL" | "BIM_MESH_GLB" | "BIM_MINIMAP" | "VIEWER_BIM_MESH_OBJ" | "PLANNED_CLOUD_ZIP" | "SVF";
export declare type ScanDatasetTypeKeys = "OTHER" | "RAW_SCAN" | "SCANNER_PATH" | "FLOOR_FLATNESS_TOPO_MAP" | "BUILT_NOT_BUILT_BIM_IFC" | "NEEDS_FURTHER_ANALYSIS" | "PREPROCESSED_SCAN" | "INCLUDED_BIM_IFC" | "POTREE" | "DOWNSAMPLED_SCAN" | "ELEMENT_SNAPSHOT" | "SITE_CUBE_PHOTO";
export declare type PhotoAreaTypeKeys = "OTHER" | "MINIMAP" | "THREE_SIXTY_PHOTO";
export declare type PurposeTypeKeys = ProjectTypeKeys | FloorTypeKeys | ScanDatasetTypeKeys | PhotoAreaTypeKeys;
export declare type PurposeType = ProjectPurposeType | FloorPurposeType | ScanDatasetPurposeType | PhotoAreaPurposeType;
export declare const isPurposeType: (type: any) => type is PurposeType;
export declare const OTHER = ProjectPurposeType.OTHER;
export declare const RAW_PROJECT_BIM = ProjectPurposeType.RAW_PROJECT_BIM;
export declare const PROJECT_FOLDER_ZIP = ProjectPurposeType.PROJECT_FOLDER_ZIP;
export declare const RAW_SCAN = ScanDatasetPurposeType.RAW_SCAN;
export declare const SCANNER_PATH = ScanDatasetPurposeType.SCANNER_PATH;
export declare const FLOOR_FLATNESS_TOPO_MAP = ScanDatasetPurposeType.FLOOR_FLATNESS_TOPO_MAP;
export declare const BUILT_NOT_BUILT_BIM_IFC = ScanDatasetPurposeType.BUILT_NOT_BUILT_BIM_IFC;
export declare const NEEDS_FURTHER_ANALYSIS = ScanDatasetPurposeType.NEEDS_FURTHER_ANALYSIS;
export declare const PREPROCESSED_SCAN = ScanDatasetPurposeType.PREPROCESSED_SCAN;
export declare const INCLUDED_BIM_IFC = ScanDatasetPurposeType.INCLUDED_BIM_IFC;
export declare const POTREE = ScanDatasetPurposeType.POTREE;
export declare const BIM_IFC = FloorPurposeType.BIM_IFC;
export declare const BIM_NWD = FloorPurposeType.BIM_NWD;
export declare const GRID_IFC = FloorPurposeType.GRID_IFC;
export declare const BIM_MESH_GLB = FloorPurposeType.BIM_MESH_GLB;
export declare const BIM_MESH_OBJ = FloorPurposeType.BIM_MESH_OBJ;
export declare const BIM_TEXTURE_MTL = FloorPurposeType.BIM_TEXTURE_MTL;
export declare const VIEWER_BIM_MESH_OBJ = FloorPurposeType.VIEWER_BIM_MESH_OBJ;
export declare const PLANNED_CLOUD_ZIP = FloorPurposeType.PLANNED_CLOUD_ZIP;
export declare const SVF = FloorPurposeType.SVF;
export declare const MINIMAP = PhotoAreaPurposeType.MINIMAP;
export declare const THREE_SIXTY_PHOTO = PhotoAreaPurposeType.THREE_SIXTY_PHOTO;
export declare type UploadHistoryPurposeTypes = typeof RAW_SCAN | typeof OTHER;
export declare const uploadHistoryPurposeTypes: (ProjectPurposeType | ScanDatasetPurposeType)[];
export declare const floorPurposeTypes: FloorPurposeType[];
declare const _default: never;
export default _default;
