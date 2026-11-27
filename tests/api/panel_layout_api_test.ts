import {describe} from "mocha";
import {expect} from "chai";
import fetchMock from "fetch-mock";
import _ from "underscore";

import {sandbox} from "../test_utils/setup_tests";
import Config from "../../source/config";
import PanelLayoutApi from "../../source/api/panel_layout_api";
import {ApiUserPanelLayout, GATEWAY_JWT, User, USER} from "../../source";
import Http from "../../source/utilities/http";

describe("PanelLayoutApi", () => {
  let user: User;
  let layoutsUrl: string;
  let modeUrl: string;

  beforeEach(() => {
    fetchMock.resetBehavior();
    user = {
      authType: GATEWAY_JWT,
      gatewayUser: {idToken: "some-firebase.id.token", role: USER}
    };
    layoutsUrl = `${Http.baseUrl()}/users/accounts/self/panel-layouts`;
    modeUrl = `${layoutsUrl}/qualityControlBim`;
  });

  describe("::getPanelLayouts", () => {
    beforeEach(() => {
      fetchMock.get(layoutsUrl, {
        status: 200,
        body: [{
          pageName: "PROJECT_VIEWER",
          mode: "qualityControlBim",
          layout: {layout: {type: "row"}},
          layoutVersion: 1,
          updatedAt: 1764201600
        }]
      });
    });

    it("gets the user's layout for each mode they customized", () => {
      return PanelLayoutApi.getPanelLayouts(user).then((panelLayouts) => {
        expect(fetchMock.lastCall()[0]).to.eq(layoutsUrl);
        expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        expect(panelLayouts[0].mode).to.eq("qualityControlBim");
        expect(panelLayouts[0].layout).to.deep.eq({layout: {type: "row"}});
        expect(panelLayouts[0].layoutVersion).to.eq(1);
      });
    });

    it("makes each layout an ApiUserPanelLayout, keeping the gateway's updatedAt instant", () => {
      return PanelLayoutApi.getPanelLayouts(user).then((panelLayouts) => {
        expect(panelLayouts[0]).to.be.instanceOf(ApiUserPanelLayout);
        expect(panelLayouts[0].updatedAt).to.eq(1764201600);
      });
    });

    describe("when the request fails", () => {
      beforeEach(() => {
        fetchMock.get(layoutsUrl,
          {status: 500, body: {message: "some error message"}, headers: {"ContentType": "application/json"}},
          {overwriteRoutes: true});
      });

      it("calls the shared error handler", () => {
        sandbox.stub(Config, "sharedErrorHandler");
        return PanelLayoutApi.getPanelLayouts(user)
          .catch(_.noop)
          .finally(() => {
            expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
              action: "getPanelLayouts",
              error: {verboseMessage: "500 Internal Server Error: 'some error message' at `.../users/accounts/self/panel-layouts`"}
            });
          });
      });
    });
  });

  describe("::savePanelLayout", () => {
    beforeEach(() => {
      fetchMock.put(modeUrl, 200);
    });

    it("puts the layout and its version to the mode", () => {
      return PanelLayoutApi.savePanelLayout("qualityControlBim", {layout: {type: "row"}}, 1, user).then(() => {
        expect(fetchMock.lastCall()[0]).to.eq(modeUrl);
        expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
        expect(JSON.parse(fetchMock.lastOptions().body as string)).to.deep.eq({layout: {layout: {type: "row"}}, layoutVersion: 1});
      });
    });
  });

  describe("::resetPanelLayout", () => {
    beforeEach(() => {
      fetchMock.delete(modeUrl, 200);
    });

    it("deletes the user's layout for the mode", () => {
      return PanelLayoutApi.resetPanelLayout("qualityControlBim", user).then(() => {
        expect(fetchMock.lastCall()[0]).to.eq(modeUrl);
        expect(fetchMock.lastOptions().method).to.eq("DELETE");
        expect(fetchMock.lastOptions().headers.Authorization).to.eq("Bearer some-firebase.id.token");
      });
    });
  });
});
