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
                    creator {
                        id
                        name
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