import {AssociationIds} from "type_aliases";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {User} from "../utilities/get_authorization_headers";
import ApiArgoResponse from "../models/api/api_argo_response";

class PipelineApi {
  static triggerPipeline(associationIds: AssociationIds, body = {}, user: User): Promise<ApiArgoResponse> {
    let {accountId, projectId, floorId, scanDatasetId} = associationIds;
    const url = `${Http.baseUrl}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return Http.post(url, user, body);
  }
}

makeErrorsPretty(PipelineApi)
export default PipelineApi;


