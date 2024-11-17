import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $exchangeRates } from "../../store/ExchangeStore";
import Marquee from "react-fast-marquee";
import styles from "./ExchangeRatesMarquee.module.scss";

const ExchangeRatesMarquee: React.FC = () => {
  const exchangeRates = useStore($exchangeRates);

  return (
    <Marquee gradient={false} speed={50}>
      {exchangeRates.map((rate) => (
        <span
          className={styles.Marquee}
          key={rate.code}
          style={{ marginRight: "20px", fontSize: "18px" }}
        >
          {rate.code}: {rate.rate.toFixed(2)}
        </span>
      ))}
    </Marquee>
  );
};

export default ExchangeRatesMarquee;