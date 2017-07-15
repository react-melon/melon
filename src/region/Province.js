/**
 * @file Region/RegionProvince
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Selector from './Selector';
import * as helper from './helper';

const cx = create('RegionProvince');

export default class RegionProvince extends Component {

    constructor(props) {

        super(props);

        this.state = {
            expand: false
        };

        this.onSelectorChange = this.onSelectorChange.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

    }

    onSelectorChange(e) {

        const value = e.value;
        const {datasource, onChange} = this.props;

        helper[value ? 'selectAll' : 'cancelAll'](datasource);

        onChange && onChange({
            data: datasource
        });

    }

    onMouseEnter(e) {
        this.setState({expand: true});
    }

    onMouseLeave(e) {
        this.setState({expand: false});
    }

    renderSelectedInfo() {

        const datasource = this.props.datasource;

        const total = datasource.children && datasource.children.length;

        if (!total) {
            return;
        }

        const num = datasource
            .children
            .reduce(function (result, child, index) {
                if (child.selected) {
                    result++;
                }
                return result;
            }, 0);

        return (num === total || num === 0)
            ? null : (
                <span className={cx().part('info').build()}>
                    {'(' + num + '/' + total + ')'}
                </span>
            );
    }

    render() {

        const {
            datasource,
            children
        } = this.props;

        return (
            <div className={cx(this.props).addStates({expand: this.state.expand}).build()}
                onMouseEnter={children ? this.onMouseEnter : null}
                onMouseLeave={children ? this.onMouseLeave : null}>
                <Selector
                    label={datasource.text}
                    id={datasource.id}
                    checked={datasource.selected}
                    onChange={this.onSelectorChange} />
                {this.renderSelectedInfo()}
                {children ? (
                    <div className={cx().part('popup').build()}>
                        <ul>
                            {children}
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }

}

RegionProvince.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};
