import React from 'react';
import Search from '../../../component/Search'
import Contents from '../../../component/Contents'
import Chart from 'react-google-charts'
import { JButton, JCard, JDate, JDefault, JDropDown, JLabel, JMenu, JTextField } from '../../../component/condition'
import DataTable, { defaultThemes } from 'react-data-table-component'

const col = [
    { name: '', selector: 'NAME', sortable: false, grow: 2, },
    { name: 'Amaranth10', selector: 'DEV1', sortable: false },
    { name: '프로젝트(ICUBE)', selector: 'DEV2', sortable: false },
    { name: '전용개발', selector: 'DEV3', sortable: false },
    { name: '패키지유지보수', selector: 'DEV4', sortable: false },
    { name: '전용개발유지보수', selector: 'DEV5', sortable: false },
    { name: 'BizBoxAlpha', selector: 'DEV6', sortable: false },
    { name: '소계', selector: 'DEV_SUM', sortable: false },
    { name: '상담/교육', selector: 'JOB1', sortable: false },
    { name: '영업지원', selector: 'JOB2', sortable: false },
    { name: '자료제작', selector: 'JOB3', sortable: false },
    { name: '자격시험', selector: 'JOB4', sortable: false },
    { name: '업무협의', selector: 'JOB5', sortable: false },
    { name: '기타', selector: 'JOB6', sortable: false },
    { name: '소계', selector: 'JOB_SUM', sortable: false },
    { name: 'PIMS상담', selector: 'ADV_SUM', sortable: false },
    { name: '견적상담', selector: 'REQ_SUM', sortable: false },
    { name: '합계', selector: 'TOTAL_SUM', sortable: false },
]

export default class extends React.Component {
    util = this.props.util

    state = {
        searchDt: {
            from: this.util.baseDate.yearFirstDay,
            to: this.util.baseDate.yearLastDay,
            groupFg: '0'
        },
        baseDt: this.props.util.baseDate.today,
        data: {
            chart1: [],
            chart2: [],
            chart3: [],
            gridData: []
        }

    }

    componentDidMount = () => {
        this.chart1()
        this.chart2()
        this.chart3()
        this.grid()
    }

    chart1 = async () => {
        try {
            let res = await this.util.callApi.get('/totalview/chart1', {
                dt_start: this.state.searchDt.from,
                dt_end: this.state.searchDt.to,
            })
            this.setState({
                data: {
                    ...this.state.data,
                    chart1: res.data
                }
            }, () => { console.log('chart1', this.state.data.chart1) })
        } catch (err) {
            console.log('##### ERROR #####')
            console.error(err)
        }
    }
    chart2 = async () => {
        try {
            let res = await this.util.callApi.get('/totalview/chart2', {
                dt_start: this.state.searchDt.from,
                dt_end: this.state.searchDt.to,
            })

            this.setState({
                data: {
                    ...this.state.data,
                    chart2: res.data
                }
            }, () => { console.log('chart2', this.state.data.chart2) })
        } catch (err) {
            console.log('##### ERROR #####')
            console.error(err)
        }
    }
    chart3 = async () => {
        try {
            let res = await this.util.callApi.get('/totalview/chart3', {
                dt_start: this.state.searchDt.from,
                dt_end: this.state.searchDt.to,
            })

            this.setState({
                data: {
                    ...this.state.data,
                    chart3: res.data
                }
            }, () => { console.log('chart3', this.state.data.chart3) })
        } catch (err) {
            console.log('##### ERROR #####')
            console.error(err)
        }
    }
    grid = async () => {
        try {
            let res = await this.util.callApi.get('/totalview/grid_data', {
                dt_start: this.state.searchDt.from,
                dt_end: this.state.searchDt.to,
                group_fg: this.state.searchDt.groupFg
            })

            this.setState({
                data: {
                    ...this.state.data,
                    gridData: res.data
                }
            }, () => { console.log('grid', this.state.data.gridData) })
        } catch (err) {
            console.log('##### ERROR #####')
            console.error(err)
        }
    }

    render = () => {
        return (
            <>
                <Search
                    onConfirm={(e) => {
                        console.log('this.state => ', this.state)
                        console.log('this.props => ', this.props)
                    }}>
                    <JDate
                        label='조회기간'
                        type='period'
                        value={this.state.searchDt}
                        onChange={(e) => {
                            this.setState({ searchDt: e.value })
                        }} />
                    <JDate
                        label='기준일자'
                        type='single'
                        value={this.state.baseDt}
                        onChange={(e) => {
                            this.setState({ baseDt: e.value })
                        }} />
                    <JButton label='년도' onClick={() => {
                        console.log('년도')
                        this.setState({
                            searchDt: { from: this.props.util.baseDate.yearFirstDay, to: this.props.util.baseDate.yearLastDay },
                            baseDt: this.props.util.baseDate.today
                        })
                    }} />
                    <JButton label='1분기' onClick={() => {
                        console.log('1분기')
                        this.setState({ searchDt: this.props.util.baseDate.quarter1 })
                    }} />
                    <JButton label='2분기' onClick={() => {
                        console.log('2분기')
                        this.setState({ searchDt: this.props.util.baseDate.quarter2 })
                    }} />
                    <JButton label='3분기' onClick={() => {
                        console.log('3분기')
                        this.setState({ searchDt: this.props.util.baseDate.quarter3 })
                    }} />
                    <JButton label='4분기' onClick={() => {
                        console.log('4분기')
                        this.setState({ searchDt: this.props.util.baseDate.quarter4 })
                    }} />
                </Search>
                <Contents >
                    <JCard x={'1/12'} y={'1/3'} title='기준'>
                        <DataTable
                            noHeader
                            columns={col}
                            data={this.state.data.gridData}
                        />
                    </JCard>
                    <JCard x={'1/4'} y={'4/3'} title={'이슈별유형'} >
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart1}
                            options={{
                                chartArea: {
                                    width: '90%',
                                    height: '80%'
                                },
                                pieHole: 0.4,
                                legend: {
                                    position: 'right',
                                    alignment: 'center'
                                },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </JCard>
                    <JCard x={'5/4'} y={'4/3'} title={'팀별'} >
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart2}
                            options={{
                                // backgroundColor: {
                                //     stroke: '#888',
                                //     strokeWidth: 1
                                // },
                                isStacked: 'percent',
                                // width: 500,
                                // height: 280,
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
                                hAxis: {
                                    minValue: 0,
                                    ticks: [0, .2, .4, .6, .8, 1]
                                }
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />
                    </JCard>
                    <JCard x={'9/4'} y={'4/3'} title={'연구개발'} >
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart3}
                            options={{
                                // backgroundColor: {
                                //     stroke: '#888',
                                //     strokeWidth: 1
                                // },
                                isStacked: true,
                                // width: 500,
                                // height: 280,
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
            </>
        )
    }
}