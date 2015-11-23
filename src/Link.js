/**
 * @file melon/Link
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('./common/util/cxBuilder').create('Link');

function Link(props) {

    return (
        <a {...props} className={cx(props).build()} />
    );

}

module.exports = Link;
