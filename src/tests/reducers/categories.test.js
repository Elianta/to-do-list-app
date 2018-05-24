import categoriesReducer from '../../reducers/categories';
import {getCategories} from '../fixtures/categories';
import {
    ADD_CATEGORY,
    ADD_NESTED_CATEGORY,
    ADD_TASK,
    EDIT_CATEGORY,
    REMOVE_CATEGORY, SAVE_EDITED_TASK_WITHOUT_TRANSFER,
    TOGGLE_TASK, SAVE_EDITED_TASK_WITH_TRANSFER
} from '../../variables/actions';

test('should add category correctly', () => {
    const action = {
        type: ADD_CATEGORY,
        category: {
            id: 100,
            name: 'Category #100',
            children: [],
            tasks: []
        }
    };
    const state = categoriesReducer(getCategories(), action);
    expect(state).toEqual([
        {
            id: 100,
            name: 'Category #100',
            children: [],
            tasks: []
        },
        {
            id: 1,
            name: 'Category 1',
            children: [
                {id: 2, name: 'Category 1-1', children: [], tasks: []},
                {
                    id: 3, name: 'Category 1-2', children: [
                        {
                            id: 5, name: 'Category 1-2-1', children: [], tasks: [
                                {name: 'Task 4', description: 'Task 4 Text', isDone: false, id: 1},
                                {name: 'Task 5', description: 'Task 5 Text', isDone: true, id: 2},
                                {name: 'Task 6', description: 'Task 6 Text', isDone: false, id: 3}
                            ]
                        }
                    ], tasks: []
                }
            ],
            tasks: [
                {name: 'Task 1', description: 'Task 1 Text', isDone: false, id: 4},
                {name: 'Task 2', description: 'Task 2 Text', isDone: true, id: 5},
                {name: 'Task 3', description: 'Task 3 Text', isDone: true, id: 6}
            ]
        },
        {
            id: 4, name: 'Category 2', children: [
                {id: 6, name: 'Category 2-1', children: [], tasks: []}
            ], tasks: [
                {name: 'Task 7', description: 'Task 7 Text', isDone: true, id: 7}
            ]
        }
    ]);
});

test('should add nested category correctly', () => {
    const action = {
        type: ADD_NESTED_CATEGORY,
        parentID: 3,
        category: {
            id: 101,
            name: 'Category # 101',
            children: [],
            tasks: []
        }
    };
    const state = categoriesReducer(getCategories(), action);
    expect(state).toEqual([
        {
            id: 1,
            name: 'Category 1',
            children: [
                {id: 2, name: 'Category 1-1', children: [], tasks: []},
                {
                    id: 3, name: 'Category 1-2', children: [
                        {
                            id: 101,
                            name: 'Category # 101',
                            children: [],
                            tasks: []
                        },
                        {
                            id: 5, name: 'Category 1-2-1', children: [], tasks: [
                                {name: 'Task 4', description: 'Task 4 Text', isDone: false, id: 1},
                                {name: 'Task 5', description: 'Task 5 Text', isDone: true, id: 2},
                                {name: 'Task 6', description: 'Task 6 Text', isDone: false, id: 3}
                            ]
                        }
                    ], tasks: []
                }
            ],
            tasks: [
                {name: 'Task 1', description: 'Task 1 Text', isDone: false, id: 4},
                {name: 'Task 2', description: 'Task 2 Text', isDone: true, id: 5},
                {name: 'Task 3', description: 'Task 3 Text', isDone: true, id: 6}
            ]
        },
        {
            id: 4, name: 'Category 2', children: [
                {id: 6, name: 'Category 2-1', children: [], tasks: []}
            ], tasks: [
                {name: 'Task 7', description: 'Task 7 Text', isDone: true, id: 7}
            ]
        }
    ]);
});

test('should edit category name correctly', () => {
    const action = {
        type: EDIT_CATEGORY,
        id: 6,
        update: 'New Category Name'
    };
    const state = categoriesReducer(getCategories(), action);
    expect(state).toEqual([
        {
            id: 1,
            name: 'Category 1',
            children: [
                {id: 2, name: 'Category 1-1', children: [], tasks: []},
                {
                    id: 3, name: 'Category 1-2', children: [
                        {
                            id: 5, name: 'Category 1-2-1', children: [], tasks: [
                                {name: 'Task 4', description: 'Task 4 Text', isDone: false, id: 1},
                                {name: 'Task 5', description: 'Task 5 Text', isDone: true, id: 2},
                                {name: 'Task 6', description: 'Task 6 Text', isDone: false, id: 3}
                            ]
                        }
                    ], tasks: []
                }
            ],
            tasks: [
                {name: 'Task 1', description: 'Task 1 Text', isDone: false, id: 4},
                {name: 'Task 2', description: 'Task 2 Text', isDone: true, id: 5},
                {name: 'Task 3', description: 'Task 3 Text', isDone: true, id: 6}
            ]
        },
        {
            id: 4, name: 'Category 2', children: [
                {id: 6, name: 'New Category Name', children: [], tasks: []}
            ], tasks: [
                {name: 'Task 7', description: 'Task 7 Text', isDone: true, id: 7}
            ]
        }
    ]);
});

test('should remove category by id', () => {
    const action = {
        type: REMOVE_CATEGORY,
        id: 3
    };
    const state = categoriesReducer(getCategories(), action);
    expect(state).toEqual([
        {
            id: 1,
            name: 'Category 1',
            children: [{id: 2, name: 'Category 1-1', children: [], tasks: []}],
            tasks: [
                {name: 'Task 1', description: 'Task 1 Text', isDone: false, id: 4},
                {name: 'Task 2', description: 'Task 2 Text', isDone: true, id: 5},
                {name: 'Task 3', description: 'Task 3 Text', isDone: true, id: 6}
            ]
        },
        {
            id: 4, name: 'Category 2', children: [
                {id: 6, name: 'Category 2-1', children: [], tasks: []}
            ], tasks: [
                {name: 'Task 7', description: 'Task 7 Text', isDone: true, id: 7}
            ]
        }
    ]);
});

