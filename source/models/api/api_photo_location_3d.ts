import {Vector3Like, Vector4Like} from "type_aliases";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

export type ApiPhotoLocationProperties = {
  id: number,
  position: Vector3Like,
  orientation: Vector4Like
}

export class ApiPhotoLocation3d {
  readonly id: number;
  position: Vector3Like;
  orientation: Vector4Like;
  constructor({
        id,
        position,
        orientation
      }: ApiPhotoLocationProperties ) {
    addReadOnlyPropertiesToModel(this, { id });
    this.position = position;
    this.orientation = orientation;
  }
}

export default ApiPhotoLocation3d;
