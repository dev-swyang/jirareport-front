/**
 * JDefault
 * Desc : 조회컴포넌트 (Condition Item) 개발 기초 템플릿
 */
import React from 'react';

export default class JDefault extends React.Component {
    componentDidMount = () => {

    }

    render = () => {
        let { label } = this.props
        return (
            <div className={`jCondition`}> {/* 기본 Wrapper */}
                {/* Label */}
                <div className='label'>{label || 'label'}</div>

                {/* Function */}
                <div className='input'>input</div>
            </div>
        )
    }
}