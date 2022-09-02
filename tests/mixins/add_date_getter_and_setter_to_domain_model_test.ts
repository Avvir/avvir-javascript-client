import { expect } from "chai";
import moment from "moment";

import addDateGetterAndSetterToDomainModel from "../../source/mixins/add_date_getter_and_setter_to_domain_model";

function millisecondsToSeconds(milliseconds: number) {
  return milliseconds / 1_000;
}

describe("#addDateGetterAndSetterToDomainModel", () => {
  let model;
  beforeEach(() => {
    model = {};
  });

  it("adds getters and setters for the provided field", () => {
    addDateGetterAndSetterToDomainModel(model, "dateField");
    const propertyDescription = Object.getOwnPropertyDescriptor(model, "dateField") || {};

    expect(propertyDescription).to.contain.keys(["get", "set"]);
    expect(propertyDescription.enumerable).to.eq(true);
  });

  describe("the added setter", () => {
    let instant: number;
    beforeEach(() => {
      instant = millisecondsToSeconds(new Date("2022-04-01").valueOf());
    });

    it("converts instants (UTC seconds) to a date object", () => {
      addDateGetterAndSetterToDomainModel(model, "dateField");
      model.dateField = instant;

      expect(model.dateField).to.deep.eq(new Date("2022-04-01"));
    });

    it("converts strings to a date object", () => {
      addDateGetterAndSetterToDomainModel(model, "dateField");
      model.dateField = "Apr 1, 2022";

      expect(model.dateField).to.deep.eq(new Date("2022-04-01"));
    });

    it("doesn't convert date objects", () => {
      addDateGetterAndSetterToDomainModel(model, "dateField");
      model.dateField = new Date("2022-04-01");

      expect(model.dateField).to.deep.eq(new Date("2022-04-01"));
    });

    it("converts moment objects to a date object", () => {
      addDateGetterAndSetterToDomainModel(model, "dateField");
      model.dateField = moment(new Date("2022-04-01"));

      expect(model.dateField).to.deep.eq(new Date("2022-04-01"));
    });

    it("converts invalid strings to an Invalid Date object", () => {
      addDateGetterAndSetterToDomainModel(model, "dateField");
      model.dateField = "some non date";

      expect(model.dateField.toString()).to.eq("Invalid Date");
    });

    it("converts invalid numbers to an Invalid Date object", () => {
      addDateGetterAndSetterToDomainModel(model, "dateField");
      model.dateField = new Date("2022-04-01").valueOf() * 10_000;

      expect(model.dateField.toString()).to.eq("Invalid Date");
    });
  });

  describe("when passed an initial value", () => {
    it("converts the value to a date and sets it on the field", () => {
      addDateGetterAndSetterToDomainModel(model, "dateField", millisecondsToSeconds(new Date("2022-04-01").valueOf()));

      expect(model.dateField).to.deep.eq(new Date("2022-04-01"));
    });
  });
});
