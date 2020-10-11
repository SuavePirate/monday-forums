import Axios from "axios"
import mondaySdk from "monday-sdk-js"
const monday = mondaySdk()
export const getBoardById = (boardId: string|number) => {
    return monday.api(`query { boards(ids: ${boardId}) { 
            id
            name
            description,
            groups {
                id,
                title,
                color
            }
        }
    }`);
}