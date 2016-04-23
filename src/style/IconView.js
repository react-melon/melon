/**
 * @file IconView
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import {connect} from 'ei';

import TextBox from 'melon/TextBox';
import Icon from 'melon/Icon';

const IconView = React.createClass({

    displayName: 'IconView',

    onChange(e) {
        const {value} = e;
        this.props.search(value);
    },

    render() {

        const iconStyle = {
            fontSize: 64,
            display: 'block'
        };

        const list = this.props.icons
            .reduce(function (result, icon, index) {

                let rowIndex = parseInt(index / 6, 10);
                let row = result[rowIndex];

                if (!row) {
                    row = result[rowIndex] = [];
                }

                row.push(icon);

                return result;

            }, [])
            .map(function (row, index) {
                return (
                    <div className="melon-row" key={index}>
                        {row.map(function (icon, index) {
                            return (
                                <div className="melon-column melon-column-2" key={index}>
                                    <Icon icon={icon} style={iconStyle} title={icon} />
                                    <label>{icon}</label>
                                </div>
                            );
                        })}
                    </div>
                );
            });


        return (
            <div className="ui-style-view variant-icon">
                <TextBox
                    value={this.props.query}
                    onChange={this.onChange}
                    variants={['fluid']}
                    floatingLabel="输入要寻找的图标"
                    size="xl"
                     />
                {list}
            </div>
        );
    }

});

module.exports = connect(IconView, true, {
    search: require('./actionCreater/iconsearch').search
});
