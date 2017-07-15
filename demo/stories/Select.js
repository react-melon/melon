/**
 * @file Melon Story Dialog
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Select, {createOptions} from '../../src/Select';

let storyBook = storiesOf('Select', module);

storyBook.addWithInfo('createOptions', () => (

    <section>
        <p className="normal">
            一般推荐大家使用 option 的方式来给 Select 添加选项。因为这样对选项的控制力更强，比如直接加样式：
        </p>
        <Select style={{width: 300}}>
            <option
                style={{
                    textAlign: 'right',
                    fontWeight: 700
                }}
                value="1">
                Never
            </option>
            <option value="2">Every Night</option>
            <option value="3">Weeknights</option>
            <option value="4">Weekends</option>
            <option value="5">Weekly</option>
        </Select>
        <p className="normal">
            但如果选项比较多时，也可以通过 `createOptions` 函数来批量生成 option
        </p>
        <Select style={{width: 300}}>
            {
                createOptions([
                    {name: 'Never', value: '1'},
                    {name: 'Every Night', value: '2'},
                    {name: 'Weeknights', value: '3'},
                    {name: 'Weekends', value: '4'},
                    {name: 'Weekly', value: '5'}
                ])
            }
        </Select>
    </section>

));

storyBook.addWithInfo('autoWidth', () => (
    <section>
        <p className="normal">你可以通过设置 `autoWidth` 来调整菜单的宽度。</p>
        <p className="normal">如果 `autoWidth' 是 true，那么菜单的宽度将会与菜单的内容保持一致。 </p>
        <Select style={{width: 300}} autoWidth>
            <option value="1">Never</option>
            <option value="2">Every Night</option>
            <option value="3">Weeknights</option>
            <option value="4">Weekends</option>
            <option value="5">Weekly</option>
        </Select>
        <p className="normal">否则，菜单的宽度将会尝试与框体宽度保持一致。 </p>
        <Select style={{width: 300}}>
            <option value='1'>Never</option>
            <option value='2'>Every Night</option>
            <option value='3'>Weeknights</option>
            <option value='4'>Weekends</option>
            <option value='5'>Weekly</option>
        </Select>
        <p className="normal">
            若菜单宽度大于框体的宽度，那么菜单宽度会与菜单内容一致。
        </p>
        <Select>
            <option value='1'>Never</option>
            <option value='2'>Every Night</option>
            <option value='3'>Weeknights</option>
            <option value='4'>Weekends</option>
            <option value='5'>Weekly</option>
            <option value='6'>This a very very very long option</option>
        </Select>
        <p className="normal">
            现在框体的宽度与选中项的内容一样。
        </p>
        <p className="normal">
            若是希望框体固定宽度，那么你可以通过 style / variants / className 等方式来进行限定
        </p>
        <Select style={{width: 100}}>
            <option value='1'>Never</option>
            <option value='2'>Every Night</option>
            <option value='3'>Weeknights</option>
            <option value='4'>Weekends</option>
            <option value='5'>Weekly</option>
            <option value='6'>This a very very very long option</option>
        </Select>
    </section>
));

storyBook.addWithInfo('maxHeight', () => (
    <section>
        <p className="normal">你可以通过设置 `maxHeigth` 来调整菜单的最大高度。</p>
        <p className="normal">
            这对于选项很多的菜单很有帮助
        </p>
        <Select
            style={{width: 300}}
            maxHeight={200}>
            {
                Array.from({length: 30}).map((_, index) => (
                   <option value={'' + index} key={index}>
                       第 {index + 1} 项
                   </option>
               ))
            }
        </Select>
    </section>
));
