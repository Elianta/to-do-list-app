import React from 'react';
import {shallow} from 'enzyme';
import {AddCategoryModal} from '../../components/AddCategoryModal';

const modals = {
    isAddCategoryModalOpen: true,
    editableCategory: {name: 'Editable Category', id: 3}
};

test('should render AddCategoryModal correctly', () => {
    const wrapper = shallow(<AddCategoryModal modals={modals}/>);
    expect(wrapper).toMatchSnapshot();
});

test('state is updated on changing the input value', () => {
    const wrapper = shallow(<AddCategoryModal modals={modals}/>);
    const nameInput = wrapper.find('[data-testid="name"]');
    const newValue = 'New Category';
    nameInput.simulate('change', {currentTarget: {value: newValue}});
    expect(wrapper.state().category).toBe(newValue);
});

test('form sends appropriate data on submit', () => {
    const addNestedCategory = jest.fn();
    const closeModals = jest.fn();
    const newInputValue = 'New Category';
    const wrapper = shallow(<AddCategoryModal modals={modals} addNestedCategory={addNestedCategory} closeModals={closeModals}/>);
    const form = wrapper.find('[data-testid="form"]');
    const nameInput = wrapper.find('[data-testid="name"]');
    const addNestedCategoryArgs = {name: newInputValue, parentID: modals.editableCategory.id};

    nameInput.simulate('change', {currentTarget: {value: newInputValue}});
    form.simulate('submit', {preventDefault: () => {}});

    expect(wrapper.instance().props.addNestedCategory).toHaveBeenCalledWith(addNestedCategoryArgs);
    expect(wrapper.instance().props.closeModals).toHaveBeenCalledWith();
});
