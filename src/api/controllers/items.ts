import mondaySdk from "monday-sdk-js"
import Item from "../../models/Item"
const monday = mondaySdk()

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
        create_subitem(parent_item_id: ${parentItemId}, item_name: "${item.name}", column_values: ${JSON.stringify(item.column_values)}) {
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
    }`
    console.log(query);
    return monday.api(query)
}