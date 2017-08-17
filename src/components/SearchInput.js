import React from 'react';
import { performSearchIfNeeded } from './store/actions';
import store from './store/store';

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state({
            input: '',
            results: [],
        });
    } 

    render() {
        var rs = this.state.results.map(r => {
            return rs.shortName;
        });
        return (
            <div>
                <input type="text" onKeyUp={e => {
                    e.preventDefault();
                    store.dispatch(performSearchIfNeeded())
                }}>
                {rs}
            </div>
        );
    }
}