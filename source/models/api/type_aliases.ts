import {Matrix3, Matrix4, Quaternion} from "three";
import {Moment} from "moment";
import ApiMatrix3 from "./api_matrix_3";
import ApiMatrix4 from "./api_matrix_4";
import {ApiQuaternion} from "./api_quaternion";

export type AssociationIds = {
  accountId?: string,
  commentThreadId?: number,
  commentId?: number,
  organizationId?: string,
  projectId?: string
  integrationProjectId?: number,
  floorId?: string
  scanDatasetId?: string,
  globalId?: string,
  photoAreaId?: number,
  photoSessionId?: number | number[],
  photoLocationId?: number,
  viewId?: number,
  wbsCode?: string
  groupId?: number
};

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;
export type Modify<T, R> = Omit<T, keyof R> & R
export type ModifyPartial<T, R> = Partial<Omit<T, keyof R> & R>

export type DateLike = Moment | Date | number | string | null;
export type Vector2Like = { x: number, y: number };
export type Vector3Like = { x: number, y: number, z: number };
export type Vector4Like = ApiQuaternion | Quaternion | null;
export type Matrix3Like = ApiMatrix3 | Matrix3 | null
export type Matrix4Like = ApiMatrix4 | Matrix4 | null

export interface FileLike extends Partial<File> {
  path?: string,
  name: string,
  lastModifiedDate?: Date,
  lastModified?: number
}
