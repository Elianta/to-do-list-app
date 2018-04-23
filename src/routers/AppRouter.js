import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {setTextFilter,setShowDoneFilter} from '../actions/filters';
import {addTask} from '../actions/categories';
import {closeModals} from '../actions/modals';
import HomePage from '../components/HomePage';
import ToDoItemPage from '../components/ToDoItemPage';
import NotFoundPage from '../components/NotFoundPage';

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddNewToDoItem = this.handleAddNewToDoItem.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.checkSearchString = this.checkSearchString.bind(this);
    }

    handleAddNewToDoItem(categoryID, toDoItemName) {
        if (!toDoItemName) {
            return 'Enter valid value to add item';
        }
        this.props.dispatch(addTask(toDoItemName, categoryID));
    }

    handleModalClose() {
        this.props.dispatch(closeModals());
    }

    checkSearchString({search}) {
        if (search) {
            const regExpShowDone = /showdone=([^&]*)/;
            const regExpTextSearch = /text=([^&]*)/;
            const showDoneValue = search.match(regExpShowDone) ? search.match(regExpShowDone)[1] === 'true' : false;
            const textSearchValue = search.match(regExpTextSearch) ? search.match(regExpTextSearch)[1] : '';
            this.props.dispatch(setShowDoneFilter(showDoneValue));
            this.props.dispatch(setTextFilter(textSearchValue));
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} render={routeProps => (
                        <HomePage
                            {...routeProps}
                            handleModalClose={this.handleModalClose}
                            handleAddNewToDoItem={this.handleAddNewToDoItem}
                        />
                    )}/>
                    <Route path="/category/:id" exact={true} render={routeProps => {
                        this.checkSearchString(routeProps.location);
                        return (
                            <HomePage
                                {...routeProps}
                                handleModalClose={this.handleModalClose}
                                handleAddNewToDoItem={this.handleAddNewToDoItem}
                            />
                        );
                    }}/>
                    <Route path="/category/:categoryID/task/:taskID" render={routeProps => (
                        <ToDoItemPage {...routeProps} />
                    )}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default connect()(AppRouter);
