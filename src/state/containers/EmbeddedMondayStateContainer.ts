import Board from "../../models/Board";
import MondayStateContainer from "./MondayStateContainer";
import mondaySdk from "monday-sdk-js";
import * as mondayApi from '../../api';
const monday = mondaySdk();

export default class EmbeddedMondayStateContainer extends MondayStateContainer {
    initializeBoard = () => {
        monday.listen("context", async res => {
            await this.setState({
                ...this.state,
                context: res.data
            });
            var boardResponse = await mondayApi.getBoardById(this.state.context.boardIds[0]);
            await this.setState({
                ...this.state,
                board: boardResponse.data.boards[0]
            })
        });
    };
}