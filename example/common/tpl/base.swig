<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{% block title %}melon{% endblock %}</title>
    <link rel="stylesheet" href="{{feRoot}}/common/css/index.styl">
    <link rel="stylesheet" href="{{feRoot}}/{{style}}">
</head>
<body>

<div id="main">
    <nav class="nav">
        <h1>melon</h1>
        <ul>
            {% for component in components %}
            <li>
                <a href="{{feRoot}}/{{component.name}}.jsx">
                    {{component.name}}
                </a>
            </li>
            {% endfor %}
        </ul>
    </nav>
    <div id="app"></div>
</div>

<script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/2-0-6/esl.js"></script>
<script>
require.config({
    baseUrl: '{{feRoot}}',
    paths: {
        'melon': '../src',
        'react': '../dep/react/react',
        'react-dom': '../dep/react/react-dom',
        'underscore': '../dep/underscore/underscore'
    },
    waitSeconds: 5
});
require(['{{component}}', 'react', 'react-dom'], function (App, React, ReactDOM) {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById('app')
    );
});
</script>
{% block script %}{% endblock %}
</body>
</html>
