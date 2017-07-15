/**
 * @file 可选择的表格行
 * @author leon <lupengyu@baidu.com>
 */

import PropTypes from 'prop-types';
import Row from './Row';

/**
 * 可选择的表格行
 *
 * 做这个类，主要是为了解决性能问题
 *
 * @extends {TableRow}
 */
export default class SelectorRow extends Row {

    /**
     * 是否应该更新视图
     *
     * @public
     * @param  {*} nextProps 下一个属性
     * @param  {*} nextState 下一个状态
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.selected !== this.props.selected) {
            return true;
        }

        return super.shouldComponentUpdate(nextProps, nextState);

    }

}


SelectorRow.propTypes = {
    ...Row.propTypes,
    selected: PropTypes.bool.isRequired
};

SelectorRow.defaultProps = {
    ...Row.defaultProps,
    selected: false
};
