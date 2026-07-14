// @ts-nocheck
import ApiOrganization from "../models/api/api_organization";
import getAuthorizationHeaders, { User } from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ApiUserForOrganization from "../models/api/api_user_for_organization";
import { ApiScanDatasetStats } from "../models/api/api_scandataset_stats";
import {ApiOrganizationMember} from "../models";
import ApiCssEligibleUser from "../models/api/api_css_eligible_user";
import ApiCssContact from "../models/api/api_css_contact";
import ApiCssContactSummary from "../models/api/api_css_contact_summary";
import ApiSupportRequest from "../models/api/api_support_request";

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

  static getUsersForOrganization(organizationId: string, user: User): Promise<ApiUserForOrganization[]> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/users`;
    return Http.get(url, user);
  }

  static getOrganizationMembers(organizationId: string, user: User): Promise<ApiOrganizationMember[]> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/members`;
    return Http.get(url, user);
  }

  static removeOrganizationMember(organizationId: string, userId: number, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/members/${userId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
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

  static getCssEligibleUsers(organizationId: string, user: User): Promise<ApiCssEligibleUser[]> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/css-eligible-users`;
    return Http.get(url, user) as unknown as Promise<ApiCssEligibleUser[]>;
  }

  static listCssContacts(organizationId: string, user: User): Promise<ApiCssContact[]> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/css-contacts`;
    return Http.get(url, user) as unknown as Promise<ApiCssContact[]>;
  }

  static createCssContact(organizationId: string, userId: number, user: User): Promise<ApiCssContact> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/css-contacts`;
    return Http.post(url, user, { userId }) as unknown as Promise<ApiCssContact>;
  }

  static deleteCssContact(organizationId: string, contactId: number, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/client-accounts/${organizationId}/css-contacts/${contactId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }

  static getCssContactsForOrganization(organizationId: string, user: User): Promise<ApiCssContactSummary[]> {
    let url = `${Http.baseUrl()}/support-center/css-contacts?organizationId=${encodeURIComponent(organizationId)}`;
    return Http.get(url, user) as unknown as Promise<ApiCssContactSummary[]>;
  }

  static submitSupportRequestForOrganization(organizationId: string,
                                             { description, sourcePage, files }: { description: string, sourcePage?: string, files?: File[] },
                                             user: User): Promise<ApiSupportRequest> {
    let url = `${Http.baseUrl()}/support-center/support-requests?organizationId=${encodeURIComponent(organizationId)}`;

    let multipartFormData = new FormData();
    multipartFormData.append("description", description);
    if (sourcePage != null) {
      multipartFormData.append("sourcePage", sourcePage);
    }
    (files || []).forEach((file) => {
      multipartFormData.append("attachments", file, file.name);
    });

    return Http.fetch(url, {
      method: "POST",
      headers: {
        ...getAuthorizationHeaders(user)
      },
      body: multipartFormData
    }) as unknown as Promise<ApiSupportRequest>;
  }
}

makeErrorsPretty(OrganizationApi);
