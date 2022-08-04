import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import { DateLike, ModifyPartial } from "type_aliases";
import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";

export type ApiPhotoSessionArgs = ModifyPartial<ApiPhotoSession, {
  sessionDate?: DateLike,
  deletedAt?: DateLike
}>

export class ApiPhotoSession {
  constructor({ id, photoAreaId, sessionDate, deletedAt }: ApiPhotoSessionArgs = {}) {
    addReadOnlyPropertiesToModel(this, { id, photoAreaId });
    addInstantGetterAndSetterToApiModel(this, "sessionDate", sessionDate);
    addInstantGetterAndSetterToApiModel(this, "deletedAt", deletedAt);
  }

  readonly id: number;
  readonly photoAreaId: number;
  readonly sessionDate: number;
  readonly deletedAt: number;
}

export default ApiPhotoSession;
