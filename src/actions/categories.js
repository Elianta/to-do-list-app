import {
    ADD_CATEGORY,
    ADD_NESTED_CATEGORY,
    EDIT_CATEGORY,
    REMOVE_CATEGORY,
    ADD_TASK,
    TOGGLE_TASK,
    SAVE_EDITED_TASK_WITH_TRANSFER,
    SAVE_EDITED_TASK_WITHOUT_TRANSFER
} from '../variables/actions';

let categoryCounter = 1;
let taskCounter = 1;

// ADD_CATEGORY
export const addCategory = (name) => ({
    type: ADD_CATEGORY,
    category: {
        id: categoryCounter++,
        name,
        children: [],
        tasks: []
    }
});

// ADD_NESTED_CATEGORY
export const addNestedCategory = (name, parentID) => ({
    type: ADD_NESTED_CATEGORY,
    parentID,
    category: {
        id: categoryCounter++,
        name,
        children: [],
        tasks: []
    }
});

// EDIT_CATEGORY
export const editCategory = (id, update) => ({
    type: EDIT_CATEGORY,
    id,
    update
});

// REMOVE_CATEGORY
export const removeCategory = (id) => ({
    type: REMOVE_CATEGORY,
    id
});

// ADD_TASK
export const addTask = (name, categoryID) => ({
    type: ADD_TASK,
    task: {
        id: taskCounter++,
        name,
        description: '',
        isDone: false
    },
    categoryID
});

// TOGGLE_TASK
export const toggleTask = (taskID, categoryID) => ({
    type: TOGGLE_TASK,
    taskID,
    categoryID
});

// SAVE_EDITED_TASK_WITHOUT_TRANSFER
export const saveEditedTaskWithoutTransfer = (task, categoryID) => ({
    type: SAVE_EDITED_TASK_WITHOUT_TRANSFER,
    task,
    categoryID
});

// SAVE_EDITED_TASK_WITH_TRANSFER
export const saveEditedTaskWithTransfer = (task, categoryID, destination) => ({
    type: SAVE_EDITED_TASK_WITH_TRANSFER,
    task,
    categoryID,
    destination
});
