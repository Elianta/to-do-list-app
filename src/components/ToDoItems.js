import React from 'react';

import ToDoItem from './ToDoItem.js';

const ToDoItems = (props) => {
    const filtersString = props.filters;
    let showDoneFilter;
    let taskFilter;
    if (filtersString.length) {
        const regExp = {
            showDone: /showdone=([^&]*)/,
            taskSearch: /task=([^&]*)/
        };
        if (regExp.showDone.test(filtersString)) {
            showDoneFilter = filtersString.match(regExp.showDone)[1] !== 'false';
        }
        if (regExp.taskSearch.test(filtersString)) {
            taskFilter = filtersString.match(regExp.taskSearch)[1];
        }
    }

    return (
        <div>
            {
                props.toDoItems.map((toDoItem, index) => {
                    if (
                        (showDoneFilter && !taskFilter) ||
                        (showDoneFilter && taskFilter && toDoItem.name.toLowerCase().indexOf(taskFilter.toLowerCase()) !== -1) ||
                        (!showDoneFilter && taskFilter && !toDoItem.isDone && toDoItem.name.toLowerCase().indexOf(taskFilter.toLowerCase()) !== -1) ||
                        (!showDoneFilter && !taskFilter && !toDoItem.isDone)
                    ) {
                        return (
                            <ToDoItem
                                key={toDoItem.name}
                                toDoItemText={toDoItem.name}
                                index={index}
                                categoryID={props.categoryID}
                                handleTaskDone={props.handleTaskDone}
                                isDone={toDoItem.isDone}
                            />
                        )
                    }
                })
            }
        </div>
    );
};

export default ToDoItems;
