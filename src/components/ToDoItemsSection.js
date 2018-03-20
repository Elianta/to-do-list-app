import React from 'react';
import AddNewToDoItem from './AddNewToDoItem.js';
import ToDoItems from './ToDoItems.js';

const ToDoItemsSection = (props) => {
    function findCategoryTasks(categories, categoryID) {
        return categories.reduce(function (prev, category) {
            if (category.id === categoryID) {
                return prev.concat(category.tasks);
            } else if (category.children.length && !prev.length) {
                return findCategoryTasks(category.children, categoryID);
            }
            return prev;
        }, [])
    }

    const categoryID = parseInt(props.match.params.id, 10);
    const tasks = findCategoryTasks(props.categories, categoryID);

    return (
        <section className="todolist">
            <AddNewToDoItem
                handleAddNewToDoItem={props.handleAddNewToDoItem}
                categoryID={categoryID}
            />
            <ToDoItems
                toDoItems={tasks}
                categoryID={categoryID}
                handleTaskDone={props.handleTaskDone}
                filters={props.location.search}
            />
        </section>
    );
};

export default ToDoItemsSection;
