/**
 * JDate
 * Desc : DatePicker 기능
 * - 단일 날짜 및 날짜 범위 선택 기능
 */

/*
<JDate
    label='조회기간'
    type='period'
    value={this.state.date1}
    onChange={(e) => {
        this.setState({ date1: e.value })
    }} />
<JDate
    label='기준일자'
    type='single'
    value={this.state.date2}
    onChange={(e) => {
        this.setState({ date2: e.value })
    }} />
*/

import React from 'react';

export default class JDate extends React.Component {
    state = { date: undefined }

    componentDidMount = () => {
        this.setState({ date: this.props.value || { from: '', to: '' } }, () => { })
    }

    setDate = (date) => {
        let y = ''; let m = ''; let d = '';

        switch (date.length || 0) {
            case 8:
                y = date.substring(0, 4)
                m = date.substring(4, 6)
                d = date.substring(6, 8)
                break;
        }
        return `${y || ''}-${m || ''}-${d || ''}`
    }

    render = () => {
        let { label, type, value, onChange } = this.props
        value = value || { from: '', to: '' }

        return (
            <div className={`jCondition `}>
                <div className='label'>{label || 'label'}</div>

                {
                    type === 'period' ?
                        /** 날짜 멀티 선택 */
                        <div>
                            {/* From Date*/}
                            <input
                                className='JDate JDateFrom input'
                                type='date'
                                value={this.setDate(value.from || value.fr || '')}
                                onChange={(e) => {
                                    this.setState({ date: { ...this.state.date, from: e.target.value.replace(/[-]/gi, '') } }, () => {
                                        onChange({ ...e.target, value: { from: this.state.date.from, to: this.state.date.to } })
                                    })

                                }} />
                            &nbsp;~&nbsp;
                            {/* To Date */}
                            <input
                                className='JDate JDateTo input'
                                type='date'
                                value={this.setDate(value.to || '')}
                                onChange={(e) => {
                                    this.setState({ date: { ...this.state.date, to: e.target.value.replace(/[-]/gi, '') } }, () => {
                                        onChange({ ...e.target, value: { from: this.state.date.from, to: this.state.date.to } })
                                    })
                                }} />
                        </div> :
                        /** 날짜 싱글 선택 */
                        <input
                            className='JDate input'
                            type='date'
                            value={this.setDate(value)}
                            onChange={(e) => {
                                this.setState({ date: e.target.value.replace(/[-]/gi, '') }, () => {
                                    onChange({ ...e.target, value: this.state.date })
                                })
                            }} />
                }
            </div>
        )
    }
}