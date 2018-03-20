import React from "react";

export default class AddNewToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddNewToDoItem = this.handleAddNewToDoItem.bind(this);

    this.state = {
      error: undefined
    };
  }

  handleAddNewToDoItem(e) {
    e.preventDefault();
    const toDoItem = e.target.elements.toDoItem.value.trim();
    const error = this.props.handleAddNewToDoItem(this.props.categoryID, toDoItem);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.toDoItem.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form className="add-item-form" onSubmit={this.handleAddNewToDoItem}>
          <input className="add-item-form__input" type="text" name="toDoItem" placeholder="Enter item title"/>
          <button className="button">Add</button>
        </form>
      </div>
    )
  }
}
