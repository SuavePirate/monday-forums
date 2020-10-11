import React from 'react';
import { css } from 'emotion';
import MondayStateContainer from '../../../state/containers/MondayStateContainer';
import CardContainer from '../../../components/common/CardContainer';
import GroupCard from '../../../components/common/GroupCard';
import Scrollbars from 'react-custom-scrollbars';

interface LandingPageContentProps {
    stateContainer: MondayStateContainer
}

class LandingPageContent extends React.Component<LandingPageContentProps> {
    componentDidMount() {
        this.props.stateContainer.initializeBoard();
    }
    render() {
        const { board } = this.props.stateContainer.state;
        return (
            <Scrollbars autoHide>
                <div className={containerStyle}>
                    <h1>{this.props.stateContainer.state.board?.name}</h1>
                    <CardContainer>
                        {board?.groups?.map(g => (
                            <GroupCard key={g.id} group={g} />
                        ))}
                    </CardContainer>
                </div>
            </Scrollbars>
        )
    }
}

const containerStyle = css`
    height: 100%;
`

export default LandingPageContent;