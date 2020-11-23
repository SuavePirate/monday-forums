import React from 'react';
import { css } from 'emotion';
import Item from '../../models/Item';
import Group from '../../models/Group';
import { shadow_medium, shadow_small } from '../../constants/shadows';
import { Link } from 'react-router-dom';
import { color_light, color_text_asphalt, color_text_dark } from '../../constants/colors';
import PeopleColumnValue from '../../models/PeopleColumnValue';
const likeIcon = require("../../content/icons/Like.svg");

interface ItemProps {
    item: Item
    voteCounts: {upvoteCount: number, downvoteCount: number}
    group: Group
}

const ItemCard: React.FC<ItemProps> = (props) => {
    const containerStyle = css`
        display: flex;
        align-items: center;
        box-shadow: ${shadow_small};
        height: 80px;
        margin: 16px 0;
        border-radius: 8px;
        overflow: hidden;
        background: ${color_light};
        color: ${color_text_dark};

        .label-splash {
            height: 100%;
            width: 4px;
            background: ${props.group.color};
        }
        .label-container {
            margin: 0 16px;
            flex: 1;
            .item-label {
                font-size: 16px;
                margin-bottom: 8px;
            }
            .item-created-by {
                font-size: 14px;
                color: ${color_text_asphalt};
            }
        }
        .vote-container {
            margin-right: 16px;
            margin-left: auto;

            .vote-item{
                display: flex;
                align-items: center;
                img {
                    width: 24px;
                    height: 24px;
                    margin-left: 16px;
                }
                .flipped {
                    transform: rotate(180deg);
                }

                &:last-child {
                    margin-top: 8px;
                }
            }
        }
    `
   
    return (<Link to={`/category/${props.group.id}/posts/${props.item.id}`} className={containerStyle}>
        <div className="label-splash" />
        <div className="label-container">
            <p className="item-label">{props.item.name}</p>
            <p className="item-created-by">by: {props.item.creator.name}</p>
        </div>
        <div className="vote-container">
            <div className="vote-item">
                <p className="vote-count">{props.voteCounts.upvoteCount}</p>
                <img src={likeIcon} />
            </div>
            <div className="vote-item">
                <p className="vote-count">{props.voteCounts.downvoteCount}</p>
                <img className="flipped" src={likeIcon} />
            </div>
        </div>
    </Link>)
}

export default ItemCard;