import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";

import type ApiAutodeskAccessToken from "../models/api/integrations/autodesk/api_access_token";
import type ApiHubs from "../models/api/integrations/autodesk/api_hubs";
import type ApiProjects from "../models/api/integrations/autodesk/api_projects";
import type {
    ApiIntegrationCredentials,
    ApiIntegrationCredentialsType,
    ApiIntegrationProject,
    ApiObservationRequest,
    ApiRunningProcess,
    User
} from "../models";
import type {AssociationIds} from "type_aliases";
import type {ApiRfiRequest} from "../models/api/integrations/procore/api_rfi_request";
import {AutodeskRequest} from "../models";
import getAuthorizationHeaders from "../utilities/get_authorization_headers";

export default class IntegrationsApi {

    static getIntegrationCredentials({
                                         organizationId,
                                         projectId
                                     }: AssociationIds,
                                     credentialType: ApiIntegrationCredentialsType,
                                     user: User): Promise<ApiIntegrationCredentials> {
        const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialType}`;
        return Http.get(url, user) as unknown as Promise<ApiIntegrationCredentials>;
    }

    static getIntegrationProjectsForCredentials({
                                                    organizationId,
                                                    projectId
                                                }: AssociationIds,
                                                credentialType: ApiIntegrationCredentialsType,
                                                user: User): Promise<ApiIntegrationProject[]> {
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
                                      }: AssociationIds,
                                      credentials: ApiIntegrationCredentials,
                                      user: User): Promise<ApiIntegrationCredentials> {
        const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentials.credentialsType}`;
        return Http.put(url, user, credentials) as unknown as Promise<ApiIntegrationCredentials>;
    }

    static syncIntegrationProjects({
                                       organizationId,
                                       projectId
                                   }: AssociationIds,
                                   credentialsType: ApiIntegrationCredentialsType,
                                   user: User): Promise<ApiRunningProcess> {
        const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialsType}/sync-projects`;
        return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
    }

    static syncIntegrationPhotoAreas({
                                         organizationId,
                                         projectId
                                     }: AssociationIds,
                                     credentialsType: ApiIntegrationCredentialsType,
                                     user: User): Promise<ApiRunningProcess> {
        const url = `${Http.baseUrl()}/integrations/organizations/${organizationId}/projects/${projectId}/credentials/${credentialsType}/sync-photo-areas`;
        return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
    }

    static updateProjectIntegrationProject({
                                               organizationId,
                                               projectId
                                           }: AssociationIds,
                                           integrationProject: ApiIntegrationProject | null,
                                           user: User): Promise<void> {
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

    static getProcoreProjects(procoreAccessToken: string,
                              companyId: string,
                              user: User): Promise<{ lastUpdated: number, projectId: string | number }[]> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/projects`;
        const params = [];
        params.push(`procore-access-token=${procoreAccessToken}`);
        if (companyId) {
            params.push(`companyId=${companyId}`);
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
                                       user: User): Promise<{ name: string, id: string | number, category: string }[]> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        if (!companyId) {
            return Promise.reject(new Error("company id not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/${companyId}/observation-types?procore-access-token=${procoreAccessToken}`;
        return Http.get(url, user) as unknown as Promise<{ name: string, id: string | number, category: string }[]>;
    }

    static getObservationAssignees(procoreAccessToken: string,
                           companyId: string,
                           projectId: string,
                           user: User): Promise<{ name: string, id: string | number }[]> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        if (!projectId) {
            return Promise.reject(new Error("project id not found"));
        }
        if (!companyId) {
            return Promise.reject(new Error("company id not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/${companyId}/${projectId}/observation-assignees?procore-access-token=${procoreAccessToken}`;
        return Http.get(url, user) as unknown as Promise<{ name: string, id: string | number }[]>;
    }

    static getRfiAssignees(procoreAccessToken: string,
                           projectId: string,
                           user: User): Promise<{ name: string, id: string | number }[]> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        if (!projectId) {
            return Promise.reject(new Error("project id not found"));
        }
        let url = `${Http.baseUrl()}/integrations/procore/${projectId}/rfi-assignees?procore-access-token=${procoreAccessToken}`;
        return Http.get(url, user) as unknown as Promise<{ name: string, id: string | number }[]>;
    }

    static CreateProcoreObservation(procoreAccessToken: string,
                                    companyId: string,
                                    projectId: string,
                                    observationRequest: ApiObservationRequest,
                                    imageBlob: Blob,
                                    user: User): Promise<number> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        if (!projectId) {
            return Promise.reject(new Error("project id not found"));
        }
        if (!companyId) {
            return Promise.reject(new Error("company id not found"));
        }
        if (!imageBlob) {
            return Promise.reject(new Error("Invalid imageBlob"));
        }

        const formData = new FormData();
        formData.append("autodeskRequest", JSON.stringify(observationRequest));
        formData.append("image", imageBlob, "image.png");

        const url = `${Http.baseUrl()}/integrations/procore/${companyId}/${projectId}/create-observation-with-attachment?procore-access-token=${procoreAccessToken}`;

        return Http.fetch(url, {
            method: "POST",
            headers: {
                ...getAuthorizationHeaders(user)
            },
            body: formData
        }) as unknown as Promise<number>;

    }

    static CreateProcoreRfi(procoreAccessToken: string,
                            companyId: string,
                            projectId: string,
                            rfiRequest: ApiRfiRequest,
                            imageBlob: Blob,
                            user: User): Promise<number> {
        if (!procoreAccessToken) {
            return Promise.reject(new Error("Procore access token not found"));
        }
        if (!projectId) {
            return Promise.reject(new Error("project id not found"));
        }
        if (!companyId) {
            return Promise.reject(new Error("company id not found"));
        }
        if (!imageBlob) {
            return Promise.reject(new Error("Invalid imageBlob"));
        }

        let url = `${Http.baseUrl()}/integrations/procore/${companyId}/${projectId}/create-rfi-with-attachments?procore-access-token=${procoreAccessToken}`;

        const modifiedRfiRequest = {
            ...rfiRequest,
            private: rfiRequest.personal
        };
        delete modifiedRfiRequest.personal;

        const formData = new FormData();
        formData.append("rfiRequest", JSON.stringify(modifiedRfiRequest));
        formData.append("image", imageBlob, "image.png");

        return Http.fetch(url, {
            method: "POST",
            headers: {
                ...getAuthorizationHeaders(user)
            },
            body: formData
        }) as unknown as Promise<number>;
    }

    static getAutodeskAccessToken(code: string, redirectUri: string, user: User): Promise<ApiAutodeskAccessToken> {
        if (!code || !redirectUri) {
            return Promise.reject(new Error("Invalid client secret or redirectUri"));
        }
        const url = `${Http.baseUrl()}/integrations/autodesk/access-token?code=${code}&redirect-uri=${redirectUri}`;
        return Http.get(url, user) as unknown as Promise<ApiAutodeskAccessToken>;
    }

    static getAutodeskHubs(access_token: string, user: User): Promise<ApiHubs> {
        if (!access_token) {
            return Promise.reject(new Error("Invalid access token"));
        }
        const url = `${Http.baseUrl()}/integrations/autodesk/hubs?access-token=${access_token}`;
        return Http.get(url, user) as unknown as Promise<ApiHubs>;
    }

    static getAutodeskProjects(access_token: string, hubId: string, user: User): Promise<ApiProjects> {
        if (!access_token || !hubId) {
            return Promise.reject(new Error("Invalid access token or hubId"));
        }
        const url = `${Http.baseUrl()}/integrations/autodesk/projects?access-token=${access_token}&hubId=${hubId}`;
        return Http.get(url, user) as unknown as Promise<ApiProjects>;
    }

    static createAutodeskRequest(access_token: string, hubId: string, projectId: string, autodeskRequest: AutodeskRequest, imageBlob: Blob, user: User): Promise<number> {
        if (!access_token) {
            return Promise.reject(new Error("Invalid access token"));
        }
        if (!hubId) {
            return Promise.reject(new Error("Invalid hubId"));
        }
        if (!projectId) {
            return Promise.reject(new Error("Invalid projectId"));
        }
        if (!autodeskRequest) {
            return Promise.reject(new Error("Invalid autodeskRequest"));
        }
        if (!imageBlob) {
            return Promise.reject(new Error("Invalid imageBlob"));
        }
        if (!user) {
            return Promise.reject(new Error("Invalid user"));
        }

        const formData = new FormData();
        formData.append("hubId", hubId);
        formData.append("projectId", projectId);
        formData.append("access-token", access_token);
        formData.append("autodeskRequest", JSON.stringify(autodeskRequest));
        formData.append("image", imageBlob, "image.png");

        const url = `${Http.baseUrl()}/integrations/autodesk/create-request`;

        return Http.fetch(url, {
            method: "POST",
            headers: {
                ...getAuthorizationHeaders(user)
            },
            body: formData
        }) as unknown as Promise<number>;
    }
}

makeErrorsPretty(IntegrationsApi);
