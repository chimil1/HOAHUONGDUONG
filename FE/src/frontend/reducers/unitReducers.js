import {
    FETCH_UNITS_REQUEST,
    FETCH_UNITS_SUCCESS,
    FETCH_UNITS_FAILURE
} from '../actions/unitActions';

const initialState = {
    selectedUnit: null, 
    loading: false,
    units: [],
    error: ''
};

const unitReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UNITS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_UNITS_SUCCESS:
            return {
                ...state,
                loading: false,
                units: action.payload,
                selectedUnit: action.payload,
                error: ''
            };
        case FETCH_UNITS_FAILURE:
            return {
                ...state,
                loading: false,
                selectedUnit: null,
                units: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default unitReducer;