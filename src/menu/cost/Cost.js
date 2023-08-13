/**
 * Cost
 * Desc : 업무분석 페이지
 */
import React from 'react';
import Search from '../../component/Search'
import Contents from '../../component/Contents'
import { JButton, JCard, JDate, JDefault, JDropDown, JMultiTextField, JLabel, JMenu, JTextField, JTabs, JTab } from '../../component/condition'
import Chart from 'react-google-charts'
import DataTable, { defaultThemes } from 'react-data-table-component'

// 그리드 Column 세팅
const col = [
    { name: '이름', selector: 'NAME', sortable: true, grow: 1 },
    { name: '분류', selector: 'PART', sortable: true, grow: 2 },
    { name: '대분류', selector: 'CATEGORY_L', sortable: true, grow: 1.5 },
    { name: '중분류', selector: 'CATEGORY_M', sortable: true, grow: 1.5 },
    { name: '소분류', selector: 'CATEGORY_S', sortable: true, grow: 1.5 },
    { name: '1월', selector: 'M1', sortable: true, grow: 0.5 },
    { name: '2월', selector: 'M2', sortable: true, grow: 0.5 },
    { name: '3월', selector: 'M3', sortable: true, grow: 0.5 },
    { name: '4월', selector: 'M4', sortable: true, grow: 0.5 },
    { name: '5월', selector: 'M5', sortable: true, grow: 0.5 },
    { name: '6월', selector: 'M6', sortable: true, grow: 0.5 },
    { name: '7월', selector: 'M7', sortable: true, grow: 0.5 },
    { name: '8월', selector: 'M8', sortable: true, grow: 0.5 },
    { name: '9월', selector: 'M9', sortable: true, grow: 0.5 },
    { name: '10월', selector: 'M10', sortable: true, grow: 0.5 },
    { name: '11월', selector: 'M11', sortable: true, grow: 0.5 },
    { name: '12월', selector: 'M12', sortable: true, grow: 0.5 },
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

        cost: [],
        sumData: {
            CNT_ID: '',
            MON_TIME: '',
            SUM_TIME: '',
        }
    }

    componentDidMount = () => {
        this.search()
    }

    search = () => {
        this.getData.empList()
        this.getData.getCostData()
        this.getData.getCostSumData()
    }

    getData = {
        // 사원 정보 조회 API
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
        // 업무 분석 데이터 API
        getCostData: async () => {
            try {
                let res = await this.util.callApi.get('/cost/selectCost', {
                    cond_dt_base: this.state.search.baseDt,
                    cond_team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    cond_id: this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, '')
                })

                this.setState({ cost: res.data })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        // 업무 분석 합계 데이터 API
        getCostSumData: async () => {
            try {
                let res = await this.util.callApi.get('/cost/selectCostSum', {
                    cond_dt_base: this.state.search.baseDt,
                    cond_team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    cond_id: this.state.search.empFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, '')
                })

                console.log(res.data)

                this.setState({
                    sumData: res.data[0]
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

        let { CNT_ID, MON_TIME, SUM_TIME } = this.state.sumData

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
                    <JCard x={'1/12'} y={'1/6'}
                        title={
                            <div style={{ color: 'blue', fontWeight: 'bold' }}>
                                ※ 원가 분석 보고서 - 월별 근무 종류별 근무일수 (근무등록시간 등록 일자 기준으로 시간 비율로 계산됩니다.) <label style={{ color: 'black' }}>조회인원: <label style={{ color: 'red' }}>{CNT_ID} 명 </label> </label><label style={{ color: 'black' }}>기준월 시간 합계: <label style={{ color: 'red' }}>{MON_TIME} 시간 </label> </label><label style={{ color: 'black' }}>기준년도 시간 합계: <label style={{ color: 'red' }}>{SUM_TIME} 시간</label></label>
                            </div>
                        } >
                        <DataTable
                            noHeader
                            columns={col}
                            data={this.state.cost}
                            pagination
                            paginationDefaultPage={1}
                            paginationPerPage={15} />
                    </JCard>
                </Contents>
            </JMenu>
        )
    }
}