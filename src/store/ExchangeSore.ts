import { createStore, createEffect, sample } from 'effector';
import { ExchangeRate, getExchangeList } from '../api';
import { AppGate } from './AppGate.ts';

export const fetchExchangeRatesFx = createEffect<void, ExchangeRate[]>({
  handler: getExchangeList,
});

export const $exchangeRates = createStore<ExchangeRate[]>([]).on(
  fetchExchangeRatesFx.doneData,
  (_, newRates) => {
    return newRates; //без мапа
  }
);

sample({
  clock: AppGate.open,
  target: fetchExchangeRatesFx,
});
