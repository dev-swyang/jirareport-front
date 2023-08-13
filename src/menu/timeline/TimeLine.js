/** 
 * TimeLine
 * 프로젝트 / 업무 타임라인 페이지
 */
import React from 'react';
import Search from '../../component/Search'
import Contents from '../../component/Contents'
import { JButton, JCard, JDate, JDefault, JDropDown, JLabel, JMenu, JTextField, JTabs, JTab } from '../../component/condition'
import Chart from 'react-google-charts'
import DataTable, { defaultThemes } from 'react-data-table-component'


export default class extends React.Component {
    util = this.props.util

    state = {
        search: {
            searchDt: {
                from: this.util.baseDate.weekMonDay,
                to: this.util.baseDate.weekFriDay
            },
            deptFg: [this.util.team[0]],
            empFg: [],
            empList: [],
        },
        timeline: []

    }

    componentDidMount = () => {
        this.search()
    }

    search = () => {
        this.getData.empList()
        this.getData.getTimeLineData()
    }

    getData = {
        empList: async () => {
            try {
                let res = await this.util.callApi.get('/name', {
                    team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, '')
                })
                this.setState({
                    search: {
                        ...this.state.search,
                        empList: [{ all: 'A', label: '전체', key: '' }, ...res.data.map((v) => { return { label: v.NAME, value: v.ID } })]
                    }
                }, () => {

                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        getTimeLineData: async () => {
            try {
                console.log(
                    this.state.search.searchDt.from,
                    this.state.search.searchDt.to,
                    this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, '')
                )

                let res = await this.util.callApi.get('/timeline/list', {
                    dt_start: this.state.search.searchDt.from,
                    dt_end: this.state.search.searchDt.to,
                    team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    id: this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, '')
                })
                this.setState({
                    timeline: res.data
                }, () => {
                    console.log(res.data)
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        }
    }

    render = () => {
        const setParam = (key, value) => {
            this.setState({
                search: {
                    ...this.state.search,
                    [key]: value
                }
            })
        }

        return (
            <JMenu>
                <Search
                    onConfirm={(e) => {
                        console.log('this.state => ', this.state)
                        console.log('this.props => ', this.props)
                    }}>
                    <JDate
                        label='조회기간'
                        type='period'
                        value={this.state.search.searchDt}
                        onChange={(e) => { setParam('searchDt', e.value) }} />
                    <JDropDown
                        label='부서'
                        type='multi'
                        value={this.state.search.deptFg}
                        list={this.util.team}
                        placeHolder='부서를 선택해주세요'
                        onChange={(e) => {
                            this.setState({
                                search: {
                                    ...this.state.search,
                                    deptFg: e.value
                                }
                            }, () => {
                                this.getData.empList()
                            })
                        }} />
                    <JDropDown
                        label='사원'
                        type='multi'
                        disabled={this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).length === 0}
                        value={this.state.search.empFg}
                        list={this.state.search.empList}
                        placeHolder='사원을 선택해주세요'
                        onChange={(e) => {
                            this.setState({
                                search: {
                                    ...this.state.seach,
                                    empFg: e.value
                                }
                            })
                        }} />
                </Search>
                <Contents >
                    <JCard x={'1/12'} y={'1/6'}>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="Timeline"
                            loader={<div>Loading Chart</div>}
                            data={this.state.timeline}
                            options={{
                                // showRowNumber: true,
                                hAxis: {
                                    format: 'M월d일'
                                }
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </JCard>
                </Contents>
            </JMenu>
        )
    }
}