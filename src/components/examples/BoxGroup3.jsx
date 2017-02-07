/**
 * @file Example / BoxGroup1
 */


import React from 'react';
import BoxGroup from 'melon/BoxGroup';
import Title from 'melon/Title';

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-6">
                <BoxGroup name="boxgroup3" boxModel="checkbox" value={['C']} disabled>
                    <option value="A" label="青年A" />
                    <option value="B" label="青年B" />
                    <option name="checkbox1" value="C" label="青年C" />
                </BoxGroup>
            </div>
            <div className="melon-column melon-column-6">
                <BoxGroup name="boxgroup3" boxModel="radio" value={['C']} disabled>
                    <option value="A" label="青年A" />
                    <option value="B" label="青年B" />
                    <option name="checkbox1" value="C" label="青年C" />
                </BoxGroup>
            </div>
        </div>
    );
}

module.exports = View;
