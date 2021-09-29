import { FloorTypeKeys, ProjectTypeKeys, ScanDatasetTypeKeys, PhotoAreaTypeKeys } from "../enums/purpose_type";
export declare enum ApiProjectPurposeType {
    OTHER = "OTHER",
    RAW_PROJECT_BIM = "RAW_PROJECT_BIM",
    PROJECT_FOLDER_ZIP = "PROJECT_FOLDER_ZIP"
}
export declare enum ApiFloorPurposeType {
    BIM_IFC = "BIM_IFC",
    BIM_NWD = "BIM_NWD",
    GRID_IFC = "GRID_IFC",
    BIM_MESH_GLB = "BIM_MESH_GLB",
    BIM_MESH_OBJ = "BIM_MESH_OBJ",
    BIM_TEXTURE_MTL = "BIM_TEXTURE_MTL",
    VIEWER_BIM_MESH_OBJ = "VIEWER_BIM_MESH_OBJ",
    BIM_MINIMAP = "BIM_MINIMAP",
    PLANNED_CLOUD_ZIP = "PLANNED_CLOUD_ZIP",
    SVF = "SVF"
}
export declare enum ApiScanDatasetPurposeType {
    RAW_SCAN = "RAW_SCAN",
    SCANNER_PATH = "SCANNER_PATH",
    FLOOR_FLATNESS_TOPO_MAP = "FLOOR_FLATNESS_TOPO_MAP",
    BUILT_NOT_BUILT_BIM_IFC = "BUILT_NOT_BUILT_BIM_IFC",
    NEEDS_FURTHER_ANALYSIS = "NEEDS_FURTHER_ANALYSIS",
    PREPROCESSED_SCAN = "PREPROCESSED_SCAN",
    INCLUDED_BIM_IFC = "INCLUDED_BIM_IFC",
    POTREE = "POTREE",
    DOWNSAMPLED_SCAN = "DOWNSAMPLED_SCAN",
    ELEMENT_SNAPSHOT = "ELEMENT_SNAPSHOT",
    SITE_CUBE_PHOTO = "SITE_CUBE_PHOTO"
}
export declare enum ApiPhotoAreaPurposeType {
    MINIMAP = "MINIMAP",
    THREE_SIXTY_PHOTO = "THREE_SIXTY_PHOTO"
}
export declare type ApiPurposeType = ApiProjectPurposeType | ApiFloorPurposeType | ApiScanDatasetPurposeType | ApiPhotoAreaPurposeType;
declare type ApiProjectTypeMap = {
    [type in ProjectTypeKeys]: ApiProjectPurposeType;
};
declare type ApiFloorTypeMap = Omit<{
    [type in FloorTypeKeys]: ApiFloorPurposeType;
}, "OTHER">;
declare type ApiScanDatasetTypeMap = Omit<{
    [type in ScanDatasetTypeKeys]: ApiScanDatasetPurposeType;
}, "OTHER">;
declare type ApiPhotoAreaTypeMap = Omit<{
    [type in PhotoAreaTypeKeys]: ApiPhotoAreaPurposeType;
}, "OTHER">;
export declare const isApiPurposeType: (type: any) => type is ApiPurposeType;
declare const _default: ApiProjectTypeMap & ApiFloorTypeMap & ApiScanDatasetTypeMap & ApiPhotoAreaTypeMap;
export default _default;
