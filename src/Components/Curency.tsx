import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from '../styles/Currency.module.scss'
import {$currencyStore,
        setAmountFrom,
        setCurrencyFrom,
        setCurrencyTo,
        swapCurrencies,
        fetchExchangeRate
} from '../store/CurrencyStore'
import { useStore } from 'effector-react';

const CurrencyConverter: React.FC = () => {
    const {
        currencies,
        amountFrom,
        amountTo,
        currencyFrom,
        currencyTo,
        exchangeRate,
    } = useStore($currencyStore) // получаем весь букет

    useEffect (()=>{
        fetchExchangeRate({currencyFrom, currencyTo})
    }, [currencyFrom, currencyTo])

    const handleAmountFromChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const newAmount = parseFloat(e.target.value) || 0;
        setAmountFrom(newAmount);
    }



    return(
        <div className={classes['Primary']}>
            <h2 className={classes['Primary__PrimaryText']}>†Who are You?†</h2>
            <div className={classes['Primary__InputContainer']}>
                <input type="number" 
                value={amountFrom}
                onChange={handleAmountFromChange}
                placeholder='Enter summ'
                className={classes['Primary__InputContainer__Input']}
                />
                <select value={currencyFrom} 
                onChange={(e)=>setCurrencyFrom(e.target.value)}
                className={classes['Primary__InputContainer__Select']}
                >
                    {currencies.map((currency)=>(
                        <option className={classes['Primary__InputContainer__Select__Option']} key={currency.code} value={currency.code}>
                            {currency.code}-{currency.name}
                        </option>
                    ))}
                </select>
            </div>

            <button className={classes['Primary__Swap']} onClick={() => swapCurrencies()}>Polarités ↑†↓ Inversées</button>

            <div className={classes['Primary__InputContainer']}>
                <input type="number"
                value={amountTo}
                disabled
                placeholder='allo'
                className={classes['Primary__InputContainer__InputOff']}
                />

                <select value={currencyTo}
                onChange={(e)=>setCurrencyTo(e.target.value)}
                className={classes['Primary__InputContainer__Select']}
                >
                    {currencies.map((currency)=>(
                        <option className={classes['Primary__InputContainer__Select__Option']} key={currency.code} value={currency.code}>
                            {currency.code}-{currency.name}
                        </option>
                    ))}
                </select>
            </div>
            <p className={classes['Primary__Results']}>Result: {amountFrom} {currencyFrom} = {amountTo} {currencyTo}</p>
            <p className={classes['Primary__Results']}>1 {currencyFrom} = {exchangeRate.toFixed(2)} {currencyTo}</p>
        </div>
  )
};
export default CurrencyConverter;
