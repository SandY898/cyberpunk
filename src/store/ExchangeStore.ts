import { createStore, createEffect, createEvent } from 'effector';
import axios from 'axios';
import { getExchangeList } from '../api';

type ExchangeRate = {
    code: string;
    rate: number;
}
export const fetchExchangeRatesFx = createEffect<void, ExchangeRate[]>(
    async () => await getExchangeList()
);

export const $exchangeRates = createStore<ExchangeRate[]>([])
    .on(fetchExchangeRatesFx.doneData, (state, newRates) => {
        return newRates.map((newRate) => {
            const oldRate = state.find((rate) => rate.code === newRate.code);
            return { ...newRate };
        });
    });

    fetchExchangeRatesFx();