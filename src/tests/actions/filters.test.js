import {setTextFilter, setShowDoneFilter} from '../../actions/filters';
import {SET_SHOW_DONE_FILTER, SET_TEXT_FILTER} from '../../variables/actions';

test('should generate set text filter action object with provided values', () => {
    const text = 'some text for test';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: SET_TEXT_FILTER,
        text
    });
});

test('should generate set text filter action object with default values', () => {
    expect(setTextFilter()).toEqual({
        type: SET_TEXT_FILTER,
        text: ''
    });
});

test('should generate set show done filter action object with provided values', () => {
    const showDone = true;
    const action = setShowDoneFilter(showDone);
    expect(action).toEqual({
        type: SET_SHOW_DONE_FILTER,
        showDone
    });
});

test('should generate set show done filter action object with default values', () => {
    expect(setShowDoneFilter()).toEqual({
        type: SET_SHOW_DONE_FILTER,
        showDone: false
    });
});
