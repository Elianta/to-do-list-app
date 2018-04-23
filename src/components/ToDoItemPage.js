import React from 'react';
import {connect} from 'react-redux';
import Categories from './Categories.js';
import {Link} from 'react-router-dom';
import {saveEditedTaskWithoutTransfer, saveEditedTaskWithTransfer} from '../actions/categories';

class ToDoItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.categoryID = parseInt(props.match.params.categoryID, 10);
        this.taskID = parseInt(props.match.params.taskID, 10);
        this.task = this.findTaskByIds(props.categories, this.categoryID, this.taskID)[0];
        this.state = {
            taskID: this.taskID,
            isDone: this.task.isDone,
            taskName: this.task.name,
            taskDescription: this.task.description,
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
        let {isDone, taskName, taskDescription, taskID} = this.state;
        const taskData = {isDone, taskName, taskDescription, taskID};
        if (this.categoryID === this.state.categoryToMove) {
            this.props.dispatch(saveEditedTaskWithoutTransfer(taskData, this.categoryID));
        } else {
            this.props.dispatch(saveEditedTaskWithTransfer(taskData, this.categoryID, this.state.categoryToMove));
        }
    }

    handleSpecifyCategoryToMove(categoryID) {
        this.setState(() => ({
            categoryToMove: categoryID
        }));
    }

    findTaskByIds(categories, categoryID, taskID) {
        return categories.reduce((prev, category) => {
            if (category.id === categoryID) {
                let result = category.tasks.filter((task) => {
                    return task.id === task.id;
                });
                return prev.concat(result);
            } else if (category.children.length && !prev.length) {
                return this.findTaskByIds(category.children, categoryID, taskID);
            }
            return prev;
        }, []);
    }

    render() {
        return (
            <div className="page-content">
                <header className="header">
                    <div className="container  container--horizontal">
                        <h1 className="header__title">To-Do Item #1</h1>
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
                                    className="button  todoitem__btn"
                                    to={`/category/${this.categoryID}`}
                                    onClick={this.handleSubmit}
                                >Save Changes</Link>
                                <Link
                                    className="button  todoitem__btn"
                                    to={`/category/${this.categoryID}`}
                                >Cancel</Link>
                            </div>
                            <input
                                className="todoitem__title"
                                type="text"
                                name="taskName"
                                value={this.state.taskName}
                                autoFocus={true}
                                onChange={this.handleChange}
                            />
                            <div className="option">
                                <input
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
                                className="todoitem__description"
                                placeholder="Write something..."
                                id="description"
                                name="taskDescription"
                                value={this.state.taskDescription}
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

export default connect(mapStateToProps)(ToDoItemPage);
