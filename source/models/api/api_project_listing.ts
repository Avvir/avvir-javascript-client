import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import { ApiProjectSettings } from "./api_project_settings";

export class ApiProjectListing {
  constructor({firebaseId, name, settings, archivedAt}) {
    addInstantGetterAndSetterToApiModel(this, "archivedAt");
    addReadOnlyPropertiesToModel(this, { firebaseId, name, settings, archivedAt });
  }

  readonly firebaseId: string;
  readonly name: string;
  readonly settings: ApiProjectSettings;
  readonly archivedAt: number | null = null;
}
export default ApiProjectListing;