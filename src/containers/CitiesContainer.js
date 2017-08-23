import { connect } from 'react-redux';
import { fetchWeatherIfNeeded, removeCity } from '../store/actions';
import Cities from '../components/Cities';

const mapStateToProps = state => {
    return {
        cities: state.get('cities')
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateClick: id => {
            dispatch(fetchWeatherIfNeeded(id))
        },

        onRemoveClick: id => {
            dispatch(removeCity(id))
        }
    }
}

const CitiesContainer = connect(mapStateToProps, mapDispatchToProps)(Cities);

export default CitiesContainer