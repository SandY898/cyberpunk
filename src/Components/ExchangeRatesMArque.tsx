import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { $exchangeRates, updateExchangeRates, fetchExchangeRates } from '../store/ExchangeStore';
import Marquee from 'react-fast-marquee';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import classes from '../styles/ExchangeRatesMarquee.module.scss'

const ExchangeRatesMarquee: React.FC = () => {
  const exchangeRates = useStore($exchangeRates);

  
  useEffect(() => {
    fetchExchangeRates();

    const interval = setInterval(() => {
      fetchExchangeRates();
    }, 30000000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Marquee gradient={false} speed={50}>
      {exchangeRates.map((rate) => (
        <span className={classes['Marquee']} key={rate.code} style={{ marginRight: '20px', fontSize: '18px' }}>
          {rate.code}: {rate.rate.toFixed(2)}
        </span>
      ))}
    </Marquee>
  );
};

export default ExchangeRatesMarquee;
