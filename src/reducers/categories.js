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

const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return [
                action.category,
                ...state
            ];
        case ADD_NESTED_CATEGORY:
            return addNestedCategory(state, action.parentID, action.category);
        case EDIT_CATEGORY:
            return editCategory(state, action.id, action.update);
        case REMOVE_CATEGORY:
            return deleteCategory(state, action.id);
        case ADD_TASK:
            return addTaskToCategories(state, action.categoryID, action.task);
        case TOGGLE_TASK:
            return toggleTask(state, action.taskID, action.categoryID);
        case SAVE_EDITED_TASK_WITHOUT_TRANSFER:
            return saveTaskWithoutTransfer(state, action.categoryID, action.task);
        case SAVE_EDITED_TASK_WITH_TRANSFER:
            return saveTaskWithTransfer(state, action.categoryID, action.task, action.destination);
        default:
            return state;
    }
};

export default categoriesReducer;

function addNestedCategory(categories, parentID, childCategory) {
    return categories.map((category) => {
        if (category.id === parentID) {
            category.children.unshift(childCategory);
        } else if (category.children.length) {
            addNestedCategory(category.children, parentID, childCategory);
        }
        return category;
    });
}

function deleteCategory(categories, id) {
    return categories.reduce((finalListOfCategories, category) => {
        if (category.id !== id) {
            if (category.children.length) {
                category.children = deleteCategory(category.children, id);
            }
            finalListOfCategories.push(category);
        }
        return finalListOfCategories;
    }, []);
}

function editCategory(categories, id, text) {
    return categories.map(function (category) {
        if (category.id === id) {
            category.name = text;
        } else if (category.children.length) {
            editCategory(category.children, id, text);
        }
        return category;
    });
}

function addTaskToCategories(categories, categoryID, task) {
    return categories.map((category) => {
        if (category.id === categoryID) {
            category.tasks.unshift(task);
        } else if (category.children.length) {
            addTaskToCategories(category.children, categoryID, task);
        }
        return category;
    });
}

function toggleTask(categories, taskID, categoryID) {
    return categories.map((category) => {
        if (category.id === categoryID) {
            category.tasks.forEach((item) => {
                if (item.id === taskID) {
                    item.isDone = !item.isDone;
                }
            });
        } else if (category.children.length) {
            toggleTask(category.children, taskID, categoryID);
        }
        return category;
    });
}

function saveTaskWithoutTransfer(categories, categoryID, task) {
    return categories.map((category) => {
        if (category.id === categoryID) {
            category.tasks.forEach((item) => {
                if (item.id === task.id) {
                    item.name = task.name;
                    item.description = task.description;
                    item.isDone = task.isDone;
                }
            });
        } else if (category.children.length) {
            saveTaskWithoutTransfer(category.children, categoryID, task);
        }
        return category;
    });
}

function saveTaskWithTransfer(categories, categoryID, task, destinationID) {
    return categories.map((category) => {
        if (category.id === categoryID) {
            category.tasks = category.tasks.filter((item) => item.id !== task.id);
        } else if (category.id === destinationID) {
            category.tasks.unshift(task);
        }
        if (category.children.length) {
            saveTaskWithTransfer(category.children, categoryID, task, destinationID);
        }
        return category;
    });
}
