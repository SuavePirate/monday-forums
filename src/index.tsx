import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Provider } from 'unstated';

const App = () => (
    <Provider>
        <Router>
            <>
            </>
        </Router>
    </Provider>
);

const HotApp = hot(module)(App);


render(<HotApp />, document.querySelector("#root"));

