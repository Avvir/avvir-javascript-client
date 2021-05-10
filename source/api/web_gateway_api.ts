// @ts-nocheck
import DetailedElement from "../models/domain/detailed_element";
import DeviationStatus from "../models/enums/deviation_status";
import getAuthorizationHeaders, {BasicUser, User} from "../utilities/get_authorization_headers";
import UserAuthType from "../models/enums/user_auth_type";
import {AssociationIds} from "type_aliases";
import {httpGetHeaders} from "../utilities/request_headers";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import DeprecatedApiPipeline from "../models/api/deprecated_api_pipeline";
import ApiPlannedElement from "../models/api/api_planned_element";
export default class WebGatewayApi {

  static getPlannedBuildingElements({ projectId, floorId }: AssociationIds, user: User):Promise<ApiPlannedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`;
    return Http.get(url, user);
  }

  static connectProjectToStructionSite({ projectId }: AssociationIds, structionSiteProjectUrl: string, token: string, user: User): Promise<ApiPipeline>{
    const url = `${Http.baseUrl()}/projects/${projectId}/connect-to-structionsite?structionsite-access-token=${token}&structionsite-project-url=${structionSiteProjectUrl}`;
    return Http.post(url, user, null);
  }

  static checkPipelineStatus({ projectId }: AssociationIds, pipelineId: number, user: User):Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines/${pipelineId}`;
    return Http.get(url, user);
  }

  static createInvitation(inviteeEmail: string, role: string, organizationId: string, user: User): Promise<ApiInvitation> {
    const url = `${Http.baseUrl()}/users/invitations`;
    return Http.post(url, user, { userEmail: inviteeEmail, role, clientAccountId: organizationId });
  }

  static getInvitation(invitationToken: string, user: User) : Promise<ApiInvitation>{
    const url = `${Http.baseUrl()}/users/invitations/${invitationToken}`;
    return Http.get(url, user);
  }

  static getProgressReportPdfUrl(projectId: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/progress-report.pdf`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static getQualityControlReportPdfUrl(projectId: string): string {
    return `${Http.baseUrl()}/projects/${projectId}/report.pdf`;
  }

  static getPlannedElementsTsvUrl({ projectId, floorId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/${fileName}_planned-building-elements.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static getDeviationsReportTsvUrl({ projectId, floorId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/${fileName}_deviation-report.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static getScanAnalysisUrl({ projectId, floorId, scanDatasetId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/${fileName}_scan-analysis.tsv`;
    return Http.addAuthToDownloadUrl(baseUrl, user);
  }

  static checkProcoreAccessToken(projectId: string, procoreAccessToken: string, user: User):Promise<{ expiresInSeconds: number }> {
    if (!projectId) {
      return Promise.reject(new Error("Project not loaded yet"));
    }
    let url = `${Http.baseUrl()}/projects/${projectId}/procore?procore-access-token=${procoreAccessToken}`;
    return Http.get(url, user);
  }

  static pushPdfToProcore({ projectId, floorId, scanDatasetId }: AssociationIds, procoreProjectId: string, procoreAccessToken: string, pdfType: string, user: User): Promise<void> {
    if (!projectId) {
      return Promise.reject(new Error("Project not loaded yet"));
    }
    const url = `${Http.baseUrl()}/projects/${projectId}/push-report-to-procore/${pdfType}?procore-project-id=${procoreProjectId}&procore-access-token=${procoreAccessToken}`;
    return Http.post(url, user, null);
  }

  static getProcoreProjects(projectId: string, procoreAccessToken: string, user: User):Promise<{ lastUpdated: number, projectId: string | number }[]> {
    if (!projectId) {
      return Promise.reject(new Error("Project not loaded yet"));
    }
    const url = `${Http.baseUrl()}/projects/${projectId}/procore-projects?procore-access-token=${procoreAccessToken}`;
    return Http.get(url, user);
  }


  static updateDeviationStatus({ projectId, floorId, scanDatasetId }: AssociationIds, deviationGlobalId: string, status: DeviationStatus, user: User):Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/deviation-status`;
    let deviation = {
      globalId: deviationGlobalId,
      status
    };
    return Http.patch(url, user, deviation);
  }


  // TODO: rename / move
  static getCustomFirebaseToken(user: User) {
    return fetch(`${Http.baseUrl()}/login`, {
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
    }) as Promise<{ headers: Headers, body: { storageToken: string } }>;
  }

  // deprectated. use AuthApi.login instead
  static login(username: string, password: string) {
    const user: BasicUser = {
      authType: UserAuthType.BASIC,
      username,
      password
    };
    return fetch(`${Http.baseUrl()}/login`, {
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
  static acceptInvitation(token: string, password: string):Promise<void> {
    const url = `${Http.baseUrl()}/users/accept-invitation`;
    let invitationForm = { invitationToken: token, password };
    return Http.post(url, null, invitationForm);
  }

  static getElementDetails({ projectId, floorId, scanDatasetId }: AssociationIds, elementGlobalId: string, user: User) {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/element/${elementGlobalId}`;
    return Http.get(url, user);
  }


  static exportIfc({ projectId, floorId, scanDatasetId }: AssociationIds, type: string, user: User) :Promise<DeprecatedApiPipeline>{
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/export-ifc?type=${type}`;
    return Http.post(url, user, null);
  }

  // TODO unify with pipeline api
  static checkExportedIfc({ projectId, floorId, scanDatasetId }: AssociationIds, workflowName: string, type: string, user: User): Promise<DeprecatedApiPipeline> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/export-ifc/${workflowName}?type=${type}`;
    return Http.get(url, user);
  }

  static downsampleScan({ projectId, floorId, scanDatasetId }: AssociationIds, user: User) : Promise<void>{
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/downsample-scan`;
    return Http.post(url, user, null);
  }

  //TODO move to AuthApi
  static getGcpBearerToken({ projectId }: AssociationIds, user: User) :Promise<{ accessToken: string, expireTime: string }>{
    let url = `${Http.baseUrl()}/projects/${projectId}/gcpAccessToken`;
    return Http.get(url, user);
  }

  static getMasterformat(version: number) :Promise<ApiMasterformat[]>{
    let url = `${Http.baseUrl()}/masterformats/${version}`;
    return Http.get(url, null);
  }

  static updateElement({ projectId, floorId, scanDatasetId, globalId }: AssociationIds, element: DetailedElement, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/elements/${globalId}`;
    return Http.patch(url, user, element);
  }

  static updateManyElements({ projectId, floorId, scanDatasetId }: AssociationIds, elements: DetailedElement<any>[], user: User):Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements`;
    return Http.patch(url, user, elements);
  }

  static createElements({ projectId, floorId }: AssociationIds, elements: DetailedElement<any>[], user: User):Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`;
    return Http.post(url, user, elements);
  }

  static triggerArgoRunProgressAndDeviations({ projectId, floorId }: AssociationIds, deviationsFlag: string, bimSourceFileExtension: string, user: User):Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/run-progress-and-deviations?deviationsFlag=${deviationsFlag}&bimSourceFileExtension=${bimSourceFileExtension}`;
    return Http.post(url, user, null);
  }

  static triggerArgoRunNwdConvert({ projectId, floorId }: AssociationIds, user: User):Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/nwd-convert`;
    return Http.post(url, user, null);
  }

  static recordUserActions(type, userActions, user: User):Promise<void> {
    let url = `${Http.baseUrl()}/user-actions`;
    let actionForm = {
      type,
      payload: userActions
    };
    return Http.post(url, user, actionForm);
  }

  static matchPlannedBuildingElements({projectId, floorId}: AssociationIds, matches: {[v1Id: string]: string}, newElements: ApiPlannedElement[], user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements/match`;
    return Http.post(url, user, {matches, newElements});
  }
}

makeErrorsPretty(WebGatewayApi, {exclude: ["getCustomFirebaseToken", "login"]})