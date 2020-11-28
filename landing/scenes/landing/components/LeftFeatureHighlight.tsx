import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

interface HighlightProps {
    image: string,
    title: string
    description: string
    link?: string
    linkText?: string
}

const LeftFeatureHighlight: React.FC<HighlightProps> = (props) => (
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

const containerStyle = css`
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    >div {
        flex: 1;
        padding: 64px;
        text-align: center;
        >img {
            height: 400px;
            width: auto;
        }
        h2 {
            margin: 24px 0;
        }
    }
`

export default LeftFeatureHighlight;