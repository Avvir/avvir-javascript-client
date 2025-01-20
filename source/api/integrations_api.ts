import {
  ApiIntegrationCredentials,
  ApiIntegrationCredentialsType,
  ApiIntegrationProject,
  ApiRunningProcess,
  AssociationIds,
  User
} from "../models";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {ApiObservationRequest} from "../models/api/api_observation_request";

export default class IntegrationsApi {

  static getIntegrationCredentials({
                                     organizationId,
                                     projectId
                                   }: AssociationIds, credentialType: ApiIntegrationCredentialsType, user: User): Promise<ApiIntegrationCredentials> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialType}`;
    return Http.get(url, user) as unknown as Promise<ApiIntegrationCredentials>;
  }

  static getIntegrationProjectsForCredentials({
                                                organizationId,
                                                projectId
                                              }: AssociationIds, credentialType: ApiIntegrationCredentialsType, user: User): Promise<ApiIntegrationProject[]> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialType}/projects`;
    return Http.get(url, user) as unknown as Promise<ApiIntegrationProject[]>;
  }

  static getProjectIntegrationCredentials({
                                            organizationId,
                                            projectId
                                          }: AssociationIds, user: User): Promise<ApiIntegrationCredentials[]> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials`;
    return Http.get(url, user) as unknown as Promise<ApiIntegrationCredentials[]>;
  }

  static saveIntegrationCredentials({
                                      organizationId,
                                      projectId
                                    }: AssociationIds, credentials: ApiIntegrationCredentials, user: User): Promise<ApiIntegrationCredentials> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentials.credentialsType}`;
    return Http.put(url, user, credentials) as unknown as Promise<ApiIntegrationCredentials>;
  }

  static syncIntegrationProjects({
                                   organizationId,
                                   projectId
                                 }: AssociationIds, credentialsType: ApiIntegrationCredentialsType, user: User): Promise<ApiRunningProcess> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialsType}/sync-projects`;
    return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
  }

  static syncIntegrationPhotoAreas({
                                     organizationId,
                                     projectId
                                   }: AssociationIds, credentialsType: ApiIntegrationCredentialsType, user: User): Promise<ApiRunningProcess> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialsType}/sync-photo-areas`;
    return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
  }

  static updateProjectIntegrationProject({
                                           organizationId,
                                           projectId
                                         }: AssociationIds, integrationProject: ApiIntegrationProject | null, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/set-integration-project`;
    return Http.post(url, user, integrationProject) as unknown as Promise<void>;
  }

    static checkProcoreAccessToken(procoreAccessToken: string,
                                   user: User): Promise<{ expiresInSeconds: number }> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/access-token?procore-access-token=${procoreAccessToken}`;
        return Http.get(url, user) as unknown as Promise<{ expiresInSeconds: number }>;
    }

    static pushPdfToProcore({
                                projectId,
                                floorId,
                                scanDatasetId
                            }: AssociationIds, procoreProjectId: string, procoreCompanyId: string, procoreAccessToken: string, pdfType: string, user: User): Promise<{ id: number }> {
        if (!projectId) {
            return Promise.reject(new Error("Project not loaded yet"));
        }
        const url = `${Http.baseUrl()}/projects/${projectId}/push-report-to-procore/${pdfType}?procore-project-id=${procoreProjectId}&procore-company-id=${procoreCompanyId}&procore-access-token=${procoreAccessToken}`;
        return Http.post(url, user, null) as unknown as Promise<{ id: number }>;
    }

    static getProcoreProjects(procoreAccessToken: string,
                              companyId: string ,
                              user: User): Promise<{ lastUpdated: number, projectId: string | number }[]> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/projects`;
        const params = [];
        params.push(`procore-access-token=${procoreAccessToken}`)
        if (companyId) {
            params.push(`companyId=${companyId}`)
        }
        url += "?" + params.join("&");
        return Http.get(url, user) as unknown as Promise<{ lastUpdated: number, projectId: string | number }[]>;
    }

    static getProcoreCompanies(procoreAccessToken: string,
                               user: User): Promise<{ name: string, id: string | number }[]> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/companies?procore-access-token=${procoreAccessToken}`;
        return Http.get(url, user) as unknown as Promise<{ name: string, id: string | number }[]>;
    }

    static listProcoreObservationTypes(procoreAccessToken: string,
                                       companyId: string,
                                       user: User): Promise<{ name: string, id: string | number, category:string }[]> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/${companyId}/observation-types?procore-access-token=${procoreAccessToken}`;
        return Http.get(url, user) as unknown as Promise<{ name: string, id: string | number, category:string }[]>;
    }

    static CreateProcoreObservation(procoreAccessToken: string,
                                    companyId: string,
                                    projectId: string,
                                    observationRequest: ApiObservationRequest,
                                    user: User): Promise<void> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/${companyId}/${projectId}/create-observation?procore-access-token=${procoreAccessToken}`;
        return Http.post(url, user,observationRequest) as unknown as Promise<void>;
    }

}

makeErrorsPretty(IntegrationsApi);
