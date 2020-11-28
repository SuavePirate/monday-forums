import React from 'react';
import { css } from 'emotion';
import MondayStateContainer from '../../../state/containers/MondayStateContainer';
import CardContainer from '../../../components/common/CardContainer';
import GroupCard from '../../../components/common/GroupCard';
import Scrollbars from 'react-custom-scrollbars';
import PageContainer from '../../../components/common/PageContainer';
const logo = require('../../../content/images/mf-logo.png');
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
                <PageContainer>
                    <div className={containerStyle}>
                        <div className="logo-container">
                        <img src={logo} />
                        </div>
                        <h1>{this.props.stateContainer.state.board?.name}</h1>
                        <p>Select a category to explore topics and posts</p>
                        <CardContainer>
                            {board?.groups?.map(g => (
                                <GroupCard key={g.id} group={g} />
                            ))}
                        </CardContainer>
                    </div>
                </PageContainer>
            </Scrollbars>
        )
    }
}

const containerStyle = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        margin: 32px 0;
    }
    .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        >img {
            height: 112px;
            width: auto;
            margin: 16px 0;
        }

    }
`

export default LandingPageContent;