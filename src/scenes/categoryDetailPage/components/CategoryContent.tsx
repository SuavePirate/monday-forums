import React from 'react';
import {css} from 'emotion';
import ItemsContainer from '../../../state/containers/ItemsContainer';
import MondayStateContainer from '../../../state/containers/MondayStateContainer';

interface CategoryProps {
    groupId: string
    itemsContainer: ItemsContainer
    mondayContainer: MondayStateContainer
}

export default class CategoryContent extends React.Component<CategoryProps> {
    render() {
        return (<div>
            Category!
        </div>)
    }
}