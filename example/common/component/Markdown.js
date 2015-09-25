/**
 * @file Markdown component
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var Remarkable = require('remarkable');

class Markdown extends React.Component {

    render() {

        return (
            <article className="markdown-container">{this.getContent()}</article>
        );

    }

    getContent() {

        var markdown = new Remarkable({
            html: true
        });

        return React.Children.map(this.props.children, function (child) {


            if (typeof child !== 'string') {
                return child;
            }

            child = {
                __html: markdown.render(child)
            };

            return <section className="markdown" dangerouslySetInnerHTML={child} />;

        });
    }

}

module.exports = Markdown;
