import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import { DateConverter } from "../converters";

import type { ApiCapturedTradeCost, ApiPlannedTradeCost, ApiTrade, ApiTradeCost, User } from "../models";
import type { AssociationIds } from "type_aliases";

export default class TradeApi {
  static listTrades({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown`;
    return Http.get(url, user) as unknown as Promise<ApiTrade[]>;
  }

  static listPlannedTradeCosts({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/planned-costs`;
    return Http.get(url, user) as unknown as Promise<ApiPlannedTradeCost[]>;
  }

  static listCapturedTradeCosts({ projectId }: AssociationIds, scanDate: Date, user: User) {
    let url: string;
    if (scanDate == null) {
      url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/captured-costs`;
    } else {
      url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/captured-costs?capture-date=${DateConverter.dateToLocalDate(
        scanDate)}`;
    }
    return Http.get(url, user) as unknown as Promise<ApiCapturedTradeCost[]>;
  }

  static refreshCapturedTradeCosts(user: User) {
    const projects = 'all';
    const url = `${Http.baseUrl()}/projects/${projects}/trade-breakdown/update-captured-trade-costs`;
    return Http.post(url, user) as unknown as Promise<void>;
  }

  static checkStatusOfLastRefreshCapturedTradeCosts(user: User) {
    const projects = 'all';
    const url = `${Http.baseUrl()}/projects/${projects}/trade-breakdown/check-status-update-captured-trade-costs`;
    return Http.get(url, user) as unknown as Promise<boolean>;
  }

  static listTradeCosts({ projectId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/costs`;
    return Http.get(url, user) as unknown as Promise<ApiTradeCost[]>;
  }

  static updateTradeCostReportedQuantity({ projectId }: AssociationIds,
                                         tradeCode: string,
                                         reportedQuantity: number,
                                         user: User)
  {
    const url = `${Http.baseUrl()}/projects/${projectId}/trade-breakdown/${tradeCode}/reported-quantity`;
    return Http.put(url, user, reportedQuantity) as unknown as Promise<ApiTradeCost>;
  }
}

makeErrorsPretty(TradeApi);
