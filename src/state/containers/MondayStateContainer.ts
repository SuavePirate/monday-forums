import { Container } from "unstated";
import { } from 'monday-sdk-js';
import Board from "../../models/Board";
import MondayContext from "../../models/MondayContex";
interface MondayState {
    context: MondayContext,
    board: Board,

}
abstract class MondayStateContainer extends Container<MondayState> {
    constructor() {
        super();
        this.state = {
            context: {},
            board: null
        }
    }

    abstract initializeBoard: () => void
}


export default MondayStateContainer