export default interface AnswerTypeColumn {
    labels: { [k: string]: string}
    labels_colors: { [k: string] : {
        color: string,
        border: string,
        var_name: string
    }}
}