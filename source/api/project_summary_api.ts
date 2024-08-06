import makeErrorsPretty from "../utilities/make_errors_pretty";
import { ApiProjectArea, ApiProjectSummary, User } from "../models";
import Http from "../utilities/http";

export default class ProjectSummaryApi {
    static getProjectSummary(projectId: string, user: User) {
        return Http.get(`${Http.baseUrl()}/projects/${projectId}/summary`, user) as unknown as Promise<ApiProjectSummary>;
    }

    static createOrReplaceProjectArea(projectId: string, modelElementId: number, projectArea: ApiProjectArea, user: User): Promise<ApiProjectArea> {
        return Http.put(`${Http.baseUrl()}/projects/${projectId}/areas/${modelElementId}`, user, projectArea) as unknown as Promise<ApiProjectArea>
    };

    static updateProjectAreaProgress(projectId: string, modelElementId: number, projectArea: ApiProjectArea, user: User): Promise<ApiProjectArea> {
        return Http.patch(`${Http.baseUrl()}/projects/${projectId}/areas/${modelElementId}`, user, projectArea) as unknown as Promise<ApiProjectArea>
    };

    static getProjectArea(projectId: string, projectAreaId: number, user: User): Promise<ApiProjectArea> {
        return Http.get(`${Http.baseUrl()}/projects/${projectId}/areas/${projectAreaId}`, user) as unknown as Promise<ApiProjectArea>;
    };

    static createProjectArea(projectId: string, projectArea: ApiProjectArea, user: User): Promise<ApiProjectArea> {
        return Http.post(`${Http.baseUrl()}/projects/${projectId}/areas`, user, projectArea) as unknown as Promise<ApiProjectArea>;
    }
};

makeErrorsPretty(ProjectSummaryApi)
