import chai from "chai";
import sinon, { SinonSandbox, SinonStub } from "sinon";
import SinonChai from "sinon-chai";
import ChaiSpies from "chai-spies";
import chaiAlmost from "chai-almost";
import ChaiDatetime from "chai-datetime";
import fetchMock from "fetch-mock";

import beVeryLike from "./chai_be_very_like";
import FileInformationApi from "../../source/api/file_information_api";
import FloorApi from "../../source/api/floor_api";
import PipelineApi from "../../source/api/pipeline_api";
import ProjectApi from "../../source/api/project_api";
import ScanDatasetApi from "../../source/api/scan_dataset_api";
import WebGatewayApi from "../../source/api/web_gateway_api";

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
export const sand = {box: null};
export const stubAllGatewayRoutes = () => {
  const propertyIsMethod = api => key => typeof api[key] === "function";
  const makeRouteResolve = (api, value) => (route) => {
    sandbox.stub(api, route).resolves(value);
  };
  Object.getOwnPropertyNames(WebGatewayApi).filter(propertyIsMethod(WebGatewayApi)).forEach(makeRouteResolve(WebGatewayApi, {}));
  Object.getOwnPropertyNames(ProjectApi).filter(propertyIsMethod(ProjectApi)).forEach(makeRouteResolve(ProjectApi, {}));
  Object.getOwnPropertyNames(FileInformationApi).filter(propertyIsMethod(FileInformationApi)).forEach(makeRouteResolve(FileInformationApi, {
    files: {},
    dataPresences: {}
  }));
  Object.getOwnPropertyNames(PipelineApi).filter(propertyIsMethod(PipelineApi)).forEach(makeRouteResolve(PipelineApi, {}));
  Object.getOwnPropertyNames(FloorApi).filter(propertyIsMethod(FloorApi)).forEach(makeRouteResolve(FloorApi, {}));
  Object.getOwnPropertyNames(ScanDatasetApi).filter(propertyIsMethod(ScanDatasetApi)).forEach(makeRouteResolve(ScanDatasetApi, {}));

  (FileInformationApi.listFloorFiles as SinonStub).resolves({});
  (WebGatewayApi.getPlannedBuildingElements as SinonStub).resolves([]);
};


sandbox = sinon.createSandbox();

beforeEach(() => {
  sandbox.restore();

  sandbox = sinon.createSandbox();
});

afterEach((done) => {
  fetchMock.flush().then(() => done());
  fetchMock.restore();
  // Don't put things here. put them in the beforeEach instead.
});
