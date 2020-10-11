import { Container } from "unstated";
import Item from "../../models/Item";

interface ItemsContainerState {
    isLoading: boolean
    items: Item[]
}

export default class ItemsContainer extends Container<ItemsContainerState> {
    constructor() {
        super();
        this.state ={ 
            isLoading: false,
            items: []
        }
    }
}