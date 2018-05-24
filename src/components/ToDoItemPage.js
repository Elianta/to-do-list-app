import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Categories from './Categories.js';
import {Link} from 'react-router-dom';
import {saveEditedTaskWithoutTransfer, saveEditedTaskWithTransfer} from '../actions/categories';

export class ToDoItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.categoryID = parseInt(props.match.params.categoryID, 10);
        this.taskID = parseInt(props.match.params.taskID, 10);
        this.task = this.__findTaskByIds(props.categories, this.categoryID, this.taskID)[0];
        this.state = {
            isDone: this.task.isDone,
            name: this.task.name,
            description: this.task.description,
            categoryToMove: this.categoryID
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSpecifyCategoryToMove = this.handleSpecifyCategoryToMove.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        let {isDone, name, description} = this.state;
        const id = this.taskID;
        const taskData = {isDone, name, description, id};
        if (this.categoryID === this.state.categoryToMove) {
            this.props.saveEditedTaskWithoutTransfer(taskData, this.categoryID);
        } else {
            this.props.saveEditedTaskWithTransfer(taskData, this.categoryID, this.state.categoryToMove);
        }
    }

    handleSpecifyCategoryToMove(categoryID) {
        this.setState(() => ({
            categoryToMove: categoryID
        }));
    }

    __findTaskByIds(categories, categoryID, taskID) {
        return categories.reduce((prev, category) => {
            if (category.id === categoryID) {
                let result = category.tasks.filter((task) => {
                    return task.id === taskID;
                });
                return prev.concat(result);
            } else if (category.children.length && !prev.length) {
                return this.__findTaskByIds(category.children, categoryID, taskID);
            }
            return prev;
        }, []);
    }

    render() {
        return (
            <div className="page-content">
                <header className="header">
                    <div className="container  container--horizontal">
                        <h1 className="header__title">{this.state.name}</h1>
                    </div>
                </header>
                <main>
                    <div className="container  container--horizontal">
                        <section className="categories">
                            <Categories
                                active={this.props.match.params.categoryID}
                                mode="taskTransfer"
                                categoryID={this.categoryID}
                                handleSpecifyCategoryToMove={this.handleSpecifyCategoryToMove}
                            />
                        </section>
                        <form className="todoitem">
                            <div className="todoitem__manage">
                                <Link
                                    data-testid="submit-btn"
                                    className="button  todoitem__btn"
                                    to={`/category/${this.categoryID}`}
                                    onClick={this.handleSubmit}
                                >Save Changes</Link>
                                <Link
                                    data-testid="cancel-btn"
                                    className="button  todoitem__btn"
                                    to={`/category/${this.categoryID}`}
                                >Cancel</Link>
                            </div>
                            <input
                                data-testid="name"
                                className="todoitem__title"
                                type="text"
                                name="name"
                                value={this.state.name}
                                autoFocus={true}
                                onChange={this.handleChange}
                            />
                            <div className="option">
                                <input
                                    data-testid="is-done"
                                    className="option__input"
                                    type="checkbox"
                                    id="taskDone"
                                    name="isDone"
                                    checked={this.state.isDone}
                                    onChange={this.handleChange}
                                />
                                <label className="option__label" htmlFor="taskDone">Done</label>
                            </div>

                            <label className="todoitem__description-label" htmlFor="description">Description:</label>
                            <textarea
                                data-testid="description"
                                className="todoitem__description"
                                placeholder="Write something..."
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />

                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveEditedTaskWithoutTransfer,
        saveEditedTaskWithTransfer
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItemPage);
