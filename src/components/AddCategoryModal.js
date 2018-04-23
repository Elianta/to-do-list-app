import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {closeModals} from '../actions/modals';
import {addNestedCategory} from '../actions/categories';

class AddCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSaveNewCategory = this.handleSaveNewCategory.bind(this);
    }

    handleSaveNewCategory(e) {
        e.preventDefault();
        const categoryName = e.target.elements.category.value.trim();
        this.props.dispatch(addNestedCategory(categoryName, this.props.modals.editableCategory.id));
        this.props.dispatch(closeModals());
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modals.isAddCategoryModalOpen}
                onRequestClose={this.props.handleModalClose}
                contentLabel="Add Category"
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">{`Add nested category into '${this.props.modals.editableCategory.name}'`}</h3>
                <form className="modal__form" onSubmit={this.handleSaveNewCategory}>
                    <input
                        type="text"
                        name="category"
                        autoFocus={true}
                        className="modal__input"
                    />
                    <button className="button  modal__btn">Save</button>
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    modals: state.modals
});

export default connect(mapStateToProps)(AddCategoryModal);
