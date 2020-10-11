import React from 'react';
import { css } from 'emotion';
import ItemsContainer from '../../../state/containers/ItemsContainer';
import MondayStateContainer from '../../../state/containers/MondayStateContainer';
import ItemCard from '../../../components/common/ItemCard';
import PageContainer from '../../../components/common/PageContainer';

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
        if(currentItem) {
            this.props.itemsContainer.setCurrentItem(currentItem);
        }
    }
    render() {
        const { itemsContainer, groupId } = this.props;
        const {currentItem, isLoading} = itemsContainer.state;
        const group = this.props.mondayContainer.state.board.groups.find(g => g.id == groupId);
        const subItemsValue = currentItem?.column_values?.find(v => v.type === "subtasks")?.value;
        let subItems = null
        console.log(subItemsValue)
        if(subItemsValue) {
            const subIds = JSON.parse(subItemsValue);
            console.log(subIds)
            subItems = this.props.mondayContainer.getSubItems(subIds?.linkedPulseIds?.map(o => o.linkedPulseId));
            console.log(subItems)
        }
        if (isLoading || !group || !currentItem || subItems == null) return <div>Loading...</div>
        return (<PageContainer>
            <h1>{currentItem?.name ?? "Unknown"}</h1>
            <div className="description-container" dangerouslySetInnerHTML={{__html: currentItem.updates[0]?.body ?? ""}}/>
            <ul>
                {subItems?.map(i => (
                    <li key={i.id}>{i.name}</li>
                ))}
            </ul>
        </PageContainer>)
    }
}