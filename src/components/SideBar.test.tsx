import * as React from 'react';
import { mount } from 'enzyme';
import SideBar from './SideBar';

describe("Sidebar ", () => {
    let props;
    let sideBar;
    beforeEach(() => {
        props = {
            pathname:'/search'
        };
        sideBar = mount(<SideBar {...props}/>);
    });

    it('Render sidebar if url is not login',() => {
        props = {
                pathname:'/login'
        };
        sideBar = mount(<SideBar {...props}/>);
        expect(sideBar.find('nav').length).toEqual(0);

    });

    it('Render sidebar if url is not login',() => {
        props = {
            pathname:'/search'
        };
        sideBar = mount(<SideBar {...props}/>);
        expect(sideBar.find('nav').length).toEqual(1);

    });

    it('navigation sholud be called on sub link', () => {

        const spy = jest.spyOn(sideBar.instance(), 'handleClick');
        sideBar.instance().forceUpdate();
        sideBar.find('a').at(0).simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });


});
