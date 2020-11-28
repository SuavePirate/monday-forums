import React from 'react';
import {css} from 'emotion';

const CardContainer = (props) => (
    <div className={containerStyle}>
        {props.children}
    </div>
);

const containerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export default CardContainer;