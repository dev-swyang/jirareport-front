/**
 * JTextField
 * Desc : 텍스트 필드 컴포넌트
 */

/*
<JTextField
    label='JTextField'
    value={this.state.comp1}
    onChange={(e) => {
        this.setState({ comp1: e.value })
    }}
    onKeyPress{() => {
        console.log(e.key)
    }}/>
*/
import React from 'react';

export default class JTextField extends React.Component {
    componentDidMount = () => {

    }

    render = () => {
        let { label, onChange, onKeyPress, value } = this.props

        return (
            <div className={`jCondition `}>
                <div className='label'>{label || 'label'}</div>
                <input
                    className='jTextField input'
                    value={value}
                    type='text'
                    onChange={(e) => {
                        if ((onChange || '') !== '') {
                            onChange(e.target)
                        }
                    }}
                    onKeyPress={(e) => {
                        if ((onKeyPress || '') !== '') {
                            onKeyPress(e)
                        }
                    }} />
            </div>
        )
    }
}
