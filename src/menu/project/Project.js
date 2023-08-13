/** 
 * Project
 * 프로젝트 현황
 */
import React from 'react';
import Search from '../../component/Search'
import Contents from '../../component/Contents'
import { JButton, JCard, JDate, JDefault, JDropDown, JLabel, JMenu, JTextField, JTabs, JTab, JDropDown2, JMultiDropDown } from '../../component/condition'
import Chart from 'react-google-charts'
import DataTable, { defaultThemes } from 'react-data-table-component'

const section = [
    { label: '상담', key: '상담' },
    { label: '회의', key: '회의' },
    { label: '교육', key: '교육' },
    { label: '견적산출', key: '견적산출' },
    { label: '영업지원', key: '영업지원' },
    { label: '자료제작', key: '자료제작' },
    { label: '타부서지원', key: '타부서지원' },
    { label: '출장(외근)', key: '출장(외근)' },
    { label: '자격시험', key: '자격시험' },
    { label: 'IT코디네이터', key: 'IT코디네이터' },
    { label: '업데이트', key: '업데이트' },
    { label: '인스톨', key: '인스톨' },
    { label: '업무협의', key: '업무협의' },
    { label: '세미나', key: '세미나' },
    { label: '기타', key: '기타' },
]

// 단위업무
const col1 = [
    { name: '담당자', selector: 'NAME', sortable: true, grow: 0.7 },
    { name: '구분', selector: 'TYPE', sortable: true, grow: 1 },
    { name: '요약', selector: 'SUMMARY', sortable: true, grow: 3 },
    { name: '상태', selector: 'STATUS', sortable: true, grow: 1 },
    { name: '시작일', selector: 'DT_START', sortable: true, grow: 0.5 },
    { name: '종료일', selector: 'DT_END', sortable: true, grow: 0.5 },
    { name: '기한', selector: 'DT_DUE', sortable: true, grow: 0.5 },
]

// 연구개발(Amaranth), 연구개발(패키지)
const col2 = [
    { name: '담당자', selector: 'NAME', sortable: true, grow: 0.7 },
    { name: '에픽', selector: 'EPIC_NAME', sortable: true, grow: 1 },
    { name: '요약', selector: 'SUMMARY', sortable: true, grow: 3 },
    { name: '상태', selector: 'STATUS', sortable: true, grow: 1 },
    { name: '시작일', selector: 'DT_START', sortable: true, grow: 0.5 },
    { name: '종료일', selector: 'DT_END', sortable: true, grow: 0.5 },
    { name: '종료예정일', selector: 'DT_DUE', sortable: true, grow: 0.5 },
]

// 연구개발(전용개발)
const col3 = [
    { name: '담당자', selector: 'NAME', sortable: true, grow: 0.7 },
    { name: '고객명', selector: 'TRADE', sortable: true, grow: 1.2 },
    { name: '요약', selector: 'SUMMARY', sortable: true, grow: 3 },
    { name: '상태', selector: 'STATUS', sortable: true, grow: 1 },
    { name: '시작일', selector: 'DT_START', sortable: true, grow: 0.5 },
    { name: '종료일', selector: 'DT_END', sortable: true, grow: 0.5 },
    { name: '종료예정일', selector: 'DT_DUE', sortable: true, grow: 0.5 },
]

// Bizbox Alpha
const col4 = [
    { name: '담당자', selector: 'NAME', sortable: true, grow: 0.7 },
    { name: '구분', selector: 'TYPE1', sortable: true, grow: 0.7 },
    { name: '고객명', selector: 'TRADE', sortable: true, grow: 2 },
    { name: '요약', selector: 'SUMMARY', sortable: true, grow: 3 },
    { name: '상태', selector: 'STATUS', sortable: true, grow: 1.5 },
    { name: '시작일', selector: 'DT_START', sortable: true, grow: 0.5 },
    { name: '죵료일', selector: 'DT_END', sortable: true, grow: 0.5 },
]

// PIMS 상담
const col5 = [
    { name: '담당자', selector: 'NAME', sortable: true, grow: 0.7 },
    { name: '모듈', selector: 'MODULE', sortable: true, grow: 0.5 },
    { name: '요약', selector: 'SUMMARY', sortable: true, grow: 3 },
    { name: '상태', selector: 'STATUS', sortable: true, grow: 1.2 },
    { name: '시작일', selector: 'DT_START', sortable: true, grow: 0.5 },
    { name: '종료일', selector: 'DT_END', sortable: true, grow: 0.5 },
    { name: '기한', selector: 'DT_DUE', sortable: true, grow: 0.5 },
]

