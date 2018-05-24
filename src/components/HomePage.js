import React from 'react';
import {Route} from 'react-router-dom';
import ShowDone from './ShowDone.js';
import SearchToDoItem from './SearchToDoItem.js';
import ProgressBar from './ProgressBar.js';
import AddNewCategory from './AddNewCategory.js';
import Categories from './Categories.js';
import ToDoItemsSection from './ToDoItemsSection';
import EditCategoryModal from './EditCategoryModal.js';
import AddCategoryModal from './AddCategoryModal';
import RemoveCategoryModal from './DeleteCategoryModal.js';

const HomePage = (props) => (
    <Route path="/" render={routeProps => (
        <div className="page-content">
            <header className="header">
                <div className="container  container--horizontal">
                    <h1 className="header__title">To-Do List</h1>
                    <ShowDone {...routeProps}/>
                    <SearchToDoItem {...routeProps}/>
                </div>
            </header>
            <main>
                <div className="container">
                    <ProgressBar
                        selectedCategory={props.match.params.id}
                    />
                </div>

                <div className="container  container--horizontal">
                    <section className="categories">
                        <AddNewCategory/>
                        <Categories
                            active={props.match.params.id}
                            mode="homePage"
                        />
                    </section>
                    <Route path="/category/:id" exact={true} render={routeProps => (
                        <ToDoItemsSection
                            {...routeProps}
                        />
                    )}/>
                </div>

                <EditCategoryModal handleModalClose={props.handleModalClose}/>
                <AddCategoryModal handleModalClose={props.handleModalClose}/>
                <RemoveCategoryModal handleModalClose={props.handleModalClose}/>

            </main>
        </div>
    )}
    />
);

export default HomePage;
