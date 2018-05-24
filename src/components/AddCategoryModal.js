import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
import {closeModals} from '../actions/modals';
import {addNestedCategory} from '../actions/categories';

export class AddCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ''
        };
        this.handleSaveNewCategory = this.handleSaveNewCategory.bind(this);
    }

    handleSaveNewCategory(e) {
        e.preventDefault();
        const categoryName = this.state.category;
        this.props.addNestedCategory({name: categoryName, parentID: this.props.modals.editableCategory.id});
        this.props.closeModals();
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
                <form data-testid="form" className="modal__form" onSubmit={this.handleSaveNewCategory}>
                    <input
                        type="text"
                        name="category"
                        autoFocus={true}
                        className="modal__input"
                        data-testid="name"
                        onChange={(e) => {
                            this.setState({category: e.currentTarget.value.trim()});
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
        addNestedCategory,
        closeModals
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryModal);
