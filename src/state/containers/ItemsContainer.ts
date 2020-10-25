import { Container } from "unstated";
import Item from "../../models/Item";
import * as mondayApi from '../../api'
import PeopleColumnValue from "../../models/PeopleColumnValue";
import User from "../../models/User";
import _ from "lodash";
import { updateColumnValue } from "../../api";
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
            column_values: []
        };

        const response = await mondayApi.createSubItem(parentItemId, item);
        const updateResponse = await mondayApi.updateColumnValue(response.data.create_subitem.id, response.data.create_subitem.board.id, "long_text", `{ \\"value\\" : \\"${text}\\", \\"text\\": \\"${text}\\"}`)
        return response;
    }

    async addItem(boardId: string | number, groupId: string, title: string, description: string) {
        const item: Item = {
            name: title,
            column_values: [{
                id: "long_text",
                value: description,
                text: description
            }]
        };

        const response = await mondayApi.createItem(boardId, groupId, item);
        const updateResponse = await mondayApi.updateColumnValue(response.data.create_item.id, boardId, "long_text", `{ \\"value\\" : \\"${description}\\", \\"text\\": \\"${description}\\"}`)
        return response;
    }

    setCurrentItem(item: Item) {
        this.setState({
            ...this.state,
            currentItem: item
        })
    }

    async upvoteItem(boardId: number | string, item: Item, me: User) {
        const upvotersValue = item.column_values.find(c => c.title === "Upvoters") as any
        const upvoters = JSON.parse(upvotersValue.value)?.personsAndTeams ?? [];
        const downvotersValue = item.column_values.find(c => c.title === "Downvoters") as any
        const downvoters = JSON.parse(downvotersValue.value)?.personsAndTeams ?? [];
        console.log(upvoters)
        if (upvoters.some(p => p.id === me.id)) {
            console.log('ya already upvoted ya dingus');
            return;
        }
        if (downvoters.some(p => p.id === me.id)) {
            _.remove(downvoters, u => (u as any).id == me.id);
        }

        upvoters.push({
            id: me.id,
            kind: "person"
        });

        const json = JSON.stringify(upvoters).replace(/"/g, '\\"');
        const reverseJson = JSON.stringify(downvoters).replace(/"/g, '\\"');

        const response = await mondayApi.updateColumnValue(item.id, boardId, item.column_values?.find(v => v.title === 'Upvoters')?.id, `{\\"personsAndTeams\\": ${json}, \\"changed_at\\":\\"2020-10-08T00:30:24.345Z\\"}`)
        const reverseResponse = await mondayApi.updateColumnValue(item.id, boardId, item.column_values?.find(v => v.title === 'Downvoters')?.id, `{\\"personsAndTeams\\": ${reverseJson}, \\"changed_at\\":\\"2020-10-08T00:30:24.345Z\\"}`)

        return response
    }
    async downvoteItem(boardId: number | string, item: Item, me: User) {
       
        const upvotersValue = item.column_values.find(c => c.title === "Upvoters") as any
        const upvoters = JSON.parse(upvotersValue.value)?.personsAndTeams ?? [];
        const downvotersValue = item.column_values.find(c => c.title === "Downvoters") as any
        const downvoters = JSON.parse(downvotersValue.value)?.personsAndTeams ?? [];
        
        if (downvoters.some(p => p.id === me.id)) {
            console.log('ya already dowmnvoted ya dingus');
            return;
        }
        if (upvoters.some(p => p.id === me.id)) {
            _.remove(upvoters, u => (u as any).id == me.id);
        }
        downvoters.push({
            id: me.id,
            kind: "person"
        });

        const json = JSON.stringify(downvoters).replace(/"/g, '\\"');
        const reverseJson = JSON.stringify(upvoters).replace(/"/g, '\\"');
        const response = await mondayApi.updateColumnValue(item.id, boardId, item.column_values?.find(v => v.title === 'Downvoters')?.id, `{\\"personsAndTeams\\": ${json}, \\"changed_at\\":\\"2020-10-08T00:30:24.345Z\\"}`)
        const reverseResponse = await mondayApi.updateColumnValue(item.id, boardId, item.column_values?.find(v => v.title === 'Upvoters')?.id, `{\\"personsAndTeams\\": ${reverseJson}, \\"changed_at\\":\\"2020-10-08T00:30:24.345Z\\"}`)

        return response
    }

    async setAnswerType(boardId: number | string, item: Item, answerTypeId: string) {
        const response = await mondayApi.updateColumnValue(item.id, boardId, item.column_values?.find(v => v.title === 'Answer Type')?.id, `{\\"index\\": ${answerTypeId}, \\"changed_at\\":\\"2020-10-08T00:30:24.345Z\\"}`)

        return response
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