import React from 'react';
import {addTask} from '../actions/categories';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export class AddNewToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddNewToDoItem = this.handleAddNewToDoItem.bind(this);
        this.state = {
            error: undefined,
            name: ''
        };
    }

    handleAddNewToDoItem(e) {
        e.preventDefault();
        const toDoName = this.state.name;
        if (!toDoName) {
            this.setState(() => ({error: 'Enter valid value to add item'}));
        } else {
            this.setState(() => ({
                error: '',
                name: ''
            }));
            this.props.addTask({name: toDoName, categoryID: this.props.categoryID});
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p data-testid="error">{this.state.error}</p>}
                <form data-testid="form" className="add-item-form" onSubmit={this.handleAddNewToDoItem}>
                    <input
                        data-testid="name"
                        className="add-item-form__input"
                        type="text" name="toDoItem"
                        placeholder="Enter item title"
                        value={this.state.name}
                        onChange={(e) => {
                            this.setState({name: e.currentTarget.value.trim()});
                        }}
                    />
                    <button className="button">Add</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addTask
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddNewToDoItem);
