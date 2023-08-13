/** 
 * JTab
 * Desc : JTabs 컴포넌트 태부의 Tab페이지 작성 컴포넌트
 */
import React from 'react';

export default class JTab extends React.Component {
    componentDidMount = () => {

    }

    render = () => {
        let { label } = this.props
        return (
            <div className='jTabContent'>
                {/* 일반 메뉴 작성과 같음 */}
                {this.props.children}
            </div>
        )
    }
}