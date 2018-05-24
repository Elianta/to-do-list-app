import React from 'react';
import {connect} from 'react-redux';
import {addCategory} from '../actions/categories';
import {bindActionCreators} from 'redux';

export class AddNewCategory extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddNewCategory = this.handleAddNewCategory.bind(this);
        this.state = {
            error: undefined,
            name: ''
        };
    }

    handleAddNewCategory(e) {
        e.preventDefault();
        const categoryName = this.state.name;
        if (!categoryName) {
            this.setState(() => ({error: 'Enter valid value to add item'}));
        } else {
            this.setState(() => ({
                error: '',
                name: ''
            }));
            this.props.addCategory(categoryName);
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p data-testid="error">{this.state.error}</p>}
                <form data-testid="form" className="add-item-form" onSubmit={this.handleAddNewCategory}>
                    <input
                        data-testid="name"
                        className="add-item-form__input"
                        type="text"
                        name="category"
                        placeholder="Enter category title..."
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
        addCategory
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddNewCategory);
