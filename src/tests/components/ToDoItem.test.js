import React from 'react';
import {shallow} from 'enzyme';
import ToDoItem from '../../components/ToDoItem';

const data = {
    toDoItemText: 'todo name',
    id: 12,
    categoryID: 2,
    isDone: false
};

test('should render ToDoItem correctly', () => {
    const wrapper = shallow(<ToDoItem {...data}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should toggle task when click on the showdone checkbox', () => {
    const handleTaskDone = jest.fn();
    const wrapper = shallow(<ToDoItem {...data} handleTaskDone={handleTaskDone}/>);
    const isDoneCheckbox = wrapper.find('[data-testid="is-done"]');
    isDoneCheckbox.simulate('change');
    expect(wrapper.instance().props.handleTaskDone).toBeCalledWith(data.id, data.categoryID);
});
