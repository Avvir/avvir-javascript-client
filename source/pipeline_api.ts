import checkFetchStatus from "./check_fetch_status";
import getAuthorizationHeaders, {User} from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import {AssociationIds} from "type_aliases";
import {httpPostHeaders} from "./request_headers";
import Config from "./config";
import Http from "./http";
import makeErrorsPretty from "./make_errors_pretty";

class PipelineApi {
  static triggerPipeline(associationIds: AssociationIds, body = {}, user: User) {
    let {accountId, projectId, floorId, scanDatasetId} = associationIds;
    const url = `${WebGatewayApi.baseUrl}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return Http.post(url, user, body);
  }
}

export default makeErrorsPretty(PipelineApi);


