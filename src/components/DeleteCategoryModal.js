import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {removeCategory} from '../actions/categories';
import {closeModals} from '../actions/modals';

class DeleteCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    }

    handleDeleteCategory(e) {
        e.preventDefault();
        this.props.dispatch(removeCategory(this.props.modals.editableCategory.id));
        this.props.dispatch(closeModals());
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modals.isDeleteCategoryModalOpen}
                onRequestClose={this.props.handleModalClose}
                contentLabel="Delete Category"
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">{`Do you want to delete '${this.props.modals.editableCategory.name}'?`}</h3>
                <p className="modal__content">(All nested categories will be also removed)</p>
                <button className="button  modal__btn" onClick={this.handleDeleteCategory}>OK</button>
                <button className="button  modal__btn" onClick={this.props.handleModalClose}>Cancel</button>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    modals: state.modals
});

export default connect(mapStateToProps)(DeleteCategoryModal);
