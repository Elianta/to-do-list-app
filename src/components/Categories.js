import React from 'react';
import Category from './Category.js';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryToMoveTaskInId: null
        };
        this.handleSpecifyCategoryToMove = this.handleSpecifyCategoryToMove.bind(this);
    }

    handleSpecifyCategoryToMove(categoryID) {
        this.setState(() => ({
            categoryToMoveTaskInId: categoryID
        }));
        this.props.handleSpecifyCategoryToMove(categoryID);
    }

    render() {
        let categories = this.props.categories.map((category) => {
            return (
                <Category
                    node={category}
                    children={category.children}
                    handleAddNestedCategory={this.props.handleAddNestedCategory}
                    key={category.name}
                    handleEditCategory={this.props.handleEditCategory}
                    handleDeleteCategory={this.props.handleDeleteCategory}
                    mode={this.props.mode}
                    updateProgressBar={this.props.updateProgressBar}
                    categoryID={this.props.categoryID}
                    handleSpecifyCategoryToMove={this.handleSpecifyCategoryToMove}
                    categoryToMoveTaskInId={this.state.categoryToMoveTaskInId}
                    transferTaskIn={this.state.categoryToMoveTaskInId === category.id}
                />
            );
        });

        return (
            <div className="categories__container">
                <ul className="categories__list">
                    {categories}
                </ul>
            </div>
        );
    }
}

export default Categories;