// 견적
const col6 = [
    { name: '담당자', selector: 'NAME', sortable: true, grow: 0.7 },
    { name: '개발유형', selector: 'DEV_TYPE', sortable: true, grow: 0.7 },
    { name: '요약', selector: 'SUMMARY', sortable: true, grow: 3 },
    { name: '상태', selector: 'STATUS', sortable: true, grow: 0.7 },
    { name: '시작일', selector: 'DT_START', sortable: true, grow: 0.5 },
    { name: '종료일', selector: 'DT_END', sortable: true, grow: 0.5 },
    { name: '기한', selector: 'DT_DUE', sortable: true, grow: 0.5 },
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
            empFg: {},

            section: {},
            status: {},
            searchText: '',
        },
        data: {
            empList: [],
            statusList: [],

            grid1: [],
            searchGrid1: [],

            grid2: [],
            searchGrid2: [],

            grid3: [],
            searchGrid3: [],

            grid4: [],
            searchGrid4: [],

            grid5: [],
            searchGrid5: [],

            grid6: [],
            searchGrid6: [],

            grid7: [],
            searchGrid7: [],

        },

        tabSelect: '단위업무'
    }

    componentDidMount = () => {
        this.search()
    }

    search = () => {
        this.getData.empList()
        this.getData.getStatus()
        this.getData.getGridData('단위업무')
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
        getStatus: async () => {
            try {
                let res = await this.util.callApi.get('/project2/status_list', { GROUP: '' })

                this.setState({
                    data: {
                        ...this.state.data,
                        statusList: res.data
                    }
                }, () => { console.log(res.data) })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        getGridData: async (value) => {
            try {
                let seq;
                let res = await this.util.callApi.get('/project2/list', {
                    dt_start: this.state.search.searchDt.from,
                    dt_end: this.state.search.searchDt.to,
                    team: this.state.search.deptFg.filter((v) => { return (v.value || '') !== '' }).reduce((a, c) => { return `${a}${c.value}|` }, ''),
                    id: this.state.search.empFg.key,
                    group: value
                })

                switch (value) {
                    case '단위업무':
                        seq = { ...this.state.data, grid1: res.data, searchGrid1: res.data }
                        break;
                    case 'Amaranth':
                        seq = { ...this.state.data, grid2: res.data, searchGrid2: res.data }
                        break;
                    case '패키지':
                        seq = { ...this.state.data, grid3: res.data, searchGrid3: res.data }
                        break;
                    case '전용개발':
                        seq = { ...this.state.data, grid4: res.data, searchGrid4: res.data }
                        break;
                    case 'BIZBOX':
                        seq = { ...this.state.data, grid5: res.data, searchGrid5: res.data }
                        break;
                    case '상담':
                        seq = { ...this.state.data, grid6: res.data, searchGrid6: res.data }
                        break;
                    case '견적':
                        seq = { ...this.state.data, grid7: res.data, searchGrid7: res.data }
                        break;
                }
                this.setState({ data: seq }, () => { })

                // return res.data

            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        }
    }

    dataFilter = () => {
        let tempData = ''
        let result = {}
        switch (this.state.tabSelect) {
            case '단위업무':
                console.log('단위업무')
                // tempData = this.util.filter(
                //     this.state.search.section,
                //     [{ col: 'TYPE', type: 'same' }],
                //     this.state.data.grid1
                // )
                // result = {
                //     data: {
                //         ...this.state.data,
                //         searchGrid1: tempData
                //     }
                // }
                break;
            case 'Amaranth':
                console.log('Amaranth')
                break;
            case '패키지':
                console.log('패키지')
                break;
            case '전용개발':
                console.log('전용개발')
                break;
            case 'BIZBOX':
                console.log('BIZBOX')
                break;
            case '상담':
                console.log('상담')
                break;
            case '견적':
                console.log('견적')
                break;
        }
        this.setState(result, () => {
            console.log('finish')
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
                        // this.search()
                    }}>
                    <JDate
                        label='조회기간'
                        type='period'
                        value={this.state.search.searchDt}
                        onChange={(e) => { setParam('searchDt', e.value) }} />
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
                    <JCard x={'1/12'} y={'1/6'}>
                        <JTabs onChange={(v) => {
                            this.setState({
                                tabSelect: v.label,
                            }, () => {
                                this.getData.getGridData(v.value)
                            })
                        }}>
                            <JTab label='단위업무' value='단위업무'>
                                <DataTable
                                    noHeader
                                    subHeader={true}
                                    subHeaderAlign={'right'}
                                    subHeaderComponent={[
                                        <JMultiDropDown
                                            label='구분'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={section}
                                            onChange={(e) => {
                                                this.setState({
                                                    search: {
                                                        ...this.state.search,
                                                        section: e.value
                                                    }
                                                }, () => { this.dataFilter() })
                                            }} />,
                                        <JDropDown2
                                            label='상태'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JTextField label='검색'
                                            value={this.state.searchText1}
                                            onChange={(e) => {
                                                console.log('onChange()')
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') this.dataFilter();
                                            }} />,
                                        <JButton label='확인'
                                            onClick={() => {
                                                this.dataFilter()
                                            }} />
                                    ]}
                                    columns={col1}
                                    data={this.state.data.searchGrid1}
                                    pagination
                                    paginationDefaultPage={1}
                                    paginationPerPage={12} />
                            </JTab>
                            <JTab label='연구개발(Amaranth10)' value='Amaranth'>
                                {/* 연구개발(Amaranth10) */}
                                <DataTable
                                    noHeader
                                    subHeader={true}
                                    subHeaderAlign={'right'}
                                    subHeaderComponent={[
                                        <JDropDown2
                                            label='유형'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JDropDown2
                                            label='상태'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JTextField label='검색'
                                            value={this.state.searchText2}
                                            onChange={(e) => {
                                                console.log('onChange()')
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
                                    data={this.state.data.grid2}
                                    pagination
                                    paginationDefaultPage={1}
                                    paginationPerPage={12} />
                            </JTab>
                            <JTab label='연구개발(패키지)' value='패키지'>
                                {/* 연구개발(패키지) */}
                                <DataTable
                                    noHeader
                                    subHeader={true}
                                    subHeaderAlign={'right'}
                                    subHeaderComponent={[
                                        <JDropDown2
                                            label='유형'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JDropDown2
                                            label='상태'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JTextField label='검색'
                                            value={this.state.searchText3}
                                            onChange={(e) => {
                                                console.log('onChange()')
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
                                    data={this.state.data.grid3}
                                    pagination
                                    paginationDefaultPage={1}
                                    paginationPerPage={12} />
                            </JTab>
                            <JTab label='연구개발(전용개발)' value='전용개발'>
                                {/* 연구개발(전용개발) */}
                                <DataTable
                                    noHeader
                                    subHeader={true}
                                    subHeaderAlign={'right'}
                                    subHeaderComponent={[
                                        <JDropDown2
                                            label='상태'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JTextField label='검색'
                                            value={this.state.searchText4}
                                            onChange={(e) => {
                                                console.log('onChange()')
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') this.dataFilter();
                                            }} />,
                                        <JButton label='확인'
                                            onClick={() => {
                                                this.dataFilter()
                                            }} />
                                    ]}
                                    columns={col3}
                                    data={this.state.data.grid4}
                                    pagination
                                    paginationDefaultPage={1}
                                    paginationPerPage={12} />
                            </JTab>
                            <JTab label='Bizbox Alpha' value='BIZBOX'>
                                {/* Bizbox Alpha */}
                                <DataTable
                                    noHeader
                                    subHeader={true}
                                    subHeaderAlign={'right'}
                                    subHeaderComponent={[
                                        <JDropDown2
                                            label='구분'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JDropDown2
                                            label='상태'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JTextField label='검색'
                                            value={this.state.searchText5}
                                            onChange={(e) => {
                                                console.log('onChange()')
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') this.dataFilter();
                                            }} />,
                                        <JButton label='확인'
                                            onClick={() => {
                                                this.dataFilter()
                                            }} />
                                    ]}
                                    columns={col4}
                                    data={this.state.data.grid5}
                                    pagination
                                    paginationDefaultPage={1}
                                    paginationPerPage={12} />
                            </JTab>
                            <JTab label='PIMS상담' value='상담'>
                                {/* PIMS상담 */}
                                <DataTable
                                    noHeader
                                    subHeader={true}
                                    subHeaderAlign={'right'}
                                    subHeaderComponent={[
                                        <JDropDown2
                                            label='모듈'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JDropDown2
                                            label='상태'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JTextField label='검색'
                                            value={this.state.searchText6}
                                            onChange={(e) => {
                                                console.log('onChange()')
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') this.dataFilter();
                                            }} />,
                                        <JButton label='확인'
                                            onClick={() => {
                                                this.dataFilter()
                                            }} />
                                    ]}
                                    columns={col5}
                                    data={this.state.data.grid6}
                                    pagination
                                    paginationDefaultPage={1}
                                    paginationPerPage={12} />
                            </JTab>
                            <JTab label='견적' value='견적'>
                                {/* 견적 */}
                                <DataTable
                                    noHeader
                                    subHeader={true}
                                    subHeaderAlign={'right'}
                                    subHeaderComponent={[
                                        <JDropDown2
                                            label='개발유형'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JDropDown2
                                            label='상태'
                                            value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
                                            list={[]}
                                            onChange={(e) => { }} />,
                                        <JTextField label='검색'
                                            value={this.state.searchText7}
                                            onChange={(e) => {
                                                console.log('onChange()')
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') this.dataFilter();
                                            }} />,
                                        <JButton label='확인'
                                            onClick={() => {
                                                this.dataFilter()
                                            }} />
                                    ]}
                                    columns={col6}
                                    data={this.state.data.grid7}
                                    pagination
                                    paginationDefaultPage={1}
                                    paginationPerPage={12} />
                            </JTab>
                        </JTabs>
                    </JCard>
                </Contents>
            </JMenu>
        )
    }
}