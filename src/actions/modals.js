import {
    OPEN_MODAL_FOR_CATEGORY_ADDITION,
    OPEN_MODAL_FOR_CATEGORY_DELETING,
    OPEN_MODAL_FOR_CATEGORY_EDITING,
    CLOSE_MODALS
} from '../variables/actions';

export const openModalForCategoryAddition = ({id, name}) => ({
    type: OPEN_MODAL_FOR_CATEGORY_ADDITION,
    id,
    name
});

export const openModalForCategoryEditing = ({id, name}) => ({
    type: OPEN_MODAL_FOR_CATEGORY_EDITING,
    id,
    name
});

export const openModalForCategoryDeleting = ({id, name}) => ({
    type: OPEN_MODAL_FOR_CATEGORY_DELETING,
    id,
    name
});

export const closeModals = () => ({
    type: CLOSE_MODALS
});


