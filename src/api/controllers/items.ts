import mondaySdk from "monday-sdk-js"
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