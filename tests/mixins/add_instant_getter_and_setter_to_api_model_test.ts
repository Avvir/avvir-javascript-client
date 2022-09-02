import { expect } from "chai";

import addInstantGetterAndSetterToApiModel from "../../source/mixins/add_instant_getter_and_setter_to_api_model";

function millisecondsToSeconds(milliseconds: number) {
  return milliseconds / 1000;
}

describe("#addInstantGetterAndSetterToApiModel", () => {
  let model;
  beforeEach(() => {
    model = {};
  });

  it("adds getters and setters for the provided field", () => {
    addInstantGetterAndSetterToApiModel(model, "dateField");
    const propertyDescription = Object.getOwnPropertyDescriptor(model, "dateField") || {};

    expect(propertyDescription).to.contain.keys(["get", "set"]);
    expect(propertyDescription.enumerable).to.eq(true);
  });

  describe("the added setter", () => {
    let date: Date;
    beforeEach(() => {
      date = new Date("2022-04-01");
    });

    it("converts date objects to an instant (UTC seconds)", () => {
      addInstantGetterAndSetterToApiModel(model, "dateField");
      model.dateField = date;

      expect(model.dateField).to.eq(millisecondsToSeconds(date.valueOf()));
    });

    it("converts strings to an instant (UTC seconds)", () => {
      addInstantGetterAndSetterToApiModel(model, "dateField");
      model.dateField = "Apr 1, 2022";

      expect(model.dateField).to.eq(millisecondsToSeconds(date.valueOf()));
    });

    it("converts invalid dates to null", () => {
      addInstantGetterAndSetterToApiModel(model, "dateField");
      model.dateField = "some non date";

      expect(model.dateField).to.eq(null);
    });
  });
});
