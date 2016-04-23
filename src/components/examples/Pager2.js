/**
 * @file Example / Pager2
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import Pager from 'melon/Pager';

require('../code/Pager2.txt');

class View extends React.Component {

    constructor() {
        super();

        this.state = {
            page: 1
        };
    }

    render() {

        return (
            <div>
                <Pager
                    total={10}
                    page={this.state.page}
                    first={1}
                    useLang
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
