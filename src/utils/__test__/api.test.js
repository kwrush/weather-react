import { getWeather, getGeoLocation } from '../api';
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

    afterEach(() => {
        fetchMock.restore();
    });

    it('should fetch weather data from api', done => {
        fetchMock.mock(`/api/darksky?latitude=${geo.latitude}&longitude=${geo.longitude}&exclude=minutely,alerts,flags`, fakeWeather);
        getWeather(geo, data => {
            expect(data.name).toBe('Amsterdam')
            expect(data.weather).toMatchObject({
                temp: 19,
                unit: 'c',
                weather: 'rainy'
            });
            done();
        }, err => {
            console.log(err);
            done.fail();
        });
    });

    it('should fetch geo coordinate from api', done => {
        fetchMock.mock(`https://maps.googleapis.com/maps/api/geocode/json?language=en&address=${address}`, fakeGeo);
        getGeoLocation(address, data => {
            expect(data.name).toBe('Amsterdam')
            expect(data.geo).toMatchObject({
                latitude: 30,
                longitude: 40
            });
            done();
        }, err => {
            console.log(err);
            done.fail();
        });
    });
});


