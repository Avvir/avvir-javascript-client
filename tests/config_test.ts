import { expect } from "chai";

import Config from "../source/config";

describe("Config", () => {
  let gatewayUrl, environment;
  beforeEach(() => {
    gatewayUrl = process.env["AVVIR_GATEWAY_URL"];
    environment = process.env["AVVIR_ENVIRONMENT"];
    delete process.env["AVVIR_GATEWAY_URL"];
    delete process.env["AVVIR_ENVIRONMENT"];
  });

  afterEach(() => {
    process.env["AVVIR_GATEWAY_URL"] = gatewayUrl;
    process.env["AVVIR_ENVIRONMENT"] = environment;
  });

  describe("when setting the defaults for each built-in environment", () => {

    beforeEach(() => {
      Config.setConfigurationFromEnvironmentVariable();
    });

    it("has the correct values for acceptance", () => {
      Config.setConfigurationForEnvironment("acceptance");
      let conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("https://acceptance-api.avvir.io");
      expect(conf["AVVIR_ENVIRONMENT"]).to.eq("acceptance");
      process.env["AVVIR_GATEWAY_URL"] = "http://some-url";
      Config.setConfigurationForEnvironment("acceptance");
      conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("http://some-url");
    });

    it("has the correct values for production", () => {
      Config.setConfigurationForEnvironment("production");
      let conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("https://api.avvir.io");
      expect(conf["AVVIR_ENVIRONMENT"]).to.eq("production");
      process.env["AVVIR_GATEWAY_URL"] = "http://some-url";
      Config.setConfigurationForEnvironment("production");
      conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("http://some-url");
    });

    it("has the correct values for local production", () => {
      Config.setConfigurationForEnvironment("local-production");
      let conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("https://api.avvir.io");
      expect(conf["AVVIR_ENVIRONMENT"]).to.eq("local-production");
      process.env["AVVIR_GATEWAY_URL"] = "http://some-url";
      Config.setConfigurationForEnvironment("local-production");
      conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("http://some-url");
    });

    it("has the correct values for qa", () => {
      Config.setConfigurationForEnvironment("qa");
      let conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("https://qa-api.avvir.io");
      expect(conf["AVVIR_ENVIRONMENT"]).to.eq("qa");
      process.env["AVVIR_GATEWAY_URL"] = "http://some-url";
      Config.setConfigurationForEnvironment("qa");
      conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("http://some-url");
    });

    it("has the correct values for local", () => {
      Config.setConfigurationForEnvironment("local");
      let conf = Config.getConfiguration();
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("http://localhost:8080");
      expect(conf["AVVIR_ENVIRONMENT"]).to.eq("local");
      process.env["AVVIR_GATEWAY_URL"] = "http://some-url";
      Config.setConfigurationForEnvironment("local");
      conf = Config.getConfiguration();
      // local built-in environment doesn't get overridden
      expect(conf["AVVIR_GATEWAY_URL"]).to.eq("http://localhost:8080");
    });


  });
});
