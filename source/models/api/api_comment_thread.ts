import ApiUser from "./api_user";
import {ApiComment} from "./api_comment";

export class ApiCommentThread {
  constructor({id, author, viewId, comments, projectId, floorId, scanDatasetId, wbsCode, title}: Partial<ApiCommentThread> = {}) {
    this.id = id;
    this.author = author;
    this.viewId = viewId;
    this.comments = comments;
    this.projectId = projectId;
    this.floorId = floorId;
    this.scanDatasetId = scanDatasetId;
    this.wbsCode = wbsCode;
    this.title = title;
  }

  id: number;
  author: ApiUser;
  viewId: number;
  comments: ApiComment[];
  projectId: string;
  floorId?: string;
  scanDatasetId?: string;
  wbsCode?: string;
  title?: string;
}
