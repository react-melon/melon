/**
 * @file Tree单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Tree from '../../src/Tree';

const TreeNode = Tree.TreeNode;

const datasource = {
    id: '1',
    text: '百度',
    children: [{
        id: '2',
        text: '联盟研发部',
        children: [
            {id: '21', text: 'RD'},
            {id: '22', text: 'FE'},
            {id: '23', text: 'QA'},
            {id: '24', text: 'PM'}
        ]
    }, {
        id: '3',
        text: '贴吧事业部',
        children: [
            {
                id: '31',
                text: 'RD',
                children: [
                    {id: '311', text: 'UI'},
                    {id: '312', text: 'BS'}
                ]
            },
            {id: '32', text: 'FE'},
            {id: '33', text: 'QA'},
            {id: '34', text: 'PM'}
        ]
    }, {
        id: '4',
        text: '百度音乐'
    }]
};

describe('Tree', () => {

    it('work', done => {

        const component = TestUtils.renderIntoDocument(
            <Tree>
                {Tree.createTreeNodes(datasource)}
            </Tree>
        );

        expect(TestUtils.isCompositeComponent(component)).toBe(true);

        const nodes = TestUtils.scryRenderedComponentsWithType(component, TreeNode);
        expect(nodes.length).toBe(14);
        expect(nodes[0].state.expand).toBe(false);
        expect(nodes[0].props.children.length).toBe(3);

        const label = TestUtils.scryRenderedDOMComponentsWithTag(nodes[0], 'span');
        TestUtils.Simulate.click(label[0]);
        TestUtils.Simulate.click(ReactDOM.findDOMNode(nodes[0]));

        then(() => {

            expect(ReactDOM.findDOMNode(nodes[0]).className).toMatch('state-selected');

            expect(nodes[0].state.expand).toBe(true);
            expect(label[0].className).toMatch('state-expand');

            done();

        });

    });

    it('defaultExpandAll', () => {

        const component = TestUtils.renderIntoDocument(
            <Tree defaultExpandAll>
                <TreeNode label="爷爷">
                    <TreeNode label="叔叔" />
                    <TreeNode label="姑姑" />
                </TreeNode>
                <TreeNode label="二爷爷">
                </TreeNode>
                <TreeNode label="三爷爷">
                    <TreeNode label="三叔叔" />
                </TreeNode>
            </Tree>
        );

        const nodes = TestUtils.scryRenderedComponentsWithType(component, TreeNode);
        expect(nodes.length).toBe(6);
        expect(nodes[0].state.expand).toBe(true);
    });

    it('Controlled', done => {

        const TestComponent = React.createClass({

            getInitialState() {
                return {
                    expand: false
                };
            },

            render() {

                return (
                    <Tree defaultExpandAll={this.state.expand}>
                        <TreeNode label="爷爷">
                        </TreeNode>
                        <TreeNode label="二爷爷">
                        </TreeNode>
                        <TreeNode label="三爷爷">
                        </TreeNode>
                    </Tree>
                );
            }
        });

        const component = TestUtils.renderIntoDocument(<TestComponent />);
        const nodes = TestUtils.scryRenderedComponentsWithType(component, TreeNode);
        expect(nodes[0].state.expand).toBe(false);

        component.setState({expand: true});

        then(() => {
            expect(nodes[0].state.expand).toBe(true);
            component.setState({expand: true});
        })
        .then(() => {
            done();
        });

    });

});
