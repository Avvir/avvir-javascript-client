import ApiProject from "../models/api/api_project";
import ApiProjectMasterformatProgress from "../models/api/api_project_masterformat_progress";
import {User} from "../utilities/get_authorization_headers";
import {AssociationIds} from "../models";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ApiProjectCostAnalysisProgress from "../models/api/api_project_cost_analysis_progress";
import ApiCloudFile from "../models/api/api_cloud_file";
import {ApiWorkPackage} from "../models/api/api_work_package";
import ApiProjectListing from "../models/api/api_project_listing";

export default class ProjectApi {
  static listProjectsForOrganization(accountId: string, user: User): Promise<ApiProject[]> {
    let url = `${Http.baseUrl()}/client-accounts/${accountId}/projects`;
    return Http.get(url, user) as unknown as Promise<ApiProject[]>;
  }

  static listAllProjectsForUser(user: User): Promise<ApiProject[]> {
    let url = `${Http.baseUrl()}/projects/list-user-projects`;
    return Http.get(url, user) as unknown as Promise<ApiProject[]>;
  }

  static listProjectsForUser(user: User): Promise<ApiProjectListing[]> {
    let url = `${Http.baseUrl()}/projectListings`;
    return Http.get(url, user) as unknown as Promise<ApiProjectListing[]>;
  }

  /**
   * @deprecated Call getProject and listProjectsForOrganization instead
   */
  static listProjects(projectId: string, user: User): Promise<ApiProject[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/list`;
    return Http.get(url, user) as unknown as Promise<ApiProject[]>;
  }

  static getProject(projectId: string, user: User): Promise<ApiProject> {
    let url = `${Http.baseUrl()}/projects/${projectId}`;
    return Http.get(url, user) as unknown as Promise<ApiProject>;
  }

  static createProject(accountId: string, project: ApiProject, user: User): Promise<{ firebaseId: string }> {
    let url = `${Http.baseUrl()}/client-accounts/${accountId}/projects`;
    return Http.post(url, user, project) as unknown as Promise<{ firebaseId: string }>;
  }

  static updateProject(projectId: string, project: ApiProject, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}`;
    return Http.patch(url, user, project) as unknown as Promise<void>;
  }

  static archiveProject(accountId: string, projectId: string, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/archive`;
    return Http.post(url, user, null) as unknown as Promise<void>;
  }

  static saveProjectCostAnalysisProgress({projectId}: AssociationIds, progress, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/cost-analysis-progress`;
    return Http.post(url, user, progress) as unknown as Promise<void>;
  }

  static saveScannedProjectMasterformatProgress({projectId}: AssociationIds, progress: ApiProjectMasterformatProgress, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/masterformat-progress`;
    return Http.post(url, user, progress) as unknown as Promise<void>;
  }

  static saveScheduledProjectMasterformatProgress({projectId}: AssociationIds, progress: ApiProjectMasterformatProgress, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/scheduled-masterformat-progress`;
    return Http.post(url, user, progress) as unknown as Promise<void>;
  }

  static getProjectCostAnalysisProgress({projectId}: AssociationIds, user: User): Promise<ApiProjectCostAnalysisProgress[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/cost-analysis-progress`;
    return Http.get(url, user) as unknown as Promise<ApiProjectCostAnalysisProgress[]>;
  }

  static getScannedProjectMasterformatProgress({projectId}: AssociationIds, user: User): Promise<ApiProjectMasterformatProgress[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/masterformat-progress`;
    return Http.get(url, user) as unknown as Promise<ApiProjectMasterformatProgress[]>;
  }

  static getScheduledProjectMasterformatProgress({projectId}: AssociationIds, user: User): Promise<ApiProjectMasterformatProgress[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/scheduled-masterformat-progress`;
    return Http.get(url, user) as unknown as Promise<ApiProjectMasterformatProgress[]>;
  }

  static listProjectFloorFiles({projectId}: AssociationIds, user: User): Promise<ApiCloudFile[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floor-files`;
    return Http.get(url, user) as unknown as Promise<ApiCloudFile[]>;
  }

  static getProjectDeviationsReportTsvUrl({projectId}: AssociationIds, fileName: string, user: User): Promise<string> {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/${fileName}_deviation-report.tsv`;
    return Promise.resolve(Http.addAuthToDownloadUrl(baseUrl, user));
  }

  static getProjectDeviationsReportTsv({projectId}: AssociationIds, user: User): Promise<string> {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/project_deviation-report.tsv`;
    const url = Http.addAuthToDownloadUrl(baseUrl, user);
    return Http.get(url, user, "text/tab-separated-values; charset=utf-8") as unknown as Promise<string>;
  }

  static getWorkPackages(projectId: string, user:User) {
    let url = `${Http.baseUrl()}/projects/${projectId}/work-packages`;
    return Http.get(url, user) as unknown as Promise<ApiWorkPackage[]>;
  }

  static saveWorkPackages(projectId: string, user:User, workPackages: ApiWorkPackage[]) {
    let url = `${Http.baseUrl()}/projects/${projectId}/work-packages`;
    return Http.put(url, user, workPackages) as unknown as Promise<ApiWorkPackage[]>;
  }
}

makeErrorsPretty(ProjectApi);