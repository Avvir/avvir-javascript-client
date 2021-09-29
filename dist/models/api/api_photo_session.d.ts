import { DateLike, ModifyPartial } from "type_aliases";
export declare type ApiPhotoSessionArgs = ModifyPartial<ApiPhotoSession, {
    sessionDate?: DateLike;
}>;
export default class ApiPhotoSession {
    constructor({ id, photoAreaId, sessionDate }?: ApiPhotoSessionArgs);
    readonly id: number;
    readonly photoAreaId: number;
    readonly sessionDate: number;
}
