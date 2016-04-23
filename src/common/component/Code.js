/**
 * @file Code
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import hljs from 'hljs';

export default React.createClass({

    componentDidMount() {
        hljs.highlightBlock(this.refs.code);
    },

    render() {

        const {
            children,
            style,
            ...rest
        } = this.props;

        return (
            <pre {...rest} style={{
                ...style,
                overflowY: 'auto',
                height: '100%'
            }}>
                <code ref="code" className="javascript">
                    {children}
                </code>
            </pre>
        );
    }

});

