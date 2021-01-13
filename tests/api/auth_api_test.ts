import {GatewayUser} from "../../source/utilities/get_authorization_headers";
import {GATEWAY_JWT} from "../../source/models/enums/user_auth_type";
import {expect} from "chai";
import fetchMock from "fetch-mock";
import Http from "../../source/utilities/http";
import AuthApi from "../../source/api/auth_api";
import {sandbox} from "../test_utils/setup_tests";
import JsonWebToken from "jsonwebtoken";

describe("AuthApi", () => {
  describe("#login", () => {
    beforeEach(() => {
      fetchMock.get(`${Http.baseUrl}/login`, {
        status: 200,
        body: {storageToken: "some-auth-token", redirectUrl: "/projects/some-project-id"},
        headers: {"Authorization": "Bearer some-jwt-token"}
      });

      sandbox.stub(JsonWebToken, "decode").returns({payload: {role: "USER"}})
    });

    it("makes a call to the login endpoint", () => {
      AuthApi.login("some-username", "some-password");
      const fetchCall = fetchMock.lastCall();

      expect(fetchCall[0]).to.eq(`${Http.baseUrl}/login`);
      expect(fetchMock.lastOptions().headers.Accept).to.eq("application/json");
    });

    it("sends the request with an Authorization header", () => {
      AuthApi.login("some-username", "some-password");
      const lastFetchOpts = fetchMock.lastOptions();
      const base64Data = Buffer.from("some-username:some-password").toString("base64");
      const authHeader = `Basic ${base64Data}`;

      expect(lastFetchOpts.headers.Authorization).to.eq(authHeader);
    });

    it("resolves to a gateway user", () => {
      return AuthApi.login("some-user", "somePa$$").then((user: GatewayUser) => {
        expect(user.authType).to.eq(GATEWAY_JWT);
        expect(user.gatewayUser.idToken).to.eq("some-auth-token");
        expect(user.gatewayUser.role).to.eq("USER")
      });
    });
  });
});