import {sand, sandbox} from "../../../tests/test_utils/setup_tests";
import {expect} from 'chai';

it("can spy and stuff", () => {
  let a = sandbox.spy();
  a("asdasd");
  expect(a).to.have.been.calledWithMatch("asdasd");
});
