/**
 * Utilities to format response from api server
 */

import { Map, List } from 'immutable';
import { getWeekday, getShortDate } from './timeUtils';

export const formatWeatherData = (data) => {
    const currently = data.currently;
    const daily = data.daily.data;
    const days = 5;
    const dailyList = List();

    for (let i = 0; i < days; i++) {
        dailyList.push(Map({
            precipProbability: daily[i].precipProbability,
            temperatureMin: daily[i].temperatureMin,
            temperatureMax: daily[i].temperatureMax,
            icon: daily[i].icon,
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
                precipProbability: currently.precipProbability,
                windSpeed: currently.windSeep,
                windDirection: currently.wind,
                date: getShortDate(currently.time, data.timezone),
                temperature: currently.temperature,
                summary: currently.summary,
                icon: currently.icon
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