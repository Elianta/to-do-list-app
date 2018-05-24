import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
import {editCategory} from '../actions/categories';
import {closeModals} from '../actions/modals';

export class EditCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.handleSaveEditedCategory = this.handleSaveEditedCategory.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.name === '') {
            this.setState(() => ({
                name: nextProps.modals.editableCategory.name
            }));
        }
    }

    handleSaveEditedCategory(e) {
        e.preventDefault();
        const categoryName = this.state.name;
        this.props.editCategory({id: this.props.modals.editableCategory.id, update: categoryName});
        this.props.closeModals();
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
                <form data-testid="form" className="modal__form" onSubmit={this.handleSaveEditedCategory}>
                    <input
                        type="text"
                        name="category"
                        autoFocus={true}
                        data-testid="name"
                        className="modal__input"
                        value={this.state.name}
                        onChange={(e) => {
                            this.setState({name: e.currentTarget.value.trim()});
                        }}
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        editCategory,
        closeModals
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);
