import React, { Component } from "react";
import { constants } from "./constants";
import "./App.css";

class Home extends Component {
  state = {
    transactionId: "",
    redirect: false
  };

  handleSubmit = () => {
    const requestUrl = `https://test.epayment.nets.eu/Netaxept/Register.aspx?merchantId=${constants.MERCHANTID}&token=${constants.TOKEN}&orderNumber=${constants.ORDERNUMBER}&amount=${constants.AMOUNT}&CurrencyCode=${constants.CURRENCYCODE}&servicetype=${constants.SERVICETYPE}&redirectUrl=${constants.REDIRECTURL}`;

    fetch(requestUrl).then(results => {
      results.text().then(str => {
        let responseDoc = new DOMParser().parseFromString(str, "application/xml");

        const transactionId = responseDoc.getElementsByTagName("TransactionId")[0].textContent;
        this.setState({ transactionId, redirect: true });
      });
    });
  };

  render() {
    const { redirect, transactionId } = this.state;

    if (redirect) {
      return window.location.assign(`https://test.epayment.nets.eu/Terminal/default.aspx?merchantId=${constants.MERCHANTID}&transactionId=${transactionId}`);
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">A React application with Nets REST API integration</h1>
        </header>
        <button className="payment-btn" onClick={() => this.handleSubmit()}>Betala</button>
      </div>
    );
  }
}

export default Home;
