import React from 'react';
import {shallow} from 'enzyme';
import {ToDoItemsSection} from '../../components/ToDoItemsSection';
import categories from '../fixtures/categories';

test('should render ToDoItemsSection correctly', () => {
    const match = {params: {id: 5}};
    const filters = {showDone: true, text: ''};
    const wrapper = shallow(<ToDoItemsSection categories={categories} match={match} filters={filters}/>);
    expect(wrapper).toMatchSnapshot();
});
