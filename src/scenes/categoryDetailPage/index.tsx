import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import EmbeddedMondayStateContainer from '../../state/containers/EmbeddedMondayStateContainer';
import ItemsContainer from '../../state/containers/ItemsContainer';
import CategoryContent from './components/CategoryContent';

interface CategoryDetailPageProps {
    groupId: string
}

const CategoryDetailPage: React.SFC<RouteComponentProps<CategoryDetailPageProps>> = (props) => (
    <Subscribe to={[ItemsContainer, EmbeddedMondayStateContainer]}>
        {(itemsContainer: ItemsContainer, mondayContainer: EmbeddedMondayStateContainer) => (
            <CategoryContent itemsContainer={itemsContainer} mondayContainer={mondayContainer} groupId={props.match.params.groupId}/>
        )}
    </Subscribe>
);

export default CategoryDetailPage;