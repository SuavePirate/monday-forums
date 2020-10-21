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
            const allBoardsResponse = await mondayApi.getAllBoards();

            const boardResponse = await mondayApi.getBoardById(this.state.context.boardIds[0]);
            const temporalSubItemsBoard = allBoardsResponse?.data?.boards?.find(b => b.name === `Subitems of ${boardResponse?.data?.boards[0]?.name}`);
            let subItemsBoard = null
            if (temporalSubItemsBoard) {
                const subItemsBoardResponse = await mondayApi.getSubItemsBoard(temporalSubItemsBoard.id);
                subItemsBoard = subItemsBoardResponse?.data?.boards[0];
            }
            const meResponse = await mondayApi.getMe();

            await this.setState({
                ...this.state,
                board: boardResponse.data.boards[0],
                me: meResponse.data.me,
                subItemsBoard: subItemsBoard
            })
        });
    };
}