import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import EmbeddedMondayStateContainer from '../../state/containers/EmbeddedMondayStateContainer';
import ItemsContainer from '../../state/containers/ItemsContainer';
import CreatePostContent from './components/CreatePostContent';

interface CreatePostPageProps {
    groupId?: string
}

const CreatePostPage: React.FC<RouteComponentProps<CreatePostPageProps>> = (props) => (
    <Subscribe to={[ItemsContainer, EmbeddedMondayStateContainer]}>
        {(itemsContainer: ItemsContainer, mondayContainer: EmbeddedMondayStateContainer) => (
            <CreatePostContent itemsContainer={itemsContainer} mondayContainer={mondayContainer} groupId={props.match.params.groupId}/>
        )}
    </Subscribe>
);

export default CreatePostPage;