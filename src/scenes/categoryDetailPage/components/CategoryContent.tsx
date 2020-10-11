import React from 'react';
import { css } from 'emotion';
import ItemsContainer from '../../../state/containers/ItemsContainer';
import MondayStateContainer from '../../../state/containers/MondayStateContainer';
import ItemCard from '../../../components/common/ItemCard';
import PageContainer from '../../../components/common/PageContainer';

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
            <h1>{group.title}</h1>
            <ul>
                {itemsContainer.state.items.map(item => (
                    <li key={item.id}>
                        <ItemCard item={item} group={group} />
                    </li>
                ))}
            </ul>
        </PageContainer>)
    }
}