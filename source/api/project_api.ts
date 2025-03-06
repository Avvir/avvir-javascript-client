import getAuthorizationHeaders from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import { DateConverter } from "../converters";
import { PbeTsvType } from "../models/api/pbe_tsv_type";

import type { ApiClassificationCode, ApiCloudFile, ApiMasterformatProgress, ApiProject, ApiProjectCostAnalysisProgress, ApiProjectCostAnalysisProgressValidationResult, ApiProjectListing, ApiProjectWorkPackage, ApiProjectWorkPackageCost, ApiRunningProcess, ProgressType, ProjectWorkPackageType, User } from "../models";
import type { AssociationIds, DateLike } from "type_aliases";

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

  static getTradeBreakdownTsvUrl({ projectId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/${fileName}_trade-breakdown.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static saveTradeBreakdownTsv({ projectId }: AssociationIds, tsvContent: string, user: User) {
    let multipartFormData = new FormData();
    let file = new Blob([tsvContent], { type: "text/tab-separated-values" });
    multipartFormData.append("file", file, "file.tsv");

    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown`;
    return Http.fetch(url, {
      method: "POST",
      headers: {
        ...getAuthorizationHeaders(user)
      },
      body: multipartFormData
    }) as unknown as Promise<ApiRunningProcess>;
  }

  static getWorkPackages(projectId: string, user: User) {
    let url = `${Http.baseUrl()}/projects/${projectId}/work-packages`;
    return Http.get(url, user) as unknown as Promise<ApiProjectWorkPackage[]>;
  }

  static saveWorkPackages(projectId: string, user: User, workPackages: ApiProjectWorkPackage[]) {
    let url = `${Http.baseUrl()}/projects/${projectId}/work-packages`;
    return Http.put(url, user, workPackages) as unknown as Promise<ApiProjectWorkPackage[]>;
  }

  static generateMasterformatProgress({ projectId }: AssociationIds,
                                      reportDate: DateLike,
                                      masterformatVersion: number,
                                      user: User)
  {
    const formattedDate = DateConverter.dateToISO(reportDate);
    const url = `${Http.baseUrl()}/projects/${projectId}/masterformat-progress-report?masterformatVersion=${masterformatVersion}&reportDate=${formattedDate}`;
    return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
  }

  static getFiltered5dTsv({ projectId }: AssociationIds, projectName: string, fileName: string, filter, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/cost-analysis-progress/line-items/${fileName}`;
    return Http.put(url, user, filter, "application/json", "text/tab-separated-values") as unknown as Promise<string>;
  }

  static getClassificationCodes({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/classification-codes`;
    return Http.get(url, user) as unknown as Promise<ApiClassificationCode[]>;
  }

  static checkWbsStatus({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/cost-analysis-progress/validations`;
    return Http.get(url, user) as unknown as Promise<ApiProjectCostAnalysisProgressValidationResult>;
  };

  static updateMasterformatSelection({ projectId, floorId }: AssociationIds, masterformatTree, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/cost-analysis-progress-modeled-total-cost`;
    return Http.put(url, user, masterformatTree) as unknown as Promise<ApiProjectCostAnalysisProgress[]>;
  }

  static getWorkPackageCosts({ projectId }: AssociationIds, workPackageType: ProjectWorkPackageType, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/work-packages/${workPackageType}/costs`;
    return Http.get(url, user) as unknown as Promise<ApiProjectWorkPackageCost[]>;
  }

  static generateAllMasterformatProgress({ projectId }: AssociationIds,
                                         reportDate: DateLike,
                                         masterformatVersion: number,
                                         user: User): Promise<ApiRunningProcess> {
    const formattedDate = DateConverter.dateToISO(reportDate);
    let url = `${Http.baseUrl()}/projects/${projectId}/generate-all-masterformat-progress?masterformatVersion=${masterformatVersion}&reportDate=${formattedDate}`;
    return Http.post(url, user) as unknown as Promise<ApiRunningProcess>;
  }

  static updateProjectExportTsv({ projectId }: AssociationIds, tsvContent: string, user: User) {
    let multipartFormData = new FormData();
    let file = new Blob([tsvContent], { type: "text/tab-separated-values" });
    multipartFormData.append("file", file, "file.tsv");

    let pbeTsvType = PbeTsvType.PROJECT_LEVEL_PBE;

    const url = `${Http.baseUrl()}/projects/${projectId}/planned-building-elements?pbeTsvType=${pbeTsvType}`;
    return Http.fetch(url, {
      method: "POST",
      headers: {
        ...getAuthorizationHeaders(user)
      },
      body: multipartFormData
    }) as unknown as Promise<ApiRunningProcess>;
  }
}

makeErrorsPretty(ProjectApi,
  {
    exclude: ["getProjectDeviationsReportTsvUrl", "getTradeBreakdownTsvUrl"],
    overrideErrorMessage: ["getFiltered5dTsv", "saveTradeBreakdownTsv"]
  });
