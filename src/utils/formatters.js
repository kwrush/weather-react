/**
 * Utilities to format response from api server
 */
import { Map, List } from 'immutable';
import { getWeekday, getShortDate } from './timeUtils';

function iconFormatter(iconString) {
    return iconString.replace(/-/g, '_').toUpperCase();
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
        latitude: '' + data.latitude,
        longitude: '' + data.longitude,
        weather: Map({
            // time returned from Dark Sky is in seconds
            updatedAt: data.currently.time,
            timezone: data.timezone,
            currently: Map({
                precipProbability: Math.round(currently.precipProbability) * 100 + '%',
                windSpeed: Math.round(currently.windSpeed) + 'm/s',
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

export const formatGeoSuggestion = data => {
    const results = data.RESULTS;

    // Return results of cities
    return List(results
            .filter(result => result.type === 'city')
            .map(result => Map({
                id: result.zmw,
                shortName: result.name.split(',')[0],
                fullName: result.name,
                latitude: result.lat,
                longitude: result.lon
            })));
}