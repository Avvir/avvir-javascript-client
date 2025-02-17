import AuthApi from "./auth_api";
import buildFileName from "../utilities/build_file_name";
import getAuthorizationHeaders from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import { httpGetHeaders } from "../utilities/request_headers";
import type { ApiActionPayload, ApiInvitation, ApiMasterformat, ApiPipeline, ApiRunningProcess, ApiUserAction, BasicUser, DeprecatedApiPipeline, User, UserActionType } from "../models";
import { UserAuthType } from "../models";
import type { AssociationIds } from "type_aliases";

export default class WebGatewayApi {

  static connectProjectToStructionSite({ projectId }: AssociationIds,
                                       structionSiteProjectUrl: string,
                                       token: string,
                                       user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/projects/${projectId}/connect-to-structionsite?structionsite-access-token=${token}&structionsite-project-url=${structionSiteProjectUrl}`;
    return Http.post(url, user, null) as unknown as Promise<ApiPipeline>;
  }

  /**
   * @deprecated Moved to PipelinesApi
   */
  static checkPipelineStatus({ projectId }: AssociationIds, pipelineId: number, user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines/${pipelineId}`;
    return Http.get(url, user) as unknown as Promise<ApiPipeline>;
  }

  /**
   * @deprecated Moved to UserApi
   */
  static createInvitation(inviteeEmail: string,
                          role: string,
                          organizationId: string,
                          projectId: string,
                          user: User): Promise<ApiInvitation> {
    const url = `${Http.baseUrl()}/users/invitations`;
    return Http.post(url,
      user,
      {
        userEmail: inviteeEmail,
        role,
        clientAccountId: organizationId,
        projectId
      }) as unknown as Promise<ApiInvitation>;
  }

  /**
   * @deprecated Moved to UserApi
   */
  static getInvitation(invitationToken: string, user: User): Promise<ApiInvitation> {
    const url = `${Http.baseUrl()}/users/invitations/${invitationToken}`;
    return Http.get(url, user) as unknown as Promise<ApiInvitation>;
  }

  static getProgressReportPdfUrl(projectId: string, floorId: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/progress-report.pdf`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  /** @deprecated We no longer support pdf quality control reports */
  static getQualityControlReportPdfUrl(projectId: string): string {
    return `${Http.baseUrl()}/projects/${projectId}/report.pdf`;
  }

  static getPlannedElementsNewTsvUrl({ projectId, floorId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/${fileName}_planned-building-elements-new.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static getDeviationsReportTsvUrl({ projectId, floorId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/${fileName}_deviation-report.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  /** @deprecated scan analysis tsv was removed when we removed the concept of scanned building elements */
  static getScanAnalysisUrl({ projectId, floorId, scanDatasetId }: AssociationIds,
                            fileName: string,
                            user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/${fileName}_scan-analysis.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static getUniformatSummaryTsvUrl({ projectId }: AssociationIds, projectName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/${buildFileName(projectName)}_uniformat-summary.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static getScannedProjectMasterformatProgressUrl({ projectId }: AssociationIds,
                                                  fileName: string,
                                                  fileDate: string,
                                                  user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/${fileName}_4d-progress_${fileDate}_2016.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static baseUrl() {
    return Http.baseUrl();
  }

  static addAuthToDownloadUrl(url: string, user: User): string {
    return Http.addAuthToDownloadUrl(url, user);
  }

  /**
   * @deprecated Moved to AuthApi
   */
  static getCustomFirebaseToken(user: User) {
    return AuthApi.getCustomFirebaseToken(user);
  }

  /**
   * @deprecated Moved to AuthApi
   */
  static login(username: string, password: string) {
    const user: BasicUser = {
      authType: UserAuthType.BASIC,
      username,
      password
    };
    return Http.fetch(`${Http.baseUrl()}/login`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then((response) => {
      return response.json()
        .then(body => {
          const headers = response.headers;
          return { headers, body };
        });
    }) as Promise<{ headers: Headers, body: { storageToken: string, redirectUrl: string } }>;
  }

  // TODO move to auth api
  static acceptInvitation(token: string, password: string): Promise<void> {
    const url = `${Http.baseUrl()}/users/accept-invitation`;
    let invitationForm = { invitationToken: token, password };
    return Http.post(url, null, invitationForm) as unknown as Promise<void>;
  }

  static exportIfc({
                     projectId,
                     floorId,
                     scanDatasetId
                   }: AssociationIds, type: string, user: User): Promise<DeprecatedApiPipeline> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/export-ifc?type=${type}`;
    return Http.post(url, user, null) as unknown as Promise<DeprecatedApiPipeline>;
  }

  // TODO unify with pipeline api
  static checkExportedIfc({
                            projectId,
                            floorId,
                            scanDatasetId
                          }: AssociationIds,
                          workflowName: string,
                          type: string,
                          user: User): Promise<DeprecatedApiPipeline> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/export-ifc/${workflowName}?type=${type}`;
    return Http.get(url, user) as unknown as Promise<DeprecatedApiPipeline>;
  }

  /** @deprecated **/
  static downsampleScan({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/downsample-scan`;
    return Http.post(url, user, null) as unknown as Promise<void>;
  }

  //TODO move to AuthApi
  static getGcpBearerToken({ projectId }: AssociationIds, user: User): Promise<{
    accessToken: string,
    expireTime: string
  }>
  {
    let url = `${Http.baseUrl()}/projects/${projectId}/gcpAccessToken`;
    return Http.get(url, user) as unknown as Promise<{ accessToken: string, expireTime: string }>;
  }

  static getMasterformat(version: number): Promise<ApiMasterformat[]> {
    let url = `${Http.baseUrl()}/masterformats/${version}`;
    return Http.get(url, null) as unknown as Promise<ApiMasterformat[]>;
  }

  static triggerArgoRunProgressAndDeviations({
                                               projectId,
                                               floorId
                                             }: AssociationIds,
                                             deviationsFlag: string,
                                             bimSourceFileExtension: string,
                                             user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/run-progress-and-deviations?deviationsFlag=${deviationsFlag}&bimSourceFileExtension=${bimSourceFileExtension}`;
    return Http.post(url, user, null) as unknown as Promise<void>;
  }

  static triggerArgoRunNwdConvert({ projectId, floorId }: AssociationIds, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/nwd-convert`;
    return Http.post(url, user, null) as unknown as Promise<void>;
  }

  static recordUserActions(type: UserActionType,
                           userActions: ApiActionPayload[],
                           user: User): Promise<ApiUserAction[]> {
    let url = `${Http.baseUrl()}/user-actions`;
    let actionForm = {
      type,
      payload: userActions
    };
    return Http.post(url, user, actionForm) as unknown as Promise<ApiUserAction[]>;
  }

  static checkRunningProcess(processId: number, user: User): Promise<ApiRunningProcess> {
    let url = `${Http.baseUrl()}/running-processes/${processId}`;
    return Http.get(url, user) as unknown as Promise<ApiRunningProcess>;
  }

}

makeErrorsPretty(WebGatewayApi, {
  exclude: [
    "getCustomFirebaseToken",
    "login",
    "addAuthToDownloadUrl",
    "baseUrl",
    "getProgressReportPdfUrl",
    "getQualityControlReportPdfUrl",
    "getPlannedElementsNewTsvUrl",
    "getDeviationsReportTsvUrl",
    "getScanAnalysisUrl",
    "getUniformatSummaryTsvUrl",
    "getScannedProjectMasterformatProgressUrl"
  ], overrideErrorMessage: []
});
