import React from 'react';
import { css } from 'emotion';

interface EditCommentProps {
    placeholder: string
    defaultValue?: string
    onConfirm: (text: string) => void
}
interface EditCommentState {
    text: string
}

class EditComment extends React.Component<EditCommentProps, EditCommentState> {
    constructor(props) {
        super(props);
        this.state = {
            text: props.defaultValue ?? ''
        }
    }
    handleTextChange(e) {
        this.setState({
            ...this.state,
            text: e.target.value
        })
    }
    render() {
        return (
            <form className={containerStyle} onSubmit={() => this.props.onConfirm(this.state.text)}>
                <label>Write a comment</label>
                <textarea placeholder={this.props.placeholder} value={this.state.text} onChange={this.handleTextChange.bind(this)} rows={8}/>
                <button type="submit">
                    Post Comment
                </button>
            </form>
        )
    }
};

const containerStyle = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1;
    width: 100%;
    >* {
        width: 100%;
    }
    label {
        text-align: left;
    }
    textarea {
        flex: 1;
        margin: 8px;
    }
`

export default EditComment;