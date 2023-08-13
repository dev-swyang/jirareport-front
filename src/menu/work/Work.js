/** 
 * Work
 * 업무현황
 */
import React from 'react';
import Search from '../../component/Search'
import Contents from '../../component/Contents'
import Chart from 'react-google-charts'
import { JButton, JCard, JDate, JDefault, JDropDown, JLabel, JMenu, JTextField, JDropDown2, JMultiDropDown } from '../../component/condition'
import DataTable, { defaultThemes } from 'react-data-table-component'

const col1 = [
    { name: '', selector: 'FG', sortable: false },
    { name: 'Amaranth10', selector: 'DEV1', sortable: false },
    { name: '프로젝트(ICUBE)', selector: 'DEV2', sortable: false },
    { name: '패키지유지보수', selector: 'DEV3', sortable: false },
    { name: '전용개발', selector: 'DEV4', sortable: false },
    { name: '전용개발유지보수', selector: 'DEV5', sortable: false },
    { name: 'BizboxAlpha', selector: 'DEV6', sortable: false },
    { name: '단위업무', selector: 'JOB', sortable: false },
    { name: 'PIMS상담', selector: 'TAL', sortable: false },
    { name: '견적산정', selector: 'REQ', sortable: false },
    { name: '계', selector: 'SUM_CNT', sortable: false },
]

const col2 = [
    { name: '담당자', selector: 'NAME', sortable: true },
    { name: '유형', selector: 'GROUP', sortable: true },
    { name: '구분', selector: 'TYPE', sortable: true },
    { name: '키', selector: 'KEY', sortable: true, grow: 2 },
    { name: '요약', selector: 'SUMMARY', sortable: true, grow: 4 },
    { name: '상태', selector: 'STATUS', sortable: true },
    { name: '기한', selector: 'DT_DUE', sortable: true },
    { name: '시작일', selector: 'DT_START', sortable: true },
    { name: '종료일', selector: 'DT_END', sortable: true },
]

export default class extends React.Component {
    util = this.props.util

    state = {
        search: {
            searchDt: {
                from: this.util.baseDate.yearFirstDay,
                to: this.util.baseDate.yearLastDay
            },
            baseDt: this.util.baseDate.today,
            deptFg: [],
            empFg: {}
        },
        data: {
            empList: [],

            grid1: [],
            chart1: [],

            grid2: [],
            chart2: [],
            searchGrid2: [],

        },
        searchText: ''
    }

    componentDidMount = () => {
        this.handler.confirm()
    }

    handler = {
        confirm: () => {
            console.log('handler.confirm()')

            this.getData.empList()
            this.getData.grid1()
            this.getData.chart1()
            this.getData.grid2()
            this.getData.chart2()
        }
    }

