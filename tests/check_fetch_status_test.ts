import { sandbox } from "./test_utils/setup_tests";
import { expect } from "chai";
import { match } from "sinon";
import { Response, Headers } from "node-fetch";

import checkFetchStatus from "../source/javascript/services/gateway_api_services/check_fetch_status";
import ResponseError from "../source/javascript/models/response_error";
import WebGatewayApi from "../source/javascript/services/gateway_api_services/web_gateway_api";

describe("#checkFetchStatus", () => {
  describe("when the request is successful", () => {
    let response;
    beforeEach(() => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      response = new Response(`{"some": "body once told me"}`, { url: "https://some-url.com/some-slug", headers });
    });

    it("resolves with the deserialized request body", () => {
      return checkFetchStatus(response).then((result) => {
        expect(result).to.deep.eq({ some: "body once told me" });
      });
    });

    describe("when the response body is not json", () => {
      let response;
      beforeEach(() => {
        response = new Response("some text", { url: "https://some-url.com/some-slug" });
      });

      it("resolves with the body as text", () => {
        return checkFetchStatus(response).then((result) => {
          expect(result).to.eq("some text");
        });
      });
    });
  });

  describe("when the request fails", () => {
    let rejectionSpy, response;
    beforeEach(() => {
      rejectionSpy = sandbox.spy();

      response = new Response(`{"message": "some body once told me"}`, {
        url: `${WebGatewayApi.baseUrl}/some-slug`,
        status: 404
      });
    });

    it("rejects the promise", () => {
      return checkFetchStatus(response)
        .catch(rejectionSpy)
        .finally(() => {
          expect(rejectionSpy).to.have.been.calledWith(match.instanceOf(ResponseError));
        });
    });

    it("includes the response body in the thrown error", () => {
      return checkFetchStatus(response)
        .catch(rejectionSpy)
        .finally(() => {
          expect(rejectionSpy).to.have.been.calledWithMatch({
            message: "404 Not Found: 'some body once told me' at `.../some-slug`",
            responseBody: { message: "some body once told me" },
            status: 404
          });
        });
    });
  });
});
