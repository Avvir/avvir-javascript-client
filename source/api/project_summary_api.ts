import makeErrorsPretty from "../utilities/make_errors_pretty";
import {ApiProjectArea, ApiProjectSummary, User} from "../models";
import Http from "../utilities/http";

export default class ProjectSummaryApi {
    static getProjectSummary(projectId: string, user: User) {
        let url = `${Http.baseUrl()}/projects/${projectId}/summary`;
        return Http.get(url, user) as unknown as Promise<ApiProjectSummary>;
    }

    static updateProjectAreaProgress(projectId: string, projectAreaId: number, projectArea: ApiProjectArea, user: User): Promise<ApiProjectArea> {
        let url = `${Http.baseUrl()}/projects/${projectId}/areas/${projectAreaId}`;
        return Http.patch(url, user, projectArea) as unknown as Promise<ApiProjectArea>
    };

    static getProjectArea(projectId: string, projectAreaId: number, user: User): Promise<ApiProjectArea> {
        let url = `${Http.baseUrl()}/projects/${projectId}/areas/${projectAreaId}`;
        return Http.get(url, user) as unknown as Promise<ApiProjectArea>;
    };
};

makeErrorsPretty(ProjectSummaryApi)