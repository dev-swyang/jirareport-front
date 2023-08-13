/** 
 * JMultiTextField
 * Desc : 멀티 라인 텍스트 필드 컴포넌트
 */
import React from 'react';

export default class JMultiTextField extends React.Component {
    componentDidMount = () => {

    }

    render = () => {
        let { value, readOnly } = this.props

        return (
            <div className={`jCondition jMultiTextFieldWrapper`}>
                <textarea
                    className={'jMultiTextField'}
                    wrap={'off'}
                    value={value || ''}
                    readOnly
                />
            </div>
        )
    }
}