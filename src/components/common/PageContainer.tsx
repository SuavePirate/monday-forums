import React from 'react';
import { css } from 'emotion';
import Scrollbars from 'react-custom-scrollbars';

const PageContainer = (props) => (
    <Scrollbars autoHide>
        <div className={containerStyle}>
            {props.children}
        </div>
    </Scrollbars>
)

const containerStyle = css`
    padding: 32px;
`;

export default PageContainer;