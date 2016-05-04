/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './classname', './hyphenate', './pascalize', '../../config', "../../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./classname'), require('./hyphenate'), require('./pascalize'), require('../../config'), require("../../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.classname, global.hyphenate, global.pascalize, global.config, global.babelHelpers);
        global.cxBuilder = mod.exports;
    }
})(this, function (exports, _classname, _hyphenate, _pascalize, _config, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.create = create;

    var _hyphenate2 = babelHelpers.interopRequireDefault(_hyphenate);

    var _pascalize2 = babelHelpers.interopRequireDefault(_pascalize);

    /**
     * @file 实验一下。。。
     * @author leon(ludafa@outlook.com)
     */

    function addPrefix(prefix) {

        return function () {

            return _classname.createClasses.apply(undefined, arguments).map(function (className) {
                return prefix + '-' + className;
            }).join(' ');
        };
    }

    /**
     * const builder = require('classnames').create('textbox');
     *
     * builder()
     *   .part('hehe')
     *   .addStates({invalid: true})
     *   .addVariants(1, 2, 3)
     *   .add('some other classname')
     *   .build()
     *
     * builder({states: {invalid: true}, variants: [12321, 12321], size: 'xx'}).build()
     *
     */

    function resolveVariants(props) {
        var _props$variants = props.variants;
        var variants = _props$variants === undefined ? [] : _props$variants;
        var size = props.size;

        return _config.COMPONENT_SIZES.indexOf(size) > -1 ? variants.concat('size-' + size) : variants;
    }

    function resolveStates(props) {
        var states = props.states;
        var hidden = props.hidden;
        var disabled = props.disabled;
        var validity = props.validity;


        var isValid = validity ? validity.isValid() : null;

        return babelHelpers['extends']({}, states, {
            hidden: hidden,
            disabled: disabled,
            invalid: isValid === false,
            valid: isValid === true
        });
    }

    function create(type) {

        var displayName = (0, _pascalize2['default'])(type);
        var hyphenatedClassName = (0, _hyphenate2['default'])(displayName);
        var getVariantClassName = addPrefix(_config.COMPONENT_VARIANT_PREFIX);
        var getStateClassName = addPrefix(_config.COMPONENT_STATE_PREFIX);

        function getPartClassName(part) {
            var prefix = _config.COMPONENT_CLASS_PREFIX + '-' + hyphenatedClassName;
            return part ? prefix + '-' + part : prefix;
        }

        function createBuilder(props) {

            var part = '';
            var states = resolveStates(props);
            var variants = resolveVariants(props);

            var builder = {
                addStates: addStates,
                removeStates: removeStates,
                clearStates: clearStates,
                addVariants: addVariants,
                removeVariants: removeVariants,
                clearVariants: clearVariants,
                build: build,
                part: setPart
            };

            function setPart(p) {
                part = p;
                return builder;
            }

            function addStates(newStates) {
                states = babelHelpers['extends']({}, states, newStates);
                return builder;
            }

            function removeStates(name) {
                states[name] = true;
                return builder;
            }

            function clearStates() {
                states = {};
                return builder;
            }

            function addVariants() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                variants = [].concat(variants, args);
                return builder;
            }

            function removeVariants(variant) {
                variants = variants.filter(function (term) {
                    return term !== variant;
                });
                return builder;
            }

            function clearVariants() {
                variants = [];
                return builder;
            }

            function build() {
                return (0, _classname.createClassName)(props.className, getPartClassName(part), getVariantClassName(variants), getStateClassName(states));
            }

            return builder;
        }

        function builder() {
            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return createBuilder(props);
        }

        builder.getPartClassName = getPartClassName;

        builder.getDisplayName = function getDisplayName() {
            return displayName;
        };

        return builder;
    }
});