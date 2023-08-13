/**
 * Contents
 * Desc : 네비게이션 탭
 */
import React from 'react';
import { Link } from 'react-router-dom'
import ip from 'ip';

export default class App extends React.Component {
    state = {
    }

    componentDidMount = () => {
    }

    handler = {
        tab: (e) => {
            this.setState({
                selectTab: e.target.id
            })
        }
    }

    render = () => {
        const { tabs, onClick, selectTab } = this.props
        return (
            <div id='top'>
                {/* 더존 로고 - 메인페이지 이동 */}
                <div id='logo' className='content'>
                    <img src='/image/logo.png' alt='ballboy' />
                </div>
                {/* tab 생성 */}
                {tabs.map((v, i) => {
                    return (
                        <Link
                            to={v.link}
                            key={v.key}
                            id={v.key}
                            className={`content btn ${selectTab === v.key ? 'select' : ''}`}
                            onClick={() => { onClick(v.key) }}
                        >
                            {v.content}
                        </Link>
                    )
                })}
                {/* 사용자 이미지 표시 및 접근 PC IP */}
                <div className='user'>
                    <img className='userimg' src='/image/yswgood0329.png' />
                    <div className='userIp'>{ip.address()}</div>
                </div>
            </div>
        )
    }
}