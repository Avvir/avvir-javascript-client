import ApiOrganization from "../../models/api/api_organization";
import checkFetchStatus from "./check_fetch_status";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import { httpGetHeaders, httpPostHeaders } from "./request_headers";

export default class OrganizationApi {
  static listOrganizations(user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/client-accounts`, {
      headers: {
        ...getAuthorizationHeaders(user),
        ...httpGetHeaders
      }
    }).then(checkFetchStatus) as Promise<ApiOrganization[]>;
  }

  static getOrganization(organizationId: string, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/client-accounts/${organizationId}`, {
      headers: {
        ...getAuthorizationHeaders(user),
        ...httpGetHeaders
      },
    }).then(checkFetchStatus) as Promise<ApiOrganization>;
  }

  static getOrganizationName(organizationId: string, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/client-accounts/${organizationId}/name`, {
      headers: {
        ...getAuthorizationHeaders(user),
        ...httpGetHeaders,
        Accept: "application/text"
      }
    }).then(checkFetchStatus) as Promise<string>;
  }

  static createOrganization(organization: ApiOrganization, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/client-accounts`, {
      method: "POST",
      headers: {
        ...getAuthorizationHeaders(user),
        ...httpPostHeaders
      },
      body: JSON.stringify(organization)
    }).then(checkFetchStatus) as Promise<{ firebaseId: string }>;
  }

  static updateOrganization(accountId: string, organization: ApiOrganization, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/client-accounts/${accountId}`, {
      method: "PATCH",
      headers: {
        ...getAuthorizationHeaders(user),
        ...httpPostHeaders
      },
      body: JSON.stringify(organization)
    }).then(checkFetchStatus) as Promise<void>;
  }
}
