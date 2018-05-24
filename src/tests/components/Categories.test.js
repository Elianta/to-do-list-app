import React from 'react';
import {shallow} from 'enzyme';
import {Categories} from '../../components/Categories';
import categories from '../fixtures/categories';

test('should render Categories correctly', () => {
    const wrapper = shallow(
        <Categories
            mode={'taskTransfer'}
            categories={categories}
            active={'12'}
        />
    );
    expect(wrapper).toMatchSnapshot();
});
