import React from 'react';
import { css } from 'emotion';
import Item from '../../models/Item';
import Group from '../../models/Group';
import { shadow_medium, shadow_small } from '../../constants/shadows';
import { Link } from 'react-router-dom';
import { color_light, color_text_asphalt, color_text_dark, color_ulgrey } from '../../constants/colors';
const likeIcon = require("../../content/icons/Like.svg");
const expandIcon = require('../../content/icons/Move to.svg');

interface CommentProps {
    item: Item
    voteCounts: { upvoteCount: number, downvoteCount: number }
    commentItem: Item
    onUpvote: (item: Item) => void
    onDownvote: (item: Item) => void
}
interface CommentState {
    isExpanded: boolean
}

class CommentCard extends React.Component<CommentProps, CommentState> {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        }
    }
    toggleExpand() {
        this.setState({
            ...this.state,
            isExpanded: !this.state.isExpanded
        })
    }

    render() {
        const { voteCounts, commentItem } = this.props;
        return (<div className={containerStyle}>
            <div className="content-container">
                <div className="label-container">
                    <p className="item-label">{commentItem.name}</p>
                    <div>
                        <div className={smallCreatorContainer}>
                            <img src={commentItem.creator?.photo_small} alt={commentItem.creator?.name} />
                            <p className="creator-name">{commentItem.creator.name}</p>
                        </div>
                    </div>
                </div>
                <div className="vote-container">
                    <div className="vote-item">
                        <p className="vote-count">{voteCounts.upvoteCount}</p>
                        <button type="button" onClick={() => this.props.onUpvote(this.props.commentItem)}>
                            <img src={likeIcon} />
                        </button>
                    </div>
                    <div className="vote-item">
                        <p className="vote-count">{voteCounts.downvoteCount}</p>
                        <button type="button" onClick={() => this.props.onDownvote(this.props.commentItem)}>
                            <img className="flipped" src={likeIcon} />
                        </button>
                    </div>
                </div>
            </div>
            {this.state.isExpanded &&
                <p className={'expanded-container'}>
                    {commentItem?.column_values?.find(c => c.title == "Description")?.text}
                </p>
            }
            <button className="expand-toggle" onClick={this.toggleExpand.bind(this)}>
                <img src={expandIcon} className={this.state.isExpanded ? 'expanded' : 'collapsed'} />
            </button>
        </div>)
    }
}

const smallCreatorContainer = css`
    display: flex;
    align-items: center;
    padding: 4px 8px;
    background: ${color_ulgrey};
    border-radius: 24px;
    flex: 0;
    

    >img {
        border-radius: 50%;
        height: 24px;
        width: 24px;
        margin-right: 8px
    }
`

const containerStyle = css`
box-shadow: ${shadow_small};
margin: 16px 0;
border-radius: 8px;
overflow: hidden;
background: ${color_light};
color: ${color_text_dark};
padding: 16px;
display: flex;
flex-direction: column;
align-items: center;


.content-container {
    display: flex;
    align-items: center;
    flex: 1;
    width: 100%;
}

.label-container {
    margin: 0 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
        button {
            background: transparent;
        }
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
.expanded-container {
    margin: 16px;
    line-height: 24px;
}
.expand-toggle {
    justify-self: center;
    border: none;
    background: none;
    cursor: pointer;
    .expanded {
        transform: rotate(270deg);
    }
    .collapsed {
        transform: rotate(90deg);
    }
}
`

export default CommentCard;