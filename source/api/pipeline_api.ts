import {AssociationIds} from "../models";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {User} from "../utilities/get_authorization_headers";
import ApiArgoResponse from "../models/api/api_argo_response";
import ApiPipeline, {ApiPipelineArgument} from "../models/api/api_pipeline";

export default class PipelineApi {
  static triggerJobStepsPipeline(associationIds: AssociationIds, body = {}, user: User): Promise<ApiArgoResponse> {
    let {accountId, projectId, floorId, scanDatasetId} = associationIds;
    const url = `${Http.baseUrl()}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return Http.post(url, user, body) as unknown as Promise<ApiArgoResponse>;
  }

  static triggerPipeline(body: ApiPipelineArgument = {}, user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines`;
    return Http.post(url, user, body) as unknown as Promise<ApiPipeline>;
  }

  static checkPipelineStatus({projectId}: AssociationIds, pipelineId: number, user: User): Promise<ApiPipeline> {
    const url = `${Http.baseUrl()}/pipelines/${pipelineId}`;
    return Http.get(url, user) as unknown as Promise<ApiPipeline>;
  }

  static getFloorPipelines({projectId, floorId}: AssociationIds, user: User): Promise<ApiPipeline[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/pipelines`;
    console.log(url);
    return Http.get(url, user) as unknown as Promise<ApiPipeline[]>;
  }
}

makeErrorsPretty(PipelineApi)
