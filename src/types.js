import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const SKYCONS = PropTypes.oneOf([
    'CLEAR_DAY',
    'CLEAR_NIGHT',
    'PARTLY_CLOUDY_DAY',
    'PARTLY_CLOUDY_NIGHT',
    'CLOUDY',
    'RAIN',
    'SLEET',
    'SNOW',
    'WIND',
    'FOG'
]);

export const CURRENTLY = 
    ImmutablePropTypes.contains({
        precipProbability: PropTypes.string.isRequired,
        windSpeed: PropTypes.string.isRequired,
        windDirection: PropTypes.number.isRequired,
        temperature: PropTypes.string.isRequired,
        icon: SKYCONS,
        summary: PropTypes.string.isRequired
    });

export const DAILY = 
    ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            precipProbability: PropTypes.number.isRequired,
            temperatureMin: PropTypes.string.isRequired,
            temperatureMax: PropTypes.string.isRequired,
            icon: SKYCONS,
            day: PropTypes.string.isRequired
        })
    );

export const WEATHER = 
    ImmutablePropTypes.contains({
        updatedAt: PropTypes.number.isRequired,
        timezone: PropTypes.string.isRequired,
        currently: CURRENTLY.isRequired,
        daily: DAILY.isRequired
    });

export const CITY = 
    ImmutablePropTypes.contains({
        id: PropTypes.string.isRequired,
        shortName: PropTypes.string.isRequired,
        fullName: PropTypes.string,
        latitude: PropTypes.string.isRequired,
        longitude: PropTypes.string.isRequired,
        isFetching: PropTypes.bool,
        weather: WEATHER
    });

export const SEARCH_RESULTS = 
    ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            fullName: PropTypes.string.isRequired
        }).isRequired
    );