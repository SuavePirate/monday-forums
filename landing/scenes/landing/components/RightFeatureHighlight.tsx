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

const RightFeatureHighlight: React.FC<HighlightProps> = (props) => (
    <div className={containerStyle}>
        <div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            {props.link && <a href={props.link} target="_blank">{props.linkText}</a>}
        </div>
        <div>
            <img src={props.image} />
        </div>
    </div>
);

const containerStyle = css`
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    >div {
        >img {
            height: 400px;
            width: auto;
        }
        flex: 1;
        padding: 64px;
        text-align: center;
        h2 {
            margin: 24px 0;
        }
    }
`

export default RightFeatureHighlight;