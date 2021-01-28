import React from "react";
import "./App.scss";
import { HashRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <Route path="/" exact> home </Route>
        </Router>    
    )
}

export default App;
