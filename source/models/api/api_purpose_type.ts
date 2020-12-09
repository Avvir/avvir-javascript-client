import { FloorTypeKeys, ProjectTypeKeys, ScanDatasetTypeKeys, PhotoAreaTypeKeys} from "../domain/enums/purpose_type";

export enum ApiProjectPurposeType {
  OTHER = "OTHER",
  RAW_PROJECT_BIM = "RAW_PROJECT_BIM",
  PROJECT_FOLDER_ZIP = "PROJECT_FOLDER_ZIP",
}


export enum ApiFloorPurposeType {
  BIM_IFC = "BIM_IFC",
  BIM_NWD = "BIM_NWD",
  GRID_IFC = "GRID_IFC",
  BIM_MESH_GLB = "BIM_MESH_GLB",
  BIM_MESH_OBJ = "BIM_MESH_OBJ",
  BIM_TEXTURE_MTL = "BIM_TEXTURE_MTL",
  VIEWER_BIM_MESH_OBJ = "VIEWER_BIM_MESH_OBJ",
  BIM_MINIMAP = "BIM_MINIMAP",
  PLANNED_CLOUD_ZIP = "PLANNED_CLOUD_ZIP",
  SVF = "SVF",
}

export enum ApiScanDatasetPurposeType {
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
  SITE_CUBE_PHOTO = "SITE_CUBE_PHOTO",
}

export enum ApiPhotoAreaPurposeType {
  MINIMAP = "MINIMAP",
  THREE_SIXTY_PHOTO = "THREE_SIXTY_PHOTO"
}

export type ApiPurposeType = ApiProjectPurposeType | ApiFloorPurposeType | ApiScanDatasetPurposeType | ApiPhotoAreaPurposeType
type ApiProjectTypeMap = { [type in ProjectTypeKeys]: ApiProjectPurposeType }
type ApiFloorTypeMap = { [type in FloorTypeKeys]: ApiFloorPurposeType }
type ApiScanDatasetTypeMap = { [type in ScanDatasetTypeKeys]: ApiScanDatasetPurposeType }
type ApiPhotoAreaTypeMap = { [type in PhotoAreaTypeKeys]: ApiPhotoAreaPurposeType }
const ApiPurposeType = {
  RAW_SCAN: ApiScanDatasetPurposeType.RAW_SCAN,
  SCANNER_PATH: ApiScanDatasetPurposeType.SCANNER_PATH,
  FLOOR_FLATNESS_TOPO_MAP: ApiScanDatasetPurposeType.FLOOR_FLATNESS_TOPO_MAP,
  BUILT_NOT_BUILT_BIM_IFC: ApiScanDatasetPurposeType.BUILT_NOT_BUILT_BIM_IFC,
  NEEDS_FURTHER_ANALYSIS: ApiScanDatasetPurposeType.NEEDS_FURTHER_ANALYSIS,
  PREPROCESSED_SCAN: ApiScanDatasetPurposeType.PREPROCESSED_SCAN,
  INCLUDED_BIM_IFC: ApiScanDatasetPurposeType.INCLUDED_BIM_IFC,
  POTREE: ApiScanDatasetPurposeType.POTREE,
  DOWNSAMPLED_SCAN: ApiScanDatasetPurposeType.DOWNSAMPLED_SCAN,
  ELEMENT_SNAPSHOT: ApiScanDatasetPurposeType.ELEMENT_SNAPSHOT,
  SITE_CUBE_PHOTO: ApiScanDatasetPurposeType.SITE_CUBE_PHOTO,

  BIM_IFC: ApiFloorPurposeType.BIM_IFC,
  BIM_NWD: ApiFloorPurposeType.BIM_NWD,
  GRID_IFC: ApiFloorPurposeType.GRID_IFC,
  BIM_MESH_GLB: ApiFloorPurposeType.BIM_MESH_GLB,
  BIM_MESH_OBJ: ApiFloorPurposeType.BIM_MESH_OBJ,
  BIM_TEXTURE_MTL: ApiFloorPurposeType.BIM_TEXTURE_MTL,
  VIEWER_BIM_MESH_OBJ: ApiFloorPurposeType.VIEWER_BIM_MESH_OBJ,
  PLANNED_CLOUD_ZIP: ApiFloorPurposeType.PLANNED_CLOUD_ZIP,
  SVF: ApiFloorPurposeType.SVF,

  OTHER: ApiProjectPurposeType.OTHER,
  RAW_PROJECT_BIM: ApiProjectPurposeType.RAW_PROJECT_BIM,
  PROJECT_FOLDER_ZIP: ApiProjectPurposeType.PROJECT_FOLDER_ZIP,

  MINIMAP: ApiPhotoAreaPurposeType.MINIMAP,
  THREE_SIXTY_PHOTO: ApiPhotoAreaPurposeType.THREE_SIXTY_PHOTO
};

export const isApiPurposeType = (type: any): type is ApiPurposeType => Object.values(ApiPurposeType).includes(type);

export default ApiPurposeType as ApiProjectTypeMap & ApiFloorTypeMap & ApiScanDatasetTypeMap & ApiPhotoAreaTypeMap;
