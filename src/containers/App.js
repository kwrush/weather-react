import React from 'react';
import { fromJS } from 'immutable';
import { performSearchIfNeeded, addCity } from '../store/actions';
import store from '../store/store';
import City from '../components/City';

const mockData = fromJS({
  "id":"ChIJVXealLU_xkcRja_At0z9AGY",
  "fullName":"Amsterdam, Netherlands",
  "shortName":"Amsterdam",
  "latitude":52.3702157,
  "longitude":4.895167900000001,
  "weather":{
    "updatedAt":1503001499,
    "timezone":"Europe/Amsterdam",
    "currently":{
      "precipProbability":"0%",
      "windSpeed":"NaNm/s",
      "windDirection":226,
      "date":"Aug 17, 2017",
      "temperature":"64°",
      "summary":"Clear",
      "icon":"CLEAR_NIGHT"
    },
    "daily":[
      {
        "precipProbability":0.19,
        "temperatureMin":"60°",
        "temperatureMax":"68°",
        "icon":"PARTLY_CLOUDY_NIGHT",
        "day":"Today"
      },
      {
        "precipProbability":0.34,
        "temperatureMin":"59°",
        "temperatureMax":"67°",
        "icon":"RAIN",
        "day":"Fri"
      },
      {
        "precipProbability":0.58,
        "temperatureMin":"57°",
        "temperatureMax":"65°",
        "icon":"RAIN",
        "day":"Sat"
      },
      {
        "precipProbability":0.14,
        "temperatureMin":"58°",
        "temperatureMax":"66°",
        "icon":"PARTLY_CLOUDY_NIGHT",
        "day":"Sun"
      },
      {
        "precipProbability":0.05,
        "temperatureMin":"58°",
        "temperatureMax":"70°",
        "icon":"PARTLY_CLOUDY_DAY",
        "day":"Mon"
      }
    ]
  },
  "isFetching":false
});

const App = (props) => {
    return (
        <div id="app">
            <input type="text" onKeyUp={e => {
                e.preventDefault();
                store.dispatch(performSearchIfNeeded(e.target.value));
                const q = store.getState().getIn(['searchEntities', 'searchQuery']);
                const results = store.getState().getIn(['searchEntities', 'results']);
                if (q.length === 9 && results.size === 1) {
                    // add city(amsterdam) and fetch weather
                    store.dispatch(addCity(results.get(0)));
                }
            }} />
            <City 
                cityEntity={mockData}
                onUpdateClick={() => {}}
                onRemoveClick={() => {}}
            />
        </div>
    );
}

export default App