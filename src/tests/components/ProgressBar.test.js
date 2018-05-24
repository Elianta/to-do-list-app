import React from 'react';
import {shallow} from 'enzyme';
import {ProgressBar} from '../../components/ProgressBar';
import categories from '../fixtures/categories';

test('should render ProgressBar correctly', () => {
    const wrapper = shallow(<ProgressBar categories={categories} selectedCategory={5}/>);
    expect(wrapper).toMatchSnapshot();
});
