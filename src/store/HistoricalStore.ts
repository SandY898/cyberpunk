import { createStore, createEvent, createEffect, sample } from 'effector';
import { createGate } from 'effector-react';
import { getExchangeRatesForLast10Days, HistoricalExchangeRate } from '../api';

// Gate
export const historicalStoreGate = createGate<{
  currencyFrom: string;
  currencyTo: string;
}>();

// События
export const setHidden = createEvent<boolean>();

// Эффекты
export const fetchRatesFx = createEffect(
  async ({
    currencyFrom,
    currencyTo,
  }: {
    currencyFrom: string;
    currencyTo: string;
  }) => {
    const data = await getExchangeRatesForLast10Days({
      currencyFrom,
      currencyTo,
    });
    return data.reverse();
  }
);

// Сторы
export const $rates = createStore<HistoricalExchangeRate[]>([]).on(
  fetchRatesFx.doneData,
  (_, rates) => rates
);
export const $loading = fetchRatesFx.pending;
export const $error = createStore<string | null>(null)
  .on(fetchRatesFx.failData, () => 'Failed to fetch exchange rates.')
  .reset(fetchRatesFx.done);

export const $hidden = createStore(true).on(setHidden, (_, hidden) => hidden);

// открытие Gate
sample({
  clock: historicalStoreGate.open,
  fn: ({ currencyFrom, currencyTo }) => ({ currencyFrom, currencyTo }),
  target: fetchRatesFx,
});
