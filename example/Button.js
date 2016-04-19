/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';

import Title from '../src/Title';
import Button from '../src/Button';
import Icon from '../src/Icon';

class View extends React.Component {

    constructor() {
        super();
        this.state = {
            text: '赞我',
            count: 0,
            disabled: false
        };
    }

    render() {
        return (
            <div>
                <Title level={3}>按钮</Title>

                <Title level={4}>预定义样式</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button variants={['raised']}>default</Button>
                        <Button variants={['raised', 'primary']}>primary</Button>
                        <Button variants={['raised', 'secondery']}>secondery</Button>
                        <Button variants={['raised', 'success']}>success</Button>
                        <Button variants={['raised', 'info']}>info</Button>
                        <Button variants={['raised', 'warning']}>warning</Button>
                        <Button variants={['raised', 'danger']}>danger</Button>
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button>default</Button>
                        <Button variants={['primary']}>primary</Button>
                        <Button variants={['secondery']}>secondery</Button>
                        <Button variants={['success']}>success</Button>
                        <Button variants={['info']}>info</Button>
                        <Button variants={['warning']}>warning</Button>
                        <Button variants={['danger']}>danger</Button>
                    </div>
                </div>

                <Title level={4}>按钮大小</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button variants={['raised', 'primary']} size="xxs">xxs</Button>
                        <Button variants={['raised', 'primary']} size="xs">xs</Button>
                        <Button variants={['raised', 'primary']} size="s">s</Button>
                        <Button variants={['raised', 'primary']} size="m">m</Button>
                        <Button variants={['raised', 'primary']} size="l">l</Button>
                        <Button variants={['raised', 'primary']} size="xl">xl</Button>
                        <Button variants={['raised', 'primary']} size="xxl">xxl</Button>
                        <Button variants={['raised', 'primary']} size="xxxl">xxxl</Button>
                    </div>
                </div>

                <Title level={4}>禁用按钮</Title>
                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button disabled>disabled</Button>
                        <Button variants={['raised']} disabled>disabled</Button>
                    </div>
                </div>

                <Title level={4}>交互</Title>
                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button
                            variants={['raised', 'primary']}
                            disabled={this.state.disabled}
                            onClick={this.onClick.bind(this)}>
                            {this.state.text}
                        </Button>
                    </div>
                </div>

                <Title level={4}>Grid</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button variants={['raised', 'success']} style={{width: 100}}>100px</Button>
                        <Button variants={['raised', 'info']} style={{width: 300}}>300px</Button>
                    </div>
                </div>

                {[3, 6, 9].map(function (column) {
                    return (
                        <div className="melon-row" key={column}>
                            <Button
                                variants={['raised', 'success']}
                                className={'melon-column melon-column-' + column}>
                                {'melon-column-' + column}
                            </Button>
                            <Button
                                variants={['raised', 'info']}
                                className={'melon-column melon-column-' + (12 - column)}>
                                {'melon-column-' + (12 - column)}
                            </Button>
                        </div>
                    );
                })}

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button variants={['raised', 'success', 'fluid']}>fluid</Button>
                    </div>
                </div>

                <Title level={4}>Button Group</Title>
                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <div className="ui-buttongroup">
                            <Button variants={['raised', 'info']}>
                                添加
                            </Button>
                            <Button variants={['raised', 'info']}>
                                删除
                            </Button>
                            <Button variants={['raised', 'info']}>
                                启用
                            </Button>
                        </div>
                    </div>
                </div>

                <Title level={5}>Icon 按钮</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button>
                            <Icon icon="file-upload" />
                        </Button>
                        <Button>
                            <Icon icon="file-download" />
                        </Button>
                    </div>
                </div>

                <Title level={5}>Floating 按钮</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button variants={['floating', 'success']}>
                            <Icon icon="add" />
                        </Button>
                        <Button variants={['floating', 'primary']}>
                            <Icon icon="edit" />
                        </Button>
                    </div>
                </div>

                <Title level={5}>带 Icon 的按钮</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button variants={['raised', 'primary']}>
                            <Icon icon="file-upload" />上传
                        </Button>
                        <Button variants={['raised', 'success']}>
                            <Icon icon="file-download" />下载
                        </Button>
                    </div>
                </div>

                <Title level={5}>带动画的按钮</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button hasRipple style={{width: '10em'}}>
                            DEFAULT
                        </Button>
                    </div>
                </div>

            </div>
        );
    }

    onClick() {

        const count = this.state.count + 1;

        const disabled = count === 5;

        this.setState({
            text: disabled ? '今天的5个赞集满啦，客官明天赶早来~' : '+' + (count),
            count,
            disabled
        });

    }

}

module.exports = View;
