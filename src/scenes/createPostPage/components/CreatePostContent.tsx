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
const likeIcon = require("../../../content/icons/Like.svg");

interface PostProps {
    groupId?: string
    itemsContainer: ItemsContainer
    mondayContainer: MondayStateContainer
    history: any
}
interface PostState {
    groupId: string,
    title: string
    description: string
}

export default class CreatePostContent extends React.Component<PostProps, PostState> {
    constructor(props) {
        super(props);
        this.state = {
            groupId: props.groupId,
            title: '',
            description: ''
        }
    }
    handleDescriptionChange(e) {
        this.setState({
            ...this.state,
            description: e.target.value
        })
    }
    handleTitleChange(e) {
        this.setState({
            ...this.state,
            title: e.target.value
        })
    }
    async handleSubmit(e) {
        e.preventDefault();

        const response = await this.props.itemsContainer.addItem(this.props.mondayContainer.state.board?.id, this.state.groupId, this.state.title, this.state.description);
        if(response?.data?.create_item?.id) {
            this.props.history.push(`/category/${this.state.groupId}/posts/${response.data.create_item.id}`)
        }
    }
    render() {
        const { groupId } = this.state;
        const groups = this.props.mondayContainer.state.board.groups
        const group = groups.find(g => g.id == groupId);
        const me = this.props.mondayContainer.state.me;

        const groupChip = css`
            background: ${group.color};
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

        return (<PageContainer>
            <h1>Create a New Post</h1>
            <CardView>
                <form className={containerStyle} onSubmit={this.handleSubmit.bind(this)}>
                    <label>Title of post:</label>
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="Give your post a title"/>
                    <div className={creatorContainer}>
                        <img src={me?.photo_small} alt={me?.name} />
                        <p className="creator-name">{me.name}</p>
                    </div>
                    <p className={createdDate}>
                        {moment().format("MMMM DD, YYYY")}
                    </p>
                    <div className={groupChip}>
                        <p>{group?.title}</p>
                    </div>
                    <div className={descriptionContainer}>
                    <label>Post body:</label>
                        <textarea value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} placeholder="Describe your issue or question. Markdown supported" rows={12}/>
                    </div>
                    <button type="submit">Post</button>
                </form>
            </CardView>
        </PageContainer>)
    }
}

const containerStyle = css`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    >button {
        width: 100%;
        margin: 32px;
    }
    >input {
        width: 100%;
    }
    label {
        display: block;
        width: 100%;
        text-align: left;
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
    flex: 1;
    width: 100%;
    >textarea {
        line-height: 24px;
        font-size: 16px;
        width: 100%;
        margin: 8px 0;
    }
`