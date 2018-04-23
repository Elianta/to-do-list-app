import React from 'react';
import {connect} from 'react-redux';
import ToDoItem from './ToDoItem.js';

const ToDoItems = (props) => (
    <div>
        {
            props.toDoItems.map((toDoItem) => (
                <ToDoItem
                    key={toDoItem.name}
                    toDoItemText={toDoItem.name}
                    id={toDoItem.id}
                    categoryID={props.categoryID}
                    handleTaskDone={props.handleTaskDone}
                    isDone={toDoItem.isDone}
                />
            ))
        }
    </div>
);

const mapStateToProps = (state) => ({
    categories: state.categories,
    filters: state.filters
});

export default connect(mapStateToProps)(ToDoItems);
