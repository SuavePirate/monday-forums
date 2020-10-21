import mondaySdk from "monday-sdk-js"
import Item from "../../models/Item"
const monday = mondaySdk()

export const graphify = (object: any) => {
    return JSON.stringify(object).replace(/"/g, '\\"')
}
export const getItems = (boardId: string | number, groupId: string) => {
    return monday.api(`query {
        boards(ids:${boardId}) {
            groups(ids: ${groupId}) {
                items {
                    id
                    name
                    created_at
                    updates {
                      id
                      body
                    }
                    creator {
                        id
                        name
                        photo_small
                    }
                    column_values {
                      id
                      title
                      value
                      type
                      text
                    }
                }
            }
        }
    }`)
}

export const createSubItem = (parentItemId: number | string, item: Item) => {
    const query = `mutation {
        create_subitem(parent_item_id: ${parentItemId}, item_name: "${item.name}", column_values: "${graphify(item.column_values)}") {
            id
            name
            created_at
            board {
                id
            }
            creator {
                id
                name
                photo_small
            }
            column_values {
              id
              title
              value
              type
              text
            }
        }
    }`
    console.log(query);
    return monday.api(query)
}

export const updateColumnValue = (itemId: number|string, boardId: number|string, columnId: string, value: string) => {
    return monday.api(`mutation {
       change_column_value(item_id: ${itemId}, board_id: ${boardId}, column_id: ${columnId}, value: "${value}") {
             id,
             name,
             column_values {
               value
               title,
               text,
               type
            }
        }
    }`);
}