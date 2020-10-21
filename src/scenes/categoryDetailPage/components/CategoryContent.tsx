import React from 'react';
import { css } from 'emotion';
import ItemsContainer from '../../../state/containers/ItemsContainer';
import MondayStateContainer from '../../../state/containers/MondayStateContainer';
import ItemCard from '../../../components/common/ItemCard';
import PageContainer from '../../../components/common/PageContainer';
import { Link } from 'react-router-dom';

interface CategoryProps {
    groupId: string
    itemsContainer: ItemsContainer
    mondayContainer: MondayStateContainer
}

export default class CategoryContent extends React.Component<CategoryProps> {
    componentDidMount() {
        this.props.itemsContainer.loadItems(this.props.mondayContainer.state.board.id, this.props.groupId);
    }
    render() {
        const { itemsContainer, groupId } = this.props;
        const group = this.props.mondayContainer.state.board.groups.find(g => g.id == groupId);

        if (itemsContainer.state.isLoading || !group) return <div>Loading...</div>
        return (<PageContainer>
            <div className={headerContainer}>
                <h1>{group.title}</h1>
                <Link className={postButton} to={`/category/${groupId}/post`}>New Post</Link>
            </div>
            <ul>
                {itemsContainer.state.items.map(item => (
                    <li key={item.id}>
                        <ItemCard item={item} group={group} voteCounts={itemsContainer.getVoteCounts(item)} />
                    </li>
                ))}
            </ul>
        </PageContainer>)
    }
}

const headerContainer = css`
    display: flex;
    align-items: center;
    flex: 1;
`
const postButton = css`
    background: #0085FF;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    margin-right: 0;
    margin-left: auto;
`