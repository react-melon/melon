/**
 * @file FloatingActionButton
 */

import React from 'react';
import FloatingButton from 'melon-fab';
import Button from 'melon/Button';
import Icon from 'melon/Icon';

module.exports = function View() {

    return (
        <div style={{position: 'relative'}}>
            <FloatingButton size="xxs" position="bl" offset={{x: '0rem', y: '-2rem'}}>
                <Button title="add" variants={['info']}>
                    <Icon icon="add" />
                </Button>
                <Button title="alarm-on" variants={['info']}>
                    <Icon icon="alarm-on" />
                </Button>
                <Button title="account-balance" variants={['info']}>
                    <Icon icon="account-balance" />
                </Button>
            </FloatingButton>
            <FloatingButton size="xs" position="br"  offset={{x: '0rem', y: '-2rem'}}>
                <Button title="add" variants={['info']}>
                    <Icon icon="add" />
                </Button>
                <Button title="alarm-on" variants={['info']}>
                    <Icon icon="alarm-on" />
                </Button>
                <Button title="account-balance" variants={['info']}>
                    <Icon icon="account-balance" />
                </Button>
            </FloatingButton>
        </div>
    );

};
