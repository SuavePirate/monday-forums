import React from 'react';
import { css } from 'emotion';
import { Subscribe } from 'unstated';
import EmbeddedMondayStateContainer from '../../state/containers/EmbeddedMondayStateContainer';
import LandingPageContent from './components/LandingPageContent';

interface LandingPageProps {
    boardId: string
}
const LandingPage: React.SFC<LandingPageProps> = (props) => (
    <Subscribe to={[EmbeddedMondayStateContainer]}>
        {(mondayContainer: EmbeddedMondayStateContainer) => (
           <LandingPageContent stateContainer={mondayContainer}/>
        )}
    </Subscribe>

);

export default LandingPage;