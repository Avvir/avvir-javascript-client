import { expect } from "chai";

import getAuthorizationHeaders from "../../source/utilities/get_authorization_headers";
import {BASIC, FIREBASE, GATEWAY_JWT, HXAUTH_ACCESS_TOKEN} from "../../source/models/enums/user_auth_type";

describe("#getAuthorizationHeaders", () => {
  describe("when the user signed in using firebase auth directly", () => {
    let user;
    beforeEach(() => {
      user = {
        authType: FIREBASE,
        firebaseUser: {
          idToken: "some-firebase-jwt-token"
        }
      };
    });

    it("returns an authorization header with the firebase id token", () => {
      expect(getAuthorizationHeaders(user)).to.deep.eq({ firebaseIdToken: "some-firebase-jwt-token" });
    });
  });

  describe("when the user signed in through the gateway", () => {
    let user;
    beforeEach(() => {
      user = {
        authType: GATEWAY_JWT,
        firebaseUser: {
          idToken: "some-firebase-jwt-token"
        },
        gatewayUser: {
          idToken: "some-gateway-jwt-token"
        }
      };
    });

    it("returns an authorization header with the gateway jwt token", () => {
      expect(getAuthorizationHeaders(user)).to.deep.eq({ Authorization: "Bearer some-gateway-jwt-token" });
    });
  });

  describe("when the user signed in through HxAuth", () => {
    let user;
    beforeEach(() => {
      user = {
        authType: HXAUTH_ACCESS_TOKEN,
        hxAuthUser: {
          accessToken: "some-hxauth-access-token"
        },
      };
    });

    it("returns an authorization header with the HxAuth access token", () => {
      expect(getAuthorizationHeaders(user)).to.deep.eq({ Authorization: "Bearer some-hxauth-access-token" });
    });
  });

  describe("when the user is in the midst of signing in", () => {
    let user;
    beforeEach(() => {
      user = {
        authType: BASIC,
        username: "someuser@example.com",
        password: "some-password-123"
      };
    });

    it("returns a basic authorization header", () => {
      expect(getAuthorizationHeaders(user).Authorization.startsWith("Basic ")).to.eq(true);
    });
  });

  describe("when the user is not signed in", () => {
    it("returns empty", () => {
      expect(getAuthorizationHeaders(null)).to.eq(null);
    });
  });
});
