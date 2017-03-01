/**
 * @file Example / ColorPicker
 */


import React, {Component} from 'react';
import ColorPicker from 'melon-colorpicker';
import Title from 'melon/Title';

class View extends Component {

    constructor(...args) {
        super(...args);

        this.state = {
            color: '#abc'
        };
    }

    render() {
        return (
            <div className="melon-row">
                <div className="melon-column melon-column-12">
                    <ColorPicker
                        variants={['fluid']}
                        name="rgbStr"
                        placeholder="请选择颜色"
                        value={this.state.color}
                        onChange={e => {
                            this.setState({color: e.value});
                        }} />
                </div>
            </div>
        );
    }
}

module.exports = View;
