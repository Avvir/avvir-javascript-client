import ApiUser from "./api_user";
import {addInstantGetterAndSetterToApiModel} from "../../mixins";

export class ApiComment {
  constructor({id, author, text, commentThreadId, date, mentions}: Partial<ApiComment> = {}) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.commentThreadId = commentThreadId;
    this.mentions = mentions;
    addInstantGetterAndSetterToApiModel(this, "date", date);
  }

  date: number;
  id: number;
  author: ApiUser;
  text: string;
  commentThreadId: number;
  mentions: string[];
}
