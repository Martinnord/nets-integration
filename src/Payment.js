import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const TOKEN = "past1ll1";
const MERCHANTID = "12000219";

class Payment extends Component {
  state = {
    interval: null,
    redirect: false,
    transactionId: ""
  };

  componentDidMount() {
    let params = new URL(document.location).searchParams;
    let transactionId = params.get("transactionId");
    this.handleSubmit(transactionId);
    // const transactionId = parsedUrl.searchParams('transactionId');
  }

  // STEP 3, AUTH PAYMENT
  handleSubmit = transactionId => {
    const request = `https://test.epayment.nets.eu/Netaxept/Process.aspx?merchantId=${MERCHANTID}&token=${TOKEN}&transactionId=${transactionId}&operation=AUTH `;

    fetch(request).then(results => {
      results.text().then(str => {
        let responseDoc = new DOMParser().parseFromString(
          str,
          "application/xml"
        );
        console.log("RES", responseDoc);
        //   const transactionId = responseDoc.getElementsByTagName('TransactionId')[0].textContent;
        //   console.log('transactionId=', transactionId);
        //   this.setState({ transactionId, redirect: true });
        //   return transactionId;
      });
    });
  };

  render() {
    const { redirect, transactionId, interval } = this.state;

    // if (redirect) {
    //   return window.location.assign(`https://test.epayment.nets.eu/Terminal/default.aspx?merchantId=${MERCHANTID}&transactionId=${transactionId}`);
    // }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Grattis, kortuppgifterna är okej. Skickar dig vidare inom {interval}
          </h1>
        </header>
      </div>
    );
  }
}

export default Payment;
