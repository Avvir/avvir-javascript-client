import "../../test_utils/setup_tests";
import { expect } from "chai";
import moment from "moment";
import DateConverter from "../../source/converters/date_converter";

describe("DateConverter", () => {
  describe("#instantToDate", () => {
    it("converts an instant to a Date object", () => {
      const date = DateConverter.instantToDate(1535732352.137000);

      expect(date).to.equalTime(moment(1535732352137).toDate());
    });

    describe("when it is called with null or undefined", () => {
      it("returns null", () => {
        const nullDate = DateConverter.instantToDate(null);
        const undefinedDate = DateConverter.instantToDate(undefined);

        expect(nullDate).to.eq(null);
        expect(undefinedDate).to.eq(null);
      });
    });

    describe("when it is called with something other than an instant", () => {
      it("returns null", () => {
        const nonInstantDate = DateConverter.instantToDate({ nonInstantKey: "this is not an instant" } as unknown as number);
        expect(nonInstantDate).to.eq(null);
      });
    });
  });

  describe("#dateToInstant", () => {
    it("converts a Date to a java Instant object", () => {
      const instant = DateConverter.dateToInstant(moment(1535732352000).toDate());
      expect(instant).to.deep.eq(1535732352);
    });
  });

  describe("#dateToText", () => {
    let date;
    beforeEach(() => {
      date = new Date(2018, 3, 1);
    });
    it("converts a date to a string", () => {
      const scannedDate = DateConverter.dateToText(date);

      expect(scannedDate).to.eq("last scanned: Apr 1, 2018");
    });

    it("uses the local timezone", () => {
      let february5thWestOfUtc = moment("2019-02-06T00:00:00.000Z");
      let february7thEastOfUtc = moment("2019-02-06T23:59:59.999Z");
      if(moment().utcOffset() < 0){
        expect(DateConverter.dateToText(february5thWestOfUtc))
          .to.eq("last scanned: Feb 5, 2019");
      } else if(moment().utcOffset() > 0){
        expect(DateConverter.dateToText(february7thEastOfUtc))
          .to.eq("last scanned: Feb 7, 2019");
      } else {
        expect(DateConverter.dateToText(february7thEastOfUtc)).to.eq("last scanned: Feb 6, 2019");
        expect(DateConverter.dateToText(february5thWestOfUtc)).to.eq("last scanned: Feb 6, 2019");
      }
     });

    describe("when passed a format", () => {
      it("converts the date to that format", () => {
        const formattedDate = DateConverter.dateToText(date, "MMM DD, YY");

        expect(formattedDate).to.eq("Apr 01, 18");
      });
    });

    describe("when pass undefined or null", () => {
      it("returns an empty string", () => {
        const undefinedDate = DateConverter.dateToText(undefined);
        const nullDate = DateConverter.dateToText(null);

        expect(undefinedDate).to.eq("");
        expect(nullDate).to.eq("");
      });
    });
  });

  describe("#millisecondsToDate", () => {
    it("converts milliseconds to a date object", () => {
      const date = DateConverter.millisecondsToDate(1535732352000);

      expect(date).to.equalTime(moment(1535732352000).toDate());
    });
  });
});
