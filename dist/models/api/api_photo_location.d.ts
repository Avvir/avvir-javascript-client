import { Matrix4Like } from "type_aliases";
import PhotoProjectionType from "../enums/photo_projection_type";
import ApiCloudFile from "./api_cloud_file";
import ApiPhotoLocation3d from "./api_photo_location_3d";
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
    bimLocation: ApiPhotoLocation3d;
}
