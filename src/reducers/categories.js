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

const defaultState = [
    {
        id: 1,
        name: 'Category 1',
        children: [
            {id: 2, name: 'Category 1-1', children: [], tasks: []},
            {id: 3, name: 'Category 1-2', children: [], tasks: []}
        ],
        tasks: [
            {name: 'Task 1', description: 'Task 1 Text', isDone: false, id: 10},
            {name: 'Task 2', description: 'Task 2 Text', isDone: true, id: 11},
            {name: 'Task 3', description: 'Task 3 Text', isDone: true, id: 12}
        ]
    },
    {
        id: 4, name: 'Category 2', children: [], tasks: []
    }
];

const categoriesReducer = (state = defaultState, action) => {
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
            return addTaskToCategory(state, action.categoryID, action.task);
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

function addTaskToCategory(categories, categoryID, task) {
    return categories.map((category) => {
        if (category.id === categoryID) {
            category.tasks.unshift(task);
        } else if (category.children.length) {
            addTaskToCategory(category.children, categoryID, task);
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
                if (item.id === task.taskID) {
                    item.name = task.taskName;
                    item.description = task.taskDescription;
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
            deleteTaskFromCategory(task.id, category);
        } else if (category.id === destinationID) {
            addTaskToCategory(categories, destinationID, task);
        } else if (category.children.length) {
            saveTaskWithTransfer(category.children, categoryID, task, destinationID);
        }
        return category;
    });
}

function deleteTaskFromCategory(taskID, category) {
    return category.tasks.filter((task) => {
        return task.id !== taskID;
    });
}
