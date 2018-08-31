import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';
import Payment from './Payment';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
      <div>
        <Route path="/" exact component={App}/>
        <Route path="/payment" component={Payment}/>
    </div>
  </Router>, document.getElementById('root'));
registerServiceWorker();

