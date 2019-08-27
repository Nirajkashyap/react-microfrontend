import * as React from 'react';
import { mount } from 'enzyme';

import Header from './Header';

describe("Header ", () => {
    let props;
    let header;
    beforeEach(() => {
        props = {
            pathname:'/login'
        };
        header = mount(<Header {...props}/>);
    });

    it('Render header with logout button',() => {
        props = {
                pathname:'/search'
        };
        header = mount(<Header {...props}/>);
        expect(header.text()).toContain("Logout");
    });

    it('Render header without logout button',() => {
        props = {
            pathname:'/login'
        };
        header = mount(<Header {...props}/>);
        expect(header.find('DropdownItem').length).toEqual(0);
    });
});
