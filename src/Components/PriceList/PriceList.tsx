import { useUnit } from "effector-react";
import React, { useState } from "react";
import { $currencyStore } from "../../store/CurrencyStore";
import styles from "./PriceList.module.scss";

const PriceList = () => {
  const { currencyFrom, currencyTo, exchangeRate } = useUnit($currencyStore);

  const fixedAmounts = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

  const [hidden, setHidden] = useState(true);

  // Проверяем наличие exchangeRate
  if (!exchangeRate) {
    return <div className={styles.Primary}>Loading exchange rate...</div>;
  }

  return (
    <>
      {hidden ? (
        <button className={styles.HideButton} onClick={() => setHidden(false)}>
          H1D3
        </button>
      ) : (
        <button className={styles.HideButton} onClick={() => setHidden(true)}>
          Sh0VV
        </button>
      )}
      {hidden && (
        <div className={styles.Primary}>
          {fixedAmounts.map((amount) => (
            <div key={amount}>
              {amount} {currencyFrom} = {(amount * exchangeRate).toFixed(2)}{" "}
              {currencyTo}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PriceList;
