import React from 'react';
import { connect } from 'react-redux';
import getVisibleTasks from '../selectors/tasks';
import {toggleTask} from '../actions/categories';
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
        }, []);
    }

    function handleTaskDone(taskID, categoryID) {
        props.dispatch(toggleTask(taskID, categoryID));
    }

    const categoryID = parseInt(props.match.params.id, 10);
    const toDoItems = findCategoryTasks(props.categories, categoryID);
    const toDoItemsFiltered = getVisibleTasks(toDoItems, props.filters);

    return (
        <section className="todolist">
            <AddNewToDoItem
                handleAddNewToDoItem={props.handleAddNewToDoItem}
                categoryID={categoryID}
            />
            <ToDoItems
                toDoItems={toDoItemsFiltered}
                categoryID={categoryID}
                handleTaskDone={handleTaskDone}
            />
        </section>
    );
};

const mapStateToProps = (state) => ({
    categories: state.categories,
    filters: state.filters
});

export default connect(mapStateToProps)(ToDoItemsSection);
