import ApiWorkPackage from "../models/api/api_work_package";
import Http from "../utilities/http";
import { AssociationIds, User } from "../models";
import makeErrorsPretty from "../utilities/make_errors_pretty";

export default class WorkPackageApi {
  static listWorkPackages({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/work-packages/list`;
    return Http.get(url, user) as unknown as Promise<ApiWorkPackage[]>;
  }

  static createWorkPackage({ projectId }: AssociationIds, apiWorkPackage: ApiWorkPackage, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/work-packages`;
    return Http.post(url, user, apiWorkPackage) as unknown as Promise<ApiWorkPackage>;
  }

  static deleteWorkPackage({ projectId }: AssociationIds, workPackageId: number, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/work-packages/${workPackageId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }

  static updateWorkPackage({ projectId }: AssociationIds, workPackageId: number, apiWorkPackage: ApiWorkPackage & { trades: string[] }, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/work-packages/${workPackageId}`;
    return (Http.patch(url, user, apiWorkPackage) as unknown as Promise<ApiWorkPackage>);
  }
}

makeErrorsPretty(WorkPackageApi);
