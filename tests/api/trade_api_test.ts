import { expect } from "chai";
import { describe } from "mocha";
// @ts-ignore
import fetchMock from "fetch-mock";

import Http from "../../source/utilities/http";
import TradeApi from "../../source/api/trade_api";
import { UserAuthType } from "../../source/models/enums/user_auth_type";
import { User } from "../../source/models/domain/user";

describe("TradeApi", () => {
  beforeEach(() => {
    fetchMock.resetBehavior();
  });

  describe("::listTrades", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown`, 200);
    });

    it("makes a request to the gateway api", () => {
      TradeApi.listTrades({ projectId: "some-project-id" }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      TradeApi.listTrades({ projectId: "some-project-id" }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::listPlannedTradeCosts", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/planned-costs`, 200);
    });

    it("makes a request to the gateway api", () => {
      TradeApi.listPlannedTradeCosts({ projectId: "some-project-id" }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/planned-costs`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      TradeApi.listPlannedTradeCosts({ projectId: "some-project-id" }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::listCapturedTradeCosts", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/captured-costs`, 200);
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/captured-costs?capture-date=2018-04-01`, 200);
    });

    it("makes a request to the gateway api", () => {
      TradeApi.listCapturedTradeCosts({ projectId: "some-project-id" }, null, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/captured-costs`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      TradeApi.listCapturedTradeCosts({ projectId: "some-project-id" }, null, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });

    describe("when a scan date is passed in", () => {
      it("includes it in the request's query params", () => {
        TradeApi.listCapturedTradeCosts({ projectId: "some-project-id" }, new Date("2018-04-01"), {
          authType: UserAuthType.GATEWAY_JWT,
          gatewayUser: { idToken: "some-firebase.id.token" }
        } as User);
        const fetchCall = fetchMock.lastCall();

        expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/captured-costs?capture-date=2018-04-01`);
      });
    });
  });

  describe("::listTradeCosts", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/costs`, 200);
    });

    it("makes a request to the gateway api", () => {
      TradeApi.listTradeCosts({ projectId: "some-project-id" }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/costs`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      TradeApi.listTradeCosts({ projectId: "some-project-id" }, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });

  describe("::updateTradeCostReportedQuantity", () => {
    beforeEach(() => {
      fetchMock.put(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/code/reported-quantity`, 200);
    });

    it("makes a request to the gateway api", () => {
      TradeApi.updateTradeCostReportedQuantity({ projectId: "some-project-id" }, "code", 12, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl()}/projects/some-project-id/trade-breakdown/code/reported-quantity`);
      expect(fetchCall[1].body).to.eq("12");
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("includes the authorization headers", () => {
      TradeApi.updateTradeCostReportedQuantity({ projectId: "some-project-id" }, "code", 12, {
        authType: UserAuthType.GATEWAY_JWT,
        gatewayUser: { idToken: "some-firebase.id.token" }
      } as User);

      expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
    });
  });
});
