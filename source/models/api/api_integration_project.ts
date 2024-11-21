import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";

import type { DateLike, ModifyPartial } from "./type_aliases";

export type ApiIntegrationProjectArgument = ModifyPartial<ApiIntegrationProject, {
  createdAt?: DateLike,
  modifiedAt?: DateLike
}>;

export class ApiIntegrationProject {
  constructor({
                id,
                createdAt,
                modifiedAt,
                integrationCredentialsId,
                externalId,
                externalName
              }: ApiIntegrationProjectArgument)
  {
    this.id = id;
    this.integrationCredentialsId = integrationCredentialsId;
    this.externalId = externalId;
    this.externalName = externalName;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    addInstantGetterAndSetterToApiModel(this, "modifiedAt", modifiedAt);
  }

  id?: number;
  createdAt: number;
  modifiedAt?: number;
  integrationCredentialsId: number;
  externalId: string;
  externalName: string;
}
