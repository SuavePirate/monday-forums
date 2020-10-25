import Axios from "axios"
import mondaySdk from "monday-sdk-js"
const monday = mondaySdk()

export const getBoardById = (boardId: string | number) => {
    return monday.api(`query { boards(ids: ${boardId}) { 
            id
            name
            description
            columns {
                id
                title
                settings_str
            }
            groups {
                id,
                title,
                color
            }
        }
    }`);
}

export const getAllBoards = () => {
    return monday.api(`query {
        boards {
            id
            name
        }
    }`)
}

export const getSubItemsBoard = (boardId: number) => {
    return monday.api(`query { boards(ids: ${boardId}) { 
            id
            name
            description,
            columns {
                id
                title
                settings_str
            }
            items {
                id,
                name,
                creator {
                    name
                    id
                    photo_small
                }
                column_values {
                    id
                    title
                    value
                    type
                    text
                    additional_info
                }
            }
        }
    }`)
}