test('should not remove expenses if id not found', () => {
    const action = {
        type: REMOVE_CATEGORY,
        id: 303
    };
    const state = categoriesReducer(getCategories(), action);
    expect(state).toEqual(getCategories());
});

test('should set default state', () => {
    const state = categoriesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should add new task correctly', () => {
    const action = {
        type: ADD_TASK,
        task: {
            id: 30,
            name: 'New task #30',
            description: '',
            isDone: false
        },
        categoryID: 4
    };
    const state = categoriesReducer(getCategories(), action);
    expect(state).toEqual([
        {
            id: 1,
            name: 'Category 1',
            children: [
                {id: 2, name: 'Category 1-1', children: [], tasks: []},
                {
                    id: 3, name: 'Category 1-2', children: [
                        {
                            id: 5, name: 'Category 1-2-1', children: [], tasks: [
                                {name: 'Task 4', description: 'Task 4 Text', isDone: false, id: 1},
                                {name: 'Task 5', description: 'Task 5 Text', isDone: true, id: 2},
                                {name: 'Task 6', description: 'Task 6 Text', isDone: false, id: 3}
                            ]
                        }
                    ], tasks: []
                }
            ],
            tasks: [
                {name: 'Task 1', description: 'Task 1 Text', isDone: false, id: 4},
                {name: 'Task 2', description: 'Task 2 Text', isDone: true, id: 5},
                {name: 'Task 3', description: 'Task 3 Text', isDone: true, id: 6}
            ]
        },
        {
            id: 4, name: 'Category 2', children: [
                {id: 6, name: 'Category 2-1', children: [], tasks: []}
            ], tasks: [
                {id: 30, name: 'New task #30', description: '', isDone: false},
                {name: 'Task 7', description: 'Task 7 Text', isDone: true, id: 7}
            ]
        }
    ]);
});

test('should toggle task correctly', () => {
    const action = {
        type: TOGGLE_TASK,
        taskID: 2,
        categoryID: 5
    };
    const previousState = getCategories();
    const previousTaskValue = previousState[0].children[1].children[0].tasks[1];
    expect(previousTaskValue.isDone).toBe(true);
    const state = categoriesReducer(previousState, action);
    const currentTaskValue = state[0].children[1].children[0].tasks[1];
    expect(currentTaskValue.isDone).toBe(false);
});

test('should save edited task without transfer into another category', () => {
    const action = {
        type: SAVE_EDITED_TASK_WITHOUT_TRANSFER,
        task: {id: 6, name: 'Edited Name', description: 'Edited Description', isDone: false},
        categoryID: 1
    };
    const state = categoriesReducer(getCategories(), action);
    expect(state).toEqual([
        {
            id: 1,
            name: 'Category 1',
            children: [
                {id: 2, name: 'Category 1-1', children: [], tasks: []},
                {
                    id: 3, name: 'Category 1-2', children: [
                        {
                            id: 5, name: 'Category 1-2-1', children: [], tasks: [
                                {name: 'Task 4', description: 'Task 4 Text', isDone: false, id: 1},
                                {name: 'Task 5', description: 'Task 5 Text', isDone: true, id: 2},
                                {name: 'Task 6', description: 'Task 6 Text', isDone: false, id: 3}
                            ]
                        }
                    ], tasks: []
                }
            ],
            tasks: [
                {name: 'Task 1', description: 'Task 1 Text', isDone: false, id: 4},
                {name: 'Task 2', description: 'Task 2 Text', isDone: true, id: 5},
                {name: 'Edited Name', description: 'Edited Description', isDone: false, id: 6}
            ]
        },
        {
            id: 4, name: 'Category 2', children: [
                {id: 6, name: 'Category 2-1', children: [], tasks: []}
            ], tasks: [
                {name: 'Task 7', description: 'Task 7 Text', isDone: true, id: 7}
            ]
        }
    ]);
});

test('should save edited task with transfer into another category', () => {
    const action = {
        type: SAVE_EDITED_TASK_WITH_TRANSFER,
        task: {id: 6, name: 'Edited Name of Task 6', description: 'Edited Description of Task 6', isDone: false},
        categoryID: 1,
        destination: 3
    };
    const state = categoriesReducer(getCategories(), action);
    expect(state).toEqual([
        {
            id: 1,
            name: 'Category 1',
            children: [
                {id: 2, name: 'Category 1-1', children: [], tasks: []},
                {
                    id: 3, name: 'Category 1-2', children: [
                        {
                            id: 5, name: 'Category 1-2-1', children: [], tasks: [
                                {name: 'Task 4', description: 'Task 4 Text', isDone: false, id: 1},
                                {name: 'Task 5', description: 'Task 5 Text', isDone: true, id: 2},
                                {name: 'Task 6', description: 'Task 6 Text', isDone: false, id: 3}
                            ]
                        }
                    ], tasks: [{name: 'Edited Name of Task 6', description: 'Edited Description of Task 6', isDone: false, id: 6}]
                }
            ],
            tasks: [
                {name: 'Task 1', description: 'Task 1 Text', isDone: false, id: 4},
                {name: 'Task 2', description: 'Task 2 Text', isDone: true, id: 5}
            ]
        },
        {
            id: 4, name: 'Category 2', children: [
                {id: 6, name: 'Category 2-1', children: [], tasks: []}
            ], tasks: [
                {name: 'Task 7', description: 'Task 7 Text', isDone: true, id: 7}
            ]
        }
    ]);
});
