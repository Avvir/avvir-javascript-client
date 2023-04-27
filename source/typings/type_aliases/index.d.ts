import { Action } from "redux";
import { Matrix3, Matrix4 } from "three";
import { Moment } from "moment";
import { Action as RoutingAction, Meta, Query } from "redux-first-router";

import ApiCloudFile from "../../models/api/api_cloud_file";
import ApiMatrix4 from "../../models/api/api_matrix_4";
import { PurposeType } from "../../models/domain/enums/purpose_type";
import ApiMatrix3 from "../../models/api/api_matrix_3";

declare type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;
declare type Modify<T, R> = Omit<T, keyof R> & R
declare type ModifyPartial<T, R> = Partial<Omit<T, keyof R> & R>

declare type DateLike = Moment | Date | number | string | null;
declare type Vector2Like = { x: number, y: number };
declare type Vector3Like = { x: number, y: number, z: number };
declare type Vector4Like = { a: number, b: number, c: number, d: number };
declare type Matrix3Like = ApiMatrix3 | Matrix3 | null
declare type Matrix4Like = ApiMatrix4 | Matrix4 | null

declare interface FileLike extends Partial<File> {
  path?: string,
  name: string,
  lastModifiedDate?: Date,
  lastModified?: number
}

// TODO: Decide if this is worthwhile
// declare namespace AssociationIds {
//   declare type All = { accountId?: string, projectId?: string, floorId?: string, scanDatasetId?: string, globalId?: string }
//   declare type Project = {accountId?: string, projectId: string}
//   declare type Floor = {accountId?: string, projectId: string, floorId: string}
//   declare type ScanDataset = {accountId?: string, projectId?: string, floorId: string, scanDatasetId: string}
//   declare type Element = { projectId?: string, floorId?: string, scanDatasetId?: string, globalId: string }
// }

declare type AssociationIds = {
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
};

declare type AvvirApiFiles<Type extends PurposeType = PurposeType> = { [purposeType in Type]?: ApiCloudFile | ApiCloudFile[] }

declare interface AvvirEvent<Type extends string, Payload> extends Action<Type> {
  payload: Payload
}

declare interface AvvirPayloadlessRoutingEvent<Type extends string> extends RoutingAction {
  type: Type
  meta?: Meta
  query?: Query
  navKey?: string | null
}
