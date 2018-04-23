import React from 'react';
import {connect} from 'react-redux';
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
                    active={this.props.active}
                    node={category}
                    children={category.children}
                    key={category.name}
                    mode={this.props.mode}
                    categoryID={category.id}
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

const mapStateToProps = (state) => ({
    categories: state.categories
});

export default connect(mapStateToProps)(Categories);
