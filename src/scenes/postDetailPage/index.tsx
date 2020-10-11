import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import EmbeddedMondayStateContainer from '../../state/containers/EmbeddedMondayStateContainer';
import ItemsContainer from '../../state/containers/ItemsContainer';
import PostContent from './components/PostContent';

interface PostDetailPageProps {
    groupId: string
    itemId: string
}

const PostDetailPage: React.FC<RouteComponentProps<PostDetailPageProps>> = (props) => (
    <Subscribe to={[ItemsContainer, EmbeddedMondayStateContainer]}>
        {(itemsContainer: ItemsContainer, mondayContainer: EmbeddedMondayStateContainer) => (
            <PostContent itemsContainer={itemsContainer} mondayContainer={mondayContainer} itemId={props.match.params.itemId} groupId={props.match.params.groupId}/>
        )}
    </Subscribe>
);

export default PostDetailPage;