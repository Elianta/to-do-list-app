import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ShowDone from './ShowDone.js';
import SearchToDoItem from './SearchToDoItem.js';
import ProgressBar from './ProgressBar.js';
import AddNewCategory from './AddNewCategory.js';
import ToDoItemPage from './ToDoItemPage';
import Categories from './Categories.js';
import ToDoItemsSection from './ToDoItemsSection';
import CategoryModal from './CategoryModal.js';
import CategoryModalRemove from './CategoryModalRemove.js';

const HomePage = (props) => {
    function findCategoryById(categories, id) {
        return categories.reduce((prev, category) => {
            if (category.id === id) {
                return prev.concat(category.name)
            } else if (category.children.length && !prev.length) {
                return findCategoryById(category.children, id);
            }
            return prev;
        }, "")
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/category/:categoryID/task/:taskID" exact={true} render={routeProps => (
                    <ToDoItemPage
                        {...routeProps}
                        categories={props.categories}
                        handleSaveToDoItem={props.handleSaveToDoItem}
                        handleTaskDone={props.handleTaskDone}
                    />
                )}/>
                <Route path="/" render={routeProps => (
                    <div className="page-content">
                        <header className="header">
                            <div className="container  container--horizontal">
                                <h1 className="header__title">To-Do List</h1>
                                <ShowDone {...routeProps}/>
                                <SearchToDoItem  {...routeProps}/>
                            </div>
                        </header>
                        <main>
                            <div className="container">
                                <ProgressBar
                                    {...routeProps}
                                    updateProgressBar={props.updateProgressBar}
                                    taskDonePercent={props.taskDonePercent}
                                />
                            </div>

                            <div className="container  container--horizontal">
                                <section className="categories">
                                    <AddNewCategory
                                        handleAddNewCategory={props.handleAddNewCategory}
                                    />
                                    <Categories
                                        categories={props.categories}
                                        handleAddNewCategory={props.handleAddNewCategory}
                                        handleAddNestedCategory={props.handleAddNestedCategory}
                                        handleEditCategory={props.handleEditCategory}
                                        handleDeleteCategory={props.handleDeleteCategory}
                                        mode="homePage"
                                        updateProgressBar={props.updateProgressBar}
                                    />
                                </section>
                                <Route path="/category/:id" exact={true} render={routeProps => (
                                    <ToDoItemsSection
                                        {...routeProps}
                                        handleAddNewToDoItem={props.handleAddNewToDoItem}
                                        toDoItems={props.toDoItems}
                                        categories={props.categories}
                                        handleTaskDone={props.handleTaskDone}
                                        filters={props.filters}
                                    />
                                )}/>
                            </div>

                            <CategoryModal
                                categoryName={findCategoryById(props.categories, props.parentCategoryID)}
                                modalMode={props.modalMode}
                                categoryModalDisplayed={props.categoryModalDisplayed}
                                title={props.title}
                                handleSaveCategory={props.handleSaveCategory}
                                handleModalClose={props.handleModalClose}
                            />
                            <CategoryModalRemove
                                categoryName={findCategoryById(props.categories, props.parentCategoryID)}
                                categoryModalRemoveDisplayed={props.categoryModalRemoveDisplayed}
                                handleRemoveConfirm={props.handleRemoveConfirm}
                                handleModalClose={props.handleModalClose}
                            />

                        </main>
                    </div>
                )}/>
            </Switch>
        </BrowserRouter>
    )
};

export default HomePage;
