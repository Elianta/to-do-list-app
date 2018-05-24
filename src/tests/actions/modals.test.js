import {
    openModalForCategoryAddition,
    openModalForCategoryEditing,
    openModalForCategoryDeleting,
    closeModals
} from '../../actions/modals';
import {
    CLOSE_MODALS,
    OPEN_MODAL_FOR_CATEGORY_ADDITION,
    OPEN_MODAL_FOR_CATEGORY_EDITING,
    OPEN_MODAL_FOR_CATEGORY_DELETING
} from '../../variables/actions';

test('should generate open modal for category addition action object', () => {
    const id = 12;
    const name = 'category 1-2-3-4';
    const action = openModalForCategoryAddition({id, name});
    expect(action).toEqual({
        type: OPEN_MODAL_FOR_CATEGORY_ADDITION,
        id,
        name
    });
});

test('should generate open modal for category editing action object', () => {
    const id = 145;
    const name = 'category #145';
    const action = openModalForCategoryEditing({id, name});
    expect(action).toEqual({
        type: OPEN_MODAL_FOR_CATEGORY_EDITING,
        id,
        name
    });
});

test('should generate open modal for category deleting action object', () => {
    const id = 2;
    const name = 'category #2';
    const action = openModalForCategoryDeleting({id, name});
    expect(action).toEqual({
        type: OPEN_MODAL_FOR_CATEGORY_DELETING,
        id,
        name
    });
});

test('should generate close modals action object', () => {
    expect(closeModals()).toEqual({
        type: CLOSE_MODALS
    });
});
