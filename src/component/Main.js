import React from 'react';

export default class Middle extends React.Component {
    state = {
        style: {
            width: 150 + 'px'
        }
    }

    componentDidMount = () => { }

    render = () => {
        return (
            <div id='middle'>
                {this.props.children}
            </div>
        )
    }
}