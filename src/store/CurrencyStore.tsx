import { createStore, createEvent, createEffect } from "effector";
import axios from "axios";

type Currency = {
    code: string;
    name: string;
}

export const setAmountFrom = createEvent<number>();
export const setAmountTo = createEvent<number>();
export const setCurrencyFrom = createEvent<string>();
export const setCurrencyTo = createEvent<string>();
export const swapCurrencies = createEvent();
const API_KEY = '9d13ba961a19487583c77203'

export const fetchCurrencies = createEffect(async()=>{
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
    return response.data.supported_codes.map((item:[string, string])=>({code: item[0], name: item[1]}))
}) 

export const fetchExchangeRate = createEffect(
    async({currencyFrom, currencyTo}: {currencyFrom: string; currencyTo: string;}) =>{
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currencyFrom}/${currencyTo}`)
        return response.data.conversion_rate
    }
);

const initialState ={
    currencies: [] as Currency[],
    amountFrom: 1,
    amountTo: 0,
    currencyFrom: 'USD',
    currencyTo: 'EUR',
    exchangeRate: 1,
}

export const $currencyStore = createStore(initialState)
    .on(fetchCurrencies.doneData, (state, currencies)=>({
        ...state, //копирование чикс
        currencies
    })) // обновляет первое, но тут последнее

    .on(fetchExchangeRate.doneData, (state, exchangeRate)=>({
        ...state,
        exchangeRate,
        amountTo: parseFloat((state.amountFrom * exchangeRate).toFixed(2)) //после курса обмена
    }))

    .on(setAmountFrom, (state, amountFrom)=>({
        ...state,
        amountFrom,
        amountTo: parseFloat((amountFrom * state.exchangeRate).toFixed(2)) // на основе exchangerate
    }))

    .on(setCurrencyFrom, (state, currencyFrom) => ({...state, currencyFrom}))
    .on(setCurrencyTo, (state, currencyTo) => ({...state, currencyTo}))
    .on(swapCurrencies, (state)=>({
        ...state,
        currencyFrom: state.currencyTo,
        currencyTo: state.currencyFrom
    }));

fetchCurrencies(); //запрос на загрузку списка валют и добавления в хранилищи