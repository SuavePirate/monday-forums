import mondaySdk from "monday-sdk-js"
const monday = mondaySdk()


export const getMe = () => {
    return monday.api(`query {
        me {
            id,
            name
            photo_small
        }
    }`)
}