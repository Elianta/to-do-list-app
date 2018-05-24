import React from 'react';
import {shallow} from 'enzyme';
import {Category} from '../../components/Category';

describe('taskTransfer mode', () => {
    const node = {
        id: 303,
        name: 'Category Name #1-22-33'
    };
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Category
                mode={'taskTransfer'}
                node={node}
                children={[]}
                active={'303'}
                transferTaskIn={false}
            />
        );
    });
    test('should render Category in the taskTransfer mode', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('transfer button should be disabled for selected directory', () => {
        const transferBtn = wrapper.find('[data-testid="transfer-btn"]');
        expect(transferBtn.prop('disabled')).toBeTruthy();
    });
});

describe('homePage mode', () => {
    const node = {
        id: 12,
        name: 'Category Name #12'
    };
    const openModalForCategoryEditing = jest.fn();
    const openModalForCategoryDeleting = jest.fn();
    const openModalForCategoryAddition = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Category
                mode={'homePage'}
                node={node}
                children={[]}
                active={'12'}
                transferTaskIn={false}
                openModalForCategoryEditing={openModalForCategoryEditing}
                openModalForCategoryDeleting={openModalForCategoryDeleting}
                openModalForCategoryAddition={openModalForCategoryAddition}
            />
        );
    });

    test('should render Category in the homePage mode', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should handle click on edit button correctly', () => {
        const editBtn = wrapper.find('[data-testid="edit-btn"]');
        editBtn.simulate('click');
        expect(wrapper.instance().props.openModalForCategoryEditing).toHaveBeenCalledWith({id: node.id, name: node.name});
    });

    test('should handle click on delete button correctly', () => {
        const deleteBtn = wrapper.find('[data-testid="delete-btn"]');
        deleteBtn.simulate('click');
        expect(wrapper.instance().props.openModalForCategoryDeleting).toHaveBeenCalledWith({id: node.id, name: node.name});
    });

    test('should handle click on add button correctly', () => {
        const addBtn = wrapper.find('[data-testid="add-btn"]');
        addBtn.simulate('click');
        expect(wrapper.instance().props.openModalForCategoryAddition).toHaveBeenCalledWith({id: node.id, name: node.name});
    });
});


