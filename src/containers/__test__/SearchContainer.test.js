import React from 'react';
import { shallow, mount } from 'enzyme';
import { List, Map } from 'immutable';
import { SearchContainer } from '../SearchContainer';

describe('Search Container', () => {

    let props = {};

    beforeEach(() => {
        props = {
            results: List([
                Map({
                    fullName: 'Amsterdam, NL'
                }),
                Map({
                    fullName: 'Amsterveen, NL'
                }),
                Map({
                    fullName: 'Amersfoot, NL'
                }),
            ]),
            searchQuery: 'query',
            onResultClick: jest.fn(),
            onSearch: jest.fn()
        };
    });

    it('should not render results list when there are no results', () => {
        props.results = List();

        const wrapper = shallow(<SearchContainer {...props} />);
        expect(wrapper.find('ul.results').exists()).toBe(false);
    });

    it('should render 3 result item when there are results', () => {
        const wrapper = shallow(<SearchContainer {...props} />);
        expect(wrapper.find('ul.results').exists()).toBe(true);
        expect(wrapper.find('li.result').length === props.results.size).toBe(true);
    });

    it('should run onSearch 3 times when its input receives keyup events', () => {
        const wrapper = mount(<SearchContainer {...props} />);
        for (var i = 0; i < 3; i++) {
            wrapper.find('input').simulate('keyup');
        }
        expect(props.onSearch.mock.calls.length).toBe(3);
    });

    it('should run onSearch 1 time when it submits the form', () => {
        const wrapper = mount(<SearchContainer {...props} />);
        wrapper.find('form').simulate('submit');
        expect(props.onSearch.mock.calls.length).toBe(1);
    });
});