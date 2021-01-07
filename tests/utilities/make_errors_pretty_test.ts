import {expect} from "chai";
import Config from "../../source/utilities/config";
import makeErrorsPretty from "../../source/utilities/make_errors_pretty";
import {sandbox} from "../test_utils/setup_tests";

describe("makeErrorsPretty", () => {
  let clazz;
  beforeEach(() => {
    clazz = class SomeClass {
      static doSomething(first, second) {
        return Promise.resolve({
          ok: false,
          status: 500,
          headers: {has: () => false},
          json: () => Promise.resolve({
            message: "some unfortunate error",
          }),
          url: process.env.AVVIR_GATEWAY_URL + "/some-url-path"
        })
      }
    }
  });

  it("changes each class method to call sharedErrorHandler when an api error is returned", () => {
    sandbox.stub(Config, "sharedErrorHandler");
    makeErrorsPretty(clazz);

    return clazz.doSomething("foo", "bar").then(() => {
      expect(Config.sharedErrorHandler).to.have.been.calledWithMatch({
        error: {
          message: "some unfortunate error",
          verboseMessage: "500 Internal Server Error: 'some unfortunate error' at `.../some-url-path`"
        },
        action: "doSomething",
        arguments: ["foo", "bar"]
      });
    })
  });
});