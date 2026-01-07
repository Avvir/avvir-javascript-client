import addInstantGetterAndSetterToApiModel from "../../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../../mixins/add_read_only_properties_to_model";

import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiPhotoSessionArgument = ModifyPartial<ApiPhotoSession, {
  sessionDate?: DateLike,
  deletedAt?: DateLike
}>

export class ApiPhotoSession {
  constructor({ id, photoAreaId, sessionDate, deletedAt, externalId }: ApiPhotoSessionArgument = {}) {
    addReadOnlyPropertiesToModel(this, { id, photoAreaId });
    addInstantGetterAndSetterToApiModel(this, "sessionDate", sessionDate);
    addInstantGetterAndSetterToApiModel(this, "deletedAt", deletedAt);
    addInstantGetterAndSetterToApiModel(this, "createdAt", deletedAt);
    this.externalId = externalId;
  }

  readonly id: number;
  readonly photoAreaId: number;
  readonly sessionDate: number;
  readonly deletedAt: number;
  readonly createdAt: number;
  externalId: string;
}

export default ApiPhotoSession;
