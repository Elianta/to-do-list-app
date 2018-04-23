import {combineReducers, createStore} from 'redux';
import categoriesReducer from '../reducers/categories';
import modalsReducer from '../reducers/modals';
import filtersReducer from '../reducers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            categories: categoriesReducer,
            modals: modalsReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
