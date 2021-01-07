import {AssociationIds} from "type_aliases";
import Http from "./http";
import makeErrorsPretty from "./make_errors_pretty";
import {User} from "./get_authorization_headers";

class PipelineApi {
  static triggerPipeline(associationIds: AssociationIds, body = {}, user: User) {
    let {accountId, projectId, floorId, scanDatasetId} = associationIds;
    const url = `${Http.baseUrl}/pipeline/${accountId}/${projectId}/${floorId}/${scanDatasetId}/trigger`;
    return Http.post(url, user, body);
  }
}

export default makeErrorsPretty(PipelineApi);


