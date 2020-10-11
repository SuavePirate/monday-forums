import ColumnValue from "./ColumnValue";
import User from "./User";

export default interface Item {
    id: string | number
    name: string
    created_at: string
    creator: User
    column_values: ColumnValue[]
}