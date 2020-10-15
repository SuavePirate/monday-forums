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
const likeIcon = require("../../../content/icons/Like.svg");

interface PostProps {
    groupId: string
    itemId: string
    itemsContainer: ItemsContainer
    mondayContainer: MondayStateContainer
}

export default class PostContent extends React.Component<PostProps> {
    async componentDidMount() {
        await this.props.itemsContainer.loadItems(this.props.mondayContainer.state.board.id, this.props.groupId);
        const currentItem = this.props.itemsContainer.state.items?.find(i => i.id == this.props.itemId);
        if (currentItem) {
            this.props.itemsContainer.setCurrentItem(currentItem);
        }
    }
    render() {
        const { itemsContainer, groupId } = this.props;
        const { currentItem, isLoading } = itemsContainer.state;
        const group = this.props.mondayContainer.state.board.groups.find(g => g.id == groupId);
        const subItemsValue = currentItem?.column_values?.find(v => v.type === "subtasks")?.value;
        const votes = itemsContainer.getVoteCounts(currentItem);
        let subItems = null
        console.log(subItemsValue)
        if (subItemsValue) {
            const subIds = JSON.parse(subItemsValue);
            console.log(subIds)
            subItems = this.props.mondayContainer.getSubItems(subIds?.linkedPulseIds?.map(o => o.linkedPulseId));
            console.log(subItems)
        }
        if (isLoading || !group || !currentItem || subItems == null) return <div>Loading...</div>
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
                <div className={voteContainer}>
                    <p>{votes?.upvoteCount ?? 0}</p>
                    <img src={likeIcon} />
                    <img src={likeIcon} className="flip" />
                    <p>{votes?.downvoteCount ?? 0}</p>
                </div>
                <div className={descriptionContainer}>
                    {currentItem.column_values.find(c => c.title == "Description")?.text}
                </div>
            </CardView>

            <ul>
                {subItems?.map(i => (
                    <li key={i.id}>
                       <CommentCard item={currentItem} commentItem={i} voteCounts={itemsContainer.getVoteCounts(i)}/>
                    </li>
                ))}
            </ul>
        </PageContainer>)
    }
}

const voteContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > img {
        margin: 0 16px;
        flex: 0;
        &.flip {
            transform: rotate(180deg);
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
    margin: 16px;
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