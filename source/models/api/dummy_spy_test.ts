import {sandbox} from "../../../tests/test_utils/setup_tests";
import {expect} from 'chai';

it("can spy and stuff", () => {
  let a = sandbox.spy();
  a();
  expect(a).to.have.been.called();
});
