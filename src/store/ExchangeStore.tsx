import { createStore, createEffect, createEvent } from 'effector';
import axios from 'axios';

type ExchangeRate = {
    code: string;
    rate: number;
}

const API_KEY = '9d13ba961a19487583c77203'

export const updateExchangeRates = createEvent();

export const fetchExchangeRates = createEffect(async () => {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
    const rates = response.data.conversion_rates;

    return Object.entries(rates).map(([code, rate])=>({
        code,
        rate: rate as number
    }));
});

export const $exchangeRates = createStore<ExchangeRate[]>([])
    .on(fetchExchangeRates.doneData, (state, newRates) => {
        return newRates.map((newRate)=>{
            const oldRate = state.find((rate) => rate.code === newRate.code);
            return{...newRate}
        })
    })

fetchExchangeRates()