import addReadOnlyPropertiesToModel from "../../services/utilities/mixins/add_read_only_properties_to_model";

export default class ApiPhotoArea {
  constructor({ name, id, firebaseProjectId, structionsiteProjectUrl }: Partial<ApiPhotoArea>) {
    addReadOnlyPropertiesToModel(this, { id, firebaseProjectId });
    this.name = name;
    this.structionsiteProjectUrl = structionsiteProjectUrl;
  }

  readonly id: number;
  readonly firebaseProjectId: string;
  name: string;
  structionsiteProjectUrl: string;
}
