/**
 * @file React Demo Code Block
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Button from 'melon/Button';
import Icon from 'melon/Icon';
import hljs from 'highlight.js';
import Tooltip from 'melon/Tooltip';

export default class ReactDemoCodeBlock extends PureComponent {

    static propTypes = {
        children: PropTypes.element.isRequired,
        content: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };

    state = {
        open: false
    };

    componentDidMount() {
        try {
            hljs.highlightBlock(this.refs.code);
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        let {children, content, title} = this.props;
        let {open} = this.state;
        return (
            <div className="react-code-block-demo">
                <header onClick={() => this.setState({open: !this.state.open})}>
                    <label>{title}</label>
                    <Tooltip content="查看源码">
                        <Button>
                            <Icon icon="code" />
                        </Button>
                    </Tooltip>
                </header>
                <section style={{maxHeight: open ? '1000px' : '0'}}>
                    <pre ref="code" className="jsx">
                        <code className="language-jsx">
                            {JSON.parse(`{"content":"${content}"}`).content}
                        </code>
                    </pre>
                </section>
                <div>
                    {children}
                </div>
            </div>
        );
    }

}
