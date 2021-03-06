import { Matrix4Like } from "type_aliases";
import PhotoProjectionType from "../domain/enums/photo_projection_type";
import ApiCloudFile from "./api_cloud_file";

export default class ApiPhotoLocation {
  readonly id: number;
  readonly photoAreaId: number;
  readonly photoSessionId?: number;
  readonly file: ApiCloudFile;
  minimapX: number;
  minimapY: number;
  minimapBearing: number;
  projectionType: PhotoProjectionType;
  cameraWorldMatrix: Matrix4Like;
}
