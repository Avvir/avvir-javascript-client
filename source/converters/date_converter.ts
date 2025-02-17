import moment, { Moment } from "moment";

import DateFormatter from "./date_formatter";

import type { DateLike } from "type_aliases";

export class DateConverter {
  static getLocalizedDateFormatter(): DateFormatter {
    return new DateFormatter("l");
  }

  static getDateFormatter(format: string, secondaryFormat?: string): DateFormatter {
    return new DateFormatter(format, secondaryFormat);
  }

  static dateToText(date: Date, format: string): string {
    if (date instanceof Date) {
      return moment(date).format(format);
    } else {
      return "";
    }
  }

  static instantToDate(instant: number): Date | null {
    if (typeof instant === "number") {
      const epochMillis = instant * 1000;
      return new Date(epochMillis);
    } else {
      return null;
    }
  }

  static dateToInstant(date: Date): number | null {
    if (date instanceof Date) {
      return date.getTime() / 1000;
    } else {
      return null;
    }
  }

  static localDateToMoment(localDate: string): Moment | null {
    if (this.isValidDateString(localDate)) {
      return moment(localDate);
    }
    return null;
  }

  static dateToLocalDate(date: DateLike): string {
    if (date instanceof Date) {
      return date.toISOString().substring(0, 10);
    } else if (moment.isMoment(date)) {
      return moment(date).format("YYYY-MM-DD");
    } else {
      return null;
    }
  }

  static millisecondsToDate(epochMillis: number): Date | null {
    if (typeof epochMillis === "number") {
      return new Date(epochMillis);
    } else {
      return null;
    }
  }

  static isValidDate(value): boolean {
    return (value instanceof Date && !isNaN(value.valueOf())) || value === null;
  }

  static isValidDateString(value: string): boolean {
    return (typeof value === "string")
           && !!value.match(/^\d{4}-\d{2}-\d{2}$/);
  }

  static tsvStringToDate(dateString: string): Date {
    if (typeof dateString === "string") {
      return moment(dateString, "MM/DD/YYYY").toDate();
    } else {
      return null;
    }
  }

  /**
   * truncate 2 dates to days and compare
   * @param date1
   * @param date2
   * @returns true when date2 is on or after the day of date1;
   * false if either date1 or date2 is null
   */
  static isOnOrAfterDay(date1: Date | string, date2: Date | string): boolean {
    if (date1 == null || date2 == null) {
      return false;
    }

    return this.dateToString(date1) <= this.dateToString(date2);
  }

  /**
   * truncate 2 dates to days and compare
   * @param date1
   * @param date2
   * @returns true when date2 is on the same day as date1
   */
  static isOnDay(date1: Date | string, date2: Date | string): boolean {
    if (date1 == null || date2 == null) {
      return false;
    }

    return this.dateToString(date1) === this.dateToString(date2);
  }

  private static dateToString(date: Date | string): string {
    if (date instanceof Date) {
      return `${this.pad(date.getUTCFullYear())}-${this.pad(date.getUTCMonth() + 1)}-${this.pad(date.getUTCDate())}`;
    }
    if (this.isValidDateString(date)) {
      return date;
    }
    throw new TypeError("Expected date to be a Date or string");
  }

  static dateToISO(date: DateLike): string {
    if (date == null) {
      return "";
    } else if (date instanceof Date || moment.isMoment(date)) {
      return date.toISOString();
    }

    return date + "";
  }

  private static pad(i: number): string {
    return i.toString().padStart(2, "0");
  }

  static dateLikeToDate(date: DateLike): Date {
      if (typeof date === "string") {
        return moment(date, "MMM D, YYYY").utc(true).toDate();
      } else if (date instanceof Date) {
        return date;
      } else if (moment.isMoment(date)) {
        return date.toDate();
      } else {
        return DateConverter.instantToDate(date) || moment.invalid().toDate();
      }
  }
}

export default DateConverter;
