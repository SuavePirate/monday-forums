import React from 'react';
import { css } from 'emotion';
import { color_light, color_text_dark, color_text_light } from '../../constants/colors';
import { shadow_small } from '../../constants/shadows';


const CardView = (props) => (
    <div className={`${style} ${props.className ?? ''}`} {...props}>
        { props.children}
    </div >
)

const style = css`
    background: ${color_light};
    color: ${color_text_dark};
    box-shadow: ${shadow_small};
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    padding: 32px;
    margin: 16px 0;
`

export default CardView;