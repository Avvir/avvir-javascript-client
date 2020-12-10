import ApiCloudFile from "./models/api/api_cloud_file";
import ApiProject from "./models/api/api_project";
import ApiProjectCostAnalysisProgress from "./models/api/api_project_cost_analysis_progress";
import ApiProjectMasterformatProgress from "./models/api/api_project_masterformat_progress";
import checkFetchStatus from "./check_fetch_status";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import { AssociationIds } from "type_aliases";
import { httpGetHeaders, httpPostHeaders } from "./request_headers";
import Config from "./config";

export default class ProjectApi {
  static listProjectsForOrganization(accountId: string, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/client-accounts/${accountId}/projects`, {
      headers: {
        ...getAuthorizationHeaders(user),
        ...httpGetHeaders
      }
    }).then(checkFetchStatus) as Promise<ApiProject[]>;
  }

  static listAllProjectsForUser(user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/list-user-projects`, {
      headers: {
        ...getAuthorizationHeaders(user),
        ...httpGetHeaders
      },
    }).then(checkFetchStatus) as Promise<ApiProject[]>;
  }


  static listProjects(projectId: string, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/list`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiProject[]>;
  }

  static getProject(projectId: string, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiProject>;
  }

  static createProject(accountId: string, project: ApiProject, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/client-accounts/${accountId}/projects`, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(project)
    }).then(checkFetchStatus) as Promise<{ firebaseId: string }>;
  }

  static updateProject(projectId: string, apiProject: ApiProject, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(apiProject)
    }).then(checkFetchStatus) as Promise<void>;
  }

  static archiveProject(accountId: string, projectId: string, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/archive`, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<void>;
  }

  static saveProjectCostAnalysisProgress({ projectId }: AssociationIds, progress, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/cost-analysis-progress`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(progress)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static saveScannedProjectMasterformatProgress({ projectId }: AssociationIds, progress: ApiProjectMasterformatProgress, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/masterformat-progress`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(progress)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static saveScheduledProjectMasterformatProgress({ projectId }: AssociationIds, progress: ApiProjectMasterformatProgress, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/scheduled-masterformat-progress`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(progress)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static getProjectCostAnalysisProgress({ projectId }: AssociationIds, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/cost-analysis-progress`;
    return fetch(url, {
      method: "GET",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<ApiProjectCostAnalysisProgress[]>;
  }

  static getScannedProjectMasterformatProgress({ projectId }: AssociationIds, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/masterformat-progress`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiProjectMasterformatProgress[]>;
  }

  static getScheduledProjectMasterformatProgress({ projectId }: AssociationIds, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/scheduled-masterformat-progress`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiProjectMasterformatProgress[]>;
  }

  static listProjectFloorFiles({ projectId }: AssociationIds, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floor-files`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiCloudFile[]>;
  }

  static getProjectDeviationsReportTsvUrl({ projectId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${WebGatewayApi.baseUrl}/projects/${projectId}/${fileName}_deviation-report.tsv`;
    return WebGatewayApi.addAuthToDownloadUrl(baseUrl, user);
  }
}
