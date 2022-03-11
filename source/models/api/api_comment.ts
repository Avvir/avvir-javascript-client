import ApiUser from "./api_user";
import {addInstantGetterAndSetterToApiModel} from "../../mixins";

export class ApiComment {
  constructor({id, author, text, commentThreadId, date}: Partial<ApiComment> = {}) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.commentThreadId = commentThreadId;
    addInstantGetterAndSetterToApiModel(this, "date", date);
  }

  date: number;
  id: number;
  author: ApiUser;
  text: string;
  commentThreadId: number;
}
