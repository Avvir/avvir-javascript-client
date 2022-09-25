import {Vector3Like, Vector4Like} from "./type_aliases";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import {ApiQuaternion} from "./api_quaternion";

export type ApiCloudFileLocationId = {
  id: number,
  position: Vector3Like,
  orientation: ApiQuaternion
}

export type ApiCloudFileLocation3dArguments = {
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
      }: ApiCloudFileLocation3dArguments ) {
    addReadOnlyPropertiesToModel(this, { id });
    this.position = position;
    this.orientation = ApiQuaternion.create(orientation);
  }
}

export default ApiCloudFileLocation3d;
