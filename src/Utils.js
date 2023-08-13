const axios = require('axios')
const moment = require('moment')
const dateFormat = 'YYYYMMDD'

const util = {
    /** 조회 조건 날짜 데이터 */
    baseDate: {
        today: `${moment().format(dateFormat)}`,
        monthFirstDay: `${moment().startOf('month').format(dateFormat)}`,
        monthLastDay: `${moment().endOf('month').format(dateFormat)}`,
        yearFirstDay: `${moment().startOf('year').format(dateFormat)}`,
        yearLastDay: `${moment().endOf('year').format(dateFormat)}`,
        weekMonDay: `${moment().day(1).format(dateFormat)}`,
        weekFriDay: `${moment().day(5).format(dateFormat)}`,
        quarter1: {
            from: `${moment().month(0).startOf('month').format(dateFormat)}`,
            to: `${moment().month(2).endOf('month').format(dateFormat)}`,
        },
        quarter2: {
            from: `${moment().month(3).startOf('month').format(dateFormat)}`,
            to: `${moment().month(5).endOf('month').format(dateFormat)}`,
        },
        quarter3: {
            from: `${moment().month(6).startOf('month').format(dateFormat)}`,
            to: `${moment().month(8).endOf('month').format(dateFormat)}`,
        },
        quarter4: {
            from: `${moment().month(9).startOf('month').format(dateFormat)}`,
            to: `${moment().month(11).endOf('month').format(dateFormat)}`,
        },
    },

    /** Call Api 공통 */
    callApi: {
        get: (url, params) => {
            console.log(`[${url}] params >>> `, params)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_HOST}${url}`,
                    params: params
                })
                    .then((res) => {
                        console.log(`[${url}] result >>> `, res)
                        resolve(res)
                    })
                    .catch((err) => {
                        console.log(`[${url}] error >>> `, err)
                        reject(err)
                    })
            })
        },
        post: (url, headers, params) => {
            console.log(`[${url}] params >>> `, params)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_HOST}${url}`,
                    headers: headers,
                    params: params
                })
                    .then((res) => {
                        console.log(`[${url}] result >>> `, res)
                        resolve(res)
                    })
                    .catch((err) => {
                        console.log(`[${url}] error >>> `, err)
                        reject(err)
                    })
            })
        }
    },
    team: [
        { all: 'A', label: '부서', value: '' },
        { label: 'ERP설계1Cell', value: '1' },
        { label: 'ERP설계2Cell', value: '2' },
        { label: 'ERP설계3Cell', value: '5' },
        { label: 'ERP개발1Cell', value: '3' },
        { label: 'ERP개발2Cell', value: '4' },
        { label: 'ERP개발3Cell', value: '6' },
        { label: 'ERP개발4Cell', value: '7' },
    ],
    unit: [
        { label: 'ERP설계1Cell', key: '1', color: 'red' },
        { label: 'ERP설계2Cell', key: '2', color: 'blue' },
        { label: 'ERP설계3Cell', key: '5', color: 'green' },
        { label: 'ERP개발1Cell', key: '3', color: 'yellow' },
        { label: 'ERP개발2Cell', key: '4', color: 'pink' },
        { label: 'ERP개발3Cell', key: '6', color: 'purple' },
        { label: 'ERP개발4Cell', key: '7', color: 'gray' },
    ],

    /** 조회조건 멀티파라미터 세팅 */
    setMultiParam: (list, key = 'key') => {
        let multiParam = list
            .filter((v) => { return (v[key] || v || '') !== '' }).join('|') + '|'

        return multiParam
    },

    /** 그리드 조회를 위한 데이터 검색 */
    filter: (searchText, chkColList, dataList) => {
        // {col: 'colName', type: 'like / same'}
        let chkList = chkColList.map((v, i) => {
            if (typeof v === 'string') { return { col: v, type: 'like' }; } else { return v; }
        })

        return (dataList.filter((v1, i1) => {
            return chkList.some((v2, i2) => {
                if ((v2.type === 'like') && (v1[v2.col].indexOf(searchText) >= 0)) {
                    return true
                } else if ((v2.type === 'same') && v1[v2] === searchText) {
                    return true
                }
                return false
            })
        }))
    }
}

module.exports = util