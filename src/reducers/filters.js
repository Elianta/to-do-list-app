import {SET_SHOW_DONE_FILTER, SET_TEXT_FILTER} from '../variables/actions';

const filtersReducer = (state = {showDone: false, text: ''}, action) => {
    switch (action.type) {
        case SET_SHOW_DONE_FILTER:
            return {
                ...state,
                showDone: action.showDone
            };
        case SET_TEXT_FILTER:
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
};

export default filtersReducer;
