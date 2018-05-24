import React from 'react';
import {shallow} from 'enzyme';
import {ShowDone} from '../../components/ShowDone';

test('should render ShowDone correctly', () => {
    const filters = {
        showDone: true
    };
    const wrapper = shallow(<ShowDone filters={filters}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should send correct showdone value on change', () => {
    const setShowDoneFilter = jest.fn();
    const filters = {
        showDone: true
    };
    const wrapper = shallow(<ShowDone filters={filters} setShowDoneFilter={setShowDoneFilter}/>);
    const spy = jest.spyOn(wrapper.instance(), 'changeBrowserHistory').mockImplementation(() => {});
    const showdone = wrapper.find('[data-testid="show-done"]');

    showdone.simulate('change', {target: {checked: !filters.showDone}});

    expect(spy).toHaveBeenCalledWith(!filters.showDone);
    expect(wrapper.instance().props.setShowDoneFilter).toHaveBeenCalledWith(!filters.showDone);
});
