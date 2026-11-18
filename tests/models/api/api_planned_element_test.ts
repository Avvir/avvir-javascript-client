import {expect} from "chai";

import ApiPlannedElement from "../../../source/models/api/api_planned_element";

describe("ApiPlannedElement", () => {
  describe("statusUpdatedByAlgorithm", () => {
    it("carries statusUpdatedByAlgorithm through the constructor", () => {
      const apiPlannedElement = new ApiPlannedElement({statusUpdatedByAlgorithm: true});

      expect(apiPlannedElement.statusUpdatedByAlgorithm).to.eq(true);
    });

    it("is undefined when not provided", () => {
      const apiPlannedElement = new ApiPlannedElement({});

      expect(apiPlannedElement.statusUpdatedByAlgorithm).to.be.undefined;
    });
  });
});
