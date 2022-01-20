import {Matrix4, Quaternion, Vector2, Vector3} from "three";
import _ from "underscore";

import addReadOnlyPropertiesToModel from "../../../mixins/add_read_only_properties_to_model";
import ApiPhotoLocation from "../../api/api_photo_location";
import Matrix4Converter from "../../../converters/matrix_4_converter";
import PhotoProjectionType from "../../enums/photo_projection_type";
import {Matrix4Like, Modify, Vector2Like} from "type_aliases";
import ApiMatrix4 from "../../api/api_matrix_4";
import {PhotoRotationType} from "../../enums";
import {Location3d} from "./location_3d";
import {ApiPhotoLocationProperties} from "../../api";

export interface PhotoLocationArgument extends Partial<Modify<PhotoLocation, {
  cameraWorldMatrix?: Matrix4Like,
  minimapCoordinates?: Vector2Like,
  bimLocation?: ApiPhotoLocationProperties
}>> { }

export class PhotoLocation {
  constructor({
                id,
                photoAreaId,
                photoSessionId,
                fileId,
                minimapCoordinates,
                minimapBearing,
                projectionType,
                rotationType,
                cameraWorldMatrix,
                yawOffset,
                bimLocation
              }: PhotoLocationArgument = {}) {
    addReadOnlyPropertiesToModel(this, {id, photoAreaId, photoSessionId, fileId});
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
    this.rotationType = rotationType;

    if (bimLocation) {
      let position = new Vector3(bimLocation.position.x, bimLocation.position.y, bimLocation.position.z);
      let orientation = new Quaternion(bimLocation.orientation.a, bimLocation.orientation.b, bimLocation.orientation.c, bimLocation.orientation.d)
      this.bimLocation = new Location3d(bimLocation.id, position, orientation);
    }
  }

  readonly id: number;
  readonly photoAreaId: number;
  readonly photoSessionId?: number;
  readonly fileId: number;
  minimapCoordinates: Vector2;
  minimapBearing: number;
  rotationType: PhotoRotationType;
  projectionType: PhotoProjectionType;
  cameraWorldMatrix: Matrix4;
  yawOffset: number = 0;
  bimLocation?: Location3d

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