import { ApiPhotoSessionArgs } from "../../api/api_photo_session";
import addReadOnlyPropertiesToModel from "../../../mixins/add_read_only_properties_to_model";
import addDateGetterAndSetterToDomainModel from "../../../mixins/add_date_getter_and_setter_to_domain_model";

export default class PhotoSession {
  constructor({ id, photoAreaId, sessionDate }: ApiPhotoSessionArgs = {}) {
    addReadOnlyPropertiesToModel(this, { id, photoAreaId });
    addDateGetterAndSetterToDomainModel(this, "sessionDate");
    // @ts-ignore
    this.sessionDate = sessionDate;
  }

  readonly id: number;
  readonly photoAreaId: number;
  readonly sessionDate: Date;
}
