import { shouldPerformSearch, shouldUpdateWeather } from '../helpers'; 

describe('helper functions test', () => {

    it('should handle the search queries correctly', () => {
        expect(shouldPerformSearch('    d')).toBeFalsy();
        expect(shouldPerformSearch('Ams')).toBeTruthy();
        expect(shouldPerformSearch('Ad    ')).toBeTruthy();
        expect(shouldPerformSearch(' d  ')).toBeFalsy();
    });

    it('should return true if passed time is more than 20 minutes', () => {
        const d1 = new Date('2017-08-22 09:10:00');
        const d2 = new Date('2017-08-22 09:12:00');
        const d3 = new Date('2017-08-22 09:30:00');
        const d4 = new Date('2017-08-22 09:29:00'); 
        const d5 = new Date('2017-08-22 09:40:00'); 
        expect(shouldUpdateWeather(d1.getTime() / 1000, d2.getTime() / 1000)).toBeFalsy();
        expect(shouldUpdateWeather(d1.getTime() / 1000, d3.getTime() / 1000)).toBeTruthy();
        expect(shouldUpdateWeather(d1.getTime() / 1000, d4.getTime() / 1000)).toBeFalsy();
        expect(shouldUpdateWeather(d1.getTime() / 1000, d5.getTime() / 1000)).toBeTruthy();
    });
});