import { Container } from "unstated";
import Item from "../../models/Item";
import * as mondayApi from '../../api'
interface ItemsContainerState {
    isLoading: boolean
    items: Item[]
    errors: string[]
}

export default class ItemsContainer extends Container<ItemsContainerState> {
    constructor() {
        super();
        this.state ={ 
            isLoading: false,
            items: [],
            errors: []
        }
    }

    async loadItems(boardId: number|string, groupId: string) {
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
}