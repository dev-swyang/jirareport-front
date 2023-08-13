/** 
 * JTab
 * Desc : 탭 페이지 컴포넌트
 */
import React from 'react';
import JTab from './JTab';

export default class JTabs extends React.Component {
    state = {
        tabList: {},
        tabIndex: this.props.children[0].props.label
    }

    onClick = (v) => {
        this.setState({ tabIndex: v })
    }

    componentDidMount = () => {
        let tabList = {}
        this.props.children.map((v) => {
            tabList[v.props.label] = v
        })

        this.setState({
            tabList: tabList,
        })
    }

    render = () => {
        let { label, key, onChange } = this.props
        let { tabList, tabIndex } = this.state
        let selectTab = null;
        this.props.children.map((v) => {
            // console.log(v)
            if (v.props.label === tabIndex) {
                selectTab = v
            }
        })

        // console.log(tabList[tabIndex])
        // console.log(selectTab)

        return (
            <div className={`jCondition jTab`}>
                <div className='jTabList'>
                    {
                        Object.keys(tabList).map((v, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`jTabItem btn ${v === tabIndex ? 'select' : ''}`}
                                    onClick={(e) => {
                                        this.onClick(v);
                                        if ((onChange || '') !== '') {
                                            onChange({ label: v, value: tabList[v].props.value || v })
                                        }
                                    }}
                                >
                                    {v}
                                </div>
                            )
                        })
                    }
                </div>
                {/* 선택된 텝 표시 */}
                {selectTab}
            </div>
        )
    }
}