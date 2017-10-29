/**
 * @file Tree单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import then from '../then';
import Tree, {TreeNode} from '../../src/Tree';

const datasource = [{
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
}];

describe('Tree', () => {

    it('dom', () => {

        const wrapper = shallow(
            <Tree>
                {Tree.createTreeNodes(datasource)}
            </Tree>
        );

        let nodes = wrapper.find(TreeNode);
        expect(nodes.length).toBe(14);
        expect(nodes.at(0).prop('level')).toBe(1);

        nodes = nodes.at(0).children();
        expect(nodes.length).toBe(3);
        expect(nodes.at(0).prop('level')).toBe(2);

        nodes = nodes.at(0).children();
        expect(nodes.length).toBe(4);
        expect(nodes.at(0).prop('level')).toBe(3);

    });

    it('expand / collapse', done => {

        let wrapper = mount(
            <Tree>
                {Tree.createTreeNodes(datasource)}
            </Tree>
        );

        let node = wrapper.findWhere(wrapper => (
            wrapper.is(TreeNode) && wrapper.prop('label') === '贴吧事业部'
        ));

        expect(node.instance().state.expand).toBe(false);

        node.find('li >span').at(0).simulate('click');

        then(() => {
            expect(node.instance().state.expand).toBe(true);
            wrapper.unmount();
            done();
        });


    });


    it('defaultExpandAll', () => {
        const component = shallow(
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

        let nodes = component.find(TreeNode);
        expect(nodes.length).toBe(6);
        expect(nodes.everyWhere(node => node.prop('expand'))).toBe(true);

    });

    it('Controlled', done => {

        const component = shallow(
            <Tree defaultExpandAll={false}>
                <TreeNode label="爷爷" />
                <TreeNode label="二爷爷" />
                <TreeNode label="三爷爷" />
            </Tree>
        );

        const nodes = component.find(TreeNode);
        expect(nodes.at(0).prop('expand')).toBe(false);

        component.setProps({defaultExpandAll: true})

        then(() => {
            const nodes = component.find(TreeNode);
            expect(nodes.at(0).prop('expand')).toBe(true);
            done();
        });

    });

});
