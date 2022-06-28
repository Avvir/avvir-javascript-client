import {ApiIntegrationCredentials} from "../models/api/api_integration_credentials";
import Http from "../utilities/http";
import {AssociationIds} from "type_aliases";
import {ApiIntegrationCredentialsType, User} from "../models";
import makeErrorsPretty from "../utilities/make_errors_pretty";

export default class IntegrationsApi {

  static getIntegrationCredentials({organizationId, projectId}: AssociationIds, credentialType: ApiIntegrationCredentialsType, user: User): Promise<ApiIntegrationCredentials> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialType}`;
    return Http.get(url, user) as unknown as Promise<ApiIntegrationCredentials>;
  }

  static saveIntegrationCredentials({organizationId, projectId}: AssociationIds, credentials: ApiIntegrationCredentials, user: User): Promise<ApiIntegrationCredentials> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentials.credentialsType}`;
    return Http.put(url, user, credentials) as unknown as Promise<ApiIntegrationCredentials>;
  }

}

makeErrorsPretty(IntegrationsApi);
