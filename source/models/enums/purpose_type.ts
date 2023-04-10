// noinspection JSUnusedGlobalSymbols,JSDeprecatedSymbols

import {
  ApiFloorTypeKeys,
  ApiPhotoAreaTypeKeys,
  ApiProjectTypeKeys,
  ApiScanDatasetTypeKeys
} from "../api";

/** @deprecated use ApiProjectPurposeType */
export enum ProjectPurposeType {
  OTHER = "other",
  RAW_PROJECT_BIM = "rawProjectBim",
  PROJECT_FOLDER_ZIP = "projectFolderZip",
  PROJECT_AREAS_NWD = "projectAreasNwd",
  PROJECT_AREAS_IFC = "projectAreasIfc",
  PROJECT_AREAS_SVF = "projectAreasSvf",
  PROJECT_EXPORT_REPORT = "projectExportReport"
}

/** @deprecated use ApiFloorPurposeType */
export enum FloorPurposeType {
  OTHER = "other",
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

/** @deprecated use ApiScanDatasetPurposeType */
export enum ScanDatasetPurposeType {
  OTHER = "other",
  /** @deprecated Raw scans are no longer supported. */
  RAW_SCAN = "rawScan",
  SCANNER_PATH = "scannerPath",
  FLOOR_FLATNESS_TOPO_MAP = "floorFlatnessTopoMap",
  BUILT_NOT_BUILT_BIM_IFC = "builtNotBuiltBimIfc",
  NEEDS_FURTHER_ANALYSIS = "needsFurtherAnalysis",
  PREPROCESSED_SCAN = "preprocessedScan",
  PREPROCESSED_SCAN_E57 = "preprocessedScanE57",
  INCLUDED_BIM_IFC = "includedBimIfc",
  POTREE = "potree",
  /** @deprecated use ingest scan instead*/
  DOWNSAMPLED_SCAN = "downsampledScan",
  INGESTED_SCAN = "ingestedScan",
  ELEMENT_SNAPSHOT = "elementSnapshot",
  SITE_CUBE_PHOTO = "siteCubePhoto",
  DEVIATIONS_SCAN_BCF = "deviationsScanBcf"
}

/** @deprecated use ApiPhotoAreaPurposeType */
export enum PhotoAreaPurposeType {
  OTHER = "other",
  MINIMAP = "minimap",
  THREE_SIXTY_PHOTO = "threeSixtyPhoto"
}

/** @deprecated use ApiProjectTypeKeys */
export type ProjectTypeKeys = ApiProjectTypeKeys;

/** @deprecated use ApiFloorTypeKeys */
export type FloorTypeKeys = ApiFloorTypeKeys;

/** @deprecated use ApiScanDatasetTypeKeys */
export type ScanDatasetTypeKeys = ApiScanDatasetTypeKeys;

/** @deprecated use ApiPhotoAreaTypeKeys */
export type PhotoAreaTypeKeys = ApiPhotoAreaTypeKeys;

/** @deprecated use ApiPurposeTypeKeys */
export type PurposeTypeKeys = ProjectTypeKeys | FloorTypeKeys | ScanDatasetTypeKeys | PhotoAreaTypeKeys;

/** @deprecated use ApiPurposeType */
export type PurposeType = ProjectPurposeType | FloorPurposeType | ScanDatasetPurposeType | PhotoAreaPurposeType;
type ProjectTypeMap = { [type in ProjectTypeKeys]: ProjectPurposeType };
type FloorTypeMap = { [type in FloorTypeKeys]: FloorPurposeType };
type ScanDatasetTypeMap = { [type in ScanDatasetTypeKeys]: ScanDatasetPurposeType };
type PhotoAreaTypeMap = { [type in PhotoAreaTypeKeys]: PhotoAreaPurposeType };

/** @deprecated */
export const PurposeTypeMap: ProjectTypeMap & Omit<FloorTypeMap, "OTHER"> & Omit<ScanDatasetTypeMap, "OTHER"> & Omit<PhotoAreaTypeMap, "OTHER"> = {
  MINIMAP: PhotoAreaPurposeType.MINIMAP,
  THREE_SIXTY_PHOTO: PhotoAreaPurposeType.THREE_SIXTY_PHOTO,

  /** @deprecated */
  RAW_SCAN: ScanDatasetPurposeType.RAW_SCAN,

  SCANNER_PATH: ScanDatasetPurposeType.SCANNER_PATH,
  FLOOR_FLATNESS_TOPO_MAP: ScanDatasetPurposeType.FLOOR_FLATNESS_TOPO_MAP,
  BUILT_NOT_BUILT_BIM_IFC: ScanDatasetPurposeType.BUILT_NOT_BUILT_BIM_IFC,
  NEEDS_FURTHER_ANALYSIS: ScanDatasetPurposeType.NEEDS_FURTHER_ANALYSIS,
  PREPROCESSED_SCAN: ScanDatasetPurposeType.PREPROCESSED_SCAN,
  PREPROCESSED_SCAN_E57: ScanDatasetPurposeType.PREPROCESSED_SCAN_E57,
  INCLUDED_BIM_IFC: ScanDatasetPurposeType.INCLUDED_BIM_IFC,
  POTREE: ScanDatasetPurposeType.POTREE,
  /** @deprecated use ingest scan instead*/
  DOWNSAMPLED_SCAN: ScanDatasetPurposeType.DOWNSAMPLED_SCAN,
  INGESTED_SCAN: ScanDatasetPurposeType.INGESTED_SCAN,
  ELEMENT_SNAPSHOT: ScanDatasetPurposeType.ELEMENT_SNAPSHOT,
  SITE_CUBE_PHOTO: ScanDatasetPurposeType.SITE_CUBE_PHOTO,
  DEVIATIONS_SCAN_BCF: ScanDatasetPurposeType.DEVIATIONS_SCAN_BCF,

  BIM_IFC: FloorPurposeType.BIM_IFC,
  BIM_NWD: FloorPurposeType.BIM_NWD,
  GRID_IFC: FloorPurposeType.GRID_IFC,
  BIM_MESH_GLB: FloorPurposeType.BIM_MESH_GLB,
  BIM_MESH_OBJ: FloorPurposeType.BIM_MESH_OBJ,
  BIM_TEXTURE_MTL: FloorPurposeType.BIM_TEXTURE_MTL,
  VIEWER_BIM_MESH_OBJ: FloorPurposeType.VIEWER_BIM_MESH_OBJ,
  BIM_MINIMAP: FloorPurposeType.BIM_MINIMAP,
  PLANNED_CLOUD_ZIP: FloorPurposeType.PLANNED_CLOUD_ZIP,
  SVF: FloorPurposeType.SVF,

  OTHER: ProjectPurposeType.OTHER,
  RAW_PROJECT_BIM: ProjectPurposeType.RAW_PROJECT_BIM,
  PROJECT_FOLDER_ZIP: ProjectPurposeType.PROJECT_FOLDER_ZIP,
  PROJECT_AREAS_NWD: ProjectPurposeType.PROJECT_AREAS_NWD,
  PROJECT_AREAS_IFC: ProjectPurposeType.PROJECT_AREAS_IFC,
  PROJECT_AREAS_SVF: ProjectPurposeType.PROJECT_AREAS_SVF,
  PROJECT_EXPORT_REPORT: ProjectPurposeType.PROJECT_EXPORT_REPORT,
};

/** @deprecated use isApiPurposeType */
export const isPurposeType = (type: any): type is PurposeType => Object.values(PurposeTypeMap)
    .some(purposeType => type === purposeType);

export const OTHER = ProjectPurposeType.OTHER;
export const RAW_PROJECT_BIM = ProjectPurposeType.RAW_PROJECT_BIM;
export const PROJECT_FOLDER_ZIP = ProjectPurposeType.PROJECT_FOLDER_ZIP;

/** @deprecated */
export const RAW_SCAN = ScanDatasetPurposeType.RAW_SCAN;
export const SCANNER_PATH = ScanDatasetPurposeType.SCANNER_PATH;
export const FLOOR_FLATNESS_TOPO_MAP = ScanDatasetPurposeType.FLOOR_FLATNESS_TOPO_MAP;
export const BUILT_NOT_BUILT_BIM_IFC = ScanDatasetPurposeType.BUILT_NOT_BUILT_BIM_IFC;
export const NEEDS_FURTHER_ANALYSIS = ScanDatasetPurposeType.NEEDS_FURTHER_ANALYSIS;
export const PREPROCESSED_SCAN = ScanDatasetPurposeType.PREPROCESSED_SCAN;
export const PREPROCESSED_SCAN_E57 = ScanDatasetPurposeType.PREPROCESSED_SCAN_E57;
export const INCLUDED_BIM_IFC = ScanDatasetPurposeType.INCLUDED_BIM_IFC;
export const POTREE = ScanDatasetPurposeType.POTREE;

export const BIM_IFC = FloorPurposeType.BIM_IFC;
export const BIM_NWD = FloorPurposeType.BIM_NWD;
export const GRID_IFC = FloorPurposeType.GRID_IFC;
export const BIM_MESH_GLB = FloorPurposeType.BIM_MESH_GLB;
export const BIM_MESH_OBJ = FloorPurposeType.BIM_MESH_OBJ;
export const BIM_TEXTURE_MTL = FloorPurposeType.BIM_TEXTURE_MTL;
export const BIM_MINIMAP = FloorPurposeType.BIM_MINIMAP;
export const VIEWER_BIM_MESH_OBJ = FloorPurposeType.VIEWER_BIM_MESH_OBJ;
export const PLANNED_CLOUD_ZIP = FloorPurposeType.PLANNED_CLOUD_ZIP;
export const SVF = FloorPurposeType.SVF;

export const MINIMAP = PhotoAreaPurposeType.MINIMAP;
export const THREE_SIXTY_PHOTO = PhotoAreaPurposeType.THREE_SIXTY_PHOTO;

/** @deprecated */
export type UploadHistoryPurposeTypes = typeof RAW_SCAN | typeof OTHER;

/** @deprecated */
export const uploadHistoryPurposeTypes = [
  RAW_SCAN,
  OTHER
];

/** @deprecated */
export const floorPurposeTypes = [
  BIM_IFC,
  BIM_NWD,
  GRID_IFC,
  BIM_MESH_GLB,
  BIM_MESH_OBJ,
  BIM_TEXTURE_MTL,
  BIM_MINIMAP,
  VIEWER_BIM_MESH_OBJ,
  PLANNED_CLOUD_ZIP,
  SVF,
];

/** @deprecated */
export default PurposeTypeMap as ProjectTypeMap & FloorTypeMap & ScanDatasetTypeMap & PhotoAreaTypeMap;
