import filtersReducer from '../../reducers/filters';
import {SET_SHOW_DONE_FILTER, SET_TEXT_FILTER} from '../../variables/actions';

test('should set default state', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({showDone: false, text: ''});
});

test('should set show done to false', () => {
    const action = {
        type: SET_SHOW_DONE_FILTER,
        showDone: false
    };
    const state = filtersReducer(undefined, action);
    expect(state.showDone).toBe(false);
});

test('should set show done to true', () => {
    const action = {
        type: SET_SHOW_DONE_FILTER,
        showDone: true
    };
    const initialState = {
        showDone: false,
        text: ''
    };
    const state = filtersReducer(initialState, action);
    expect(state.showDone).toBe(true);
});

test('should set text filter', () => {
    const text = 'some text';
    const action = {
        type: SET_TEXT_FILTER,
        text
    };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});
