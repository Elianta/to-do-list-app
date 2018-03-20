import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from '../components/HomePage';
import ToDoItemPage from '../components/ToDoItemPage';
import NotFoundPage from '../components/NotFoundPage';
import CategoryNode from '../components/CategoryNode';
import TaskNode from '../components/TaskNode';

export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddNewCategory = this.handleAddNewCategory.bind(this);
        this.handleAddNewToDoItem = this.handleAddNewToDoItem.bind(this);
        this.handleAddNestedCategory = this.handleAddNestedCategory.bind(this);
        this.handleSaveCategory = this.handleSaveCategory.bind(this);
        this.handleEditCategory = this.handleEditCategory.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
        this.handleRemoveConfirm = this.handleRemoveConfirm.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.addItemToCategory = this.addItemToCategory.bind(this);
        this.handleSaveToDoItem = this.handleSaveToDoItem.bind(this);
        this.handleTaskDone = this.handleTaskDone.bind(this);
        this.updateProgressBar = this.updateProgressBar.bind(this);

        this.state = {
            counter: 8,
            categories: [
                {
                    id: 1,
                    name: 'Category 1',
                    children: [
                        {id: 2, name: 'Category 1-1', children: [], tasks: []},
                        {id: 3, name: 'Category 1-2', children: [], tasks: []}
                    ],
                    tasks: [
                        {name: 'Task 1', description: 'Task 1 Text', isDone: false},
                        {name: 'Task 2', description: 'Task 2 Text', isDone: true},
                        {name: 'Task 3', description: 'Task 3 Text', isDone: true}
                    ]
                },
                {
                    id: 4, name: 'Category 2', children: [], tasks: []
                },
                {
                    id: 5, name: 'Category 3', children: [
                        {
                            id: 6,
                            name: 'Category 3-1',
                            children: [
                                {id: 7, name: 'Category 3-1-1', children: [], tasks: []}
                            ],
                            tasks: [
                                {name: 'Task 6', description: 'Task 6 Text', isDone: true},
                                {name: 'Task 5', description: 'Task 5 Text', isDone: false},
                                {name: 'Task 4', description: 'Task 4 Text', isDone: false}
                            ]
                        }
                    ], tasks: []
                }
            ],
            toDoItems: [],
            categoryModalDisplayed: false,
            categoryModalRemoveDisplayed: false,
            categoryModalTitle: undefined,
            categoryModalMode: undefined,
            parentCategoryID: undefined,
            selectedCategory: undefined,
            taskDonePercent: 100,
            filters: {
                showDone: true
            }
        }
    }

    addItemToCategory(categories, categoryID, categoriesKeyToModify, item) {
        return categories.map((category) => {
            if (category.id === categoryID) {
                category[categoriesKeyToModify].unshift(item)
            } else if (category.children.length) {
                this.addItemToCategory(category.children, categoryID, categoriesKeyToModify, item);
            }
            return category;
        })
    }

    handleAddNewCategory(category) {
        if (!category) {
            return 'Enter valid value to add item';
        }
        this.setState((prevState) => {
            let newState = prevState.categories;
            newState.unshift(new CategoryNode(category, prevState.counter));
            return {
                categories: newState,
                counter: prevState.counter + 1
            };
        })
    }

    handleAddNestedCategory(categoryID) {
        this.setState(() => ({
            categoryModalDisplayed: true,
            categoryModalTitle: 'Add nested category',
            categoryModalMode: 'add',
            parentCategoryID: categoryID
        }))
    }

    handleSaveCategory(e) {
        e.preventDefault();
        const categoryName = e.target.elements.category.value.trim();
        const counter = this.state.counter;
        const newCategory = new CategoryNode(categoryName, counter);

        function editCategory(categories, parentID, text) {
            return categories.map(function (category) {
                if (category.id === parentID) {
                    category.name = text;
                } else if (category.children.length) {
                    editCategory(category.children, parentID, text);
                }
                return category;
            })
        }

        if (this.state.categoryModalTitle === 'Add nested category') {
            this.setState((prevState) => ({
                categories: this.addItemToCategory(prevState.categories, prevState.parentCategoryID, 'children', newCategory),
                counter: prevState.counter + 1,
                categoryModalDisplayed: false
            }));
        } else if (this.state.categoryModalTitle === 'Edit category name') {
            this.setState((prevState) => ({
                categories: editCategory(prevState.categories, prevState.parentCategoryID, categoryName),
                categoryModalDisplayed: false
            }));
        }
    }

    handleEditCategory(categoryID) {
        this.setState(() => ({
            categoryModalDisplayed: true,
            categoryModalTitle: 'Edit category name',
            categoryModalMode: 'edit',
            parentCategoryID: categoryID
        }))
    }

    handleDeleteCategory(categoryID) {
        this.setState(() => ({
            categoryModalRemoveDisplayed: true,
            parentCategoryID: categoryID
        }))
    }

    handleRemoveConfirm(e) {
        e.preventDefault();

        function deleteCategory(categories, id) {
            return categories
                .filter(function (category) {
                    return category.id !== id;
                })
                .map(function (category) {
                    if (category.children.length) {
                        category.children = deleteCategory(category.children, id);
                    }
                    return category;
                });
        }

        this.setState((prevState) => ({
            categories: deleteCategory(prevState.categories, prevState.parentCategoryID),
            categoryModalRemoveDisplayed: false
        }));
    }

    handleAddNewToDoItem(categoryID, toDoItemName) {
        if (!toDoItemName) {
            return 'Enter valid value to add item';
        }

        this.setState((prevState) => ({
            categories: this.addItemToCategory(prevState.categories, categoryID, 'tasks', new TaskNode(toDoItemName))
        }));

        this.updateProgressBar(categoryID);
    }

    handleSaveToDoItem(taskData, categoryID, taskID, categoryToMoveID) {

        function editTaskOfCategory(categories, categoryID, taskID, taskData, categoryToMoveID) {
            if (categoryID === categoryToMoveID) {
                return categories.map((category) => {
                    if (category.id === categoryID) {
                        category.tasks[taskID].name = taskData.taskName;
                        category.tasks[taskID].description = taskData.taskDescription;
                        category.tasks[taskID].isDone = taskData.isDone;
                    } else if (category.children.length) {
                        editTaskOfCategory(category.children, categoryID, taskID, taskData, categoryToMoveID);
                    }
                    return category;
                })
            } else {
                return categories.map((category) => {
                    if (category.id === categoryID) {
                        category.tasks.splice(taskID, 1);
                        if (category.children.length) {
                            editTaskOfCategory(category.children, categoryID, taskID, taskData, categoryToMoveID);
                        }
                    } else if (category.id === categoryToMoveID) {
                        category.tasks.unshift(new TaskNode(taskData.taskName, taskData.taskDescription, taskData.isDone));
                        if (category.children.length) {
                            editTaskOfCategory(category.children, categoryID, taskID, taskData, categoryToMoveID);
                        }
                    } else if (category.children.length) {
                        editTaskOfCategory(category.children, categoryID, taskID, taskData, categoryToMoveID);
                    }
                    return category;
                })
            }

        }

        this.setState((prevState) => ({
            categories: editTaskOfCategory(prevState.categories, categoryID, taskID, taskData, categoryToMoveID)
        }));
        this.updateProgressBar(categoryID);
    }

    handleModalClose() {
        this.setState(() => ({
            categoryModalDisplayed: false,
            categoryModalRemoveDisplayed: false
        }));
    }

    handleTaskDone(categoryID, taskIndex, isDone) {
        function updateTaskState(categories, categoryID, taskIndex, isDoneState) {
            return categories.map((category) => {
                if (category.id === categoryID) {
                    category.tasks[taskIndex].isDone = isDoneState;
                } else if (category.children.length) {
                    updateTaskState(category.children, categoryID, taskIndex, isDoneState);
                }
                return category;
            })
        }
        this.setState((prevState) => ({
            categories: updateTaskState(prevState.categories, categoryID, taskIndex, isDone)
        }));
        this.updateProgressBar(categoryID);
    }

    updateProgressBar(categoryID) {
        function calculateProgressPercent(categories, categoryID) {
            return categories.reduce(function (prev, category) {
                if (category.id === categoryID) {
                    const tasksNumber = category.tasks.length;
                    const standardPercent = 100;
                    const tasksDone = category.tasks.reduce((prev, task) => {
                        if (task.isDone) {
                            return prev + 1;
                        }
                        return prev;
                    }, 0);
                    const progressPercent = tasksDone / tasksNumber * 100;
                    if (tasksNumber) {
                        return prev.concat(progressPercent);
                    } else {
                        return prev.concat(standardPercent);
                    }

                } else if (category.children.length && !prev.length) {
                    return calculateProgressPercent(category.children, categoryID);
                }
                return prev;
            }, '')
        }
        this.setState((prevState) => ({
            taskDonePercent: calculateProgressPercent(prevState.categories, categoryID)
        }));

    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} render={routeProps => (
                        <HomePage
                            {...routeProps}
                            categories={this.state.categories}
                            toDoItems={this.state.toDoItems}
                            modalMode={this.state.categoryModalMode}
                            categoryModalDisplayed={this.state.categoryModalDisplayed}
                            title={this.state.categoryModalTitle}
                            categoryModalRemoveDisplayed={this.state.categoryModalRemoveDisplayed}
                            parentCategoryID={this.state.parentCategoryID}
                            handleAddNewCategory={this.handleAddNewCategory}
                            handleAddNestedCategory={this.handleAddNestedCategory}
                            handleEditCategory={this.handleEditCategory}
                            handleDeleteCategory={this.handleDeleteCategory}
                            handleSaveCategory={this.handleSaveCategory}
                            handleModalClose={this.handleModalClose}
                            handleRemoveConfirm={this.handleRemoveConfirm}
                            handleAddNewToDoItem={this.handleAddNewToDoItem}
                            handleSaveToDoItem={this.handleSaveToDoItem}
                            handleTaskDone={this.handleTaskDone}
                            taskDonePercent={this.state.taskDonePercent}
                            updateProgressBar={this.updateProgressBar}
                            filters={this.state.filters}
                        />
                    )}/>
                    <Route path="/category/:id" exact={true} render={routeProps => (
                        <HomePage
                            {...routeProps}
                            categories={this.state.categories}
                            toDoItems={this.state.toDoItems}
                            modalMode={this.state.categoryModalMode}
                            parentCategoryID={this.state.parentCategoryID}
                            categoryModalDisplayed={this.state.categoryModalDisplayed}
                            title={this.state.categoryModalTitle}
                            categoryModalRemoveDisplayed={this.state.categoryModalRemoveDisplayed}
                            handleAddNewCategory={this.handleAddNewCategory}
                            handleAddNestedCategory={this.handleAddNestedCategory}
                            handleEditCategory={this.handleEditCategory}
                            handleDeleteCategory={this.handleDeleteCategory}
                            handleSaveCategory={this.handleSaveCategory}
                            handleModalClose={this.handleModalClose}
                            handleRemoveConfirm={this.handleRemoveConfirm}
                            handleAddNewToDoItem={this.handleAddNewToDoItem}
                            handleSaveToDoItem={this.handleSaveToDoItem}
                            handleTaskDone={this.handleTaskDone}
                            taskDonePercent={this.state.taskDonePercent}
                            updateProgressBar={this.updateProgressBar}
                            filters={this.state.filters}
                        />
                    )}/>
                    <Route path="/category/:categoryID/task/:taskID" render={routeProps => (
                        <ToDoItemPage
                            {...routeProps}
                            categories={this.state.categories}
                            handleSaveToDoItem={this.handleSaveToDoItem}
                            handleTaskDone={this.handleTaskDone}
                        />
                    )}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
