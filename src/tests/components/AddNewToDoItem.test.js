import React from 'react';
import {shallow} from 'enzyme';
import {AddNewToDoItem} from '../../components/AddNewToDoItem';

test('should render AddNewToDoItem correctly', () => {
    const wrapper = shallow(<AddNewToDoItem/>);
    expect(wrapper).toMatchSnapshot();
});

test('should send correct data on submit', () => {
    const addTask = jest.fn();
    const newInputValue = 'To do something useful';
    const categoryID = 13;
    const wrapper = shallow(<AddNewToDoItem addTask={addTask} categoryID={categoryID}/>);
    const form = wrapper.find('[data-testid="form"]');
    const nameInput = wrapper.find('[data-testid="name"]');

    nameInput.simulate('change', {currentTarget: {value: newInputValue}});
    form.simulate('submit', {preventDefault: () => {}});

    expect(wrapper.instance().props.addTask).toHaveBeenCalledWith({name: newInputValue, categoryID: categoryID});
});

test('should render error message on wrong data submit', () => {
    const addTask = jest.fn();
    const newInputValue = '';
    const wrapper = shallow(<AddNewToDoItem addTask={addTask}/>);
    const form = wrapper.find('[data-testid="form"]');
    const nameInput = wrapper.find('[data-testid="name"]');

    nameInput.simulate('change', {currentTarget: {value: newInputValue}});
    form.simulate('submit', {preventDefault: () => {}});

    expect(wrapper.find('[data-testid="error"]').text()).toBe('Enter valid value to add item');
});
