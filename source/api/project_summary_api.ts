import makeErrorsPretty from "../utilities/make_errors_pretty";
import { ApiProjectArea, ApiProjectAreaWorkPackage, ApiProjectSummary, User } from "../models";
import Http from "../utilities/http";

export default class ProjectSummaryApi {
    static getProjectSummary(projectId: string, user: User) {
        return Http.get(`${Http.baseUrl()}/projects/${projectId}/summary`, user) as unknown as Promise<ApiProjectSummary>;
    }

    /**
     * @deprecated Use {@link createProjectArea} or {@link updateProjectArea} instead
     */
    static createOrReplaceProjectArea(projectId: string, modelElementId: number, projectArea: ApiProjectArea, user: User): Promise<ApiProjectArea> {
        return Http.put(`${Http.baseUrl()}/projects/${projectId}/areas/${modelElementId}`, user, projectArea) as unknown as Promise<ApiProjectArea>
    };

    static createProjectArea(projectId: string, projectArea: ApiProjectArea, user: User): Promise<ApiProjectArea> {
        return Http.post(`${Http.baseUrl()}/projects/${projectId}/areas`, user, projectArea) as unknown as Promise<ApiProjectArea>;
    }

    static updateProjectArea(projectId: string, projectAreaId: number, projectArea: ApiProjectArea, user: User): Promise<ApiProjectArea> {
        return Http.patch(`${Http.baseUrl()}/projects/${projectId}/areas/${projectAreaId}`, user, projectArea) as unknown as Promise<ApiProjectArea>
    };

    /**
     * @deprecated Use {@link updateProjectArea} to update the project area or {@link updateProjectAreaWorkPackages} to update the project area work packages
     */
    static updateProjectAreaProgress(projectId: string, modelElementId: number, projectArea: ApiProjectArea, user: User): Promise<ApiProjectArea> {
        return Http.patch(`${Http.baseUrl()}/projects/${projectId}/areas/${modelElementId}`, user, projectArea) as unknown as Promise<ApiProjectArea>
    };

    static createProjectAreaWorkPackage(projectId: string, projectAreaId: number, projectAreaWorkPackage: ApiProjectAreaWorkPackage, user: User): Promise<ApiProjectAreaWorkPackage> {
        return Http.post(`${Http.baseUrl()}/projects/${projectId}/areas/${projectAreaId}/work-packages`, user, projectAreaWorkPackage) as unknown as Promise<ApiProjectAreaWorkPackage>;
    }

    static updateProjectAreaWorkPackages(projectId: string, projectAreaId: number, projectAreaWorkPackages: ApiProjectAreaWorkPackage[], user: User): Promise<ApiProjectAreaWorkPackage[]> {
        return Http.patch(`${Http.baseUrl()}/projects/${projectId}/areas/${projectAreaId}/work-packages`, user, projectAreaWorkPackages) as unknown as Promise<ApiProjectAreaWorkPackage[]>;
    }

    static getProjectArea(projectId: string, projectAreaId: number, user: User): Promise<ApiProjectArea> {
        return Http.get(`${Http.baseUrl()}/projects/${projectId}/areas/${projectAreaId}`, user) as unknown as Promise<ApiProjectArea>;
    };

    static listProjectAreas(projectId: string, user: User): Promise<ApiProjectArea[]> {
        return Http.get(`${Http.baseUrl()}/projects/${projectId}/areas`, user) as unknown as Promise<ApiProjectArea[]>;
    }

    static listProjectAreaWorkPackages(projectId: string, projectAreaId: number, user: User): Promise<ApiProjectAreaWorkPackage[]> {
        return Http.get(`${Http.baseUrl()}/projects/${projectId}/areas/${projectAreaId}/work-packages`, user) as unknown as Promise<ApiProjectAreaWorkPackage[]>;
    }

    static listProjectAreaWorkPackagesForProject(projectId: string, user: User): Promise<ApiProjectAreaWorkPackage[]> {
        return Http.get(`${Http.baseUrl()}/projects/${projectId}/areas/work-packages`, user) as unknown as Promise<ApiProjectAreaWorkPackage[]>;
    }
};

makeErrorsPretty(ProjectSummaryApi)
