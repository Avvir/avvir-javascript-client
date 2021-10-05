// @ts-nocheck
import ApiProject from "../models/api/api_project";
import ApiProjectMasterformatProgress from "../models/api/api_project_masterformat_progress";
import {User} from "../utilities/get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import {AssociationIds} from "type_aliases";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ApiProjectCostAnalysisProgress from "../models/api/api_project_cost_analysis_progress";
import ApiCloudFile from "../models/api/api_cloud_file";

class ProjectApi {
  static listProjectsForOrganization(accountId: string, user: User) : Promise<ApiProject[]>{
    let url = `${Http.baseUrl()}/client-accounts/${accountId}/projects`;
    return Http.get(url, user);
  }

  static listAllProjectsForUser(user: User) :Promise<ApiProject[]>{
    let url = `${Http.baseUrl()}/projects/list-user-projects`;
    return Http.get(url, user);
  }

  // deprecated. Call getProject and listProjectsForOrganization instead
  static listProjects(projectId: string, user: User):Promise<ApiProject[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/list`;
    return Http.get(url, user);
  }

  static getProject(projectId: string, user: User): Promise<ApiProject>{
    let url = `${Http.baseUrl()}/projects/${projectId}`;
    return Http.get(url, user);
  }

  static createProject(accountId: string, project: ApiProject, user: User):Promise<{ firebaseId: string }> {
    let url = `${Http.baseUrl()}/client-accounts/${accountId}/projects`;
    return Http.post(url, user, project);
  }

  static updateProject(projectId: string, project: ApiProject, user: User):Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}`;
    return Http.patch(url, user, project);
  }

  static archiveProject(accountId: string, projectId: string, user: User):Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/archive`;
    return Http.post(url, user, null);
  }

  static saveProjectCostAnalysisProgress({ projectId }: AssociationIds, progress, user: User):Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/cost-analysis-progress`;
    return Http.post(url, user, progress);
  }

  static saveScannedProjectMasterformatProgress({ projectId }: AssociationIds, progress: ApiProjectMasterformatProgress, user: User):Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/masterformat-progress`;
    return Http.post(url, user, progress);
  }

  static saveScheduledProjectMasterformatProgress({ projectId }: AssociationIds, progress: ApiProjectMasterformatProgress, user: User):Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/scheduled-masterformat-progress`;
    return Http.post(url, user, progress);
  }

  static getProjectCostAnalysisProgress({ projectId }: AssociationIds, user: User):Promise<ApiProjectCostAnalysisProgress[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/cost-analysis-progress`;
    return Http.get(url, user);
  }

  static getScannedProjectMasterformatProgress({ projectId }: AssociationIds, user: User):Promise<ApiProjectMasterformatProgress[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/masterformat-progress`;
    return Http.get(url, user);
  }

  static getScheduledProjectMasterformatProgress({ projectId }: AssociationIds, user: User):Promise<ApiProjectMasterformatProgress[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/scheduled-masterformat-progress`;
    return Http.get(url, user);
  }

  static listProjectFloorFiles({ projectId }: AssociationIds, user: User): Promise<ApiCloudFile[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floor-files`;
    return Http.get(url, user);
  }

  static getProjectDeviationsReportTsvUrl({ projectId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/${fileName}_deviation-report.tsv`;
    return Promise.resolve(Http.addAuthToDownloadUrl(baseUrl, user));
  }

  static  getProjectDeviationsReportTsv({ projectId }: AssociationIds, user: User): Promise<string> {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/project_deviation-report.tsv`;
    return Http.get(baseUrl, user, "text/tab-separated-values; charset=utf-8");
  }
}

export default makeErrorsPretty(ProjectApi);