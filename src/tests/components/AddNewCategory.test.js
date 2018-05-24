import React from 'react';
import {shallow} from 'enzyme';
import {AddNewCategory} from '../../components/AddNewCategory';

test('should render AddNewCategory correctly', () => {
    const wrapper = shallow(<AddNewCategory/>);
    expect(wrapper).toMatchSnapshot();
});

test('should send correct data on submit', () => {
    const addCategory = jest.fn();
    const newInputValue = 'Category #1-2-23';
    const wrapper = shallow(<AddNewCategory addCategory={addCategory}/>);
    const form = wrapper.find('[data-testid="form"]');
    const nameInput = wrapper.find('[data-testid="name"]');

    nameInput.simulate('change', {currentTarget: {value: newInputValue}});
    form.simulate('submit', {preventDefault: () => {}});

    expect(wrapper.instance().props.addCategory).toHaveBeenCalledWith(newInputValue);
});

test('should render error message on wrong data submit', () => {
    const addCategory = jest.fn();
    const newInputValue = '';
    const wrapper = shallow(<AddNewCategory addCategory={addCategory}/>);
    const form = wrapper.find('[data-testid="form"]');
    const nameInput = wrapper.find('[data-testid="name"]');

    nameInput.simulate('change', {currentTarget: {value: newInputValue}});
    form.simulate('submit', {preventDefault: () => {}});

    expect(wrapper.find('[data-testid="error"]').text()).toBe('Enter valid value to add item');
});
