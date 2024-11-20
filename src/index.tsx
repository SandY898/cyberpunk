import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import CurrencyConverter from "./Components/Currency/Curency";
import ExchangeRatesMarquee from "./Components/ExchangeRatesMarque/ExchangeRatesMArque";
import PriceList from "./Components/PriceList/PriceList";
import ExchangeRateChart from "./Components/ExchangeHistory/ExchangeHistory";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ExchangeRatesMarquee />
    <CurrencyConverter />
    <div className="content-container">
      <div className="price-list">
        <PriceList />
      </div>
      <div className="exchange-rate-chart">
        <ExchangeRateChart />
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
