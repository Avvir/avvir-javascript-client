import { expect } from "chai";

import DateConverter from "../../source/converters/date_converter";
import DateFormatter from "../../source/converters/date_formatter";

describe("DateFormatter", () => {
  // There is one instance on purpose to make sure this can be shared without reinitializing every time.
  const formatter: DateFormatter = DateConverter.getDateFormatter("YYYY-MM-DD HH:mm:ss", "HH:mm:ss");
  describe("#formatLocal", () => {
    it("formats a date object", () => {
      const date = new Date("2022-03-01T14:34:56");
      expect(formatter.formatLocal(date)).to.eq("2022-03-01 14:34:56");
    });
  });

  describe("#formatRangeLocal", () => {
    it("formats a range of date objects on the same day with the secondary format", () => {
      const date = new Date("2022-03-01T14:34:56");
      const date2 = new Date("2022-03-01T16:34:56");
      expect(formatter.formatRangeLocal(date, date2)).to.eq("2022-03-01 14:34:56 - 16:34:56");
    });

    it("formats a range of date objects on different days with the same format", () => {
      const date = new Date("2022-03-01T14:34:56");
      const date2 = new Date("2022-03-02T16:34:56");
      expect(formatter.formatRangeLocal(date, date2)).to.eq("2022-03-01 14:34:56 - 2022-03-02 16:34:56");
    });

    it("formats a range missing the second date object", () => {
      const date = new Date("2022-03-01T14:34:56");
      expect(formatter.formatRangeLocal(date)).to.eq("2022-03-01 14:34:56");
    });

    it("formats a range with the same format when missing the secondary format", () => {
      const formatter: DateFormatter = DateConverter.getDateFormatter("YYYY-MM-DD HH:mm:ss");
      const date = new Date("2022-03-01T14:34:56");
      const date2 = new Date("2022-03-01T16:34:56");
      expect(formatter.formatRangeLocal(date, date2)).to.eq("2022-03-01 14:34:56 - 2022-03-01 16:34:56");
    });
  });
});
