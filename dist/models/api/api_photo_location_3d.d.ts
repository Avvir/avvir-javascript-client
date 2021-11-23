import { Vector3Like, Vector4Like } from "type_aliases";
declare type ApiPhotoLocationProperties = {
    id: number;
    position: Vector3Like;
    orientation: Vector4Like;
};
export default class ApiPhotoLocation3d {
    readonly id: number;
    position: Vector3Like;
    orientation: Vector4Like;
    constructor({ id, position, orientation }: ApiPhotoLocationProperties);
}
export {};
