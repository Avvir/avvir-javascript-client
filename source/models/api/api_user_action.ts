import {ApiActionPayload} from "./api_action_payload";
import UserActionType from "../enums/user_action_type";
import ApiUser from "./api_user";
import {DateLike} from "./type_aliases";
import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";

export class ApiUserAction {
  constructor(user: ApiUser,
              userEmail: string,
              type: UserActionType,
              createdAt: DateLike,
              payload: ApiActionPayload[]) {
    this.user = user;
    this.userEmail = userEmail;
    this.type = type;
    this.payload = payload;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
  }

  user: ApiUser;
  createdAt: number | null;
  userEmail: string;
  type: UserActionType;
  payload: ApiActionPayload[];
}
