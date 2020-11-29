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
const LandingPage = () => (
    <Scrollbars autoHide>
        <div className={containerStyle}>
            <header>
                <img alt="monday forums" src={logo} />
            </header>
            <section>
                <h1>Turn your monday.com board into a community building forum tool.</h1>
                <p>Includes everything you'd expect in a forum tool, but managed entirely within your monday.com account.</p>
                <LeftFeatureHighlight title="Categorize" description="Turn board groups into categories to organize questions and posts" image={logo} backgroundImage={leftBlob1}/>
                <RightFeatureHighlight title="Voting and scoring" description="Let your community vote on posts and comments to show the value of the posts. Mark comments as full or partial answers or label with other details." image={logo} backgroundImage={rightBlob1} />
                <LeftFeatureHighlight title="User management built-in" description="Use your monday.com organization account to manage your user access by creating guest users and more." image={logo} backgroundImage={leftBlob2}/>
                <RightFeatureHighlight title="Turn community posts into action" description="Turn forum post items into actionable items in your internal boards." image={logo} backgroundImage={rightBlob2}/>
                <LeftFeatureHighlight title="Works with the Monday Manager" description="Use the Monday Manager Alexa Skill and Google Action to quickly add items, hear details, and more!" image={logo} backgroundImage={leftBlob3} />
                <RightFeatureHighlight title="Built entirely on Monday" description="Your data stays entirely between you and monday.com, make use of all of other monday's features, other apps and views, sorting, organizing, and more!" image={logo} backgroundImage={rightBlob3}/>
                <div>
                    <h2>Full Feature Breakdown</h2>
                    <ul className="feature-list">
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