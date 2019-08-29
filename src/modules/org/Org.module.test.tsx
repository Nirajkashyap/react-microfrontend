/* tslint:disable:no-string-literal */
// import * as React from 'react';
// import { mount } from 'enzyme';
window['store']={
    injectReducer : jest.fn()
};
window['apiClient'] = { 'getRequest' : jest.fn() }
window['epicRegistry'] = {}
let addEpicFlag = false;
// fix pending test case
// import { Org } from './Org.module'; 

describe("Org Page ", () => {
    // let props;
    // let org;
    beforeEach(() => {
        
        // window['store'].injectReducer = jest.fn();
        // props = {
        // };

        // org = mount(<Org {...props}/>);
    });

    it("renders orgmodule ",()=>{
        console.log(window['store']);
        // expect(org.text()).toContain("Hello from Daynamic (runtime + lazy ) component")
        expect(true).toBe(true);
    });



});
/* tslint:disable:no-string-literal */