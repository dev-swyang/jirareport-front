/**
 * Contents
 * Desc : 조회 조건 tab
 */
import React from 'react';

export default class Search extends React.Component {
    componentDidMount = () => { }

    render = () => {
        return (
            <div className='search'>
                {this.props.children}

                <div
                    className='searchBtn btn'
                    onClick={(e) => { this.props.onConfirm(e) }}>confirm</div>
            </div>
        )
    }
}