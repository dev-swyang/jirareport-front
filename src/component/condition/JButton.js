/**
 * JButton
 * Desc : 기본 버튼 컴포넌트
 */
import React from 'react';

export default class JButton extends React.Component {
    componentDidMount = () => {

    }

    render = () => {
        let { label, onClick } = this.props
        return (
            <div className='JCondition JButton btn' onClick={onClick}>{label}</div>
        )
    }
}

/*
<JButton
    label='1분기'
    onClick={() => { console.log(this.state) }} />
*/