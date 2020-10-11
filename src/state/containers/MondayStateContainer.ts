import { Container } from "unstated";
import { } from 'monday-sdk-js';
import Board from "../../models/Board";
import MondayContext from "../../models/MondayContex";
import SubItemsBoard from "../../models/SubItemsBoard";
interface MondayState {
    context: MondayContext,
    board: Board,
    subItemsBoard: SubItemsBoard
}
abstract class MondayStateContainer extends Container<MondayState> {
    constructor() {
        super();
        this.state = {
            context: {},
            board: null,
            subItemsBoard: null
        }
    }

    abstract initializeBoard: () => void
    getSubItems(itemIds: (string|number)[]) {
        console.log(this.state.subItemsBoard)
        console.log(itemIds)
        return this.state.subItemsBoard?.items?.filter(i => itemIds.indexOf(Number(i.id)) > -1);
    }
}


export default MondayStateContainer