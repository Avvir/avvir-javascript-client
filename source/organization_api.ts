import ApiOrganization from "./models/api/api_organization";
import {User} from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import Http from "./http";
import makeErrorsPretty from "./make_errors_pretty";

class OrganizationApi {
  static listOrganizations(user: User) {
    let url = `${Http.baseUrl}/client-accounts`;
    return Http.get(url, user);
  }

  static getOrganization(organizationId: string, user: User) {
    let url = `${Http.baseUrl}/client-accounts/${organizationId}`;
    return Http.get(url, user);
  }

  static getOrganizationName(organizationId: string, user: User) {
    let url = `${Http.baseUrl}/client-accounts/${organizationId}/name`;
    return Http.get(url, user);
  }

  static createOrganization(organization: ApiOrganization, user: User) {
    let url = `${Http.baseUrl}/client-accounts`;
    return Http.post(url, user, organization);
  }

  static updateOrganization(accountId: string, organization: ApiOrganization, user: User) {
    let url = `${Http.baseUrl}/client-accounts/${accountId}`;
    return Http.patch(url, user, organization);
  }
}

export default makeErrorsPretty(OrganizationApi);