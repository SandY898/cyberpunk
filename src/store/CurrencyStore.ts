import { createStore, createEvent, createEffect, sample } from 'effector';
import { getCurrencies, getExchangeRate } from '../api';
import { AppGate } from './AppGate.ts';

type Currency = {
  code: string;
  name: string;
};

//region Events
export const setAmountFrom = createEvent<number>();
export const setCurrencyFrom = createEvent<string>();
export const setCurrencyTo = createEvent<string>();
export const swapCurrencies = createEvent();
export const updateCurrencies = createEvent<Currency[]>();
export const updateExchangeRate = createEvent<number>();
//endregion

//region Effects
export const getExchangeRateFx = createEffect({ handler: getExchangeRate });
//endregion

const initialState = {
  currencies: [] as Currency[],
  amountFrom: 1,
  amountTo: 0,
  currencyFrom: 'USD',
  currencyTo: 'EUR',
  exchangeRate: 1,
};

export const $currencyStore = createStore(initialState)
  .on(updateCurrencies, (state, currencies) => ({
    ...state,
    currencies,
  }))
  .on(updateExchangeRate, (state, exchangeRate) => ({
    ...state,
    exchangeRate,
    amountTo: +(state.amountFrom * exchangeRate).toFixed(2),
  }))
  .on(setAmountFrom, (state, amountFrom) => ({
    ...state,
    amountFrom,
    amountTo: +(amountFrom * state.exchangeRate).toFixed(2),
  }))
  .on(setCurrencyFrom, (state, currencyFrom) => ({ ...state, currencyFrom }))
  .on(setCurrencyTo, (state, currencyTo) => {
    fetchExchangeRate(state.currencyFrom, currencyTo); // Обновляем курс обмена
    return { ...state, currencyTo };
  })
  .on(swapCurrencies, (state) => {
    const newCurrencyFrom = state.currencyTo;
    const newCurrencyTo = state.currencyFrom;
    fetchExchangeRate(newCurrencyFrom, newCurrencyTo); // Обновляем курс обмена
    return {
      ...state,
      currencyFrom: newCurrencyFrom,
      currencyTo: newCurrencyTo,
    };
  });

// Обновляем курс обмена
sample({
  clock: setCurrencyFrom,
  source: $currencyStore,
  fn: ({ currencyTo }, currencyFrom) => ({
    currencyFrom,
    currencyTo,
  }),
  target: getExchangeRateFx,
});

sample({
  clock: getExchangeRateFx.doneData,
  target: updateExchangeRate,
});

sample({
  clock: AppGate.open,
});

getCurrencies().then((currencies) => {
  updateCurrencies(currencies); // Обновляем список валют
  const initialCurrencyFrom = initialState.currencyFrom;
  const initialCurrencyTo = initialState.currencyTo;
  fetchExchangeRate(initialCurrencyFrom, initialCurrencyTo); // Загрузка начального курса обмена
});
