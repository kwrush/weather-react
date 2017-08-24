import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { List, Map } from 'immutable';
import { CitiesContainer } from '../CitiesContainer';

describe('Cities Container', () => {

    let props = {};

    beforeEach(() => {
        props = {
            cities: Map({
                'abcdefg': Map({
                    id: 'abcdefg',
                    latitude: '30',
                    longitude: '40',
                    shortName: 'London',
                    fullName: 'London, EN',
                }),
                '123456': Map({
                    id: '123456',
                    latitude: '30',
                    longitude: '40',
                    shortName: 'Paris',
                    fullName: 'Paris, BL',
                })
            }),
            onUpdateClick: jest.fn(),
            onRemoveClick: jest.fn()
        };
    });

    it('should render two cities', () => {
        const wrapper = mount(<CitiesContainer {...props} />);
        expect(wrapper.find('div.city-entity').length).toEqual(2);
    });
});