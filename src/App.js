import "./App.css";
import { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import InstallMenu from "./pages/InstallMenu.jsx";

class App extends Component {
  //function App(){
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={InstallMenu} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
