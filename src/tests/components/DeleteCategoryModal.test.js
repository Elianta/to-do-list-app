import React from 'react';
import {shallow} from 'enzyme';
import {DeleteCategoryModal} from '../../components/DeleteCategoryModal';

const modals = {
    isDeleteCategoryModalOpen: true,
    editableCategory: {name: 'Editable Category Name', id: 444}
};

test('should render DeleteCategoryModal correctly', () => {
    const wrapper = shallow(<DeleteCategoryModal modals={modals} handleModalClose={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should send correct data on confirm', () => {
    const removeCategory = jest.fn();
    const closeModals = jest.fn();
    const handleModalClose = jest.fn();
    const wrapper = shallow(
        <DeleteCategoryModal
            modals={modals}
            removeCategory={removeCategory}
            closeModals={closeModals}
            handleModalClose={handleModalClose}
        />
    );
    const confirmBtn = wrapper.find('[data-testid="confirm-btn"]');

    confirmBtn.simulate('click', {preventDefault: () => {}});

    expect(wrapper.instance().props.removeCategory).toHaveBeenCalledWith(modals.editableCategory.id);
    expect(wrapper.instance().props.closeModals).toHaveBeenCalledWith();
});

test('should close modal on cancel', () => {
    const removeCategory = jest.fn();
    const closeModals = jest.fn();
    const handleModalClose = jest.fn();
    const wrapper = shallow(
        <DeleteCategoryModal
            modals={modals}
            removeCategory={removeCategory}
            closeModals={closeModals}
            handleModalClose={handleModalClose}
        />
    );

    const cancelBtn = wrapper.find('[data-testid="cancel-btn"]');

    cancelBtn.simulate('click', {preventDefault: () => {}});

    expect(wrapper.instance().props.removeCategory).not.toHaveBeenCalled();
    expect(wrapper.instance().props.handleModalClose).toHaveBeenCalled();
});
