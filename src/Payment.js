import React, { Component } from "react";
import { constants } from "./constants";
import  XMLParser from 'react-xml-parser';

import "./App.css";

class Payment extends Component {
  state = {
    capturePaymentData: {},
    queryOnTransactionData: {}
  };

  componentDidMount() {
    // Parse the URL for the transactionId
    let params = new URL(document.location).searchParams;
    let transactionId = params.get("transactionId");
    this.processAuthCall(transactionId);
  }

  processAuthCall = transactionId => {
    const requestUrl = `https://test.epayment.nets.eu/Netaxept/Process.aspx?merchantId=${constants.MERCHANTID}&token=${constants.TOKEN}&transactionId=${transactionId}&operation=AUTH`;
    fetch(requestUrl).then(results => {
      results.text().then(str => {
        let responseDoc = new DOMParser().parseFromString(str, "application/xml");
        const transactionId = responseDoc.getElementsByTagName("TransactionId")[0].textContent;
        this.processCaptureCall(transactionId);
      });
    });
  };

  processCaptureCall = transactionId => {
    const requestUrl = `https://test.epayment.nets.eu/Netaxept/Process.aspx?merchantId=${constants.MERCHANTID}&token=${constants.TOKEN}&transactionId=${transactionId}&transactionAmount=${constants.AMOUNT}&operation=CAPTURE`;
    fetch(requestUrl).then(result => {
      result.text().then(str => {
        let processResponseDoc = new DOMParser().parseFromString(str, "application/xml");
        this.setState({ capturePaymentData: processResponseDoc });
        return this.processQueryOnTransaction(transactionId);
      })
    })
  }

  processQueryOnTransaction = transactionId => {
    const requestUrl = `https://test.epayment.nets.eu/Netaxept/Query.aspx?merchantId=${constants.MERCHANTID}&token=${constants.TOKEN}&transactionId=${transactionId}`;
    fetch(requestUrl).then(result => {
      result.text().then(str => {
        let queryResponseDoc = new DOMParser().parseFromString(str, "application/xml");
        this.setState({ queryOnTransactionData: queryResponseDoc })
      })
    })
  }

  render() {
    const { capturePaymentData, queryOnTransactionData } = this.state;

    const parser = new XMLParser().parseFromString(queryOnTransactionData);

    console.log(parser)
    // TODO: SPIT OUT DATA
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Betalningen är genomförd</h1>
        </header>
        <div>
          <h2>Capture Payment Response</h2>
          <p>{JSON.stringify(capturePaymentData)}</p>
        </div>
        <div>
          <h2>Perform Query on Transaction Response</h2>
          <p>{JSON.stringify(queryOnTransactionData)}</p>
        </div>
      </div>
    );
  }
}

export default Payment;
