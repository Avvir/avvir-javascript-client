import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import { ApiQuaternion } from "./api_quaternion";

import type { Vector3Like, Vector4Like } from "type_aliases";

/**
 * @deprecated See ApiPhotoLocation3d (./api_photo_location_3d.ts)
 */
export type ApiCloudFileLocationId = {
  id: number,
  position: Vector3Like,
  orientation: ApiQuaternion
}

export type ApiCloudFileLocation3dArgument = {
  id: number,
  position: Vector3Like,
  orientation: Vector4Like
}

export class ApiCloudFileLocation3d {
  readonly id: number;
  position: Vector3Like;
  orientation: ApiQuaternion;
  constructor({
        id,
        position,
        orientation
      }: ApiCloudFileLocation3dArgument ) {
    addReadOnlyPropertiesToModel(this, { id });
    this.position = position;
    this.orientation = ApiQuaternion.create(orientation);
  }
}

export default ApiCloudFileLocation3d;
