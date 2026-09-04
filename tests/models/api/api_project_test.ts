import {expect} from "chai";

import ApiProject from "../../../source/models/api/api_project";

describe("ApiProject", () => {
  describe("isLocked", () => {
    it("carries isLocked through the constructor", () => {
      const apiProject = new ApiProject({isLocked: true});

      expect(apiProject.isLocked).to.eq(true);
    });

    it("is undefined when not provided", () => {
      const apiProject = new ApiProject({});

      expect(apiProject.isLocked).to.be.undefined;
    });
  });
});