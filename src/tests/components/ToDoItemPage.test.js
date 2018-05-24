import React from 'react';
import {shallow} from 'enzyme';
import {ToDoItemPage} from '../../components/ToDoItemPage';
import categories from '../fixtures/categories';

const match = {
    params: {
        categoryID: '5',
        taskID: '2'
    }
};


test('should render ToDoItemPage correctly', () => {
    const wrapper = shallow(<ToDoItemPage match={match} categories={categories}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should search task by id correctly and write data in state', () => {
    const task2category5 = categories[0].children[1].children[0].tasks[1];
    const wrapper = shallow(<ToDoItemPage match={match} categories={categories}/>);
    expect(wrapper.instance().task).toEqual(task2category5);
});

describe('test fill in the form', () => {
    let wrapper;
    const newName = 'Changed Task Name';
    const newDescription = 'Changed Task Description';
    const newIsDone = false;

    beforeEach(() => {
        const saveEditedTaskWithoutTransfer = jest.fn();
        const saveEditedTaskWithTransfer = jest.fn();
        wrapper = shallow(
            <ToDoItemPage
                match={match}
                categories={categories}
                saveEditedTaskWithoutTransfer={saveEditedTaskWithoutTransfer}
                saveEditedTaskWithTransfer={saveEditedTaskWithTransfer}/>
        );
        const name = wrapper.find('[data-testid="name"]');
        const isDone = wrapper.find('[data-testid="is-done"]');
        const description = wrapper.find('[data-testid="description"]');
        name.simulate('change', {target: {value: newName, type: 'text', name: 'name'}});
        isDone.simulate('change', {target: {checked: newIsDone, type: 'checkbox', name: 'isDone'}});
        description.simulate('change', {target: {value: newDescription, type: 'text', name: 'description'}});
    });

    test('should send correct data when save task WITHOUT transfer to another category', () => {
        const submitBtn = wrapper.find('[data-testid="submit-btn"]');
        submitBtn.simulate('click');
        expect(wrapper.instance().props.saveEditedTaskWithoutTransfer).toHaveBeenCalledWith(
            {
                isDone: newIsDone,
                name: newName,
                description: newDescription,
                id: +match.params.taskID
            },
            +match.params.categoryID
        );
        expect(wrapper.instance().props.saveEditedTaskWithTransfer).not.toHaveBeenCalled();
    });

    test('should send correct data when save task WITH transfer to another category', () => {
        const submitBtn = wrapper.find('[data-testid="submit-btn"]');
        const categoryToMove = 1;
        wrapper.setState({categoryToMove: categoryToMove});
        submitBtn.simulate('click');
        expect(wrapper.instance().props.saveEditedTaskWithTransfer).toHaveBeenCalledWith(
            {
                isDone: newIsDone,
                name: newName,
                description: newDescription,
                id: +match.params.taskID
            },
            +match.params.categoryID,
            categoryToMove
        );
        expect(wrapper.instance().props.saveEditedTaskWithoutTransfer).not.toHaveBeenCalled();
    });

    test('should send NO data on cancel', () => {
        const cancelBtn = wrapper.find('[data-testid="cancel-btn"]');
        cancelBtn.simulate('click');
        expect(wrapper.instance().props.saveEditedTaskWithTransfer).not.toHaveBeenCalled();
        expect(wrapper.instance().props.saveEditedTaskWithoutTransfer).not.toHaveBeenCalled();
    });
});
