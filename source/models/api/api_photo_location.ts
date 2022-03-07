import {Matrix4Like, DateLike, ModifyPartial} from "type_aliases";
import PhotoProjectionType from "../enums/photo_projection_type";
import ApiCloudFile from "./api_cloud_file";
import ApiPhotoLocation3d from "./api_photo_location_3d";
import {PhotoRotationType} from "../enums";
import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";

export type ApiPhotoLocationArgs = ModifyPartial<ApiPhotoLocation, { createdAt?: DateLike, updatedAt?: DateLike }>;

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
                updatedAt
              }: ApiPhotoLocationArgs = {}) {
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    addInstantGetterAndSetterToApiModel(this, "updatedAt", updatedAt);
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
}

export default ApiPhotoLocation;
