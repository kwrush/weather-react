import { formatWeatherData, formatGeoSuggestion } from '../formatters'; 
import { weatherJson, suggestionJson } from '../../store/__test__/_mockData';

describe('respones formatter', () => {

    it('should format weather json correctly', () => {
        const formatted = formatWeatherData(weatherJson);
        expect(formatted.get('longitude')).toBe('-122.419998')
        expect(formatted.get('latitude')).toBe('37.779999');
        expect(formatted.getIn(['weather', 'currently', 'summary'])).toBe('Partly Cloudy');
        expect(formatted.getIn(['weather', 'currently', 'date'])).toBe('Aug 22, 2017');
        expect(formatted.getIn(['weather', 'daily']).size).toBe(5);
    });

    it('should foramt city information correctly', () => {
        const formatted = formatGeoSuggestion(suggestionJson);
        // filter the last entry since it's not a city
        expect(formatted.size).toBe(2);
        expect(formatted.getIn([0, 'fullName'])).toBe('San Francisco, California');
        expect(formatted.getIn([0, 'shortName'])).toBe('San Francisco');
    });
});

