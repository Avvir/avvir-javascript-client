// @ts-nocheck
import {AssociationIds} from "type_aliases";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {User} from "../utilities/get_authorization_headers";
import ApiArgoResponse from "../models/api/api_argo_response";
import ApiPipeline, { ApiPipelineArgument } from "../models/api/api_pipeline";

export default class PipelineApi {
  static triggerJobStepsPipeline(associationIds: AssociationIds, body = {}, user: User): Promise<ApiArgoResponse> {
    let {accountId, projectId, floorId, scanDatasetId} = associationIds;
    const url = `${Http.baseUrl()}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return Http.post(url, user, body);
  }

  static triggerPipeline (body: ApiPipelineArgument = {}, user: User ): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines`;
    return Http.post(url, user, body);
  }

  static checkPipelineStatus({ projectId }: AssociationIds, pipelineId: number, user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines/${pipelineId}`;
    return Http.get(url, user);
  }

  static getFloorPipelines({ projectId, floorId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/pipelines`;
    console.log(url);
    return Http.get(url, user) as Promise<ApiPipeline[]>;
  }
}

makeErrorsPretty(PipelineApi)
