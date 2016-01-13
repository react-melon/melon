/**
 * @file Example / Pager2
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import Pager from 'melon/Pager';

require('../code/Pager2.txt');

const PagerExample2 = React.createClass({

    getInitialState() {
        return {
            page: 1
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
                    total={10}
                    page={this.state.page}
                    first={1}
                    useLang
                    onChange={this.onChange} />

                <p>
                    当前页码为{this.state.page}
                </p>

            </div>

        );
    }

});

export default PagerExample2;
