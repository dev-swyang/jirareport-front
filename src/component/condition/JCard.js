/**
 * JCard
 * Desc : 컨텐츠 내부의 Item wrapper
 * - 개발자 지정 사이즈로 Card 생성
 */
import React from 'react';

export default class JCard extends React.Component {
    componentDidMount = () => { }

    /** 유연한 Item 배치를 위한 사이즈 지정 기능 */
    setLayout = () => {
        let x = this.props.x || '1/1'
        let y = this.props.y || '1/1'

        let layout = {
            xLoc: x.split('/')[0] || '1',
            xSpan: x.split('/')[1] || '1',
            yLoc: y.split('/')[0] || '1',
            ySpan: y.split('/')[1] || '1',
        }

        return {
            gridColumn: `${layout.xLoc} / span ${layout.xSpan}`,
            gridRow: `${layout.yLoc} / span ${layout.ySpan}`,
        }
    }

    render = () => {
        let { children, search, title, style } = this.props

        return (
            <div className={`jCard ${search ? 'jCardSearch' : ''}`}
                style={style ? { ...this.setLayout(), ...style } : this.setLayout()}>
                {/* title - default : empty*/}
                {
                    title ?
                        <div className={'jCardTitle'} style={(typeof title === 'object' && title.type === 'div') ? title.props.style || {} : {}}>{title}</div> :
                        <></>
                }
                <div className='jCardContent' style={{ height: search ? '' : (title ? 'calc(100% - 2rem)' : '100%') }}>
                    {children}
                </div>
                {/* 조회 관련 card일시 확인(조회)버튼 생성 */}
                {
                    search ?
                        <div className='searchBtn btn'>confirm</div> :
                        <></>
                }
            </div>
        )
    }
}