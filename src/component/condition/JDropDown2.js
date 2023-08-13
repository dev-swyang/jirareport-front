/**
 * JDropDown2
 * Desc : 단일 선택 DropDown 컴포넌트
 */

/*
<JDropDown2
    label='JDropDown2'
    disaable={false} // default : false
    value={'1'} // {{label: 'label1', key: '1', color: 'red'}}
    list={list}
    onChange={(e) => {}} />
*/
import React from 'react';

export default class JDropDown2 extends React.Component {
    state = {
        showList: false
    }

    componentDidMount = () => {

    }

    render = () => {
        let { label, list, value, onChange, disabled, uniqueItem, placeHolder } = this.props

        let temp = list.filter((v) => { return v.key === (value.key || value) })
        let selectItem
        /** 선택 데이터 표시 */
        if (temp.length <= 0) {
            selectItem = { label: placeHolder || '선택해주세요', key: '' }
        } else {
            selectItem = temp[0]
        }

        return (
            <div className={`jCondition`}>
                <div className='label'>{label || 'label'}</div>
                <div className='jDropDown2 input'>
                    {
                        disabled ?
                            // 데이터 선택 비활성화
                            <div className='selectItem disabled'>
                                <div className='itemLabel'>
                                    {label}
                                </div>
                            </div> :
                            // 데이터 선택 활성화
                            <div className='selectItem'>
                                <div className='itemLabel'>
                                    {
                                        // 데이터별 색상 표시
                                        (selectItem.color || '') === '' ? <></> : <div className={'itemColorChk'} style={{ backgroundColor: selectItem.color }}></div>
                                    }
                                    <div>{selectItem.label}</div>
                                </div>
                                <div className='arrow btn' onClick={() => { this.setState({ showList: this.state.showList ? false : true }) }}>{this.state.showList ? '▲' : '▼'}</div>
                            </div>
                    }

                    {/* 드롭다운 리스트 표시 */}
                    <div className={`itemList`} style={{ display: this.state.showList ? 'block' : 'none' }}>
                        {
                            /** 최상단 특수 데이터 표시 (ex. 전체 선택) */
                            (uniqueItem || []).length > 0 ?
                                uniqueItem.map((v1, i) => {
                                    return (
                                        <div className={'listItem btn'}
                                            key={i}
                                            style={{ backgroundColor: v1.backgroundColor || 'rgb(236, 210, 215)' }}
                                            onClick={(e) => {
                                                onChange({ ...e, value: v1.key })
                                                this.setState({ showList: this.state.showList ? false : true })
                                            }}
                                        >
                                            <div>{v1.label}</div>
                                        </div>
                                    )
                                }) :
                                <></>
                        }
                        {
                            /** 데이터 리스트 */
                            list.map((v, i) => {
                                return (
                                    <div
                                        className='listItem btn'
                                        style={{ backgroundColor: i % 2 !== 0 ? 'white' : 'rgb(204, 218, 228)' }}
                                        key={`${v.key}${i}`}
                                        onClick={(e) => {
                                            onChange({ ...e, value: v })
                                            this.setState({ showList: this.state.showList ? false : true })
                                        }}>
                                        {/* {v.label} */}
                                        {
                                            (selectItem.color || '') === '' ? <></> : <div className={'itemColor'} style={{ backgroundColor: v.color }}></div>
                                        }
                                        <div>{v.label}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}