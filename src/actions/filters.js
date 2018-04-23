import {SET_SHOW_DONE_FILTER, SET_TEXT_FILTER} from '../variables/actions';

export const setShowDoneFilter = (showDone = false) => ({
    type: SET_SHOW_DONE_FILTER,
    showDone
});

export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER,
    text
});
