import React from 'react';
import {connect} from 'react-redux';
import {addCategory} from '../actions/categories';

class AddNewCategory extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddNewCategory = this.handleAddNewCategory.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddNewCategory(e) {
        e.preventDefault();
        const categoryName = e.target.elements.category.value.trim();
        if (!categoryName) {
            this.setState(() => ({error: 'Enter valid value to add item'}));
        } else {
            this.setState(() => ({
                error: ''
            }));
            this.props.dispatch(addCategory(categoryName));
            e.target.elements.category.value = '';
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form className="add-item-form" onSubmit={this.handleAddNewCategory}>
                    <input
                        className="add-item-form__input"
                        type="text"
                        name="category"
                        placeholder="Enter category title..."
                    />
                    <button className="button">Add</button>
                </form>
            </div>
        );
    }
}

export default connect()(AddNewCategory);
