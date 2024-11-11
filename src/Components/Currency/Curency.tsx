import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CurrencySelect } from '../CurrencySelect/CurrencySelect'
import styles from './Currency.module.scss'
import {$currencyStore,
        setAmountFrom,
        setCurrencyFrom,
        setCurrencyTo,
        swapCurrencies,
        fetchExchangeRate
} from '../../store/CurrencyStore'
import { useUnit } from 'effector-react'

const CurrencyConverter: React.FC = () => {
    const {
        currencies,
        amountFrom,
        amountTo,
        currencyFrom,
        currencyTo,
        exchangeRate,
    } = useUnit($currencyStore) // получаем весь букет

    useEffect (()=>{
        fetchExchangeRate({currencyFrom, currencyTo})
    }, [currencyFrom, currencyTo])

    const handleAmountFromChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const newAmount = parseFloat(e.target.value) || 0;
        setAmountFrom(newAmount);
    }



    return (
        <div className={styles.Primary}>
            <h2 className={styles.PrimaryText}>†Who are You?†</h2>
            <CurrencySelect
                value={amountFrom}
                onChange={handleAmountFromChange}
                placeholder='Enter summ'
            />
            {/*        */}
            {/*    />*/}
            {/*    <select value={currencyFrom}*/}
            {/*    onChange={(e)=>setCurrencyFrom(e.target.value)}*/}
            {/*    className={styles.InputContainer__Select}*/}
            {/*    >*/}
            {/*        {currencies.map((currency)=>(*/}
            {/*            <option className={styles.InputContainer__Select__Option} key={currency.code} value={currency.code}>*/}
            {/*                {currency.code}-{currency.name}*/}
            {/*            </option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}

            <button className={styles.Swap} onClick={() => swapCurrencies()}>Polarités ↑†↓ Inversées</button>

            <CurrencySelect
                value={amountTo}
                onChange={(e)=>setCurrencyTo(e.target.value)}
                placeholder='allo'
                disabled
            >
                <CurrencyInput />
            </CurrencySelect>
            {/*    <input type="number"*/}
            {/*    */}
            {/*    */}
            {/*    */}
            {/*    className={styles.InputContainer__InputOff}*/}
            {/*    />*/}

            {/*    <select value={currencyTo}*/}
            {/*    */}
            {/*    className={styles.InputContainer__Select}*/}
            {/*    >*/}
            {/*        {currencies.map((currency)=>(*/}
            {/*            <option className={styles.InputContainer__Select__Option} key={currency.code} value={currency.code}>*/}
            {/*                {currency.code}-{currency.name}*/}
            {/*            </option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}
            <p className={styles.Results}>Result: {amountFrom} {currencyFrom} = {amountTo} {currencyTo}</p>
            <p className={styles.Results}>1 {currencyFrom} = {exchangeRate.toFixed(2)} {currencyTo}</p>
        </div>
  )
};
export default CurrencyConverter;
