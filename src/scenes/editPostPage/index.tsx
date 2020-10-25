import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import EmbeddedMondayStateContainer from '../../state/containers/EmbeddedMondayStateContainer';
import ItemsContainer from '../../state/containers/ItemsContainer';
import EditPostContent from './components/EditPostContent';

interface CreatePostPageProps {
    groupId: string
    itemId: string
}

const EditPostPage: React.FC<RouteComponentProps<CreatePostPageProps>> = (props) => (
    <Subscribe to={[ItemsContainer, EmbeddedMondayStateContainer]}>
        {(itemsContainer: ItemsContainer, mondayContainer: EmbeddedMondayStateContainer) => (
            <EditPostContent itemsContainer={itemsContainer} mondayContainer={mondayContainer} itemId={props.match.params.itemId} groupId={props.match.params.groupId} history={props.history}/>
        )}
    </Subscribe>
);

export default EditPostPage;