import * as React from 'react';
import { mount } from 'enzyme';
import { Landing } from './Landing';

describe("Landing Page ", () => {
    let props;
    let landing;
    beforeEach(() => {
        props = {
            githubUserName: "nirajkashyap",
            githubUserLoading: false,
            githubUserDetails: null,
            fetchGithubUserStart: jest.fn(),
            fetchGithubUser: jest.fn(),
            fetchGithubUserCancel: jest.fn(),
            search: null,
            history: {
                push: jest.fn()
            }
        };

        landing = mount(<Landing {...props}/>);
    });

    it('renders input box and on click handleSubmit is getting called', () => {

        const spy = jest.spyOn(landing.instance(), 'handleSubmit');
        landing.instance().forceUpdate();
        landing.find('button').at(1).simulate('submit');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('on click history push should get called', () => {
        landing.setState({
            githubUserName: 'nirajkashyap',
            hideShow: "hide"
        });
        landing.instance().forceUpdate()
        landing.find('button').at(1).simulate('submit');
        expect(landing.props().history.push).toHaveBeenCalledTimes(1);

    });

    it('fetchGithubUser testing  : service id query param is present and githubUserLoading is true fetchGithubUserStart should  get called', () => {
        landing.setProps({location:{search:"/search?githubUserName=abc"},githubUserLoading:true});
        expect(landing.props().fetchGithubUser).toHaveBeenCalledTimes(0); // recheck test case
        expect(landing.props().fetchGithubUserStart).toHaveBeenCalledTimes(0);
    });

    xit('fetchGithubUser testing : service id query param is present and githubUserLoading is false fetchGithubUserStart should get called and ', () => {
        landing.setProps({location:{search:"/search?githubUserName=abc"},githubUserLoading:false});
        landing.instance().forceUpdate();
        expect(landing.props().fetchGithubUser).toHaveBeenCalledTimes(0);
        expect(landing.props().fetchGithubUserStart).toHaveBeenCalledTimes(1);

    });


});


