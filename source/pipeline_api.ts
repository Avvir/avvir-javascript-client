import WebGatewayApi from "./web_gateway_api";
import {AssociationIds} from "type_aliases";
import Http from "./http";
import makeErrorsPretty from "./make_errors_pretty";

class PipelineApi {
  static triggerPipeline(associationIds: AssociationIds, body = {}, user: User) {
    let {accountId, projectId, floorId, scanDatasetId} = associationIds;
    const url = `${Http.baseUrl}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return Http.post(url, user, body);
  }
}

export default makeErrorsPretty(PipelineApi);


