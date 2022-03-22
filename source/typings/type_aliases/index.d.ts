import firebase from "firebase";
import {Action} from "redux";
import {Matrix3, Matrix4} from "three";
import {Moment} from "moment";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action as RoutingAction, Meta, Query} from "redux-first-router";

import ApiCloudFile from "../../models/api/api_cloud_file";
import ApiMatrix4 from "../../models/api/api_matrix_4";
import CloudFile from "../../models/domain/cloud_file";
import ResponseError from "../../models/response_error";
import {PurposeType} from "../../models/domain/enums/purpose_type";
import {OutputParametricSelector} from "reselect";
import {ReduxStore} from "../../services/reducers/root_reducer";
import {SinonSpy, SinonStub} from "sinon";
import ApiMatrix3 from "../../models/api/api_matrix_3";

declare type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;
declare type Modify<T, R> = Omit<T, keyof R> & R
declare type ModifyPartial<T, R> = Partial<Omit<T, keyof R> & R>
declare type Stubbed<T> = { [Key in keyof T]: T[Key] extends Function ? SinonStub : T[Key] }
declare type Spied<T> = { [Key in keyof T]: T[Key] extends Function ? SinonSpy : T[Key] }

declare type DateLike = Moment | Date | number | string | null;
declare type Vector2Like = { x: number, y: number };
declare type Vector3Like = { x: number, y: number, z: number };
declare type Vector4Like = { a: number, b: number, c: number, d: number };
declare type Matrix3Like = ApiMatrix3 | Matrix3 | null
declare type Matrix4Like = ApiMatrix4 | Matrix4 | null
declare type ErrorLike = Error | ResponseError | { message: string }

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

declare interface EventWithTarget<Target extends EventTarget = EventTarget> extends Event {
  target: Target
  currentTarget: Target
}

declare interface AvvirThunkAction<Return, State, Actions extends Action> extends ThunkAction<Return, State, unknown, Actions> {
  (dispatch: ThunkDispatch<State, unknown, Actions>, getState?: () => State): Return
}

declare type AssociationIds = {
  accountId?: string,
  commentThreadId?: number,
  commentId?: number,
  projectId?: string
  floorId?: string
  scanDatasetId?: string,
  globalId?: string,
  photoAreaId?: number,
  photoSessionId?: number,
  photoLocationId?: number,
  viewId?: number
};

declare type FirebaseUploadTask = firebase.storage.UploadTask
declare type FirebaseRef = firebase.storage.Reference
declare type ByFirebaseId<Model> = { [firebaseId: string]: Model }
declare type ByDatabaseId<Model> = { [id: number]: Model }

declare type AvvirFiles<Type extends PurposeType = PurposeType> = { [purposeType in Type]?: CloudFile[] }
declare type AvvirApiFiles<Type extends PurposeType = PurposeType> = { [purposeType in Type]?: ApiCloudFile | ApiCloudFile[] }

export type Dispatch<Event> = ThunkDispatch<ReduxStore, unknown, Event>;

declare interface AvvirEvent<Type extends string, Payload> extends Action<Type> {
  payload: Payload
}

declare interface AvvirPayloadlessRoutingEvent<Type extends string> extends RoutingAction {
  type: Type
  meta?: Meta
  query?: Query
  navKey?: string | null
}

declare interface AvvirRoutingEvent<Type extends string, Payload> extends AvvirPayloadlessRoutingEvent<Type> {
  payload: {
    query?: Query
  } & Payload
}

declare type AvvirErrorEvent<Type extends string, Err extends ErrorLike = ErrorLike> = AvvirEvent<Type, { error: Err }>
declare type EventCreator<Type extends string, Payload> = (...args) => AvvirEvent<Type, Payload>

declare type AvvirSelector<Return, InputSelectorReturns, Props = unknown> = OutputParametricSelector<ReduxStore, Props, Return, (...args: InputSelectorReturns) => Return>

declare interface Constructor<Clazz, Args> {
  new(...args: Args): Clazz
}
