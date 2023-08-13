/** 
 * JMenuTab
 * Desc : 메뉴 페이지 내부 텝 기능 컴포넌트
 * JMenu컴포넌트에 종속
 */
import React from 'react';

export default class JMenuTab extends React.Component {
    componentDidMount = () => {

    }


    render = () => {
        return (
            <>
                {this.props.children}
            </>
        )
    }
}