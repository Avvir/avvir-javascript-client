import { Matrix3 } from "three";

import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import Matrix3Converter from "../../converters/matrix_3_converter";

import type ApiConstructionGrid from "./api_construction_grid";
import type ApiMatrix3 from "./api_matrix_3";
import type { DateLike, Matrix3Like, ModifyPartial, Vector2Like } from "type_aliases";

export type ApiFloorArgument = ModifyPartial<ApiFloor, {
  scanDate?: DateLike,
  photoAreaMinimapPixelToBimMinimapPixel?: Matrix3Like;
  bimMinimapToWorld?: Matrix3Like;
}>

export class ApiFloor {
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
                plannedElementsExist,
                scanDate,
                scanDateString,
                photoAreaId,
                offset,
                photoAreaMinimapPixelToBimMinimapPixel,
                bimMinimapToWorld,
                floorElevation,
                globalOffsetYaw
              }: ApiFloorArgument = {})
  {
    addReadOnlyPropertiesToModel(this, { id, firebaseId, firebaseProjectId });
    addInstantGetterAndSetterToApiModel(this, "scanDate", scanDate);
    let offsetVal: Vector2Like, photoMinimapToBimMinimapTransformVal: ApiMatrix3,
      bimMinimapToWorldTransformVal: ApiMatrix3;
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
    this.plannedElementsExist = plannedElementsExist || null;
    // @ts-ignore
    this.scanDate = scanDate || null;
    this.scanDateString = scanDateString || null;
    this.photoAreaId = photoAreaId;
    this.offset = offset || null;
    // @ts-ignore
    this.photoAreaMinimapPixelToBimMinimapPixel = photoAreaMinimapPixelToBimMinimapPixel || null;
    // @ts-ignore
    this.bimMinimapToWorld = bimMinimapToWorld || null;
    this.floorElevation = floorElevation || null;
    this.globalOffsetYaw = globalOffsetYaw;
  }

  /**
   * Internal identifier, not used in URLs.
   */
  readonly id: number;

  /**
   * External identifier, suitable for use in URLs.
   */
  readonly firebaseId: string;

  /**
   * External identifier of the project that this area belongs to.
   */
  readonly firebaseProjectId: string;

  /**
   * Ordinal number to sort this area by when showing all of the areas in a project.
   */
  ordinal: number;

  /**
   * The name or title of this area.
   */
  floorNumber: string;

  /**
   * External identifier of the default capture dataset associated with this area.
   */
  defaultFirebaseScanDatasetId: string;

  /**
   * An array of external identifiers of the capture datasets associated with this area.
   */
  firebaseScanDatasetIds: string[];

  constructionGrid: ApiConstructionGrid | null = null;
  plannedElementCount: number | null = null;
  plannedElementsExist: boolean | null = null;
  scanDate: number | null = null;
  scanDateString: string | null = null;
  readonly offset: Vector2Like = null;
  photoAreaId: number | null = null;
  photoAreaMinimapPixelToBimMinimapPixel: ApiMatrix3 | null = null;
  bimMinimapToWorld: ApiMatrix3 | null = null;
  floorElevation: number | null;
  globalOffsetYaw: number | null;
}

export default ApiFloor;
