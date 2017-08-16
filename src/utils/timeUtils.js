/**
 * Utilities to format time
 */

import fecha from 'fecha';

const weekdayMask = 'ddd';            // e.g. Wed
const fullWeekdayMask = 'dddd';       // e.g. Friday
const shortDateMask = 'MMM DD, YYYY'; // e.g. Aug 16, 2017

// time returned from darksky is in seconds, so it times 1000 here
export const getTime = (time, timezone = {}) => {
    const sec = (typeof time === 'number') ? time * 1000 : Date.now();
    const date = new Date(time).toLocaleString('en-US', { timeZone: timezone });

    return new Date(date);
};

export const getWeekday = (time, timezone) => {
    return fecha.format(getTime(time, timezone), weekdayMask);
};

export const getFullWeekday = (time, timezone) => {
    return fecha.format(getTime(time, timezone), fullWeekdayMask);
};

export const getShortDate = (time, timezone) => {
    return fecha.format(getTime(time, timezone), shortDateMask);
}; 





