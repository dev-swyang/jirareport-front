/** 
 * JLabel
 * Desc : 단순 라벨 표시 컴포넌트
 */
import React from 'react';

export default class JLabel extends React.Component {
    componentDidMount = () => {

    }

    render = () => {
        let { label } = this.props
        return (
            <div className='JCondition JLabel'>{label}</div>
        )
    }
}