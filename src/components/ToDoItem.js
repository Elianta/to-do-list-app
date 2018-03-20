import React from 'react';
import {Link} from 'react-router-dom';

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDone: this.props.isDone,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        this.props.handleTaskDone(this.props.categoryID, this.props.index, value);
    }

    render() {
        return (
            <div className="todolist__item">
                <div className="option  option--empty">
                    <input
                        type="checkbox"
                        className="option__input"
                        id={`item${this.props.index}`}
                        name="isDone"
                        checked={this.state.isDone}
                        onChange={this.handleChange}
                    />
                    <label className="option__label" htmlFor={`item${this.props.index}`}>Done</label>
                </div>
                <span className="todolist__item-name">{this.props.toDoItemText}</span>
                <Link
                    to={`/category/${this.props.categoryID}/task/${this.props.index}`}
                    className="button  button--manage  todolist__edit"
                >
                    <svg width="20" height="20" viewBox="0 0 528.899 528.899">
                        <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
		L27.473,390.597L0.3,512.69z"/>
                    </svg>
                </Link>
            </div>
        );
    }
}

export default ToDoItem;
