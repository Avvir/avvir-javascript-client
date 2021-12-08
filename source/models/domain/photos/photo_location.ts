import { Matrix4, Vector2 } from "three";
import _ from "underscore";

import addReadOnlyPropertiesToModel from "../../../mixins/add_read_only_properties_to_model";
import ApiPhotoLocation from "../../api/api_photo_location";
import Matrix4Converter from "../../../converters/matrix_4_converter";
import PhotoProjectionType from "../../enums/photo_projection_type";
import { Matrix4Like, Modify, Vector2Like } from "type_aliases";
import ApiMatrix4 from "../../api/api_matrix_4";

export interface PhotoLocationArgument extends Partial<Modify<PhotoLocation, {
  cameraWorldMatrix?: Matrix4Like,
  minimapCoordinates?: Vector2Like
}>> {}

export class PhotoLocation {
  constructor({
    id,
    photoAreaId,
    photoSessionId,
    fileId,
    minimapCoordinates,
    minimapBearing,
    projectionType,
    cameraWorldMatrix,
    yawOffset,
  }: PhotoLocationArgument = {}) {
    addReadOnlyPropertiesToModel(this, { id, photoAreaId, photoSessionId, fileId });
    if (minimapCoordinates) {
      this.minimapCoordinates = new Vector2(minimapCoordinates.x, minimapCoordinates.y);
    }
    this.minimapBearing = minimapBearing;
    let cameraWorldMatrixVal;
    Object.defineProperties(this, {
      cameraWorldMatrix: {
        get() {
          return cameraWorldMatrixVal;
        },
        set(val: Matrix4 | string | ApiMatrix4) {
          if (typeof val === "string") {
            cameraWorldMatrixVal = Matrix4Converter.fromStringToMatrix4(val);
          } else if (val instanceof Matrix4) {
            cameraWorldMatrixVal = val;
          } else {
            cameraWorldMatrixVal = Matrix4Converter.fromApiMatrixToMatrix4(val);
          }
        },
        enumerable: true
      }
    });
    // @ts-ignore
    this.cameraWorldMatrix = cameraWorldMatrix;
    this.projectionType = projectionType;
    this.yawOffset = yawOffset;
  }

  readonly id: number;
  readonly photoAreaId: number;
  readonly photoSessionId?: number;
  readonly fileId: number;
  minimapCoordinates: Vector2;
  minimapBearing: number;
  projectionType: PhotoProjectionType;
  cameraWorldMatrix: Matrix4;
  yawOffset: number = 0;

  static fromApi = (apiPhotoLocation: ApiPhotoLocation) => {
    return new PhotoLocation({
      ..._.omit(apiPhotoLocation, "minimapX", "minimapY", "file"),
      fileId: apiPhotoLocation.file.id,
      minimapCoordinates: {
        x: apiPhotoLocation.minimapX,
        y: apiPhotoLocation.minimapY
      }
    });
  };
}

export default PhotoLocation;