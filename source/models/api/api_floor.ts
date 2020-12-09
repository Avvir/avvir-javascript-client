import addInstantGetterAndSetterToApiModel from "../../services/utilities/mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../services/utilities/mixins/add_read_only_properties_to_model";
import ApiConstructionGrid from "./api_construction_grid";
import { DateLike, Matrix3Like, Modify, Vector2Like } from "type_aliases";
import ApiMatrix3 from "./api_matrix_3";
import { Matrix3 } from "three";
import Matrix3Converter from "../../converters/matrix_3_converter";

interface ApiFloorArgument extends Partial<Modify<ApiFloor, {
  scanDate?: DateLike,
  photoAreaMinimapPixelToBimMinimapPixel?: Matrix3Like;
  bimMinimapToWorld?: Matrix3Like;
}>> {}

export default class ApiFloor {
  constructor({
    id,
    firebaseId,
    ordinal,
    floorNumber,
    defaultFirebaseScanDatasetId,
    firebaseProjectId,
    firebaseScanDatasetIds,
    constructionGrid,
    plannedElementCount,
    scanDate,
    photoAreaId,
    offset,
    photoAreaMinimapPixelToBimMinimapPixel,
    bimMinimapToWorld
  }: ApiFloorArgument = {}) {
    addInstantGetterAndSetterToApiModel(this, "scanDate");
    addReadOnlyPropertiesToModel(this, { id, firebaseId, firebaseProjectId });
    let offsetVal: Vector2Like, photoMinimapToBimMinimapTransformVal: ApiMatrix3, bimMinimapToWorldTransformVal: ApiMatrix3;
    Object.defineProperties(this, {
      offset: {
        get() {
          return offsetVal;
        },
        set(val: Vector2Like) {
          if (val) {
            offsetVal = { x: val.x, y: val.y };
          } else {
            offsetVal = null;
          }
        },
        enumerable: true
      },
      photoAreaMinimapPixelToBimMinimapPixel: {
        get() {
          return photoMinimapToBimMinimapTransformVal;
        },
        set(val: Matrix3Like) {
          if (val instanceof Matrix3) {
            photoMinimapToBimMinimapTransformVal = Matrix3Converter.fromMatrix3ToApiMatrix3(val);
          } else if (val) {
            photoMinimapToBimMinimapTransformVal = val;
          } else {
            photoMinimapToBimMinimapTransformVal = null;
          }
        },
        enumerable: true
      },
      bimMinimapToWorld: {
        get() {
          return bimMinimapToWorldTransformVal;
        },
        set(val: Matrix3Like) {
          if (val instanceof Matrix3) {
            bimMinimapToWorldTransformVal = Matrix3Converter.fromMatrix3ToApiMatrix3(val);
          } else if (val) {
            bimMinimapToWorldTransformVal = val;
          } else {
            bimMinimapToWorldTransformVal = null;
          }
        },
        enumerable: true
      }
    });

    this.ordinal = ordinal;
    this.floorNumber = floorNumber;
    this.defaultFirebaseScanDatasetId = defaultFirebaseScanDatasetId;
    this.firebaseScanDatasetIds = firebaseScanDatasetIds || [];
    this.constructionGrid = constructionGrid || null;
    this.plannedElementCount = plannedElementCount || 0;
    // @ts-ignore
    this.scanDate = scanDate || null;
    this.photoAreaId = photoAreaId;
    this.offset = offset || null;
    // @ts-ignore
    this.photoAreaMinimapPixelToBimMinimapPixel = photoAreaMinimapPixelToBimMinimapPixel || null;
    // @ts-ignore
    this.bimMinimapToWorld = bimMinimapToWorld || null;
  }


  readonly id: number;
  readonly firebaseId: string;
  readonly firebaseProjectId: string;
  ordinal: number;
  floorNumber: string;
  defaultFirebaseScanDatasetId: string;
  firebaseScanDatasetIds: Array<string> = [];
  constructionGrid: ApiConstructionGrid | null = null;
  plannedElementCount: number | null = null;
  scanDate: number | null = null;
  readonly offset: Vector2Like = null;
  photoAreaId: number | null = null;
  photoAreaMinimapPixelToBimMinimapPixel: ApiMatrix3 | null = null;
  bimMinimapToWorld: ApiMatrix3 | null = null;
}
