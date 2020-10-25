import React from 'react';
import { css } from 'emotion';
import ItemsContainer from '../../../state/containers/ItemsContainer';
import MondayStateContainer from '../../../state/containers/MondayStateContainer';
import ItemCard from '../../../components/common/ItemCard';
import PageContainer from '../../../components/common/PageContainer';
import CardView from '../../../components/common/CardView';
import moment from 'moment';
import { color_ulgrey } from '../../../constants/colors';
import CommentCard from '../../../components/common/CommentCard';
import EditComment from '../../../components/common/EditComment';
import Item from '../../../models/Item';
import { Link } from 'react-router-dom';
const likeIcon = require("../../../content/icons/Like.svg");

interface PostProps {
    groupId: string
    itemId: string | number
    itemsContainer: ItemsContainer
    mondayContainer: MondayStateContainer
}
interface PostState {
    isWriting: boolean
}

export default class PostContent extends React.Component<PostProps, PostState> {
    constructor(props) {
        super(props);
        this.state = {
            isWriting: false
        }
    }
    async componentDidMount() {
        await this.props.itemsContainer.loadItems(this.props.mondayContainer.state.board.id, this.props.groupId);
        const currentItem = this.props.itemsContainer.state.items?.find(i => i.id == this.props.itemId);
        if (currentItem) {
            this.props.itemsContainer.setCurrentItem(currentItem);
        }
    }
    toggleWritePost() {
        this.setState({
            ...this.state,
            isWriting: !this.state.isWriting
        })
    }
    handleNewComment(text: string) {
        this.props.itemsContainer.addSubItem(this.props.itemId, text);
        this.setState({
            ...this.state,
            isWriting: false
        });
    }
    handleUpvote() {
        this.props.itemsContainer.upvoteItem(
            this.props.mondayContainer.state.board.id,
            this.props.itemsContainer.state.currentItem,
            this.props.mondayContainer.state.me);
    }
    handleDownvote() {
        this.props.itemsContainer.downvoteItem(
            this.props.mondayContainer.state.board.id,
            this.props.itemsContainer.state.currentItem,
            this.props.mondayContainer.state.me);
    }
    handleCommentUpvote(item: Item) {
        console.log(item)
        this.props.itemsContainer.upvoteItem(
            this.props.mondayContainer.state.subItemsBoard.id,
            item,
            this.props.mondayContainer.state.me);
    }
    handleCommentDownvote(item: Item) {
        this.props.itemsContainer.downvoteItem(
            this.props.mondayContainer.state.subItemsBoard.id,
            item,
            this.props.mondayContainer.state.me);
    }
    async handleMarkAnswer(item: Item, answerTypeId: string) {
        console.log(item)
        await this.props.itemsContainer.setAnswerType(
            this.props.mondayContainer.state.subItemsBoard.id,
            item,
            answerTypeId);
    }
    render() {
        const { itemsContainer, groupId, mondayContainer } = this.props;
        const { currentItem, isLoading } = itemsContainer.state;
        const group = mondayContainer.state.board.groups.find(g => g.id == groupId);
        const subItemsValue = currentItem?.column_values?.find(v => v.type === "subtasks")?.value;
        const votes = itemsContainer.getVoteCounts(currentItem);
        const isCreator = currentItem?.creator?.id == mondayContainer.state.me?.id
        const groupChip = css`
            background: ${group?.color};
            color: white;
            height: 24px;
            text-align: center;
            border-radius: 12px;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 8px;
        `

        let subItems = null
        if (subItemsValue) {
            const subIds = JSON.parse(subItemsValue);
            subItems = this.props.mondayContainer.getSubItems(subIds?.linkedPulseIds?.map(o => o.linkedPulseId));
        }
        if (isLoading || !group || !currentItem) return <div>Loading...</div>
        return (<PageContainer>
            <CardView>
                <h1>{currentItem?.name ?? "Unknown"}</h1>
                <div className={creatorContainer}>
                    <img src={currentItem.creator?.photo_small} alt={currentItem.creator?.name} />
                    <p className="creator-name">{currentItem.creator.name}</p>
                </div>
                <p className={createdDate}>
                    {moment(currentItem.created_at).format("MMMM DD, YYYY")}
                </p>
                <div className={groupChip}>
                    <p>{group?.title}</p>
                </div>
                <div className={voteContainer}>
                    <p>{votes?.upvoteCount ?? 0}</p>
                    <button type="button" onClick={this.handleUpvote.bind(this)}><img src={likeIcon} /></button>
                    <button type="button" onClick={this.handleDownvote.bind(this)}><img src={likeIcon} className="flip" /></button>
                    <p>{votes?.downvoteCount ?? 0}</p>
                </div>
                <div className={descriptionContainer}>
                    {currentItem.column_values.find(c => c.title == "Description")?.text}
                </div>
                {isCreator && <Link to={`/category/${group.id}/posts/${currentItem.id}/edit`} className={editButton}>Edit</Link>}
            </CardView>

            <ul>
                {subItems?.map(i => (
                    <li key={i.id}>
                        <CommentCard item={currentItem}
                            commentItem={i}
                            canEdit={i.creator.id == mondayContainer.state.me?.id}
                            canMarkAnswer={isCreator}
                            answerSettings={JSON.parse(mondayContainer.state.subItemsBoard?.columns?.find(c => c.title == "Answer Type")?.settings_str) ?? {}}
                            voteCounts={itemsContainer.getVoteCounts(i)}
                            onUpvote={this.handleCommentUpvote.bind(this)}
                            onDownvote={this.handleCommentDownvote.bind(this)}
                            onMarkAnswer={this.handleMarkAnswer.bind(this)} />
                    </li>
                ))}
            </ul>
            {this.state.isWriting
                ? <CardView>
                    <EditComment onConfirm={this.handleNewComment.bind(this)} placeholder="Provide your answer or response! Markdown supported." />
                </CardView>
                : <button className={addNewCommentButton} onClick={this.toggleWritePost.bind(this)}>
                    Add new comment
                </button>}
        </PageContainer>)
    }
}

const editButton = css`
background: #0085FF;
color: white;
border: none;
border-radius: 4px;
padding: 8px;
cursor: pointer;
`

const addNewCommentButton = css`
    align-self: center;
`

const voteContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
        background: transparent;
        > img {
            margin: 0 16px;
            flex: 0;
            &.flip {
                transform: rotate(180deg);
            }
        }
    }
   
    > p {
        flex: 1;
        &:first-child {
            text-align: right;
        }
        &:last-child {
            text-align: left;
        }
    }
`

const createdDate = css`
    font-size: 14px;
    margin: 8px;
`

const creatorContainer = css`
    display: flex;
    align-items: center;
    margin: 16px 0;
    padding: 8px 16px;
    background: ${color_ulgrey};
    border-radius: 32px;

    >img {
        border-radius: 50%;
        height: 32px;
        width: 32px;
        margin-right: 16px
    }
`

const descriptionContainer = css`
    margin: 32px;
    line-height: 24px;
    font-size: 16px;
`