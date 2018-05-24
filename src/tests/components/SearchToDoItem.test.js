import React from 'react';
import {shallow} from 'enzyme';
import {SearchToDoItem} from '../../components/SearchToDoItem';

test('should render SearchToDoItem correctly', () => {
    const wrapper = shallow(<SearchToDoItem/>);
    expect(wrapper).toMatchSnapshot();
});

test('should send correct search string on submit', () => {
    const setTextFilter = jest.fn();
    const filters = {
        showDone: true
    };
    const newInputValue = 'Task #';
    const wrapper = shallow(<SearchToDoItem setTextFilter={setTextFilter} filters={filters}/>);
    const spy = jest.spyOn(wrapper.instance(), 'changeBrowserHistory').mockImplementation(() => {});
    const form = wrapper.find('[data-testid="form"]');
    const searchInput = wrapper.find('[data-testid="search"]');

    searchInput.simulate('change', {target: {value: newInputValue}});
    form.simulate('submit', {
        preventDefault: () => {
        }
    });

    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().props.setTextFilter).toHaveBeenCalledWith(newInputValue);
});
