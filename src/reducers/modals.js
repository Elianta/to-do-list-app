import {
    OPEN_MODAL_FOR_CATEGORY_ADDITION,
    OPEN_MODAL_FOR_CATEGORY_DELETING,
    OPEN_MODAL_FOR_CATEGORY_EDITING,
    CLOSE_MODALS
} from '../variables/actions';

const defaultState = {
    isAddCategoryModalOpen: false,
    isEditCategoryModalOpen: false,
    isDeleteCategoryModalOpen: false,
    editableCategory: {
        id: undefined,
        name: undefined
    }
};

const modalsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN_MODAL_FOR_CATEGORY_ADDITION:
            return {
                ...state,
                isAddCategoryModalOpen: true,
                editableCategory: {
                    id: action.id,
                    name: action.name
                }
            };
        case OPEN_MODAL_FOR_CATEGORY_EDITING:
            return {
                ...state,
                isEditCategoryModalOpen: true,
                editableCategory: {
                    id: action.id,
                    name: action.name
                }
            };
        case OPEN_MODAL_FOR_CATEGORY_DELETING:
            return {
                ...state,
                isDeleteCategoryModalOpen: true,
                editableCategory: {
                    id: action.id,
                    name: action.name
                }
            };
        case CLOSE_MODALS:
            return {
                ...state,
                isAddCategoryModalOpen: false,
                isEditCategoryModalOpen: false,
                isDeleteCategoryModalOpen: false
            };
        default:
            return state;
    }
};

export default modalsReducer;
