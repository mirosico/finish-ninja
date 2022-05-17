import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    FETCH_ONE,
    SET_NUMBER_OF_PAGES,
    SET_PAGE,
    IS_LOADING
} from '../constants/actionTypes';

export default (state = {
    heroes: [],
    numberOfPages: 1,
    page: 1,
    isLoading: false
}, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {...state, isLoading: action.payload}
        case SET_PAGE:
            return {...state, page: action.payload};
        case SET_NUMBER_OF_PAGES:
            return {...state, numberOfPages: action.payload};
        case FETCH_ONE:
            return {...state, details: action.payload};
        case FETCH_ALL:
            return {...state, heroes: action.payload};
        case CREATE:
            return {...state, heroes: [...state.heroes, action.payload]};
        case UPDATE:
            return {...state, heroes: state.heroes.map((hero) => (hero._id === action.payload._id ? action.payload : hero))};
        case DELETE:
            return {...state, heroes: state.heroes.filter((hero) => hero._id !== action.payload)};
        default:
            return state;
    }
};

