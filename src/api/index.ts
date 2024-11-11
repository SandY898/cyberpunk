import axios from 'axios'
import { getDateAge } from '../utils/dates.util'

const client = axios.create({
	baseURL: `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}`,
})

export type HistoricalRateRequest = { currencyFrom: string; currencyTo: string };
export type HistoricalRateResponse = { conversion_rate: Record<string, number> }

export const getHistoricalRates = async ({
	currencyFrom,
	currencyTo,
}: HistoricalRateRequest): Promise<Record<string, number>> => {
	const { data } = await client.get<HistoricalRateResponse>(`history/${currencyFrom}/${currencyTo}`, {
		params: {
			start_date: getDateAge(10),
			end_date: new Date().toISOString().split('T')[0],
		},
	})

	return data.conversion_rate
}
