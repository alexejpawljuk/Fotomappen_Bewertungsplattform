import { format } from 'date-and-time';


/**
 * Formats a given date into a specified string format.
 *
 * @param {Date | string | number} date - The date to be formatted. Can be a Date object,
 *                                        a string representation of a date, or a timestamp.
 * @param {string} [format="DD.MM.YYYY"] - The format string defining the output format of the date.
 *                                         Defaults to "DD.MM.YYYY" if not provided.
 * @returns {string} The formatted date string. If the input date is invalid or not provided,
 *                   an empty string is returned.
 */
export const formatDate = (
    date: Date | string | number,
    _format: string = "DD.MM.YYYY"
): string => {
    if (!date) return "";
    return format(date, _format);
};