/**
 * @file Chip demo
 * @author Ma63d(chuck7liu@gmail.com)
 */

import React from 'react';

import Chip from '../src/Chip';
import Title from '../src/Title';

export default class View extends React.Component {

    state = {
        chipArr: [1,2,3,4]
    }

    handleChipRemove = i => {
        let chipArr = this.state.chipArr;
        chipArr.splice(i, 1);
        this.setState({
            chipArr
        });
    }

    render() {
        return (
            <div>
                <Title level={3}>Chip 纸片</Title>
                <Title level={4}>默认</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Chip>
                            hello world!
                        </Chip>
                    </div>
                </div>


                <Title level={4}>带头像的Chip</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Chip avatar={<img src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt=""/>}>
                            hello world!
                        </Chip>
                    </div>
                </div>



                <Title level={4}>可点击的Chip</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Chip avatar={<img src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt=""/>}
                              onClick={() => {alert('the chip is clicked')}}>
                            hello world!
                        </Chip>
                    </div>
                </div>

                <Title level={4}>带删除图标的Chip</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        {
                            this.state.chipArr.map((item, index) => (
                                <Chip avatar={<img src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt=""/>}
                                    key={index}
                                    onClick={() => {
                                        alert('the chip is clicked');
                                    }}
                                    onRemove={() => {
                                        this.handleChipRemove(index);
                                    }}
                                    style={{margin: '4px'}}>
                                    {`我是小新${item}号`}
                                </Chip>
                            ))
                        }

                    </div>
                </div>
            </div>

        );
    }
}

