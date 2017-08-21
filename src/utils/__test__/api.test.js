import { getWeather, getGeoSuggestion, getGeoLocation } from '../api';
import fetchMock from 'fetch-mock';

const geo = {
    latitude: 30,
    longitude: 40
};

const address = 'Amsterdam';

describe('fetch weather and geo location', () => {
    const fakeWeather = {
        body: {
            name: 'Amsterdam',
            id: '0001',
            weather: {
                temp: 19,
                unit: 'c',
                weather: 'rainy'
            }
        },
        status: 200,
        header: {'Content-Type': 'application/json'}
    };

    const fakeGeo = {
        body: {
            geo: {
                latitude: 30,
                longitude: 40
            },
            name: 'Amsterdam'
        },
        status: 200,
        header: {'Content-Type': 'application/json'}
    };

    const autocomplete = {
        results: [
            'Apeldoorn',
            'Appleton',
            'Apopka'
        ]
    }

    afterEach(() => {
        fetchMock.restore();
    });

    it('should fetch weather data from api', () => {
        fetchMock.mock(`/api/weather?latitude=${geo.latitude}&longitude=${geo.longitude}`, fakeWeather);
        expect.assertions(2);
        return getWeather(geo).then(data => {
            expect(data.name).toBe('Amsterdam')
            expect(data.weather).toMatchObject({
                temp: 19,
                unit: 'c',
                weather: 'rainy'
            });
        }).catch(err => console.log(err));
    });

    it('should fetch search suggestion from api', () => {
        fetchMock.mock('/api/autocomplete?input=Ap', autocomplete);
        expect.assertions(1);
        return getGeoSuggestion('Ap').then(data => {
            expect(data.results).toEqual(['Apeldoorn', 'Appleton', 'Apopka'])
        }).catch(err => console.log(err));
    });

    it('should fetch geolocation from api', () => {
        fetchMock.mock('/api/geolocation?place_id=some_hash_code_id', fakeGeo);
        expect.assertions(2);
        return getGeoLocation('some_hash_code_id').then(data => {
            expect(data.geo.latitude).toBe(30);
            expect(data.geo.longitude).toBe(40);
        }).catch(err => console.log(err));
    });
});


