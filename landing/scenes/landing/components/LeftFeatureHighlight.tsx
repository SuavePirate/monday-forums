import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { shadow_small } from '../../../constants/shadows';

interface HighlightProps {
    image: string,
    title: string
    description: string
    backgroundImage?: string
    link?: string
    linkText?: string
}

const LeftFeatureHighlight: React.FC<HighlightProps> = (props) => {
    const containerStyle = css`
        display: flex;
        width: 100%;
        flex: 1;
        align-items: center;
        background: ${props.backgroundImage ? `url(${props.backgroundImage})` : 'transparent'};
        background-position: left;
        background-repeat: no-repeat;
        background-size: contain;
        flex-wrap: wrap;
        >div {
            flex: 1;
            padding: 64px;
            text-align: center;
            >img {
                height: 400px;
                width: auto;
                background: white;
                border-radius: 8px;
                box-shadow: ${shadow_small};
            }
            h2 {
                margin: 24px 0;
            }
        }
    `
    return (
        <div className={containerStyle}>
            <div>
                <img src={props.image} />
            </div>
            <div>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                {props.link && <a href={props.link} target="_blank">{props.linkText}</a>}
            </div>
        </div>
    );
}

export default LeftFeatureHighlight;