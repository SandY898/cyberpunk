import { createEffect, sample, restore } from 'effector';
import { ExchangeRate, getExchangeListFx } from '../api';
import { AppGate } from './AppGate';

export const fetchExchangeRatesFx = createEffect<void, ExchangeRate[]>({
  handler: getExchangeListFx,
});

export const $exchangeRates = restore(fetchExchangeRatesFx.doneData, []);


sample({
  clock: AppGate.open,
  target: fetchExchangeRatesFx,
});
