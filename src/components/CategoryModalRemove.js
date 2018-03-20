import React from 'react';
import Modal from 'react-modal';

const CategoryModalRemove = (props) => (
    <Modal
        isOpen={props.categoryModalRemoveDisplayed}
        onRequestClose={props.handleModalClose}
        contentLabel="Selected Category"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">{`Do you want to remove '${props.categoryName}'?`}</h3>
        <p className="modal__content">(All nested categories will be also removed)</p>
        <button className="button  modal__btn" onClick={props.handleRemoveConfirm}>OK</button>
        <button className="button  modal__btn" onClick={props.handleModalClose}>Cancel</button>
    </Modal>
);

export default CategoryModalRemove;
