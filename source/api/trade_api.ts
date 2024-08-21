import ApiCapturedTradeCost from "../models/api/trade/api_captured_trade_cost";
import ApiPlannedTradeCost from "../models/api/trade/api_planned_trade_cost";
import ApiTrade from "../models/api/trade/api_trade";
import ApiTradeCost from "../models/api/trade/api_trade_cost";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import { AssociationIds, User } from "../models";

export default class TradeApi {
  static listTrades({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown`;
    return Http.get(url, user) as unknown as Promise<ApiTrade[]>;
  }

  static listPlannedTradeCosts({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/planned-costs`;
    return Http.get(url, user) as unknown as Promise<ApiPlannedTradeCost[]>;
  }

  static listCapturedTradeCosts({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/captured-costs`;
    return Http.get(url, user) as unknown as Promise<ApiCapturedTradeCost[]>;
  }

  static listTradeCosts({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/costs`;
    return Http.get(url, user) as unknown as Promise<ApiTradeCost[]>;
  }
}

makeErrorsPretty(TradeApi);
