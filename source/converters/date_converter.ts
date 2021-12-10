import moment, { Moment } from "moment";

export class DateFormatter {
  constructor(format: string) {
    this.formatString = format;
  }

  format(date?: Date): string {
    if (date) {
      return moment(date).format(this.formatString);
    } else {
      return "";
    }
  }

  private readonly formatString: string;
}

export class DateConverter {
  static getDateFormatter(format: string): DateFormatter {
    return new DateFormatter(format);
  }

  static dateToText(date: Date | Moment, format?: string): string {
    if (date instanceof Date) {
      if (format) {
        return moment(date).format(format);
      } else {
        return `last scanned: ${moment(date).format("MMM D, YYYY")}`;
      }
    } else if (moment.isMoment(date)) {
      if (format) {
        return date.format(format);
      } else {
        return `last scanned: ${date.format("MMM D, YYYY")}`;
      }
    } else {
      return "";
    }
  }

  static instantToDate(instant: number): Date | null {
    if (typeof instant === "number") {
      const epochMillis = instant * 1000;
      return moment(epochMillis).toDate();
    } else {
      return null;
    }
  }

  static dateToInstant(date: Date | Moment): number | null {
    if (date instanceof Date) {
      const epochMillis = moment(date).utc(false).toDate().valueOf();
      return epochMillis / 1000;
    } else if (moment.isMoment(date)) {
      const epochMillis = date.utc(false).toDate().valueOf();
      return epochMillis / 1000;
    } else {
      return null;
    }
  }

  static millisecondsToDate(epochMillis: number): Date | null {
    if (epochMillis || epochMillis === 0) {
      return moment(epochMillis).toDate();
    } else {
      return null;
    }
  }

  static isValidDate(value): boolean {
    return (value instanceof Date && !isNaN(value.valueOf())) || value === null;
  }

  static tsvStringToDate(dateString) {
    if (dateString) {
      return moment(dateString, "MM/DD/YYYY").toDate();
    } else {
      return null;
    }
  }
}

export default DateConverter;
