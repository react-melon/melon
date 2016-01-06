/**
 * @file ExampleCard
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {PropTypes} from 'react';

import Card from 'melon/Card';
import ToolBar from 'melon/ToolBar';
import Zippy from 'melon/Zippy';
import Title from 'melon/Title';
import Button from 'melon/Button';
import Icon from 'melon/Icon';

import Code from '../../common/component/Code';

const cx = require('melon/common/util/cxBuilder').create('ExampleCard');

const ExampleCard = React.createClass({

    propTypes: {
        title: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        exampleComponent: PropTypes.element
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
            code,
            name,
            exampleComponent
        } = this.props;

        return (
            <Card className={cx(this.props).build()}>
                <ToolBar>
                    <Title level={2}>{title}</Title>
                    <Button size={'xxxl'} onClick={this.onClick}>
                        <Icon icon={'unfold-more'} />
                    </Button>
                </ToolBar>
                <Zippy size={300} expand={this.state.expand}>
                    <Code>
                        {code}
                    </Code>
                </Zippy>
                <div className={cx().part('main').addVariants(name).build()}>
                    {exampleComponent}
                </div>
            </Card>
        );
    }

});

export default ExampleCard;
