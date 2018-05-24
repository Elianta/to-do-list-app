import React from 'react';
import {shallow} from 'enzyme';
import {ToDoItems} from '../../components/ToDoItems';
import categories from '../fixtures/categories';

test('should render ToDoItems correctly', () => {
    const wrapper = shallow(<ToDoItems toDoItems={categories[0].tasks} categoryID={12}/>);
    expect(wrapper).toMatchSnapshot();
});
