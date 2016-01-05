/**
 * @file ComponentView
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import {connect} from 'ei';

import Title from 'melon/Title';
import Example from './component/Example';
import _ from 'underscore';

const cx = require('melon/common/util/cxBuilder').create('ComponentView');

const ComponentView = React.createClass({

    displayName: 'ComponentView',

    renderExample(conf, index) {

        return <Example {...conf} key={index} />;
    },

    render() {

        const {
            name,
            datasource
        } = this.props;

        const className = cx(this.props).addVariants([name]).build();

        return (
            <div className={className}>
                <Title level={1}>{name}</Title>
                {_.map(datasource, this.renderExample, this)}
            </div>
        );
    }

});

export default connect(ComponentView, true);
