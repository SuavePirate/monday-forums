import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'unstated';

const App = () => (
    <Provider>
        <Router>
            <>
                Hello Chat but inside monday!
            </>
        </Router>
    </Provider>
);

const HotApp = hot(module)(App);


render(<HotApp />, document.querySelector("#root"));

