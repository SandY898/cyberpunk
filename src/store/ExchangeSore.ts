import { createStore, createEffect } from 'effector';
import { getExchangeList } from '../api';

type ExchangeRate = {
  code: string;
  rate: number;
};
export const fetchExchangeRatesFx = createEffect<void, ExchangeRate[]>(
  async () => await getExchangeList()
);

export const $exchangeRates = createStore<ExchangeRate[]>([]).on(
  fetchExchangeRatesFx.doneData,
  (_, newRates) => {
    return newRates; //без мапа
  }
);

fetchExchangeRatesFx();
