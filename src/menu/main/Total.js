/**
 * Total
 * 종합 업무/프로젝트 모니터링 페이지
 */
import React from 'react';
import Search from '../../component/Search'
import Contents from '../../component/Contents'
import Tab1 from './tabs/Tab1'
import Tab2 from './tabs/Tab2'
import Tab3 from './tabs/Tab3'
import Chart from 'react-google-charts'
import { JButton, JCard, JDate, JDefault, JDropDown, JMenuTab, JLabel, JMenu, JTextField } from '../../component/condition'
import util from '../../Utils';

export default class extends React.Component {
    // util = util
    util = this.props.util

    state = {
        tabIndex: '1'
    }

    componentDidMount = () => {

    }

    render = () => {
        return (
            <JMenu
                onTabs={(v) => { this.setState({ tabIndex: v }) }}
                tab={this.state.tabIndex}>

                {/* 분기별 업무 분석 */}
                <JMenuTab value={'1'}>
                    <Tab1 util={this.util} />
                </JMenuTab>

                {/* 이수별 업무 분석 */}
                <JMenuTab value={'2'}>
                    <Tab2 util={this.util} />
                </JMenuTab>

                {/* 종합 업무별 분석 */}
                <JMenuTab value={'3'}>
                    <Tab3 util={this.util} />
                </JMenuTab>
            </JMenu>
        )
    }
}