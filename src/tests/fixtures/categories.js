export default [
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
];

export const getCategories = () => {
    return [
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
    ];
};

