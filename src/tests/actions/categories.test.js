import {
    addCategory,
    addNestedCategory,
    editCategory,
    removeCategory,
    addTask,
    toggleTask,
    saveEditedTaskWithTransfer,
    saveEditedTaskWithoutTransfer
} from '../../actions/categories';
import {
    ADD_CATEGORY,
    ADD_NESTED_CATEGORY,
    ADD_TASK,
    EDIT_CATEGORY,
    REMOVE_CATEGORY, SAVE_EDITED_TASK_WITH_TRANSFER, SAVE_EDITED_TASK_WITHOUT_TRANSFER,
    TOGGLE_TASK
} from '../../variables/actions';

test('should setup add category action object', () => {
    const name = 'category 1-2-3';
    const action = addCategory(name);
    expect(action).toEqual({
        type: ADD_CATEGORY,
        category: {
            id: expect.any(Number),
            name,
            children: [],
            tasks: []
        }
    });
});

test('should setup add nested category action object', () => {
    const name = 'nested category 1-1-2-3';
    const parentID = 2;
    const action = addNestedCategory({name, parentID});
    expect(action).toEqual({
        type: ADD_NESTED_CATEGORY,
        parentID,
        category: {
            id: expect.any(Number),
            name,
            children: [],
            tasks: []
        }
    });
});

test('should setup edit category action object', () => {
    const id = 1;
    const update = 'edited category';
    const action = editCategory({id, update});
    expect(action).toEqual({
        type: EDIT_CATEGORY,
        id,
        update
    });
});

test('should setup remove category action object', () => {
    const categoryID = 23;
    const action = removeCategory(categoryID);
    expect(action).toEqual({
        type: REMOVE_CATEGORY,
        id: categoryID
    });
});

test('should setup add task action object', () => {
    const name = 'Task #31';
    const categoryID = 12;
    const action = addTask({name, categoryID});
    expect(action).toEqual({
        type: ADD_TASK,
        task: {
            id: expect.any(Number),
            name,
            description: '',
            isDone: false
        },
        categoryID
    });
});

test('should setup toggle task action object', () => {
    const taskID = 13;
    const categoryID = 24;
    const action = toggleTask({taskID, categoryID});
    expect(action).toEqual({
        type: TOGGLE_TASK,
        taskID,
        categoryID
    });
});

test('should setup save edited task without transfer action object', () => {
    const task = {
        id: 3,
        name: 'Task #3',
        description: 'New Description',
        isDone: false
    };
    const categoryID = 3;
    const action = saveEditedTaskWithoutTransfer(task, categoryID);
    expect(action).toEqual({
        type: SAVE_EDITED_TASK_WITHOUT_TRANSFER,
        task,
        categoryID
    });
});

test('should setup save edited task with transfer action object', () => {
    const task = {
        id: 5,
        name: 'Task #5',
        description: 'New Description of Task',
        isDone: true
    };
    const categoryID = 1;
    const destination = 5;
    const action = saveEditedTaskWithTransfer(task, categoryID, destination);
    expect(action).toEqual({
        type: SAVE_EDITED_TASK_WITH_TRANSFER,
        task,
        categoryID,
        destination
    });
});
