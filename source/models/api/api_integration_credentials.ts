import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import {DateLike, ModifyPartial} from "type_aliases";
import {ApiIntegrationCredentialsType} from "../enums";

export type ApiIntegrationCredentialsArgs = ModifyPartial<ApiIntegrationCredentials, {
  createdAt?: DateLike,
  modifiedAt?: DateLike
}>;

export class ApiIntegrationCredentials {
  constructor({
                id,
                username,
                password,
                createdAt,
                modifiedAt,
                credentialsType,
                firebaseOrganizationId,
                firebaseProjectId,
                authorId,
                encryptedCredentials
              }: ApiIntegrationCredentialsArgs) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.credentialsType = credentialsType;
    this.firebaseOrganizationId = firebaseOrganizationId;
    this.firebaseProjectId = firebaseProjectId;
    this.authorId = authorId;
    this.encryptedCredentials = encryptedCredentials;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    addInstantGetterAndSetterToApiModel(this, "modifiedAt", modifiedAt);
  }

  id?: number;
  username?: string;
  password?: string;
  authorId?: number;
  createdAt: number;
  modifiedAt?: number;
  credentialsType: ApiIntegrationCredentialsType;
  firebaseOrganizationId?: string;
  firebaseProjectId?: string;
  encryptedCredentials?: string;
}
