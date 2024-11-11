import { createEffect, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { getHistoricalRates } from '../api'
import { $currencyStore } from './CurrencyStore'

type HistoricalRecord = { date: string; rate: number }
type HistoricalStoreState = HistoricalRecord[];

export const historicalStoreGate = createGate()

export const fetchHistoricalRates = createEffect({ handler: getHistoricalRates })

export const $historicalStore = createStore<HistoricalStoreState>([])
	.on(fetchHistoricalRates.doneData, (_, rates) =>
		Object.entries(rates).map(([date, rate]) => ({ date, rate })),
	)

sample({
	clock: historicalStoreGate.open,
	source: $currencyStore,
	fn: ({ currencyFrom, currencyTo }) => ({ currencyFrom, currencyTo }),
	target: fetchHistoricalRates,
})
