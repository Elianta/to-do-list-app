import React from 'react';
import {shallow} from 'enzyme';
import {EditCategoryModal} from '../../components/EditCategoryModal';

const modals = {
    isEditCategoryModalOpen: true,
    editableCategory: {name: 'Editable Category Name Test', id: 1000}
};

test('should render EditCategoryModal correctly', () => {
    const wrapper = shallow(<EditCategoryModal modals={modals}/>);
    expect(wrapper).toMatchSnapshot();
});

test('form sends appropriate data on submit', () => {
    const editCategory = jest.fn();
    const closeModals = jest.fn();
    const newInputValue = 'New Category';
    const wrapper = shallow(
        <EditCategoryModal
            modals={modals}
            editCategory={editCategory}
            closeModals={closeModals}
        />
    );
    const form = wrapper.find('[data-testid="form"]');
    const nameInput = wrapper.find('[data-testid="name"]');

    nameInput.simulate('change', {currentTarget: {value: newInputValue}});
    form.simulate('submit', {preventDefault: () => {}});

    const editCategoryArgs = {id: modals.editableCategory.id, update: newInputValue};

    expect(wrapper.instance().props.editCategory).toHaveBeenCalledWith(editCategoryArgs);
    expect(wrapper.instance().props.closeModals).toHaveBeenCalledWith();
});
