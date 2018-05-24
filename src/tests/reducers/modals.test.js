import modalsReducer from '../../reducers/modals';
import {
    CLOSE_MODALS,
    OPEN_MODAL_FOR_CATEGORY_ADDITION,
    OPEN_MODAL_FOR_CATEGORY_DELETING,
    OPEN_MODAL_FOR_CATEGORY_EDITING
} from '../../variables/actions';

const initialState = {
    isAddCategoryModalOpen: false,
    isEditCategoryModalOpen: false,
    isDeleteCategoryModalOpen: false,
    editableCategory: {
        id: 345,
        name: 'Test category'
    }
};

const action = {
    id: 2,
    name: 'Category 2'
};

test('should set default state', () => {
    const state = modalsReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        isAddCategoryModalOpen: false,
        isEditCategoryModalOpen: false,
        isDeleteCategoryModalOpen: false,
        editableCategory: {
            id: undefined,
            name: undefined
        }
    });
});

test('should set isAddCategoryModalOpen to true and fill editable category with data', () => {
    action.type = OPEN_MODAL_FOR_CATEGORY_ADDITION;
    const state = modalsReducer(initialState, action);
    expect(state).toEqual({
        isAddCategoryModalOpen: true,
        isEditCategoryModalOpen: false,
        isDeleteCategoryModalOpen: false,
        editableCategory: {
            id: 2,
            name: 'Category 2'
        }
    });
});

test('should set isEditCategoryModalOpen to true and fill editable category with data', () => {
    action.type = OPEN_MODAL_FOR_CATEGORY_EDITING;
    const state = modalsReducer(initialState, action);
    expect(state).toEqual({
        isAddCategoryModalOpen: false,
        isEditCategoryModalOpen: true,
        isDeleteCategoryModalOpen: false,
        editableCategory: {
            id: 2,
            name: 'Category 2'
        }
    });
});

test('should set isDeleteCategoryModalOpen to true and fill editable category with data', () => {
    action.type = OPEN_MODAL_FOR_CATEGORY_DELETING;
    const state = modalsReducer(initialState, action);
    expect(state).toEqual({
        isAddCategoryModalOpen: false,
        isEditCategoryModalOpen: false,
        isDeleteCategoryModalOpen: true,
        editableCategory: {
            id: 2,
            name: 'Category 2'
        }
    });
});

test('should set all modals states to false', () => {
    const state = modalsReducer(initialState, {type: CLOSE_MODALS});
    expect(state).toEqual({
        ...initialState,
        isAddCategoryModalOpen: false,
        isEditCategoryModalOpen: false,
        isDeleteCategoryModalOpen: false
    });
});
