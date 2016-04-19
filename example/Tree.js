/**
 * @file melon demo Tree
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import Tree from '../src/Tree';

const TreeNode = Tree.TreeNode;

class View extends React.Component {

    render() {

        const datasource = {
            id: '1',
            text: '百度',
            children: [
                {
                    id: '2',
                    text: '联盟研发部',
                    children: [
                        {id: '21', text: 'RD'},
                        {id: '22', text: 'FE'},
                        {id: '23', text: 'QA'},
                        {id: '24', text: 'PM'}
                    ]
                },
                {
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
                },
                {
                    id: '4',
                    text: '百度音乐'
                }
            ]
        };

        return (
            <div>
                <Title level={3}>Tree</Title>

                <div className="row">
                    <Title level={4}>普通</Title>
                    <Tree>
                        <TreeNode label="爷爷">
                            <TreeNode label="叔叔" />
                            <TreeNode label="爸爸">
                                <TreeNode label="我" />
                                <TreeNode label="哥哥" />
                                <TreeNode label="姐姐" />
                            </TreeNode>
                            <TreeNode label="姑姑" />
                        </TreeNode>
                        <TreeNode label="二爷爷">
                            <TreeNode label="二叔叔" />
                        </TreeNode>
                        <TreeNode label="三爷爷">
                            <TreeNode label="三叔叔" />
                        </TreeNode>
                    </Tree>
                </div>

                <div className="row">
                    <Title level={4}>使用Datasource</Title>
                    <Tree>
                        {Tree.createTreeNodes(datasource)}
                    </Tree>
                </div>

                <div className="row">
                    <Title level={4}>defaultExpandAll</Title>
                    <Tree defaultExpandAll>
                        {Tree.createTreeNodes(datasource)}
                    </Tree>
                </div>
            </div>
        );
    }
}

module.exports = View;
