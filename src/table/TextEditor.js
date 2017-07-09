/**
 * @file 单元格文本编辑
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import TextBox from '../TextBox';
import Button from '../Button';
import {create} from 'melon-core/classname/cxBuilder';
import Title from '../Title';

const cx = create('TableCellTextEditor');

export default class TableCellTextEditor extends Component {

    constructor(...args) {

        super(...args);

        this.state = {
            open: false
        };

        this.onMainClick = this.onMainClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onConfirm = this.onConfirm.bind(this);

    }

    onMainClick() {
        this.setState({open: true});
    }

    onClose() {
        this.setState({open: false});
    }

    onChange(e) {
        this.submit(e.value);
    }

    onConfirm() {
        this.submit(this.refs.input.getValue());
        this.setState({open: false});
    }

    submit(value) {

        let {onChange, columnData, rowIndex, rowData, columnIndex, dataKey} = this.props;

        onChange({
            columnData,
            rowData,
            columnIndex,
            rowIndex,
            dataKey,
            value
        });

    }

    render() {

        let {
            children,
            mode,
            placeholder,
            title
        } = this.props;

        let className = cx(this.props).build();

        title = mode === 'confirm'
            ? (
                <Title level={3}>{title}</Title>
            )
            : null;

        let footer = mode === 'confirm'
            ? (
                <footer className={cx.getPartClassName('footer')}>
                    <Button
                        size="xs"
                        variants={['info']}
                        onClick={this.onClose}>
                        取消
                    </Button>
                    <Button
                        size="xs"
                        variants={['info']}
                        onClick={this.onConfirm}>
                        确定
                    </Button>
                </footer>
            )
            : null;

        let text = mode === 'confirm'
            ? (
                <TextBox
                    ref="input"
                    autoFocus
                    variants={['fluid']}
                    placeholder={placeholder}
                    defaultValue={children} />
            )
            : (
                <TextBox
                    autoFocus
                    variants={['fluid']}
                    placeholder={placeholder}
                    value={children}
                    onChange={this.onChange} />
            );

        return (
            <div ref="main" onClick={this.onMainClick} className={className}>
                {children}
                <Popover
                    open={this.state.open}
                    anchor={this.refs.main && this.refs.main.parentNode}
                    onRequestClose={this.onClose}>
                    <div className={cx().part('layer').addVariants(mode).build()}>
                        {title}
                        {text}
                        {footer}
                    </div>
                </Popover>
            </div>
        );

    }

}

TableCellTextEditor.propTypes = {
    mode: PropTypes.oneOf(['inline', 'confirm']),
    children: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
