import React from 'react';
import { css } from 'emotion';
import LeftFeatureHighlight from './components/LeftFeatureHighlight';
import RightFeatureHighlight from './components/RightFeatureHighlight';
import Scrollbars from 'react-custom-scrollbars';
import { color_light, color_text_asphalt, color_ulgrey } from '../../constants/colors';
const logo = require('../../content/images/mf-double-transparent.png');
const rightBlob1 = require('../../content/images/right-blob-1.png');
const rightBlob2 = require('../../content/images/right-blob-2.png');
const rightBlob3 = require('../../content/images/right-blob-3.png');
const leftBlob1 = require('../../content/images/left-blob-1.png');
const leftBlob2 = require('../../content/images/left-blob-2.png');
const leftBlob3 = require('../../content/images/left-blob-3.png');

const categories = require('../../content/images/categories.png');
const users = require('../../content/images/users.png');
const voting = require('../../content/images/voting.png');
const action = require('../../content/images/action.png');
const withMonday = require('../../content/images/forums+monday.png');
const mondayManager = require('../../content/images/monday-manager.png');


const LandingPage = () => (
    <Scrollbars autoHide>
        <div className={containerStyle}>
            <header>
                <img alt="monday forums" src={logo} />
            </header>
            <section>
                <h1>Turn your monday.com board into a community building forum tool.</h1>
                <p>Includes everything you'd expect in a forum tool, but managed entirely within your monday.com account.</p>
                <a className="add-button" href="https://auth.monday.com/oauth2/authorize?client_id=a073090cd61e2a01058fd296d79200ed&response_type=install"> <img alt="Add to monday.com" height="42" src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/Tal/4b5d9548-0598-436e-a5b6-9bc5f29ee1d9_Group12441.png" /> </a>
                <LeftFeatureHighlight title="Categorize" description="Turn board groups into categories to organize questions and posts" image={categories} backgroundImage={leftBlob1}/>
                <RightFeatureHighlight title="Voting and scoring" description="Let your community vote on posts and comments to show the value of the posts. Mark comments as full or partial answers or label with other details." image={voting} backgroundImage={rightBlob1} />
                <LeftFeatureHighlight title="User management built-in" description="Use your monday.com organization account to manage your user access by creating guest users and more." image={users} withImageStyles backgroundImage={leftBlob2}/>
                <RightFeatureHighlight title="Turn community posts into action" description="Turn forum post items into actionable items in your internal boards. Your members use the forum, you use the boards!" image={action} withImageStyles backgroundImage={rightBlob2}/>
                <LeftFeatureHighlight title="Works with the Monday Manager" description="Use the Monday Manager Alexa Skill and Google Action to quickly add items, hear details, and more!" image={mondayManager} backgroundImage={leftBlob3} />
                <RightFeatureHighlight title="Built entirely on Monday" description="Your data stays entirely between you and monday.com, make use of all of other monday's features, other apps and views, sorting, organizing, and more!" image={withMonday} withImageStyles backgroundImage={rightBlob3}/>
                <div className="feature-breakdown">
                    <h2>Full Feature Breakdown</h2>
                    <ul className="feature-list">
                        <li>✅ Complete forum template board</li>
                        <li>✅ Create and edit posts</li>
                        <li>✅ Create and edit comments</li>
                        <li>✅ Upvote and downvote posts and comments</li>
                        <li>✅ Markdown support on posts and comments</li>
                        <li>✅ Mark comments as answers, partial answers, bad answers, and controversial answers</li>
                        <li>✅ Categorize posts using groups</li>
                        <li>✅ Admin tools using built-in monday.com features and board:
                            <ul>
                                <li>- User management</li>
                                <li>- Sorting posts and comments</li>
                                <li>- Creating new categories</li>
                                <li>- Locking threads</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <a className="add-button" href="https://auth.monday.com/oauth2/authorize?client_id=a073090cd61e2a01058fd296d79200ed&response_type=install"> <img alt="Add to monday.com" height="42" src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/Tal/4b5d9548-0598-436e-a5b6-9bc5f29ee1d9_Group12441.png" /> </a>
               
            </section>
            <footer>
                <p>
                    Built with 💖 By Alex Dunn live on Twitch
                </p>
                <ul className="footer-links">
                    <li><a href="https://github.com/suavepirate/monday-forums" target="_blank">Github</a></li>
                    <li><a href="https://twitch.tv/suave_pirate" target="_blank">Twitch</a></li>
                    <li><a href="https://twitter.com/suave_pirate" target="_blank">Twitter</a></li>
                    <li><a href="https://www.linkedin.com/in/suavepirate" target="_blank">LinkedIn</a></li>
                </ul>
            </footer>
        </div>
    </Scrollbars>
);

const containerStyle = css`
    header {
        display: flex;
        justify-content: center;
        >img {
            height: 200px;
            width: auto;
        }
    }
    .add-button {
        margin: 32px;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 16px;
        li {
            margin: 8px 0;
        }
        ul {
            margin-left: 32px;
            margin-top: 0;
        }
    }
    .feature-breakdown {
        margin: 32px;
    }

    footer {
        width: 100%;
        background: ${color_ulgrey};
        padding: 32px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .footer-links {
            display: flex;
            flex-direction: row;
            align-items: center;
            li {
                margin: 16px;
                a {                
                    color: ${color_text_asphalt};
                    text-decoration: underscore;
                }
            }
        }
    }

`;

export default LandingPage;