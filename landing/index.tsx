import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Provider } from 'unstated';
import LandingPage from "./scenes/landing";
const App = () => (
    <Provider>
        <Router>
            <Route path="/" component={LandingPage}/>
        </Router>
    </Provider>
);

const HotApp = hot(module)(App);


render(<HotApp />, document.querySelector("#root"));

