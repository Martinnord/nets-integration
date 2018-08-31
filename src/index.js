import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import Home from "./Home";
import Payment from "./Payment";
import "./index.css";

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route path="/" exact component={Home} />
      <Route path="/payment" exact component={Payment} />
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
