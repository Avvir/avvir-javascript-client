import { Matrix3, Matrix4 } from "three";
import { Moment } from "moment";

import { ApiCloudFile, ApiMatrix3, ApiMatrix4, ApiPurposeType } from "../../models";

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;
export type Modify<T, R> = Omit<T, keyof R> & R
export type ModifyPartial<T, R> = Partial<Omit<T, keyof R> & R>

export type DateLike = Moment | Date | number | string | null;
export type Vector2Like = { x: number, y: number };
export type Vector3Like = { x: number, y: number, z: number };
export type Vector4Like = { a: number, b: number, c: number, d: number };
export type Matrix3Like = ApiMatrix3 | Matrix3 | null
export type Matrix4Like = ApiMatrix4 | Matrix4 | null

export interface FileLike extends Partial<File> {
  path?: string,
  name: string,
  lastModifiedDate?: Date,
  lastModified?: number
}

// TODO: Decide if this is worthwhile
// export namespace AssociationIds {
//   export type All = { accountId?: string, projectId?: string, floorId?: string, scanDatasetId?: string, globalId?: string }
//   export type Project = {accountId?: string, projectId: string}
//   export type Floor = {accountId?: string, projectId: string, floorId: string}
//   export type ScanDataset = {accountId?: string, projectId?: string, floorId: string, scanDatasetId: string}
//   export type Element = { projectId?: string, floorId?: string, scanDatasetId?: string, globalId: string }
// }

export type AssociationIds = {
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
  wbsCode?: string,
  groupId?: number,
  recipeId?: number,
  recipeStepId?: number,
  inspectReportId?: number,
  inspectReportEntryId?: number,
};

export type AvvirApiFiles<Type extends ApiPurposeType = ApiPurposeType> = { [purposeType in Type]?: ApiCloudFile | ApiCloudFile[] }
