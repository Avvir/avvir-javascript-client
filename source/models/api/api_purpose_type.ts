export enum ApiProjectPurposeType {
  OTHER = "OTHER",
  RAW_PROJECT_BIM = "RAW_PROJECT_BIM",
  PROJECT_FOLDER_ZIP = "PROJECT_FOLDER_ZIP",
  PROJECT_AREAS_NWD = "PROJECT_AREAS_NWD",
  PROJECT_AREAS_IFC = "PROJECT_AREAS_IFC",
  PROJECT_AREAS_SVF = "PROJECT_AREAS_SVF",
  PROJECT_EXPORT_REPORT = "PROJECT_EXPORT_REPORT",
  PROJECT_REPORT_SCREENSHOT = "PROJECT_REPORT_SCREENSHOT",
  PROJECT_REPORT_MINIMAP = "PROJECT_REPORT_MINIMAP",
  PROJECT_REPORT_ZOOMED_MINIMAP = "PROJECT_REPORT_ZOOMED_MINIMAP",
  IFC_BATCH_ZIP = "IFC_BATCH_ZIP"
}

export type ApiProjectTypeKeys = keyof typeof ApiProjectPurposeType;

export enum ApiFloorPurposeType {
  OTHER = "OTHER",
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

export type ApiFloorTypeKeys = keyof typeof ApiFloorPurposeType;

export enum ApiScanDatasetPurposeType {
  OTHER = "OTHER",
  /** @deprecated Raw scans are no longer supported. */
  RAW_SCAN = "RAW_SCAN",
  SCANNER_PATH = "SCANNER_PATH",
  FLOOR_FLATNESS_TOPO_MAP = "FLOOR_FLATNESS_TOPO_MAP",
  BUILT_NOT_BUILT_BIM_IFC = "BUILT_NOT_BUILT_BIM_IFC",
  NEEDS_FURTHER_ANALYSIS = "NEEDS_FURTHER_ANALYSIS",
  PREPROCESSED_SCAN = "PREPROCESSED_SCAN",
  PREPROCESSED_SCAN_E57 = "PREPROCESSED_SCAN_E57",
  INCLUDED_BIM_IFC = "INCLUDED_BIM_IFC",
  POTREE = "POTREE",
  /** @deprecated use ingest scan instead*/
  DOWNSAMPLED_SCAN = "DOWNSAMPLED_SCAN",
  INGESTED_SCAN = "INGESTED_SCAN",
  ELEMENT_SNAPSHOT = "ELEMENT_SNAPSHOT",
  SITE_CUBE_PHOTO = "SITE_CUBE_PHOTO",
  DEVIATIONS_SCAN_BCF = "DEVIATIONS_SCAN_BCF",
  DEVIATIONS_BIM_IFC = "DEVIATIONS_BIM_IFC",
  NOT_BUILT_IFC = "NOT_BUILT_IFC",
}

export type ApiScanDatasetTypeKeys = keyof typeof ApiScanDatasetPurposeType;

export enum ApiPhotoAreaPurposeType {
  OTHER = "OTHER",
  MINIMAP = "MINIMAP",
  THREE_SIXTY_PHOTO = "THREE_SIXTY_PHOTO"
}

export type ApiPhotoAreaTypeKeys = keyof typeof ApiPhotoAreaPurposeType;

export type ApiPurposeType = ApiProjectPurposeType | ApiFloorPurposeType | ApiScanDatasetPurposeType | ApiPhotoAreaPurposeType
export type ApiPurposeTypeKeys = keyof typeof ApiPurposeType;

export type ApiProjectTypeMap = { [type in ApiProjectTypeKeys]: ApiProjectPurposeType }
export type ApiFloorTypeMap = { [type in ApiFloorTypeKeys]: ApiFloorPurposeType }
export type ApiScanDatasetTypeMap = { [type in ApiScanDatasetTypeKeys]: ApiScanDatasetPurposeType }
export type ApiPhotoAreaTypeMap = { [type in ApiPhotoAreaTypeKeys]: ApiPhotoAreaPurposeType }

// noinspection JSDeprecatedSymbols
const ApiPurposeType = {
  /** @deprecated */
  RAW_SCAN: ApiScanDatasetPurposeType.RAW_SCAN,
  SCANNER_PATH: ApiScanDatasetPurposeType.SCANNER_PATH,
  FLOOR_FLATNESS_TOPO_MAP: ApiScanDatasetPurposeType.FLOOR_FLATNESS_TOPO_MAP,
  BUILT_NOT_BUILT_BIM_IFC: ApiScanDatasetPurposeType.BUILT_NOT_BUILT_BIM_IFC,
  DEVIATIONS_BIM_IFC: ApiScanDatasetPurposeType.DEVIATIONS_BIM_IFC,
  NOT_BUILT_IFC: ApiScanDatasetPurposeType.NOT_BUILT_IFC,
  NEEDS_FURTHER_ANALYSIS: ApiScanDatasetPurposeType.NEEDS_FURTHER_ANALYSIS,
  PREPROCESSED_SCAN: ApiScanDatasetPurposeType.PREPROCESSED_SCAN,
  PREPROCESSED_SCAN_E57: ApiScanDatasetPurposeType.PREPROCESSED_SCAN_E57,
  INCLUDED_BIM_IFC: ApiScanDatasetPurposeType.INCLUDED_BIM_IFC,
  POTREE: ApiScanDatasetPurposeType.POTREE,
  /** @deprecated */
  DOWNSAMPLED_SCAN: ApiScanDatasetPurposeType.DOWNSAMPLED_SCAN,
  INGESTED_SCAN: ApiScanDatasetPurposeType.INGESTED_SCAN,
  ELEMENT_SNAPSHOT: ApiScanDatasetPurposeType.ELEMENT_SNAPSHOT,
  SITE_CUBE_PHOTO: ApiScanDatasetPurposeType.SITE_CUBE_PHOTO,
  DEVIATIONS_SCAN_BCF: ApiScanDatasetPurposeType.DEVIATIONS_SCAN_BCF,

  BIM_IFC: ApiFloorPurposeType.BIM_IFC,
  BIM_NWD: ApiFloorPurposeType.BIM_NWD,
  GRID_IFC: ApiFloorPurposeType.GRID_IFC,
  BIM_MESH_GLB: ApiFloorPurposeType.BIM_MESH_GLB,
  BIM_MESH_OBJ: ApiFloorPurposeType.BIM_MESH_OBJ,
  BIM_TEXTURE_MTL: ApiFloorPurposeType.BIM_TEXTURE_MTL,
  BIM_MINIMAP: ApiFloorPurposeType.BIM_MINIMAP,
  VIEWER_BIM_MESH_OBJ: ApiFloorPurposeType.VIEWER_BIM_MESH_OBJ,
  PLANNED_CLOUD_ZIP: ApiFloorPurposeType.PLANNED_CLOUD_ZIP,
  SVF: ApiFloorPurposeType.SVF,

  OTHER: ApiProjectPurposeType.OTHER,
  RAW_PROJECT_BIM: ApiProjectPurposeType.RAW_PROJECT_BIM,
  PROJECT_FOLDER_ZIP: ApiProjectPurposeType.PROJECT_FOLDER_ZIP,
  PROJECT_AREAS_NWD: ApiProjectPurposeType.PROJECT_AREAS_NWD,
  PROJECT_AREAS_IFC: ApiProjectPurposeType.PROJECT_AREAS_IFC,
  IFC_BATCH_ZIP: ApiProjectPurposeType.IFC_BATCH_ZIP,
  PROJECT_AREAS_SVF: ApiProjectPurposeType.PROJECT_AREAS_SVF,
  PROJECT_EXPORT_REPORT: ApiProjectPurposeType.PROJECT_EXPORT_REPORT,
  PROJECT_REPORT_SCREENSHOT: ApiProjectPurposeType.PROJECT_REPORT_SCREENSHOT,
  PROJECT_REPORT_MINIMAP: ApiProjectPurposeType.PROJECT_REPORT_MINIMAP,
  PROJECT_REPORT_ZOOMED_MINIMAP:  ApiProjectPurposeType.PROJECT_REPORT_ZOOMED_MINIMAP,

  MINIMAP: ApiPhotoAreaPurposeType.MINIMAP,
  THREE_SIXTY_PHOTO: ApiPhotoAreaPurposeType.THREE_SIXTY_PHOTO,
};

const apiPurposeTypeKeys: ApiPurposeTypeKeys[] = Object.values(ApiPurposeType);
const apiFloorPurposeTypeKeys: ApiFloorTypeKeys[] = Object.values(ApiFloorPurposeType);
const apiScanDatasetPurposeTypeKeys: ApiScanDatasetTypeKeys[] = Object.values(ApiScanDatasetPurposeType);
const apiPhotoAreaPurposeTypeKeys: ApiPhotoAreaTypeKeys[] = Object.values(ApiPhotoAreaPurposeType);

export const isApiPurposeType = (type: any): type is ApiPurposeType => apiPurposeTypeKeys.includes(type);
export const isApiFloorPurposeType = (type: any): type is ApiFloorPurposeType => apiFloorPurposeTypeKeys.includes(type);
export const isApiScanDatasetPurposeType = (type: any): type is ApiScanDatasetPurposeType => apiScanDatasetPurposeTypeKeys.includes(type);
export const isApiPhotoAreaPurposeType = (type: any): type is ApiFloorPurposeType => apiPhotoAreaPurposeTypeKeys.includes(type);
