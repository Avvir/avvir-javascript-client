import { expect } from "chai";

import DateConverter from "../../source/converters/date_converter";

describe("DateConverter", () => {
  describe("#instantToDate", () => {
    it("converts an instant to a Date object", () => {
      const date = DateConverter.instantToDate(1535732352.137000);

      expect(date).to.equalTime(new Date(1535732352137));
    });

    describe("when it is called with null or undefined", () => {
      it("returns null", () => {
        const nullDate = DateConverter.instantToDate(null);
        // eslint-disable-next-line no-undefined
        const undefinedDate = DateConverter.instantToDate(undefined);

        expect(nullDate).to.eq(null);
        expect(undefinedDate).to.eq(null);
      });
    });

    describe("when it is called with something other than an instant", () => {
      it("returns null", () => {
        // @ts-ignore
        const nonInstantDate = DateConverter.instantToDate({ nonInstantKey: "this is not an instant" } as number);
        expect(nonInstantDate).to.eq(null);
      });
    });
  });

  describe("#dateToInstant", () => {
    it("converts a Date to a java Instant object", () => {
      const instant = DateConverter.dateToInstant(new Date(1535732352000));
      expect(instant).to.deep.eq(1535732352);
    });
  });

  describe("#dateToText", () => {
    let date: Date;
    beforeEach(() => {
      date = new Date(2018, 3, 1);
    });
 
    describe("when passed a format", () => {
      it("converts the date to that format", () => {
        const formattedDate = DateConverter.dateToText(date, "MMM DD, YY");

        expect(formattedDate).to.eq("Apr 01, 18");
      });
    });

    describe("when pass undefined or null", () => {
      it("returns an empty string", () => {
        // eslint-disable-next-line no-undefined
        const undefinedDate = DateConverter.dateToText(undefined, "l");
        const nullDate = DateConverter.dateToText(null, "l");

        expect(undefinedDate).to.eq("");
        expect(nullDate).to.eq("");
      });
    });
  });

  describe("#millisecondsToDate", () => {
    it("converts milliseconds to a date object", () => {
      const date = DateConverter.millisecondsToDate(1535732352000);

      expect(date).to.equalTime(new Date(1535732352000));
    });
  });

  describe("#tsvStringToDate", () => {
    it("converts MM/DD/YYYY to a date object", () => {
      const date = DateConverter.tsvStringToDate("03/20/2023");

      expect(date).to.equalTime(new Date("2023-03-20T00:00")); // Returns dates at midnight
    });

    it("returns null for non-strings", () => {
      // @ts-ignore
      const date = DateConverter.tsvStringToDate(6);

      expect(date).to.eq(null);
    });
  });

  describe("#isOnOrAfterDay", () => {
    it("returns false if the second date is on a day before the first date", () => {
      expect(DateConverter.isOnOrAfterDay(new Date("2022-04-02"), new Date("2022-04-01"))).to.eq(false);
      expect(DateConverter.isOnOrAfterDay("2022-04-02", new Date("2022-04-01"))).to.eq(false);
      expect(DateConverter.isOnOrAfterDay(new Date("2022-04-02"), "2022-04-01")).to.eq(false);
      expect(DateConverter.isOnOrAfterDay("2022-04-02", "2022-04-01")).to.eq(false);
    });

    it("returns true if the second date is the same day as the first date", () => {
      const oneAm = new Date("2022-04-01T01:00:00Z");
      const twoAm = new Date("2022-04-01T02:00:00Z");
      expect(DateConverter.isOnOrAfterDay(oneAm, twoAm)).to.eq(true);
      expect(DateConverter.isOnOrAfterDay(twoAm, oneAm)).to.eq(true);
      expect(DateConverter.isOnOrAfterDay(twoAm, twoAm)).to.eq(true);

      expect(DateConverter.isOnOrAfterDay("2022-04-01", twoAm)).to.eq(true);
      expect(DateConverter.isOnOrAfterDay(twoAm, "2022-04-01")).to.eq(true);
      expect(DateConverter.isOnOrAfterDay("2022-04-01", "2022-04-01")).to.eq(true);
    });

    it("returns true if the second date is on a day after the first date", () => {
      expect(DateConverter.isOnOrAfterDay(new Date("2022-04-01"), new Date("2022-04-02"))).to.eq(true);
      expect(DateConverter.isOnOrAfterDay("2022-04-01", new Date("2022-04-02"))).to.eq(true);
      expect(DateConverter.isOnOrAfterDay(new Date("2022-04-01"), "2022-04-02")).to.eq(true);
      expect(DateConverter.isOnOrAfterDay("2022-04-01", "2022-04-02")).to.eq(true);

      expect(DateConverter.isOnOrAfterDay(new Date("2022-03-15T00:00:00.000Z"), new Date("2022-04-01T00:00:00.000Z"))).to.eq(true);
    });

    it("returns false when given null or undefined", () => {
      // eslint-disable-next-line no-undefined
      expect(DateConverter.isOnOrAfterDay(undefined, "2022-04-02")).to.eq(false);
      // eslint-disable-next-line no-undefined
      expect(DateConverter.isOnOrAfterDay("2022-04-01", undefined)).to.eq(false);
      expect(DateConverter.isOnOrAfterDay(null, "2022-04-02")).to.eq(false);
      expect(DateConverter.isOnOrAfterDay("2022-04-01", null)).to.eq(false);
    });

    it("throws an exception when given something other than string, Date, null, or undefined", () => {
      // @ts-ignore
      expect(() => DateConverter.isOnOrAfterDay("2023-02-21", 0)).to.throw();
    });
  });

  describe("#isOnDay", () => {
    describe("when passing invalid data", () => {
      it("throws an exception when date1 is an invalid string", () => {
        expect(() => DateConverter.isOnDay("2023-02-a1", "2023-02-21")).to.throw();
      });

      it("throws an exception when date2 is an invalid string", () => {
        expect(() => DateConverter.isOnDay(new Date("2023-02-21"), "2023-02.21")).to.throw();
      });

      it("returns false when date1 is undefined", () => {
        expect(DateConverter.isOnDay(undefined, "2023-02-21")).to.eq(false);
      });

      it("returns false when date2 is undefined", () => {
        expect(DateConverter.isOnDay("2023-02-21", undefined)).to.eq(false);
      });

      it("returns false when date1 is null", () => {
        expect(DateConverter.isOnDay(null, "2023-02-21")).to.eq(false);
      });

      it("returns false when date2 is null", () => {
        expect(DateConverter.isOnDay("2023-02-21", null)).to.eq(false);
      });
    });

    describe("when comparing a Date with a Date", () => {
      it("returns true for two dates on the same day", () => {
        expect(DateConverter.isOnDay(new Date("2023-02-21"), new Date("2023-02-21"))).to.eq(true);
      });

      it("returns false for a day later", () => {
        expect(DateConverter.isOnDay(new Date("2023-02-21"), new Date("2023-02-22"))).to.eq(false);
      });

      it("returns false for a day earlier", () => {
        expect(DateConverter.isOnDay(new Date("2023-02-21"), new Date("2023-02-20"))).to.eq(false);
      });
    });

    describe("when comparing a string with a Date", () => {
      it("returns true for two dates on the same day", () => {
        expect(DateConverter.isOnDay("2023-02-21", new Date("2023-02-21"))).to.eq(true);
      });

      it("returns false for a day later", () => {
        expect(DateConverter.isOnDay("2023-02-21", new Date("2023-02-22"))).to.eq(false);
      });

      it("returns false for a day earlier", () => {
        expect(DateConverter.isOnDay("2023-02-21", new Date("2023-02-20"))).to.eq(false);
      });
    });

    describe("when comparing a Date with a string", () => {
      it("returns true for two dates on the same day", () => {
        expect(DateConverter.isOnDay(new Date("2023-02-21"), "2023-02-21")).to.eq(true);
      });

      it("returns false for a day later", () => {
        expect(DateConverter.isOnDay(new Date("2023-02-21"), "2023-02-22")).to.eq(false);
      });

      it("returns false for a day earlier", () => {
        expect(DateConverter.isOnDay(new Date("2023-02-21"), "2023-02-20")).to.eq(false);
      });
    });

    describe("when comparing a string with a string", () => {
      it("returns true for two dates on the same day", () => {
        expect(DateConverter.isOnDay("2023-02-21", "2023-02-21")).to.eq(true);
      });

      it("returns false for a day later", () => {
        expect(DateConverter.isOnDay("2023-02-21", "2023-02-22")).to.eq(false);
      });

      it("returns false for a day earlier", () => {
        expect(DateConverter.isOnDay("2023-02-21", "2023-02-20")).to.eq(false);
      });
    });
  });

  describe("#isValidDateString", () => {
    it("returns true for a valid date string", () => {
      expect(DateConverter.isValidDateString("2023-02-22")).to.eq(true);
      expect(DateConverter.isValidDateString("2038-01-20")).to.eq(true);
    });

    it("returns false for an invalid date string", () => {
      expect(DateConverter.isValidDateString("aaaa-bb-cc")).to.eq(false);
      expect(DateConverter.isValidDateString("2038f01-20")).to.eq(false);
    });
  });
});
