import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import './jiraReport.css';
import util from './Utils';
import Nav from './component/Nav'
import Main from './component/Main'
import Total from './menu/main/Total'
import Work from './menu/work/Work'
import Project from './menu/project/Project'
import TimeLine from './menu/timeline/TimeLine'
import Daily from './menu/daily/Daily';
import TimeDate from './menu/timedate/TimeDate';
import Cost from './menu/cost/Cost';
import Test from './menu/test/Test';

const tabs = [
    { key: '1', content: '종합현황', link: '/total' },
    { key: '2', content: '업무현황', link: '/work' },
    { key: '3', content: '프로젝트현황', link: '/project' },
    { key: '4', content: '타임라인', link: '/timeline' },
    { key: '5', content: '일일업무보고', link: '/daily' },
    { key: '6', content: '근무시간현황', link: '/timedate' },
    { key: '7', content: '업무분석', link: '/cost' },
    // { key: '8', content: '관리자페이지', link: '/' },
]

export default class App extends React.Component {
    state = {
        selectTab: '1'
    }

    componentDidMount = () => {

    }

    render = () => {
        return (
            <div id='jiraReport'>
                <Main>
                    <HashRouter>
                        <Nav
                            selectTab={this.state.selectTab}
                            tabs={tabs}
                            onClick={(id) => { this.setState({ selectTab: id }) }} />
                        {/* 메인 페이지 - 종합 현황 */}
                        <Route path="/" exact={true} render={() => { return (<Test util={util} />) }} />
                        <Route path="/total" render={() => { return (<Total util={util} />) }} />
                        {/* 업무 현황 */}
                        <Route path="/work" render={() => { return (<Work util={util} />) }} />
                        {/* 프로젝트 현황 */}
                        <Route path="/project" render={() => { return (<Project util={util} />) }} />
                        {/* 타임라인 */}
                        <Route path="/timeline" render={() => { return (<TimeLine util={util} />) }} />
                        {/* 일일업무보고 */}
                        <Route path="/daily" render={() => { return (<Daily util={util} />) }} />
                        {/* 근무시간 현황 */}
                        <Route path="/timedate" render={() => { return (<TimeDate util={util} />) }} />
                        {/* 업무분석 */}
                        <Route path="/cost" render={() => { return (<Cost util={util} />) }} />
                        {/* 관리자 페이지 */}
                        {/* <Route path="/admin" render={() => { return (<Admin util={util} />) }} /> */}
                    </HashRouter>
                </Main>
            </div>
        )
    }
}