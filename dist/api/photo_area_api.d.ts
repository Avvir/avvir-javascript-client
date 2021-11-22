import { AssociationIds } from "type_aliases";
import { User } from "../utilities/get_authorization_headers";
import ApiPhotoArea from "../models/api/api_photo_area";
import ApiPhotoLocation from "../models/api/api_photo_location";
import ApiPhotoSession from "../models/api/api_photo_session";
import ApiPhotoLocation3d from "../models/api/api_photo_location_3d";
export default class PhotoAreaApi {
    static listPhotoAreasForProject({ projectId }: AssociationIds, user: User): Promise<ApiPhotoArea[]>;
    static listPhotoLocations({ projectId, photoAreaId, photoSessionId }: AssociationIds, user: User): Promise<ApiPhotoLocation[]>;
    static listPhotoSessionsForPhotoArea({ projectId, photoAreaId }: AssociationIds, user: any): Promise<ApiPhotoSession[]>;
    static updatePhotoLocationPositionAndOrientation({ projectId, photoAreaId, photoLocationId }: AssociationIds, coordinates: ApiPhotoLocation3d, user: any): Promise<ApiPhotoLocation>;
}
