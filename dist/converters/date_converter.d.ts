import { Moment } from "moment";
declare class DateFormatter {
    constructor(format: string);
    format(date?: Date): string;
    private readonly formatString;
}
export default class DateConverter {
    static getDateFormatter(format: string): DateFormatter;
    static dateToText(date: Date | Moment, format?: string): string;
    static instantToDate(instant: number): Date | null;
    static dateToInstant(date: Date | Moment): number | null;
    static millisecondsToDate(epochMillis: number): Date | null;
    static isValidDate(value: any): boolean;
    static tsvStringToDate(dateString: any): Date;
}
export {};
