import { User } from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";

import {
  ApiCloudFile, ApiMasterformatProgress,
  ApiProject,
  ApiProjectCostAnalysisProgress,
  ApiProjectListing, ApiRunningProcess,
  ApiWorkPackage,
  AssociationIds,
  ProgressType
} from "../models";
import {DateLike} from "type_aliases";
import {DateConverter} from "../converters";

export default class ProjectApi {
  static listProjectsForOrganization(organizationId: string, user: User): Promise<ApiProject[]> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/projects`;
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

  static createProject(organizationId: string, project: ApiProject, user: User): Promise<{ firebaseId: string }> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/projects`;
    return Http.post(url, user, project) as unknown as Promise<{ firebaseId: string }>;
  }

  static updateProject(projectId: string, project: ApiProject, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}`;
    return Http.patch(url, user, project) as unknown as Promise<void>;
  }

  static archiveProject(projectId: string, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/archive`;
    return Http.post(url, user, null) as unknown as Promise<void>;
  }

  static unarchiveProject(projectId: string, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/unarchive`;
    return Http.post(url, user, null) as unknown as Promise<void>;
  }

  static saveProjectCostAnalysisProgress({ projectId }: AssociationIds, progress, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/cost-analysis-progress`;
    return Http.post(url, user, progress) as unknown as Promise<void>;
  }

  static saveScannedProjectMasterformatProgress({ projectId }: AssociationIds,
                                                progress: ApiMasterformatProgress,
                                                user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/scanned-masterformat-progress`;
    return Http.post(url, user, progress) as unknown as Promise<void>;
  }

  // TODO: Make schedule type an enum?
  static saveScheduledProjectMasterformatProgress({ projectId }: AssociationIds,
                                                  progress: ApiMasterformatProgress,
                                                  scheduleType: "current" | "baseline",
                                                  user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/scheduled-masterformat-progress/${scheduleType}`;
    return Http.post(url, user, progress) as unknown as Promise<void>;
  }

  static getProjectCostAnalysisProgress({ projectId }: AssociationIds,
                                        user: User): Promise<ApiProjectCostAnalysisProgress[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/cost-analysis-progress`;
    return Http.get(url, user) as unknown as Promise<ApiProjectCostAnalysisProgress[]>;
  }

  static getScannedProjectMasterformatProgress({ projectId }: AssociationIds,
                                               user: User): Promise<ApiMasterformatProgress[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/scanned-masterformat-progress`;
    return Http.get(url, user) as unknown as Promise<ApiMasterformatProgress[]>;
  }

  /**
   * @deprecated use getProjectMasterformatProgress
   */
  static getScheduledProjectMasterformatProgress({ projectId }: AssociationIds,
                                                 scheduleType: "current" | "baseline",
                                                 user: User): Promise<ApiMasterformatProgress[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/scheduled-masterformat-progress/${scheduleType}`;
    return Http.get(url, user) as unknown as Promise<ApiMasterformatProgress[]>;
  }

  static getProjectMasterformatProgress({ projectId }: AssociationIds,
                                        scheduleType: ProgressType,
                                        user: User): Promise<ApiMasterformatProgress[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/scheduled-masterformat-progress/${scheduleType}`;
    return Http.get(url, user) as unknown as Promise<ApiMasterformatProgress[]>;
  }

  static listProjectFloorFiles({ projectId }: AssociationIds, user: User): Promise<ApiCloudFile[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floor-files`;
    return Http.get(url, user) as unknown as Promise<ApiCloudFile[]>;
  }

  static getProjectDeviationsReportTsvUrl({ projectId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/${fileName}_deviation-report.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static getProjectDeviationsReportTsv({ projectId }: AssociationIds, user: User): Promise<string> {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/project_deviation-report.tsv`;
    const url = Http.addAuthToDownloadUrl(baseUrl, user);
    return Http.get(url, user, "text/tab-separated-values; charset=utf-8") as unknown as Promise<string>;
  }

  static getWorkPackages(projectId: string, user: User) {
    let url = `${Http.baseUrl()}/projects/${projectId}/work-packages`;
    return Http.get(url, user) as unknown as Promise<ApiWorkPackage[]>;
  }

  static saveWorkPackages(projectId: string, user: User, workPackages: ApiWorkPackage[]) {
    let url = `${Http.baseUrl()}/projects/${projectId}/work-packages`;
    return Http.put(url, user, workPackages) as unknown as Promise<ApiWorkPackage[]>;
  }

  static generateMasterformatProgress({ projectId }: AssociationIds,
                                      reportDate: DateLike,
                                      masterformatVersion: number,
                                      user: User) {
    const formattedDate = DateConverter.dateToISO(reportDate);
    const url = `${Http.baseUrl()}/projects/${projectId}/masterformat-progress-report?masterformatVersion=${masterformatVersion}&reportDate=${formattedDate}`;
    return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
  }

}

makeErrorsPretty(ProjectApi, { exclude: ["getProjectDeviationsReportTsvUrl"] });
