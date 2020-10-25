import Column from "./Column";
import Item from "./Item";

export default interface SubItemsBoard{
    name: string
    id: number
    items: Item[]
    columns: Column[]
}