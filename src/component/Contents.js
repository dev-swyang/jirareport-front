/**
 * Contents
 * Desc : 메뉴 탭 내부의 컨텐츠 표시 컴포넌트
 */
import React from 'react'

export default class Contents extends React.Component {
    state = {
        items: ''
    }

    componentDidMount = () => {

    }

    render = () => {
        let search = []; let component = [];
        if (this.props.children.length > 1) {
            /** 다중 컨텐츠/조회 조건 분류 */
            this.props.children.map((v) => {
                if (v.props.search) search = [...search, v]
                else component = [...component, v]
            })
        } else {
            component = this.props.children
        }

        return (
            <>
                {
                    search.length > 0 ?
                        <div className='condition'>
                            {search}
                        </div> :
                        <></>
                }
                <div className='contents'>
                    {component}
                </div>
            </>
        )
    }
}