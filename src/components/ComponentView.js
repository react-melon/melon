/**
 * @file ComponentView
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import {connect} from 'ei';

import Title from 'melon/Title';
import Example from './component/Example';
import PropsTable from './component/PropsTable';
import _ from 'underscore';
import properties from './conf/properties';

const cx = require('melon/common/util/cxBuilder').create('ComponentView');

const ComponentView = React.createClass({

    displayName: 'ComponentView',

    renderExample(conf, index) {

        return <Example {...conf} key={index} />;
    },

    renderTable(data, index) {

        return (
            <PropsTable
                key={index}
                title={data.title}
                dataSource={data.props} />
        );
    },

    render() {

        const {
            name,
            datasource
        } = this.props;

        const className = cx(this.props).addVariants([name]).build();

        const propsData = properties[name];

        return (
            <div className={className}>
                <Title level={1}>{name}</Title>
                {_.map(datasource, this.renderExample, this)}
                {_.map(propsData, this.renderTable, this)}
            </div>
        );
    }

});

module.exports = connect(ComponentView, true);
