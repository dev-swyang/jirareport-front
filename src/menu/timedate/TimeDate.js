/**
 * TimeDate
 * 근무시간 현황
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
                from: this.util.baseDate.monthFirstDay,
                to: this.util.baseDate.monthLastDay
            },
            deptFg: [this.util.team[0]],
            empFg: [],
            empList: [],
        },
        workTime: [],
        gridCol: [],
        dataTable: [],
        searchText: ''
    }

    componentDidMount = () => {
        this.search()
    }

    search = () => {
        this.getData.empList()
        this.getData.category()
        this.getData.getWorkTime()
        this.getData.getWorkTimeSum()
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
        getWorkTime: async () => {
            try {

                let res = await this.util.callApi.get('/timedate/selectTimeDate', {
                    cond_dt_start: this.state.search.searchDt.from,
                    cond_dt_end: this.state.search.searchDt.to,
                    cond_team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    cond_id: this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, '')
                })

                this.setState({
                    workTime: res.data.map((v) => { return { ...v, [v.CATEGORY]: v.TIME } }),
                    dataTable: res.data.map((v) => { return { ...v, [v.CATEGORY]: v.TIME } })
                })

            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        getWorkTimeSum: async () => {
            try {

                let res = await this.util.callApi.get('/timedate/selectTimeSum', {
                    cond_dt_start: this.state.search.searchDt.from,
                    cond_dt_end: this.state.search.searchDt.to,
                    cond_team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    cond_id: this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, '')
                })



            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        category: async () => {
            try {

                let res = await this.util.callApi.get('/daily/category', {
                    // cond_dt_start: this.state.search.searchDt.from,
                    // cond_dt_end: this.state.search.searchDt.to,
                    cond_team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    // cond_id: this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, '')
                })

                let category = [
                    { name: '담당자', selector: 'NAME', sortable: true, grow: 0.7 },
                    { name: '일자', selector: 'DATE', sortable: true, grow: 0.7 },
                    { name: '총근무시간', selector: 'TIME_TOTAL', sortable: true, grow: 0.7 },
                    { name: '합계시간', selector: 'TIME_SUM', sortable: true, grow: 0.7 },
                    ...res.data.map((v) => { return { name: v.CATEGORY, selector: v.CATEGORY, sortable: true, grow: 1.5 } })
                ]

                this.setState({
                    gridCol: category
                })

            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        }
    }

    dataFilter = () => {

        let tempData = this.util.filter(this.state.searchText, ['CATEGORY', 'ID', 'NAME', { col: 'DATE', type: 'same' }], this.state.workTime)

        this.setState({
            dataTable: tempData
        })
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
                        <DataTable
                            noHeader
                            subHeader={'true'}
                            subHeaderAlign={'right'}
                            subHeaderComponent={[
                                <JTextField label='Search'
                                    value={this.state.searchText}
                                    onChange={(e) => {
                                        this.setState({
                                            searchText: e.value
                                        })
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') this.dataFilter();
                                    }} />,
                                <JButton label='확인'
                                    onClick={() => {
                                        this.dataFilter()
                                    }} />
                            ]}
                            columns={this.state.gridCol}
                            data={this.state.dataTable}
                            pagination
                            paginationDefaultPage={1}
                            paginationPerPage={15} />
                    </JCard>
                </Contents>
            </JMenu>
        )
    }
}