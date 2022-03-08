import { ApiPhotoSessionArgs } from "../../api";
import addReadOnlyPropertiesToModel from "../../../mixins/add_read_only_properties_to_model";
import addDateGetterAndSetterToDomainModel from "../../../mixins/add_date_getter_and_setter_to_domain_model";

export class PhotoSession {
  constructor({ id, photoAreaId, sessionDate }: ApiPhotoSessionArgs = {}) {
    addReadOnlyPropertiesToModel(this, { id, photoAreaId });
    addDateGetterAndSetterToDomainModel(this, "sessionDate", sessionDate);
  }

  readonly id: number;
  readonly photoAreaId: number;
  readonly sessionDate: Date;
}
