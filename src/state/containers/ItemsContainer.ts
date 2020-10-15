import { Container } from "unstated";
import Item from "../../models/Item";
import * as mondayApi from '../../api'
import PeopleColumnValue from "../../models/PeopleColumnValue";
interface ItemsContainerState {
    isLoading: boolean
    items: Item[]
    currentItem?: Item
    errors: string[]
}

export default class ItemsContainer extends Container<ItemsContainerState> {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            items: [],
            errors: []
        }
    }

    async loadItems(boardId: number | string, groupId: string) {
        await this.setState({
            ...this.state,
            isLoading: true
        });
        try {
            const response = await mondayApi.getItems(boardId, groupId);
            this.setState({
                ...this.state,
                isLoading: false,
                errors: [],
                items: response.data.boards[0].groups[0].items
            })

            return response;

        } catch {
            this.setState({
                ...this.state,
                isLoading: false,
                errors: ['Unable to load items for this category']
            })
        }
    }

    async addSubItem(parentItemId: number | string, text: string) {
        const item: Item = {
            name: text.substr(0, 15) + "...",
            column_values: [{
                id: "long_text",
                title: "Description",
                value: text,
                type: "long-text",
                text: text
            }]
        };

        const response = await mondayApi.createSubItem(parentItemId, item);

        return response;
    }

    setCurrentItem(item: Item) {
        this.setState({
            ...this.state,
            currentItem: item
        })
    }

    getVoteCounts(item: Item) {
        let upvoteCount = 0;
        let downvoteCount = 0;

        if (item) {
            const upvoters = item.column_values?.find(v => v.title === 'Upvoters')?.value;
            if (upvoters) {
                const upvotersValue = JSON.parse(upvoters);
                upvoteCount += ((upvotersValue as PeopleColumnValue)?.personsAndTeams?.length ?? 0)
            }
            const downvoters = item.column_values?.find(v => v.title === 'Downvoters')?.value;
            if (downvoters) {
                const downvotersValue = JSON.parse(downvoters);
                downvoteCount += ((downvotersValue as PeopleColumnValue)?.personsAndTeams?.length ?? 0)
            }
        }

        return {
            upvoteCount,
            downvoteCount
        }
    }
}