import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {
    openModalForCategoryAddition,
    openModalForCategoryDeleting,
    openModalForCategoryEditing
} from '../actions/modals';

export class Category extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenAddCategoryModal = this.handleOpenAddCategoryModal.bind(this);
        this.handleOpenEditCategoryModal = this.handleOpenEditCategoryModal.bind(this);
        this.handleOpenDeleteCategoryModal = this.handleOpenDeleteCategoryModal.bind(this);
    }

    handleOpenAddCategoryModal(id, name) {
        this.props.openModalForCategoryAddition({id, name});
    }

    handleOpenEditCategoryModal(id, name) {
        this.props.openModalForCategoryEditing({id, name});
    }

    handleOpenDeleteCategoryModal(id, name) {
        this.props.openModalForCategoryDeleting({id, name});
    }

    render() {
        let childCategories = null;

        if (this.props.children.length) {
            childCategories = this.props.children.map((childCategory) => {

                return (
                    <Category
                        active={this.props.active}
                        key={childCategory.name}
                        node={childCategory}
                        children={childCategory.children}
                        mode={this.props.mode}
                        dispatch={this.props.dispatch}
                        categoryID={this.props.categoryID}
                        handleSpecifyCategoryToMove={this.props.handleSpecifyCategoryToMove}
                        transferTaskIn={this.props.categoryToMoveTaskInId === childCategory.id}
                        openModalForCategoryAddition={this.props.openModalForCategoryAddition}
                        openModalForCategoryEditing={this.props.openModalForCategoryEditing}
                        openModalForCategoryDeleting={this.props.openModalForCategoryDeleting}
                    />
                );
            });
        }

        switch (this.props.mode) {
            case 'taskTransfer':
                return (
                    <li className="categories__item" key={this.props.node.id}>
                        <span className="categories__text">{this.props.node.name}</span>
                        <div className="categories__manage-list">
                            <button
                                data-testid="transfer-btn"
                                className={
                                    this.props.transferTaskIn ? 'button  button--manage  button--transfer-approved' : 'button  button--manage  button--transfer'
                                }
                                onClick={() => {
                                    this.props.handleSpecifyCategoryToMove(this.props.node.id);
                                }}
                                disabled={parseInt(this.props.active, 10) === this.props.node.id}
                            >
                                <svg width="20" height="20" viewBox="0 0 533.333 533.333">
                                    <path d="M241.914,403.974v129.359l-200-200l200-200v132.2C474.597,270.992,464.616,107.309,405.384,0
		C551.587,158.028,520.541,411.234,241.914,403.974z"/>
                                </svg>
                            </button>
                        </div>
                        {childCategories ?
                            <ul className="categories__list  categories__list--nested">{childCategories}</ul> : null}
                    </li>
                );
            case 'homePage':
                return (
                    <li className="categories__item" key={this.props.node.id}>
                        <NavLink
                            to={`/category/${this.props.node.id}`}
                            exact={true}
                            className="categories__link"
                            activeClassName="categories__link--active"
                            isActive={()=>{return parseInt(this.props.active, 10) === this.props.node.id;}}
                        >
                            {this.props.node.name}
                        </NavLink>

                        <div className="categories__manage-list">
                            <button
                                className="button  button--manage  categories__manage-item"
                                data-testid="edit-btn"
                                onClick={() => {
                                    this.handleOpenEditCategoryModal(this.props.node.id, this.props.node.name);
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 528.899 528.899">
                                    <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
		L27.473,390.597L0.3,512.69z"/>
                                </svg>
                            </button>
                            <button
                                className="button  button--manage  categories__manage-item"
                                data-testid="delete-btn"
                                onClick={() => {
                                    this.handleOpenDeleteCategoryModal(this.props.node.id, this.props.node.name);
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 408.483 408.483">
                                    <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
			H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
			c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
			c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
			c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
			c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/>
                                    <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
			c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/>
                                </svg>
                            </button>
                            <button
                                className="button  button--manage"
                                data-testid="add-btn"
                                onClick={() => {
                                    this.handleOpenAddCategoryModal(this.props.node.id, this.props.node.name);
                                }}
                            >
                                <svg viewBox="0 0 33.059 33.059" width="22" height="22">
                                    <path d="M15.529,31.059C6.966,31.059,0,24.092,0,15.529C0,6.966,6.966,0,15.529,0
			c8.563,0,15.529,6.966,15.529,15.529C31.059,24.092,24.092,31.059,15.529,31.059z M15.529,1.774
			c-7.585,0-13.755,6.171-13.755,13.755s6.17,13.754,13.755,13.754c7.584,0,13.754-6.17,13.754-13.754S23.113,1.774,15.529,1.774z"
                                    />
                                    <path d="M21.652,16.416H9.406c-0.49,0-0.888-0.396-0.888-0.887c0-0.49,0.397-0.888,0.888-0.888h12.246
			c0.49,0,0.887,0.398,0.887,0.888C22.539,16.02,22.143,16.416,21.652,16.416z"/>
                                    <path d="M15.529,22.539c-0.49,0-0.888-0.397-0.888-0.887V9.406c0-0.49,0.398-0.888,0.888-0.888
			c0.49,0,0.887,0.398,0.887,0.888v12.246C16.416,22.143,16.02,22.539,15.529,22.539z"/>
                                </svg>
                            </button>
                        </div>

                        {childCategories ?
                            <ul className="categories__list  categories__list--nested">{childCategories}</ul> : null}
                    </li>
                );
        }
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openModalForCategoryAddition,
        openModalForCategoryDeleting,
        openModalForCategoryEditing
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
