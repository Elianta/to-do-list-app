import React from "react";

export default class AddNewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddNewCategory = this.handleAddNewCategory.bind(this);

    this.state = {
      error: undefined
    };
  }

  handleAddNewCategory(e) {
    e.preventDefault();
    const category = e.target.elements.category.value.trim();
    const error = this.props.handleAddNewCategory(category);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.category.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form className="add-item-form" onSubmit={this.handleAddNewCategory}>
          <input className="add-item-form__input" type="text" name="category" placeholder="Enter category title..."/>
          <button className="button">Add</button>
        </form>
      </div>
    )
  }
}
