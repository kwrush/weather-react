import { getWeather, getGeoLocation } from '../api';

describe('fetchWeatherData', () => {
    it('should fetch data from api', async () => {
        const geo = {
            latitude: 37.8267,
            longitude: -122.4233
        };

        let resolve = (data) => {
            expect(data).toBeDefined();
            expect(data.name).toBe('Amsterdam');
            expect(data.id).toBe('fake_i');
        }

        return getWeather(geo, resolve, () => {});

    });
});

describe('fetchGeoLocation', () => {
    it('should fetch geo location from api', async () => {
        const address = 'Amsterdam';
        let resolve = (data) => {
            expect(data).toBeDefined();
            expect(data.name).toBe('Amsterdam');
            expect(data.id).toBe('fake_i');
        }

        return getGeoLocation(address, resolve, () => {});
    });

})