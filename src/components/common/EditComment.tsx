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
                <input placeholder={this.props.placeholder} value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
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
    flex: 1;
    width: 100%;
    input {
        flex: 1;
        margin-right: 8px;
    }
`

export default EditComment;