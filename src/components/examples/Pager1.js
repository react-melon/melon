/**
 * @file Example / Pager1
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import Pager from 'melon/Pager';

require('../code/Pager1.txt');

const PagerExample1 = React.createClass({

    getInitialState() {
        return {
            page: 3
        };
    },

    onChange(e) {

        const {page} = e;

        this.setState({page});

    },

    render() {

        return (

            <div>

                <Pager
                    total={15}
                    page={this.state.page}
                    onChange={this.onChange} />

                <p>
                    当前页码为{this.state.page}
                </p>

            </div>

        );
    }

});

export default PagerExample1;
