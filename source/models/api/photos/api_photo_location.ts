import addInstantGetterAndSetterToApiModel from "../../../mixins/add_instant_getter_and_setter_to_api_model";

import type ApiCloudFile from "../api_cloud_file";
import type ApiPhotoLocation3d from "./api_photo_location_3d";
import type PhotoProjectionType from "../../enums/photo_projection_type";
import type { DateLike, Matrix4Like, ModifyPartial } from "type_aliases";
import type { PhotoRotationType } from "../../enums";

export type ApiPhotoLocationArgument = ModifyPartial<ApiPhotoLocation, {
  createdAt: DateLike,
  updatedAt: DateLike,
  originalTimestamp: DateLike
  deletedAt: DateLike
}>;

export class ApiPhotoLocation {
  constructor({
                id,
                photoAreaId,
                photoSessionId,
                file,
                minimapX,
                minimapY,
                minimapBearing,
                projectionType,
                cameraWorldMatrix,
                bimLocation,
                yawOffset,
                rotationType,
                createdAt,
                updatedAt,
                originalTimestamp,
                deletedAt
              }: ApiPhotoLocationArgument = {})
  {
    this.id = id;
    this.photoAreaId = photoAreaId;
    this.photoSessionId = photoSessionId;
    this.file = file;
    this.minimapX = minimapX;
    this.minimapY = minimapY;
    this.minimapBearing = minimapBearing;
    this.projectionType = projectionType;
    this.cameraWorldMatrix = cameraWorldMatrix;
    this.bimLocation = bimLocation;
    this.yawOffset = yawOffset;
    this.rotationType = rotationType;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    addInstantGetterAndSetterToApiModel(this, "updatedAt", updatedAt);
    addInstantGetterAndSetterToApiModel(this, "originalTimestamp", originalTimestamp);
    addInstantGetterAndSetterToApiModel(this, "deletedAt", deletedAt);
  }

  readonly id: number;
  readonly photoAreaId: number;
  readonly photoSessionId?: number;
  readonly file: ApiCloudFile;
  minimapX: number;
  minimapY: number;
  minimapBearing: number;
  projectionType: PhotoProjectionType;
  cameraWorldMatrix: Matrix4Like;
  bimLocation: ApiPhotoLocation3d;
  yawOffset: number = null;
  rotationType: PhotoRotationType;
  readonly createdAt: number;
  readonly updatedAt?: number;
  readonly originalTimestamp?: number;
  readonly deletedAt?: number;
}

export default ApiPhotoLocation;
