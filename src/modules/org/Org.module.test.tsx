import * as React from 'react';
import { mount } from 'enzyme';
import { Org } from './Org.module';

describe("Org Page ", () => {
    let props;
    let org;
    beforeEach(() => {
        props = {
        };

        org = mount(<Org {...props}/>);
    });

    it("renders header ",()=>{
        expect(org.text()).toContain("Hello from Daynamic (runtime + lazy ) component")
    });



});
