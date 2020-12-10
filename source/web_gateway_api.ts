import ApiMasterformat from "./models/api/api_masterformat";
import ApiPipeline from "./models/api/api_pipeline";
import ApiPlannedElement from "./models/api/api_planned_element";
import checkFetchStatus from "./check_fetch_status";
import DetailedElement from "./models/domain/detailed_element";
import DeviationStatus from "./models/enums/deviation_status";
import getAuthorizationHeaders, { BasicUser, User } from "./get_authorization_headers";
import UserAuthType from "./models/enums/user_auth_type";
import { AssociationIds } from "type_aliases";
import { httpGetHeaders, httpPostHeaders } from "./request_headers";
import Config from "./config";
import {isFirebaseUser, isGatewayUser} from "./reduce_user_session";

export default class WebGatewayApi {
  static baseUrl: string = process.env.REACT_APP_WEB_API_GATEWAY_DOMAIN;

  static getPlannedBuildingElements({ projectId, floorId }: AssociationIds, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/planned-building-elements`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiPlannedElement[]>)
      .catch(Config.sharedErrorHandler);
  }

  static connectProjectToStructionSite({ projectId }: AssociationIds, structionSiteProjectUrl: string, token: string, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/connect-to-structionsite?structionsite-access-token=${token}&structionsite-project-url=${structionSiteProjectUrl}`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiPipeline>)
      .catch(Config.sharedErrorHandler);
  }

  static checkPipelineStatus({ projectId }: AssociationIds, pipelineId: number, user: User) {
    const url = `${WebGatewayApi.baseUrl}/pipelines/${pipelineId}`;
    return (fetch(url, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiPipeline>)
      .catch(Config.sharedErrorHandler);
  }

  static createInvitation(inviteeEmail: string, role: string, organizationId: string, user: User) {
    const url = `${WebGatewayApi.baseUrl}/users/invitations`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify({ userEmail: inviteeEmail, role, clientAccountId: organizationId })
    }).then(checkFetchStatus) as Promise<{ token: string, userEmail: string }>)
      .catch(Config.sharedErrorHandler);
  }

  static getInvitation(invitationToken: string, user: User) {
    const url = `${WebGatewayApi.baseUrl}/users/invitations/${invitationToken}`;
    return (fetch(url, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<{ userEmail: string, resourceName: string, expiry: number }>)
      .catch(Config.sharedErrorHandler);
  }

  static getScanRepresentation({ projectId, floorId, scanDatasetId }: AssociationIds, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/files/scan-representation`;
    return (fetch(url, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<{ url: string }>)
      .catch(Config.sharedErrorHandler);
  }

  static getProgressReportPdfUrl(projectId: string, user: User): string {
    const baseUrl = `${WebGatewayApi.baseUrl}/projects/${projectId}/progress-report.pdf`;
    return WebGatewayApi.addAuthToDownloadUrl(baseUrl, user);
  }

  static getQualityControlReportPdfUrl(projectId: string): string {
    return `${WebGatewayApi.baseUrl}/projects/${projectId}/report.pdf`;
  }

  static getPlannedElementsTsvUrl({ projectId, floorId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/${fileName}_planned-building-elements.tsv`;
    return WebGatewayApi.addAuthToDownloadUrl(baseUrl, user);
  }

  static getDeviationsReportTsvUrl({ projectId, floorId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/${fileName}_deviation-report.tsv`;
    return WebGatewayApi.addAuthToDownloadUrl(baseUrl, user);
  }

  static getScanAnalysisUrl({ projectId, floorId, scanDatasetId }: AssociationIds, fileName: string, user: User): string {
    const baseUrl = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/${fileName}_scan-analysis.tsv`;
    return WebGatewayApi.addAuthToDownloadUrl(baseUrl, user);
  }

  static addAuthToDownloadUrl(baseUrl: string, user: User): string {
    if (user) {
      if (isGatewayUser(user)) {
        return `${baseUrl}?auth=${user.gatewayUser.idToken}`;
      } else if (isFirebaseUser(user)) {
        return `${baseUrl}?firebaseAuth=${user.firebaseUser.idToken}`;
      }
    } else {
      return baseUrl;
    }
  }

  static checkProcoreAccessToken(projectId: string, procoreAccessToken: string, user: User) {
    if (!projectId) {
      return Promise.reject(new Error("Project not loaded yet"));
    }
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/procore`;
    const params = `?procore-access-token=${procoreAccessToken}`;
    return (fetch(url + params, {
      method: "GET",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<{ expiresInSeconds: number }>)
      .catch(Config.sharedErrorHandler);
  }

  static pushPdfToProcore({ projectId, floorId, scanDatasetId }: AssociationIds, procoreProjectId: string, procoreAccessToken: string, pdfType: string, user: User) {
    if (!projectId) {
      return Promise.reject(new Error("Project not loaded yet"));
    }
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/push-report-to-procore/${pdfType}`;
    const params = `?procore-project-id=${procoreProjectId}&procore-access-token=${procoreAccessToken}`;
    return (fetch(url + params, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<{ body: { id: number } }>)
      .catch(Config.sharedErrorHandler);
  }

  static getProcoreProjects(projectId: string, procoreAccessToken: string, user: User) {
    if (!projectId) {
      return Promise.reject(new Error("Project not loaded yet"));
    }
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/procore-projects`;
    const params = `?procore-access-token=${procoreAccessToken}`;
    return (fetch(url + params, {
      method: "GET",
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<{ lastUpdated: number, projectId: string | number }[]>)
      .catch(Config.sharedErrorHandler);

  }

  static updateDeviationStatus({ projectId, floorId, scanDatasetId }: AssociationIds, deviationGlobalId: string, status: DeviationStatus, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/deviation-status`;
    return (fetch(url, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify({
        globalId: deviationGlobalId,
        status
      })
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static getCustomFirebaseToken(user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/login`, {
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

  static login(username: string, password: string) {
    const user: BasicUser = {
      authType: UserAuthType.BASIC,
      username,
      password
    };
    return fetch(`${WebGatewayApi.baseUrl}/login`, {
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

  static acceptInvitation(token: string, password: string) {
    const url = `${WebGatewayApi.baseUrl}/users/accept-invitation`;
    return (fetch(url, {
      method: "POST",
      headers: httpPostHeaders,
      body: JSON.stringify({ invitationToken: token, password })
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static getElementDetails({ projectId, floorId, scanDatasetId }: AssociationIds, elementGlobalId: string, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/element/${elementGlobalId}`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<DetailedElement>)
      .catch(Config.sharedErrorHandler);
  }

  static exportIfc({ projectId, floorId, scanDatasetId }: AssociationIds, type: string, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/export-ifc?type=${type}`, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<{ workflowName: string, startTime: number, status: "running" | "complete" }>)
      .catch(Config.sharedErrorHandler);
  }

  static checkExportedIfc({ projectId, floorId, scanDatasetId }: AssociationIds, workflowName: string, type: string, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/export-ifc/${workflowName}?type=${type}`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<{ workflowName: string, startTime: number, status: "running" | "complete" }>)
      .catch(Config.sharedErrorHandler);
  }

  static downsampleScan({ projectId, floorId, scanDatasetId }: AssociationIds, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/downsample-scan`, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static getGcpBearerToken({ projectId }: AssociationIds, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/gcpAccessToken`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<{ accessToken: string, expireTime: string }>)
      .catch(Config.sharedErrorHandler);
  }

  static getMasterformat(version: number) {
    return (fetch(`${WebGatewayApi.baseUrl}/masterformats/${version}`, {
      headers: {
        ...httpGetHeaders
      }
    }).then(checkFetchStatus) as Promise<ApiMasterformat[]>)
      .catch(Config.sharedErrorHandler);
  }

  static updateElement({ projectId, floorId, scanDatasetId, globalId }: AssociationIds, element: DetailedElement, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/elements/${globalId}`, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(element)
    });
  }

  static updateManyElements({ projectId, floorId, scanDatasetId }: AssociationIds, elements: DetailedElement<any>[], user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements`, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(elements)
    }).then(checkFetchStatus);
  }

  static triggerArgoRunProgressAndDeviations({ projectId, floorId }: AssociationIds, deviationsFlag: string, bimSourceFileExtension: string, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/run-progress-and-deviations?deviationsFlag=${deviationsFlag}&bimSourceFileExtension=${bimSourceFileExtension}`,
      {
        method: "POST",
        headers: {
          ...httpPostHeaders,
          ...getAuthorizationHeaders(user)
        }
      }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static triggerArgoRunNwdConvert({ projectId, floorId }: AssociationIds, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/nwd-convert`, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static recordUserActions(type, userActions, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/user-actions`, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify({
        type,
        payload: userActions
      })
    }).then(checkFetchStatus) as Promise<void>;
  }
}
