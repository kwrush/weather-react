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

export const CitiesContainer = Cities;

export default connect(mapStateToProps, mapDispatchToProps)(Cities)