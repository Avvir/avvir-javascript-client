// @ts-nocheck
import ApiOrganization from "../models/api/api_organization";
import { User } from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ApiUserForOrganization from "../models/api/api_user_for_organization";
import { ApiScanDatasetStats } from "../models/api/api_scandataset_stats";

export default class OrganizationApi {
  static listOrganizations(user: User): Promise<ApiOrganization[]> {
    let url = `${Http.baseUrl()}/client-accounts`;
    return Http.get(url, user);
  }

  static getOrganization(organizationId: string, user: User):Promise<ApiOrganization> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}`;
    return Http.get(url, user);
  }

  static getOrganizationName(organizationId: string, user: User):Promise<string> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/name`;
    return Http.get(url, user);
  }

  static getUsersForOrganization(organizationId: string, user: User):Promise<ApiUserForOrganization[]> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/users`;
    return Http.get(url, user);
  }

  static createOrganization(organization: ApiOrganization, user: User): Promise<{ firebaseId: string }> {
    let url = `${Http.baseUrl()}/client-accounts`;
    return Http.post(url, user, organization);
  }

  static updateOrganization(organizationId: string, organization: ApiOrganization, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}`;
    return Http.patch(url, user, organization);
  }

  static getScanDataSetStats(user: User): Promise<ApiScanDatasetStats[]> {
    let url =  `${Http.baseUrl()}/client-accounts/scan-dataset-stats`;
    return Http.get(url, user) as unknown as Promise<ApiScanDatasetStats[]>;
  }
}

makeErrorsPretty(OrganizationApi);
