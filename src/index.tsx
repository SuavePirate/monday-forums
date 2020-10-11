import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Provider } from 'unstated';
import CategoryDetailPage from "./scenes/categoryDetailPage";
import LandingPage from "./scenes/landingPage";
import PostDetailPage from "./scenes/postDetailPage";

const App = () => (
    <Provider>
        <Router>
            <>
                <Route path="/" exact component={LandingPage}/>
                <Route path="/category/:groupId" exact component={CategoryDetailPage}/>
                <Route path="/category/:groupId/posts/:itemId" exact component={PostDetailPage}/>
            </>
        </Router>
    </Provider>
);

const HotApp = hot(module)(App);


render(<HotApp />, document.querySelector("#root"));

