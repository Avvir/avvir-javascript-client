import chai from "chai";
import sinon, { SinonSandbox, SinonStub } from "sinon";
import SinonChai from "sinon-chai";
import * as PropTypes from "prop-types";
import { configure as configureEnzyme, mount, MountRendererProps, ReactWrapper, shallow, ShallowRendererProps } from "enzyme";
import ChaiSpies from "chai-spies";
import chaiAlmost from "chai-almost";
import ChaiDatetime from "chai-datetime";
import fetchMock from "fetch-mock";
import React, { Component, ReactElement } from "react";

import beVeryLike from "./chai_be_very_like";
import FileInformationApi from "../../src/javascript/services/gateway_api_services/file_information_api";
import FloorApi from "../../src/javascript/services/gateway_api_services/floor_api";
import meshStore from "../../src/javascript/services/utilities/threejs_utilities/mesh_store";
import PipelineApi from "../../src/javascript/services/gateway_api_services/pipeline_api";
import ProjectApi from "../../src/javascript/services/gateway_api_services/project_api";
import ScanDatasetApi from "../../src/javascript/services/gateway_api_services/scan_dataset_api";
import WebGatewayApi from "../../src/javascript/services/gateway_api_services/web_gateway_api";
import { DeepPartial } from "../../src/typings/type_aliases";

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


beforeEach(() => {
  sandbox = sinon.createSandbox();
  sandbox.stub(global, "requestAnimationFrame").callsFake(rafStub.add);
  sandbox.stub(window, "requestAnimationFrame").callsFake(rafStub.add);
  meshStore.clearAll();
});

afterEach((done) => {
  sandbox.restore();
  fetchMock.flush().then(() => done());
  fetchMock.restore();
  rafStub.reset();
});
