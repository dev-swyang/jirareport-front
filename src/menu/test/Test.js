import React from 'react';
import Search from '../../component/Search'
import Contents from '../../component/Contents'
import { JButton, JCard, JDate, JDefault, JDropDown, JLabel, JMenu, JTextField, JMultiDropDown, JTabs, JTab, JDropDown2 } from '../../component/condition'
import Chart from 'react-google-charts'
import DataTable, { defaultThemes } from 'react-data-table-component'


const list = [
    { label: '개발1Cell', key: '1', color: 'red' },
    { label: '개발2Cell', key: '2', color: 'blue' },
    { label: '개발3Cell', key: '3', color: 'green' },
    { label: '개발4Cell', key: '4', color: 'yellow' },
    { label: '개발5Cell', key: '5', color: 'pink' },
    { label: '개발6Cell', key: '6', color: 'purple' },
    { label: '개발7Cell', key: '7', color: 'gray' },
    { label: '개발8Cell', key: '8', color: 'gold' },
]


export default class extends React.Component {
    util = this.props.util

    state = {
        search: {

        },
        data: {

        },
        // value: { label: 'label3', key: 3 }
        value1: '1',
        value2: ['1', '3', '5', '7']
        // value2: [
        //     { label: '개발1Cell', key: '1', color: 'red' },
        //     { label: '개발3Cell', key: '3', color: 'green' },
        //     { label: '개발5Cell', key: '5', color: 'pink' },
        //     { label: '개발7Cell', key: '7', color: 'gray' },
        // ]
    }

    componentDidMount = () => {
        this.search()
    }

    search = () => {
        // console.log('Test Page Search')
    }

    onChange1 = (e) => {
        this.setState({ value1: e.value })
    }

    onChange2 = (e) => {
        this.setState({ value2: e.value })
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
                        // this.search()

                        this.setState({
                            value: this.state.value + 1
                        })
                    }}>
                    <JDefault />
                    <JDropDown2
                        label='JDropDown2'
                        value={this.state.value1}
                        list={list}
                        onChange={this.onChange1} />
                    <JMultiDropDown
                        label='JMultiDropDown'
                        value={this.state.value2}
                        list={list}
                        onChange={this.onChange2} />
                </Search>
                <Contents >
                    <JCard x={'1/6'} y={'1/2'}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>col1</th>
                                    <th style={{ width: '10%' }}>col2</th>
                                    <th style={{ width: '80%' }}>col3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ height: '2rem' }}>
                                    <td>
                                        <JMultiDropDown
                                            label='JMultiDropDown'
                                            value={this.state.value2}
                                            list={list}
                                            onChange={this.onChange2} />
                                    </td>
                                    <td>
                                        {/* <JMultiDropDown
                                        label='JMultiDropDown'
                                        value={this.state.value2}
                                        list={list}
                                        onChange={this.onChange2} /> */}
                                    </td>
                                    <td>data1-3</td>
                                </tr>
                                <tr style={{ height: '2rem' }}>
                                    <td>data2-1</td>
                                    <td>data2-2</td>
                                    <td>data2-3</td>
                                </tr>
                            </tbody>
                        </table>
                    </JCard>
                    <JCard x={'1/6'} y={'4/3'}>

                    </JCard>
                    <JCard x={'7/6'} y={'1/3'}>

                    </JCard>
                    <JCard x={'7/6'} y={'4/3'}>

                    </JCard>
                </Contents>
            </JMenu>
        )
    }
}