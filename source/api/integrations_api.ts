import {ApiIntegrationCredentials, ApiIntegrationProject, ApiRunningProcess} from "../models";
import Http from "../utilities/http";
import {AssociationIds} from "type_aliases";
import {ApiIntegrationCredentialsType, User} from "../models";
import makeErrorsPretty from "../utilities/make_errors_pretty";

export default class IntegrationsApi {

  static getIntegrationCredentials({organizationId, projectId}: AssociationIds, credentialType: ApiIntegrationCredentialsType, user: User): Promise<ApiIntegrationCredentials> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialType}`;
    return Http.get(url, user) as unknown as Promise<ApiIntegrationCredentials>;
  }

  static getIntegrationProjectsForCredentials({organizationId, projectId}: AssociationIds, credentialType: ApiIntegrationCredentialsType, user: User): Promise<ApiIntegrationProject[]> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialType}/projects`;
    return Http.get(url, user) as unknown as Promise<ApiIntegrationProject[]>;
  }

  static getProjectIntegrationCredentials({organizationId, projectId}: AssociationIds, user: User): Promise<ApiIntegrationCredentials[]> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials`;
    return Http.get(url, user) as unknown as Promise<ApiIntegrationCredentials[]>;
  }

  static saveIntegrationCredentials({organizationId, projectId}: AssociationIds, credentials: ApiIntegrationCredentials, user: User): Promise<ApiIntegrationCredentials> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentials.credentialsType}`;
    return Http.put(url, user, credentials) as unknown as Promise<ApiIntegrationCredentials>;
  }

  static syncIntegrationProjects({organizationId, projectId}: AssociationIds, credentialsType: ApiIntegrationCredentialsType, user: User): Promise<ApiRunningProcess> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialsType}/sync-projects`;
    return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
  }

  static syncIntegrationPhotoAreas({organizationId, projectId}: AssociationIds, credentialsType: ApiIntegrationCredentialsType, user: User): Promise<ApiRunningProcess> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialsType}/sync-photo-areas`;
    return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
  }

  static updateProjectIntegrationProject({organizationId, projectId}: AssociationIds, integrationProjectId: number, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/integration-projects/${integrationProjectId}`;
    return Http.put(url, user) as unknown as Promise<void>;
  }

}

makeErrorsPretty(IntegrationsApi);
