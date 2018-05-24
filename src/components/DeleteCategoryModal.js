import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
import {removeCategory} from '../actions/categories';
import {closeModals} from '../actions/modals';

export class DeleteCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    }

    handleDeleteCategory(e) {
        e.preventDefault();
        this.props.removeCategory(this.props.modals.editableCategory.id);
        this.props.closeModals();
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
                <button data-testid="confirm-btn" className="button  modal__btn" onClick={this.handleDeleteCategory}>OK</button>
                <button data-testid="cancel-btn" className="button  modal__btn" onClick={this.props.handleModalClose}>Cancel</button>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    modals: state.modals
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeCategory,
        closeModals
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCategoryModal);
