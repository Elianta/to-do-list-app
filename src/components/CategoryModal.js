import React from 'react';
import Modal from 'react-modal';

const CategoryModal = (props) => (
    <Modal
        isOpen={props.categoryModalDisplayed}
        onRequestClose={props.handleModalClose}
        contentLabel="Selected Category"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">{props.title}</h3>
        <form className="modal__form" onSubmit={props.handleSaveCategory}>
            <input
                type="text"
                name="category"
                autoFocus={true}
                className="modal__input"
                defaultValue={props.modalMode === 'edit' ? props.categoryName : ''}
            />
            <button className="button  modal__btn">Save</button>
        </form>
    </Modal>
);

export default CategoryModal;
