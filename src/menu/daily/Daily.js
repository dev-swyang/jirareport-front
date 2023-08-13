/** 
 * Daily
 * 일일 업무 보고
 */
import React from 'react';
import Search from '../../component/Search'
import Contents from '../../component/Contents'
import { JButton, JCard, JDate, JDefault, JDropDown, JMultiTextField, JLabel, JMenu, JTextField, JTabs, JTab } from '../../component/condition'
import Chart from 'react-google-charts'
import DataTable, { defaultThemes } from 'react-data-table-component'

const col = [
    { name: '담당자', selector: 'NAME', sortable: true, grow: 1 },
    { name: '유형', selector: 'GROUP', sortable: true, grow: 1 },
    { name: '구분', selector: 'TYPE', sortable: true, grow: 1.5 },
    { name: '모듈', selector: 'MODULES', sortable: true, grow: 1 },
    { name: '제품', selector: 'PRODUCT', sortable: true, grow: 1.5 },
    { name: '키', selector: 'KEY', sortable: true, grow: 1.5 },
    { name: '요약', selector: 'SUMMARY', sortable: true, grow: 5 },
    { name: '상태', selector: 'STATUS', sortable: true, grow: 1.5 },
    { name: '시작일', selector: 'DT_START', sortable: true, grow: 1 },
    { name: '종료일', selector: 'DT_END', sortable: true, grow: 1 },
]

export default class extends React.Component {
    util = this.props.util

    state = {
        search: {
            baseDt: this.util.baseDate.today,
            deptFg: [this.util.team[0]],
            empFg: [],
            empList: [],
        },
        data: {
            todayText: '',
            todayGrid: [],
            yesterdayText: '',
            yesterdayGrid: []
        }

    }

    componentDidMount = () => {
        this.search()
    }

    search = () => {
        this.getData.empList()
        this.getData.today()
        this.getData.yesterday()
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
        today: async () => {
            try {
                let res = await this.util.callApi.get('/daily/task_text_table', {
                    dt_now: this.state.search.baseDt,
                    team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    id: this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    done_fg: '1',
                })

                let [todayText, ...todayGrid] = res.data.reverse()

                this.setState({
                    data: {
                        ...this.state.data,
                        todayText: todayText.TEXT.TEXT,
                        todayGrid: todayGrid
                    }
                }, () => { console.log(this.state.data) })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        yesterday: async () => {
            try {
                let res = await this.util.callApi.get('/daily/task_text_table', {
                    dt_now: this.state.search.baseDt,
                    team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    id: this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    done_fg: '0',
                })

                let [yesterdayText, ...yesterdayGrid] = res.data.reverse()

                this.setState({
                    data: {
                        ...this.state.data,
                        yesterdayText: yesterdayText.TEXT.TEXT,
                        yesterdayGrid: yesterdayGrid
                    }
                }, () => { console.log(this.state.data) })
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

        let titleDt = this.state.search.baseDt

        return (
            <JMenu>
                <Search
                    onConfirm={(e) => {
                        console.log('this.state => ', this.state)
                        console.log('this.props => ', this.props)

                    }}>
                    <JDate
                        label='기준일자'
                        type='single'
                        value={this.state.search.baseDt}
                        onChange={(e) => { setParam('baseDt', e.value) }} />
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
                    <JCard search >
                        {/* <JDefault /> */}
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
                    </JCard>
                    <JCard x={'1/12'} y={'1/2'} title={'근무시간 등록'} >
                        {/* 근무시간 등록 기능 작성 */}
                        {/* 근무시간 현황 페이지로 기능 이전 계획 중 */}
                    </JCard>
                    <JCard x={'1/6'} y={'3/3'}
                        title={`${titleDt.substring(0, 4)}년 ${titleDt.substring(4, 6)}월 ${titleDt.substring(6, 8)}일 일일업무 보고`} >
                        <JMultiTextField
                            value={this.state.data.todayText} />
                    </JCard>
                    <JCard x={'7/6'} y={'3/3'}
                        title={`부서 주요업무`} >
                        <JMultiTextField
                            value={this.state.data.yesterdayText} />
                    </JCard>
                    <JCard x={'1/12'} y={'6/5'} title={'오늘 주요업무'} >
                        <DataTable
                            noHeader
                            columns={col}
                            data={this.state.data.todayGrid}
                            pagination
                            paginationDefaultPage={1}
                            paginationPerPage={12} />
                    </JCard>
                    <JCard x={'1/12'} y={'11/5'} title={'전일 주요업무'} >
                        <DataTable
                            noHeader
                            columns={col}
                            data={this.state.data.yesterdayGrid}
                            pagination
                            paginationDefaultPage={1}
                            paginationPerPage={12} />
                    </JCard>
                </Contents>
            </JMenu>
        )
    }
}