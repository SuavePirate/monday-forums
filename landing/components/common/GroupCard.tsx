import React from 'react';
import { css } from 'emotion';
import Group from '../../models/Group';
import { color_text_light } from '../../constants/colors';
import { Link } from 'react-router-dom';

interface GroupCardProps {
    group: Group
}

const GroupCard: React.FC<GroupCardProps> = (props) => {
    const style = css`
        background: ${props.group.color};
        color: ${color_text_light};
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        height: 232px;
        width: 300px;
        margin: 8px;
        font-size: 30px;
    `
    return (
        <Link to={`/category/${props.group.id}`} className={style}>
            <p>{props.group.title}</p>
        </Link>
    )
}

export default GroupCard;