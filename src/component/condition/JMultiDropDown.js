/** 
 * JMultiDropDown
 * Desc : 멀티선택 드롭다운 컴포넌트
 */

/*
<JMultiDropDown
    label='JMultiDropDown'
    disabled={false} // default : false
    uniqueItem={[
        {label: '', key: '', color: ''},
        {label: '', key: '', color: ''},
        {label: '', key: '', color: ''},
    ]}
    value={value}
    list={list}
    onChange={(e) => {
        console.log(e.value)
    }} />
*/
import React from 'react';

export default class JMultiDropDown extends React.Component {
    state = {
        showList: false,
        uniqueItem: '',
        tempValue: []
    }

    /** 선택된 데이터 표시 */
    setChkBtn = (v) => {
        if (typeof this.state.tempValue[0] === 'number' || typeof this.state.tempValue[0] === 'string') {
            return (
                this.state.tempValue.indexOf(v.key) >= 0 && ((this.state.uniqueItem || '') === '') ?
                    <div className='itemColorChk'><img src='/image/check.png' alt='chk' /></div>
                    : <></>
            )
        } else {
            return (
                this.state.tempValue.map((v1) => { return v1.key; }).indexOf(v.key) >= 0 && ((this.state.uniqueItem || '') === '') ?
                    <div className='itemColorChk'><img src='/image/check.png' alt='chk' /></div>
                    : <></>
            )
        }
    }

    /** 데이터 리스트 표시 */
    showList = () => {
        let temp = []
        if (typeof this.props.value[0] === 'number' || typeof this.props.value[0] === 'string') {
            temp = this.props.list.filter((v) => { return this.props.value.indexOf(v.key) >= 0 })
        } else {
            temp = this.props.value
        }

        this.setState({ showList: this.state.showList ? false : true, tempValue: temp })
    }

    componentDidMount = () => {
        let temp = []
        if (typeof this.props.value[0] === 'number' || typeof this.props.value[0] === 'string') {
            temp = this.props.list.filter((v) => { return this.props.value.indexOf(v.key) >= 0 })
        } else {
            temp = this.props.value
        }
        this.setState({ tempValue: temp })
    }

    render = () => {
        let { label, list, value, onChange, disabled, uniqueItem, placeHolder } = this.props

        let temp = list.filter((v) => {
            if (typeof this.state.tempValue[0] === 'number' || typeof this.state.tempValue[0] === 'string') {
                return this.state.tempValue.indexOf(v.key) >= 0
            } else {
                return this.state.tempValue.map((v1) => { return v1.key }).indexOf(v.key) >= 0
            }
        })

        let selectItem
        if (temp.length <= 0) {
            selectItem = { label: placeHolder || '선택해주세요', key: '' }
        } else if (temp.length > 1) {
            selectItem = { label: `${temp.length}건 선택`, key: '' }
        } else {
            selectItem = temp[0]
        }

        return (
            <div className={`jCondition`}>
                <div className='label'>{label || 'label'}</div>
                <div className='jMultiDropDown input'>
                    {
                        disabled ?
                            <div className='selectItem disabled'>
                                <div className='itemLabel'>
                                    {label}
                                </div>
                            </div> :
                            <div className='selectItem'>
                                <div className='itemLabel'>
                                    {
                                        (selectItem.color || '') === '' ? <></> : <div className={'itemColor'} style={{ backgroundColor: selectItem.color }}></div>
                                    }
                                    <div>
                                        {this.state.uniqueItem || selectItem.label || selectItem.key || ''}
                                    </div>
                                </div>
                                <div className='arrow btn' onClick={() => { this.showList() }}>{this.state.showList ? '▲' : '▼'}</div>
                            </div>
                    }

                    {/* 드롭다운 리스트 표시 */}
                    <div className={`itemList`} style={{ display: this.state.showList ? 'block' : 'none' }}>
                        {
                            // 특수 데이터 표시 (ex. 전체 선택, 특정 데이터 일괄 선택)
                            (uniqueItem || []).length > 0 ?
                                uniqueItem.map((v1, i) => {
                                    return (
                                        <div className='listItem btn'
                                            key={i}
                                            style={{ backgroundColor: v1.backgroundColor || 'rgb(236, 210, 215)' }}
                                            onClick={(e) => {
                                                let tempValue = list.filter((v2) => {
                                                    return (v1.key.indexOf(v2.key) >= 0)
                                                })

                                                if (this.state.uniqueItem !== v1.label) {
                                                    this.setState({
                                                        uniqueItem: v1.label,
                                                        tempValue: tempValue
                                                    })
                                                } else {
                                                    this.setState({
                                                        uniqueItem: '',
                                                        tempValue: []
                                                    })
                                                }

                                            }}>
                                            <div>{v1.label}</div>
                                            {
                                                this.state.uniqueItem === v1.label ?
                                                    <div className='itemColorChk'><img src='/image/check.png' alt='chk' /></div> :
                                                    <></>
                                            }
                                        </div>
                                    )
                                }) :
                                <></>
                        }
                        {
                            list.map((v, i) => {
                                return (
                                    <div
                                        className='listItem btn'
                                        style={{ backgroundColor: i % 2 !== 0 ? 'white' : 'rgb(204, 218, 228)' }}
                                        key={`${v.key}${i}`}
                                        onClick={(e) => {
                                            let tempValue = []
                                            if (this.state.tempValue.some((v2) => { return v2.key === v.key })) {
                                                tempValue = this.state.tempValue.filter((v2) => { return v2.key !== v.key })
                                            } else {
                                                tempValue = [...this.state.tempValue, v]
                                            }

                                            this.setState({ tempValue: tempValue, uniqueItem: '' })

                                        }}>
                                        {
                                            // 데이터별 색상 표시
                                            (v.color || '') === '' ? <></> : <div className={'itemColorChk'} style={{ backgroundColor: v.color }}></div>
                                        }
                                        {/* 데이터 명 (데이터 라벨) */}
                                        <div>{v.label || v.key || ''}</div>
                                        {
                                            // 데이터 선택 확인 체크 박스
                                            this.setChkBtn(v)
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* 선택 완료 후 event */}
                    <div className='listBtn' style={{ display: this.state.showList ? 'block' : 'none' }}>
                        <div
                            className='btn'
                            style={{ backgroundColor: 'rgb(236, 210, 215)' }}
                            onClick={(e) => {
                                this.showList()
                            }}>
                            취 소
                        </div>
                        <div
                            className='btn'
                            style={{ backgroundColor: 'rgb(204, 218, 228)' }}
                            onClick={(e) => {
                                onChange({ ...e, value: this.state.tempValue })
                                this.setState({ showList: false })
                            }}>
                            확 인
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}