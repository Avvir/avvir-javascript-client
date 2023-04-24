import moment from "moment";

export class DateFormatter {
  constructor(format: string, secondaryFormat?: string) {
    this.formatString = format;
    this.secondaryFormat = secondaryFormat;
  }

  /** Use formatLocal when displaying times relative to the user i.e. when
   * somebody else replied to their comment, or when a file was uploaded. */
  formatLocal(date: Date): string {
    if (date) {
      return moment(date).format(this.formatString);
    } else {
      return "";
    }
  }

  /** Use formatUTC when all users should see the same information, regardless
   * of their geographical location. i.e. dates pertaining to what happened on
   * the job site */
  formatUTC(date: moment.MomentInput): string {
    if (date) {
      return moment(date).utc().format(this.formatString);
    } else {
      return "";
    }
  }

  formatRangeLocal(startDate: Date, endDate?: Date): string {
    let formatted = this.formatLocal(startDate);
    if (endDate != null) {
      formatted += " - ";
      let endMoment = moment(endDate);
      if (this.secondaryFormat
          && moment(startDate).isSame(endMoment, "day"))
      {
        formatted += endMoment.format(this.secondaryFormat);
      } else {
        formatted += this.formatLocal(endDate);
      }
    }

    return formatted;
  }

  parseUTC(date: string | null): Date {
    return moment.utc(date, this.formatString).toDate();
  }

  private readonly formatString: string;
  private readonly secondaryFormat?: string;
}

export default DateFormatter;
