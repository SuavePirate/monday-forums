import Group from "./Group";

export default interface Board {
    id: string | number
    name: string
    description: string
    groups: Group[]
}