import React, {Component} from 'react';
import QuoteAdd from './components/quoteAdd'
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { redirectRoutes } from "./routers.js";

const redirectRouteComponents = redirectRoutes.map(route => (
    <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        render={route.render}
    />
));

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Router>
                    <Route path="/nav" component={Navbar} />
                    <Route path="/home" component={QuoteAdd} />
                </Router>

                {/* <Route path="/about">
                    <Navbar />
                    <QuoteAdd />
                </Route> */}
            </div>
        )
    }
}

export default App;
