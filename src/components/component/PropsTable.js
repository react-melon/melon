/**
 * @file PropsTable
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {PropTypes} from 'react';

import Table from 'melon/Table';
import Title from 'melon/Title';

const cx = require('melon/common/util/cxBuilder').create('PropsTable');

export default React.createClass({

    displayName: 'PropsTable',

    propTypes: {
        title: PropTypes.string.isRequired,
        dataSource: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                type: PropTypes.string,
                defaultValue: PropTypes.oneOfType([
                    PropTypes.string, PropTypes.number
                ]),
                description: PropTypes.string
            })
        ).isRequired
    },

    getInitialState() {

        return {
            expand: false
        };

    },

    onClick() {

        this.setState(
            ({expand}) => {
                return {
                    expand: !expand
                };
            }
        );
    },

    render() {

        const {
            title,
            dataSource
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                <Title level={2}>{title + ' Properties'}</Title>
                <Table dataSource={dataSource}>
                    <Table.Column
                        dataKey='name'
                        header='Name'
                        footer='Name'
                        width={200} />
                    <Table.Column
                        dataKey='type'
                        header='Type'
                        footer='Type'
                        width={200} />
                    <Table.Column
                        dataKey='defaultValue'
                        header='Default'
                        footer='Default'
                        width={100} />
                    <Table.Column
                        dataKey='description'
                        header='Description'
                        footer='Description'
                        width={500} />
                </Table>
            </div>
        );
    }

});

