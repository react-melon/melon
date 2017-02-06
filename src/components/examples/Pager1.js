/**
 * @file Example / Pager1
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import Pager from 'melon/Pager';

class View extends React.Component {

    constructor() {
        super();

        this.state = {
            page: 3
        };
    }

    render() {

        return (

            <div>
                <Pager
                    total={15}
                    page={this.state.page}
                    onChange={({page}) => {
                        this.setState({page});
                    }} />
                <p>
                    当前页码为{this.state.page}
                </p>
            </div>

        );
    }

}

module.exports = View;
