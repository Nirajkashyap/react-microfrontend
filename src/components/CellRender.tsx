import * as React from 'react';
import './CellRender.scss'

class CellRender extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.invokeParentMethod = this.invokeParentMethod.bind(this);
    }

    public invokeParentMethod() {
        this.props.context.componentParent.methodFromParent(`${this.props.value}`)
    }

    public render() {
        return (
            <div className="CellRender-component btn"
                    style={{height: 20, lineHeight: 0.5}}
                    onClick={this.invokeParentMethod}
                    >{this.props.value}</div>
        )
    }
};

export default CellRender;
