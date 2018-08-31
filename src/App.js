import React, { Component } from "react";
import { Redirect } from 'react-router';
import logo from "./logo.svg";
import "./App.css";

const TOKEN = "past1ll1";
const MERCHANTID = "12000219";

class App extends Component {
  state = {
    transactionId: '',
    redirect: false
  };

  handleSubmit = () => {
    const request = `https://test.epayment.nets.eu/Netaxept/Register.aspx?merchantId=${MERCHANTID}&token=${TOKEN}&orderNumber=Testtransaction&amount=100&currencyCode=EUR&servicetype=B&updateStoredPaymentInfo=true&language=en_GB&redirectUrl=http://localhost:3000/payment`;

    fetch(request).then((results) => {
      results
        .text()
        .then(( str ) => {
          let responseDoc = new DOMParser().parseFromString(str, 'application/xml');
          const transactionId = responseDoc.getElementsByTagName('TransactionId')[0].textContent;
          console.log('transactionId=', transactionId);
          this.setState({ transactionId, redirect: true });
          return transactionId;
        })
    });
  }

  render() {
    const { redirect, transactionId } = this.state;

    if (redirect) {
      return window.location.assign(`https://test.epayment.nets.eu/Terminal/default.aspx?merchantId=${MERCHANTID}&transactionId=${transactionId}`);
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={() => this.handleSubmit()}>Betala</button>
      </div>
    );
  }
}

export default App;
