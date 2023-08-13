import React from 'react';
import Search from '../../../component/Search'
import Contents from '../../../component/Contents'
import Chart from 'react-google-charts'
import { JButton, JCard, JDate, JDefault, JDropDown, JLabel, JMenu, JTextField } from '../../../component/condition'

export default class extends React.Component {
    util = this.props.util

    state = {
        searchDt: {
            from: this.util.baseDate.yearFirstDay,
            to: this.util.baseDate.yearLastDay,
        },
        baseDt: this.props.util.baseDate.today,

        data: {
            chart0: [],
            chart1: [],
            chart2: [],
            chart3: [],
            chart4: [],
            chart6: [],
        }

    }

    dateFormat = (date) => {
        if ((date || '') === '') return `${this.util.baseDate.today.substring(0, 4)}-${this.util.baseDate.today.substring(4, 6)}-${this.util.baseDate.today.substring(6, 8)}`
        else return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`
    }

    componentDidMount = () => {
        this.getData.chart0()
        this.getData.chart1()
        this.getData.chart2()
        this.getData.chart3()
        this.getData.chart4()
        this.getData.chart6()
        this.getData.getDataCnt()
    }

    getData = {
        chart0: async () => {
            try {
                let res = await this.util.callApi.get('/main/data_chart1', {
                    dt_start: this.dateFormat(this.state.searchDt.from),
                    dt_end: this.dateFormat(this.state.searchDt.to),
                    dt_base: this.dateFormat(this.state.baseDt),
                    group_fg: 0
                })

                this.setState({
                    data: {
                        ...this.state.data,
                        chart0: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        chart1: async () => {
            try {
                let res = await this.util.callApi.get('/main/data_chart1', {
                    dt_start: this.dateFormat(this.state.searchDt.from),
                    dt_end: this.dateFormat(this.state.searchDt.to),
                    dt_base: this.dateFormat(this.state.baseDt),
                    group_fg: 1
                })

                this.setState({
                    data: {
                        ...this.state.data,
                        chart1: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        chart2: async () => {
            try {
                let res = await this.util.callApi.get('/main/data_chart2', {
                    dt_start: this.dateFormat(this.state.searchDt.from),
                    dt_end: this.dateFormat(this.state.searchDt.to),
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
        chart3: async () => {
            try {
                let res = await this.util.callApi.get('/main/data_chart1', {
                    dt_start: this.dateFormat(this.state.searchDt.from),
                    dt_end: this.dateFormat(this.state.searchDt.to),
                    dt_base: this.dateFormat(this.state.baseDt),
                    group_fg: 3
                })

                this.setState({
                    data: {
                        ...this.state.data,
                        chart3: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        chart4: async () => {
            try {
                let res = await this.util.callApi.get('/main/data_chart1', {
                    dt_start: this.dateFormat(this.state.searchDt.from),
                    dt_end: this.dateFormat(this.state.searchDt.to),
                    dt_base: this.dateFormat(this.state.baseDt),
                    group_fg: 4
                })

                this.setState({
                    data: {
                        ...this.state.data,
                        chart4: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        chart6: async () => {
            try {
                let res = await this.util.callApi.get('/main/data_chart1', {
                    dt_start: this.dateFormat(this.state.searchDt.from),
                    dt_end: this.dateFormat(this.state.searchDt.to),
                    dt_base: this.dateFormat(this.state.baseDt),
                    group_fg: 6
                })

                this.setState({
                    data: {
                        ...this.state.data,
                        chart6: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        getDataCnt: async () => {
            try {
                let res = await this.util.callApi.get('/main/data_cnt', {
                    dt_start: this.dateFormat(this.state.searchDt.from),
                    dt_end: this.dateFormat(this.state.searchDt.to),
                    dt_base: this.dateFormat(this.state.baseDt),
                })

                console.log(res.data)
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
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
                        this.setState({
                            searchDt: { from: this.props.util.baseDate.yearFirstDay, to: this.props.util.baseDate.yearLastDay },
                            baseDt: this.props.util.baseDate.today
                        })
                    }} />
                    <JButton label='1분기' onClick={() => {
                        this.setState({ searchDt: this.props.util.baseDate.quarter1 })
                    }} />
                    <JButton label='2분기' onClick={() => {
                        this.setState({ searchDt: this.props.util.baseDate.quarter2 })
                    }} />
                    <JButton label='3분기' onClick={() => {
                        this.setState({ searchDt: this.props.util.baseDate.quarter3 })
                    }} />
                    <JButton label='4분기' onClick={() => {
                        this.setState({ searchDt: this.props.util.baseDate.quarter4 })
                    }} />
                </Search>
                <Contents >
                    {/* <JCard search></JCard> */}
                    <JCard x={'1/1'} y={'1/1'}
                        title={<div style={{ textAlign: 'center', fontWeight: 'bold' }}>총 인원</div>}
                        style={{ background: 'radial-gradient( white, skyblue )' }}>
                        <div style={{ fontSize: '3.5rem' }}>1</div>
                    </JCard>
                    <JCard x={'1/1'} y={'2/1'}
                        title={<div style={{ textAlign: 'center', fontWeight: 'bold' }}>총 건수</div>}
                        style={{ background: 'radial-gradient( white, #116c61)' }}>
                        <div style={{ fontSize: '3.5rem' }}>1</div>
                    </JCard>
                    <JCard x={'1/1'} y={'3/1'}
                        title={<div style={{ textAlign: 'center', fontWeight: 'bold' }}>이동</div>}
                        style={{ background: 'radial-gradient( white, #e05c04)' }}>
                        <div style={{ fontSize: '3.5rem' }}>1</div>
                    </JCard>
                    <JCard x={'2/6'} y={'1/3'} title={<div style={{ backgroundColor: 'skyblue', fontWeight: 'bold', textAlign: 'center' }}>연구개발</div>}>
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
                    <JCard x={'8/6'} y={'1/3'} title='test'>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart2}
                            options={{
                                chartArea: {
                                    width: '70%',
                                    height: '80%'
                                },
                                // legend: { position: 'none' }
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </JCard>
                    <JCard x={'1/4'} y={'4/3'} title='PIMS'>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart3}
                            options={{
                                chartArea: {
                                    width: '90%',
                                    height: '80%'
                                },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </JCard>
                    <JCard x={'5/4'} y={'4/3'} title='단위업무'>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart4}
                            options={{
                                chartArea: {
                                    width: '70%',
                                    height: '80%'
                                },
                                legend: { position: 'none' }
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '4' }}
                        />
                    </JCard>
                    <JCard x={'9/4'} y={'4/1'} >
                        <table style={{ height: '100%' }}>
                            <thead>
                                <tr style={{ height: '2rem' }}>
                                    <th style={{ width: '50%' }}>진행중</th>
                                    <th style={{ width: '50%' }}>완료</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'center', fontSize: '1.5rem' }}>25</td>
                                    <td style={{ textAlign: 'center', fontSize: '1.5rem' }}>819</td>
                                </tr>
                            </tbody>
                        </table>
                    </JCard>
                    <JCard x={'9/4'} y={'5/2'} title='견적산정'>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.chart6}
                            options={{
                                chartArea: {
                                    width: '60%',
                                    height: '50%'
                                },
                                legend: { position: 'none' }
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '6' }}
                        />
                    </JCard>
                </Contents>
            </>
        )
    }
}