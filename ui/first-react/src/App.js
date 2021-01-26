import React, {Component} from 'react';
import QuoteAdd from './components/quoteAdd';
import CommentAdd from './components/commentAdd';
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
                <script src="%PUBLIC_URL%/config.js"></script>
                <Navbar />
                <Router>
                    <Route path="/add" component={QuoteAdd} />
                    <Route path="/comment" component={CommentAdd} />
                </Router>
            </div>
        )
    }
}

export default App;
