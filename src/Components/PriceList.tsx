import { useStore } from "effector-react";
import React, { useState } from "react";
import { $currencyStore } from "../store/CurrencyStore";
import classes from '../styles/PriceList.module.scss'
const PriceList =()=>{
    const {
        currencyFrom,
        currencyTo,
        exchangeRate
    } = useStore($currencyStore)

    const fixedAmounts = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];
    
    const [hidden, setHidden] = useState(true);
    
    return(
        <>
        {hidden ? <button className={classes['HideButton']} onClick={() => setHidden(false)}>H1D3</button> : <button className={classes['HideButton']} onClick={() => setHidden(true)}>Sh0VV</button>}
        {hidden && <div className={classes['Primary']}>
            {fixedAmounts.map((amount) => (
                <div key={amount}>
                    {amount} {currencyFrom} = {(amount * exchangeRate).toFixed(2)} {currencyTo}
                </div>
            ))}
        </div>}
        </>
    )
}

export default PriceList;