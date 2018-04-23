import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {editCategory} from '../actions/categories';
import {closeModals} from '../actions/modals';

class EditCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSaveEditedCategory = this.handleSaveEditedCategory.bind(this);
    }

    handleSaveEditedCategory(e) {
        e.preventDefault();
        const categoryName = e.target.elements.category.value.trim();
        this.props.dispatch(editCategory(this.props.modals.editableCategory.id, categoryName));
        this.props.dispatch(closeModals());
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modals.isEditCategoryModalOpen}
                onRequestClose={this.props.handleModalClose}
                contentLabel="Edit Category"
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">Edit category name</h3>
                <form className="modal__form" onSubmit={this.handleSaveEditedCategory}>
                    <input
                        type="text"
                        name="category"
                        autoFocus={true}
                        className="modal__input"
                        defaultValue={this.props.modals.editableCategory.name}
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

export default connect(mapStateToProps)(EditCategoryModal);
