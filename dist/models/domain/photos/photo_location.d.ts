import { Matrix4, Vector2 } from "three";
import ApiPhotoLocation from "../../api/api_photo_location";
import PhotoProjectionType from "../../enums/photo_projection_type";
import { Matrix4Like, Modify, Vector2Like } from "type_aliases";
interface PhotoLocationArgument extends Partial<Modify<PhotoLocation, {
    cameraWorldMatrix?: Matrix4Like;
    minimapCoordinates?: Vector2Like;
}>> {
}
export default class PhotoLocation {
    constructor({ id, photoAreaId, photoSessionId, fileId, minimapCoordinates, minimapBearing, projectionType, cameraWorldMatrix, yawOffset, }?: PhotoLocationArgument);
    readonly id: number;
    readonly photoAreaId: number;
    readonly photoSessionId?: number;
    readonly fileId: number;
    minimapCoordinates: Vector2;
    minimapBearing: number;
    projectionType: PhotoProjectionType;
    cameraWorldMatrix: Matrix4;
    yawOffset: number;
    static fromApi: (apiPhotoLocation: ApiPhotoLocation) => PhotoLocation;
}
export {};
