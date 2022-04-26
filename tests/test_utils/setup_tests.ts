import chai from "chai";
import sinon, { SinonSandbox } from "sinon";
import SinonChai from "sinon-chai";
import ChaiSpies from "chai-spies";
import chaiAlmost from "chai-almost";
import ChaiDatetime from "chai-datetime";
import fetchMock from "fetch-mock";
import Config from "../../source/config";
import beVeryLike from "./chai_be_very_like";

const chaiRoughly = require("chai-roughly");
const chaiJsonEqual = require("chai-json-equal");
const chaiThings = require("chai-things");

chai.use(beVeryLike);
chai.use(SinonChai);
chai.use(ChaiSpies);
chai.use(chaiRoughly);
chai.use(chaiJsonEqual);
chai.use(chaiAlmost(1.0e-6));
chai.use(ChaiDatetime);
chai.use(chaiThings);

export let sandbox: SinonSandbox;

sandbox = sinon.createSandbox();

beforeEach(() => {
  Config.setConfigurationFromEnvironmentVariable();
  sandbox.restore();

  sandbox = sinon.createSandbox();
});

afterEach((done) => {
  fetchMock.flush().then(() => done());
  fetchMock.restore();
  // Don't put things here. put them in the beforeEach instead.
});
