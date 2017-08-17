/**
 * Utilities to format response from api server
 */

import { Map, List } from 'immutable';
import { getWeekday, getShortDate } from './timeUtils';

function iconFormatter(iconString) {
    return iconString.replace(/\-/g, '_').toUpperCase();
}

export const formatWeatherData = (data) => {
    const currently = data.currently;
    const daily = data.daily.data;
    const days = 5;
    let dailyList = List();

    for (let i = 0; i < days; i++) {
        dailyList = dailyList.push(Map({
            precipProbability: daily[i].precipProbability,
            temperatureMin: Math.round(daily[i].temperatureMin) + '°',
            temperatureMax: Math.round(daily[i].temperatureMax) + '°',
            icon: iconFormatter(daily[i].icon),
            day: i === 0 ? 'Today' : getWeekday(daily[i].time, data.timezone)
        }));
    }

    return Map({
        latitude: data.latitude,
        longitude: data.longitude,
        weather: Map({
            updatedAt: data.currently.time,
            timezone: data.timezone,
            currently: Map({
                precipProbability: Math.round(currently.precipProbability) * 100 + '%',
                windSpeed: Math.round(currently.windSeep) + 'm/s',
                windDirection: currently.windBearing,
                date: getShortDate(currently.time, data.timezone),
                temperature: Math.round(currently.temperature) + '°',
                summary: currently.summary,
                icon: iconFormatter(currently.icon)
            }),
            daily: dailyList
        })
    });
}

export const formatGeoLocation = (data) => {
    if (data.status !== 'OK') return List();

    const results = data.results;
    return List(results.map(result => {
        return Map({
            id: result.place_id,
            fullName: result.formatted_address,
            shortName: result.address_components[0].short_name,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng
        });
    }));
}