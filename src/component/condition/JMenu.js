/** 
 * JMenu
 * Desc : 페이지 Wrapper 컴포넌트
 * 내부 텝 기능 구현
 */
import React from 'react';

export default class JMenu extends React.Component {
    componentDidMount = () => {

    }

    pagging = (onTabs, tab, children, page) => {
        if (this.props.onTabs) {
            return (
                <div className='jMenuPagging'>
                    <div className='wrapper'>
                        {/* <div className='btn' onClick={() => { onTabs('prev') }} key={'prev'}>◀</div> */}
                        {
                            children.map((v, i) => {
                                return <div className={`btn ${tab === v.props.value ? 'select' : ''}`} onClick={() => { onTabs(v.props.value) }} key={i} >{v.props.value}</div>
                            })
                        }
                        {/* <div className='btn' onClick={() => { onTabs('next') }} key={'next'}>▶</div> */}
                    </div>
                </div>
            )
        } else {
            return (<></>)
        }
    }

    render = () => {
        const { onTabs, tab, children } = this.props
        let page = undefined
        if (onTabs) {
            page = this.props.children.filter((v) => {
                return (v.type.name === 'JMenuTab') && (v.props.value === tab)
            })
        } else {
            page = this.props.children
        }

        return (
            <>
                {page}
                {this.pagging(onTabs, tab, children, page)}
            </>
        )
    }
}