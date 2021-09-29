import { ApiPhotoSessionArgs } from "../../api/api_photo_session";
export default class PhotoSession {
    constructor({ id, photoAreaId, sessionDate }?: ApiPhotoSessionArgs);
    readonly id: number;
    readonly photoAreaId: number;
    readonly sessionDate: Date;
}
