/**
 * This will check that a string contains only letters and numbers
 *
 * @param str string to check
 * @param allowUnderscore if the string should allow underscore
 * @returns true if string does not contain any special characters
 */
import {isAfter, isBefore} from "validator";

export const stringContainsOnlyLettersAndNumbers = (
    str: string,
    allowUnderscore?: boolean
) => {
    if (allowUnderscore) return /^[A-Za-z0-9_]*$/.test(str);

    return /^[A-Za-z0-9\s]*$/.test(str);
};

export const isTodayInRange = (start: string, end: string) => {
    // Локальная дата в формате YYYY-MM-DD (например, 2025-10-22)
    const todayStr = new Date().toLocaleDateString('en-CA');
    const startStr = String(start).slice(0, 10);
    const endStr = String(end).slice(0, 10);

    // Инклюзивная проверка: start <= today <= end
    const notBeforeStart = !isBefore(todayStr, startStr); // today >= start
    const notAfterEnd = !isAfter(todayStr, endStr);       // today <= end

    return notBeforeStart && notAfterEnd;
};