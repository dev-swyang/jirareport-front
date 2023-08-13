/**
 * JDropDown
 * Desc : 드롭다운 컴포넌트
 * 싱글 / 멀티 선택 기능
 * 에러로 인한 사용 불가(대체 컴포넌트 : JDropDown2, JMultiDropDown)
 */

/*
<JDropDown
    label='기준일자'
    type='single'
    value={dropDownList[0]}
    list={dropDownList}
    onChange={(e) => {
        this.setState({ dropDown: e.value })
    }} />
<JDropDown
    label='기준일자'
    type='multi'
    value={dropDownList[0]}
    list={dropDownList}
    onChange={(e) => {
        this.setState({ dropDown: e.value })
    }} />
*/

import React from 'react';

export default class JDropDown extends React.Component {
    state = {
        // DropDownList 표시 유/무
        showList: false,
        // 선택된 Item
        selectItem: [],
    }

    componentDidMount = () => {
        /** 데이터 초기화 */
        const value = this.props.value; let set = {}
        if (((value || '') === '') || (value.length === 0)) {
            set = { selectItem: [] }
        } else if ((value.length || '') === '') {
            set = { selectItem: [value] }
        } else {
            set = { selectItem: value }
        }

        this.setState(set)
    }

    selectItem = (v, e) => {
        /** 데이터 세팅 event */
        let set = {}
        if (this.props.type === 'multi') {
            let items = this.state.selectItem
            /** 이미 선택된 데이터 확인 */
            let idx = this.state.selectItem.findIndex((item) => { return item.value === v.value })

            if ((v.all || '') !== '') {
                /** 전체 선택 */
                if (idx > -1) {
                    set = { selectItem: [] }
                } else {
                    set = { selectItem: [v] }
                }
            } else if (idx > -1) {
                /** 이미 선택된 데이터 제거 */
                items.splice(idx, 1)
                set = { selectItem: items }
            } else {
                /** 선택된 데이터 추가 */
                if (items.length === 1 && (items[0].all || '') !== '') {
                    set = { selectItem: [v] }
                } else {
                    set = { selectItem: [...items, v] }
                }

            }
        } else {
            set = { selectItem: [v] }
        }


        this.setState(set, () => {
            this.props.onChange({ ...e.target, value: this.props.type === 'multi' ? this.state.selectItem : this.state.selectItem[0] })
        })
    }

    render = () => {
        let { label, list, type, placeHolder, disabled } = this.props

        return (
            <div className={`jCondition `}>
                <div className='label'>{label || ''}</div>

                {/* 선택된 데이터 표시 */}
                <div className='jDropDown input'>
                    {disabled ?
                        <div className='select disabled'>전체</div> :
                        <div className='select'>
                            <div style={this.state.selectItem.length > 0 ? {} : { color: 'gray' }}>
                                {
                                    type === 'multi' ?
                                        this.state.selectItem.length > 0 ? `${this.state.selectItem[0].label}${this.state.selectItem.length > 1 ? `외 ${this.state.selectItem.length}건` : ''}` : (placeHolder || '') :
                                        this.state.selectItem.length > 0 ? this.state.selectItem[0].label : (placeHolder || '')
                                }
                            </div>
                            <div className='btn' onClick={() => { this.setState({ showList: this.state.showList ? false : true }) }}>{this.state.showList ? '▲' : '▼'}</div>
                        </div>
                    }

                    {/* 드롭 다운 리스트 */}
                    <div className='list'
                        style={{ display: `${this.state.showList ? 'inline-block' : 'none'}` }}>
                        {
                            (list || []).map((v, i) => {
                                return (
                                    <div className='items' key={i} onClick={(e) => { this.selectItem(v, e) }}>
                                        <div className='item' key={v.value} >{v.label || v.value}</div>
                                        {
                                            // 단일 / 멀티 선택 Type에 따른 선택 체크 박스 표시 유무
                                            type === 'single' ?
                                                <></> :
                                                <div className='btn'>
                                                    {this.state.selectItem.findIndex((item) => {
                                                        return item.value === v.value
                                                    }) > -1 ? '☑' : '◻'}
                                                </div>
                                        }
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