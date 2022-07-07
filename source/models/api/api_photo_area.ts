import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

export class ApiPhotoArea {
  constructor({ name, id, firebaseProjectId, externalProjectUrl, globalOffsetYaw, integrationProjectId}: Partial<ApiPhotoArea>) {
    addReadOnlyPropertiesToModel(this, { id, firebaseProjectId });
    this.name = name;
    this.externalProjectUrl = externalProjectUrl;
    this.globalOffsetYaw = globalOffsetYaw;
    this.integrationProjectId = integrationProjectId;
  }

  readonly id: number;
  readonly firebaseProjectId: string;
  name: string;
  externalProjectUrl: string;
  globalOffsetYaw?: number;
  integrationProjectId?: number;
}

export default ApiPhotoArea;
