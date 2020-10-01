import React from 'react';
import { mount } from 'enzyme';

import App from '../client/components/App.jsx';

describe('<App />', () => {
    it('renders', () => {
        mount(<App />);
    });

    it('render playerHand component', () => {
        const wrapper = mount(<App/>);

        expect(wrapper.find('.playerHand-container').exists()).toEqual(true);
    });

    it('render compHands component', () => {
        const wrapper = mount(<App/>);

        expect(wrapper.find('.compHands-container').exists()).toEqual(true);
    });
})