import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import { ApiQuaternion } from "./api_quaternion";

import type { Vector3Like, Vector4Like } from "./type_aliases";

export type ApiPhotoLocationProperties = {
  id: number,
  position: Vector3Like,
  orientation: ApiQuaternion
}

export type ApiPhotoLocation3dArgument = {
  id: number,
  position: Vector3Like,
  orientation: Vector4Like
}

export class ApiPhotoLocation3d {
  readonly id: number;
  position: Vector3Like;
  orientation: ApiQuaternion;

  constructor({
                id,
                position,
                orientation
              }: ApiPhotoLocation3dArgument)
  {
    addReadOnlyPropertiesToModel(this, { id });
    this.position = position;
    this.orientation = ApiQuaternion.create(orientation);
  }
}

export default ApiPhotoLocation3d;
