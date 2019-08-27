import * as React from 'react';
import * as moment from 'moment';

class DateRender extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state={
            value: moment(this.props.value).format( 'MMM Do YYYY, h:mm:ss a')
        }
    }

    public render() {
        return (

                <div className="DateRender-cmp">{this.state.value}</div>
        )
    }
};

export default DateRender;
