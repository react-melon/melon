/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Button = require('../src/Button.jsx');

var View = React.createClass({

    render: function() {
        return (
            <div>
                <Title level={3}>按钮</Title>

                <Title level={4}>flat 按钮</Title>

                <div className="row">

                    <Button size="xs">flat button</Button>
                    <Button size="s">flat button</Button>
                    <Button size="m">flat button</Button>
                    <Button size="l">flat button</Button>
                    <Button size="xl">flat button</Button>
                    <Button size="xxl">flat button</Button>
                    <Button size="xxxl">flat button</Button>

                    <Button
                        disabled={true}>
                        disabled
                    </Button>


                </div>

                <Title level={4}>raised 按钮</Title>

                <div className="row">

                    <Button variants={['raised']} size="xs">flat button</Button>
                    <Button variants={['raised']} size="s">flat button</Button>
                    <Button variants={['raised']} size="m">flat button</Button>
                    <Button variants={['raised']} size="l">flat button</Button>
                    <Button variants={['raised']} size="xl">flat button</Button>
                    <Button variants={['raised']} size="xxl">flat button</Button>
                    <Button variants={['raised']} size="xxxl">flat button</Button>

                    <Button
                        variants={['raised']}
                        disabled={true}>
                        disabled
                    </Button>

                </div>

                <Title level={4}>预定义样式</Title>

                <div className="row">
                    <Button variants={['primary']}>flat button</Button>
                    <Button variants={['secondery']}>flat button</Button>
                    <Button variants={['success']}>flat button</Button>
                    <Button variants={['info']}>flat button</Button>
                    <Button variants={['warning']}>flat button</Button>
                    <Button variants={['danger']}>flat button</Button>
                </div>

                <div className="row">
                    <Button variants={['raised', 'primary']}>flat button</Button>
                    <Button variants={['raised', 'secondery']}>flat button</Button>
                    <Button variants={['raised', 'success']}>flat button</Button>
                    <Button variants={['raised', 'info']}>flat button</Button>
                    <Button variants={['raised', 'warning']}>flat button</Button>
                    <Button variants={['raised', 'danger']}>flat button</Button>
                </div>

            </div>
        );
    }

});

module.exports = View;
