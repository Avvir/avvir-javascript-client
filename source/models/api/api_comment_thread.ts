import ApiUser from "./api_user";
import {ApiComment} from "./api_comment";

export class ApiCommentThread {
  constructor({id, author, viewId, comments}: Partial<ApiCommentThread> = {}) {
    this.id = id;
    this.author = author;
    this.viewId = viewId;
    this.comments = comments;
  }

  id: number;
  author: ApiUser;
  viewId: number;
  comments: ApiComment[];
}