    getData = {
        empList: async () => {
            try {
                let res = await this.util.callApi.get('/name', {
                    team: this.util.setMultiParam(this.state.search.deptFg)
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        empList: res.data.map((v) => { return { label: v.NAME, key: v.ID, team: v.TEAM } })
                    }
                }, () => {

                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        grid1: async () => {
            try {
                let res = await this.util.callApi.get('/taskview/data_table', {
                    dt_start: this.state.search.searchDt.from,
                    dt_end: this.state.search.searchDt.to,
                    team: this.util.setMultiParam(this.state.search.deptFg),
                    id: this.state.search.empFg.key
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        grid1: res.data
                    }
                }, () => {

                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        chart1: async () => {
            try {
                let res = await this.util.callApi.get('/taskview/chart1', {
                    dt_start: this.state.search.searchDt.from,
                    dt_end: this.state.search.searchDt.to,
                    dt_base: this.state.search.baseDt,
                    team: this.util.setMultiParam(this.state.search.deptFg),
                    id: this.state.search.empFg.key
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        chart1: res.data
                    }
                }, () => {
                    console.log({
                        dt_start: this.state.search.searchDt.from,
                        dt_end: this.state.search.searchDt.to,
                        dt_base: this.state.search.baseDt,
                        team: this.util.setMultiParam(this.state.search.deptFg),
                        id: this.state.search.empFg.key
                    })
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        grid2: async () => {
            try {
                let res = await this.util.callApi.get('/taskview/grid_data_tab', {
                    dt_start: this.state.search.searchDt.from,
                    dt_end: this.state.search.searchDt.to,
                    dt_base: this.state.search.baseDt,
                    team: this.util.setMultiParam(this.state.search.deptFg),
                    id: this.state.search.empFg.key,
                    fg: '0'
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        grid2: res.data,
                        searchGrid2: res.data,
                    }
                }, () => {

                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        chart2: async () => {
            try {
                let res = await this.util.callApi.get('/taskview/chart2', {
                    dt_start: this.state.search.searchDt.from,
                    dt_end: this.state.search.searchDt.to,
                    dt_base: this.state.search.baseDt,
                    team: this.util.setMultiParam(this.state.search.deptFg),
                    id: this.state.search.empFg.key
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        chart2: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
    }

    dataFilter = () => {
        let tempData = this.util.filter(
            this.state.searchText,
            ['NAME', 'GROUP', 'TYPE', 'KEY', 'SUMMARY', 'STATUS', { col: 'DT_DUE', type: 'same' }, { col: 'DT_START', type: 'same' }, { col: 'DT_END', type: 'same' }],
            this.state.data.grid2
        )
        this.setState({
            data: {
                ...this.state.data,
                searchGrid2: tempData
            }
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
                        this.handler.confirm()
                    }}>
                    <JDate
                        label='조회기간'
                        type='period'
                        value={this.state.search.searchDt}
                        onChange={(e) => { setParam('searchDt', e.value) }} />
                    <JDate
                        label='기준일자'
                        type='single'
                        value={this.state.search.baseDt}
                        onChange={(e) => { setParam('baseDt', e.value) }} />
                    <JMultiDropDown
                        label='부서'
                        value={this.state.search.deptFg}
                        placeHolder='부서'
                        uniqueItem={[
                            { label: '부서', key: [], backgroundColor: 'pink' },
                            { label: '설계Cell', key: ['1', '2', '5'], backgroundColor: 'lightgreen' },
                            { label: '개발Cell', key: ['3', '4', '6', '7'], backgroundColor: 'lightskyblue' }
                        ]}
                        list={this.util.unit}
                        onChange={(e) => {
                            this.setState({
                                search: {
                                    ...this.state.search,
                                    deptFg: e.value
                                }
                            })
                        }} />
                    <JDropDown2
                        label='사원'
                        value={this.state.search.empFg}
                        disabled={this.state.search.deptFg.length === 0}
                        placeHolder={'전체'}
                        uniqueItem={[
                            { label: '전체', key: [], backgroundColor: 'pink' }
                        ]}
                        list={
                            this.state.data.empList.filter((v1) => {
                                return this.state.search.deptFg.map((v2) => { return v2.key }).indexOf(v1.team) >= 0
                            })
                        }
                        onChange={(e) => {
                            this.setState({
                                search: {
                                    ...this.state.search,
                                    empFg: e.value
                                }
                            })
                        }} />
                </Search>
                <Contents >
                    {/* <JCard search></JCard> */}
                    <JCard x={'1/8'} y={'1/2'}>
                        <DataTable
                            noHeader
                            columns={col1}
                            data={this.state.data.grid1}
                        />
                    </JCard>
                    <JCard x={'9/4'} y={'1/3'} title='지연중인 이슈'>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart1}
                            options={{
                                chartArea: {
                                    width: '70%',
                                    height: '80%'
                                },
                                legend: { position: 'none' }
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </JCard>
                    <JCard x={'1/8'} y={'3/4'} >
                        <DataTable
                            noHeader
                            subHeader={true}
                            subHeaderAlign={'right'}
                            subHeaderComponent={[
                                <JTextField label='검색'
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
                            columns={col2}
                            data={this.state.data.searchGrid2}
                        />
                    </JCard>
                    <JCard x={'9/4'} y={'4/3'} title='진행 이슈별'>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart2}
                            options={{
                                isStacked: true,
                                legend: {
                                    position: 'right',
                                    maxLines: 4,
                                    alignment: 'center'
                                },
                                bar: {
                                    groupWidth: '50%'
                                },
                                chartArea: {
                                    // top: 40,
                                    width: '60%',
                                    height: '80%'
                                },
                            }}
                            rootProps={{ 'data-testid': '3' }}
                        />
                    </JCard>
                </Contents>
            </JMenu>
        )
    }
}