import { User } from "../utilities/get_authorization_headers";
import { AssociationIds } from "../typings/type_aliases";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {ApiComment, ApiCommentThread} from "../models";

export function toCommentThreadUrl({ projectId, floorId, scanDatasetId, viewId, wbsCodes }: AssociationIds) {
  let url = `${Http.baseUrl()}/projects/${projectId}/comments/threads`;
  if (floorId || scanDatasetId || viewId || wbsCodes) {
    const params = [];
    if (floorId) {
      params.push(`floorId=${floorId}`);
    }

    if (scanDatasetId) {
      params.push(`scanDatasetId=${scanDatasetId}`);
    }

    if (viewId) {
      params.push(`viewId=${viewId}`);
    }

    if(wbsCodes) {
      params.push(`wbsCode=${wbsCodes.join(",")}`)
    }
    url += "?" + params.join("&");
  }
  return url;
}

export default class CommentApi {

  static getCommentThreads(ids: AssociationIds, user: User): Promise<ApiCommentThread[]> {
    const url = toCommentThreadUrl(ids);
    return Http.get(url, user) as unknown as Promise<ApiCommentThread[]>;
  }

  static createCommentThread(ids: AssociationIds, body: ApiCommentThread, user: User): Promise<ApiCommentThread> {
    const url = toCommentThreadUrl(ids);
    return Http.post(url, user, body) as unknown as Promise<ApiCommentThread>;
  }

  static createCommentForThread({ projectId, commentThreadId }: AssociationIds, body: ApiComment, user: User): Promise<ApiComment> {
    const url = `${Http.baseUrl()}/projects/${projectId}/comments/threads/${commentThreadId}`;
    return Http.post(url, user, body) as unknown as Promise<ApiComment>;
  }

  static updateComment({ projectId, commentId }: AssociationIds, body: ApiComment, user: User): Promise<ApiComment> {
    const url = `${Http.baseUrl()}/projects/${projectId}/comments/${commentId}`;
    return Http.put(url, user, body) as unknown as Promise<ApiComment>;
  }

}

makeErrorsPretty(CommentApi);
