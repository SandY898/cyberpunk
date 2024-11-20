import axios from 'axios'

const client = axios.create({
	baseURL: `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}`,
})

const historyClient = axios.create({
	baseURL: `https://openexchangerates.org/api`,
	params: { app_id: process.env.REACT_APP_API_HISTORY_KEY },
})

//ПОЛУЧАЕМ КОДЫ
export type CurrenciesRequest = { code: string, name: string }
export type CurrenciesResponse = { supported_codes: Array<[string, string]> };

export const getCurrencies = async (): Promise<CurrenciesRequest[]> => {
	const { data } = await client.get<CurrenciesResponse>(`/codes`, {})
	return data.supported_codes.map(([code, name]) => ({ code, name }))
}

//ПОЛУЧАЕМ КОНВЕРСИЮ

export type ExchangeRateRequest = { currencyFrom: string, currencyTo: string };
export type ExchangeRateResponse = { conversion_rate: number };

export const getExchangeRate = async ({
	currencyFrom,
	currencyTo,
}: ExchangeRateRequest): Promise<number> => {
	const { data } = await client.get<ExchangeRateResponse>
	(`/pair/${currencyFrom}/${currencyTo}`, {})
	return data.conversion_rate
}

//ВРАЩАЮЩАЯСЯ ФИГНЯ СВЕРХУ

export type ExchangeListRequest = {};
export type ExchangeListResponse = { conversion_rates: Record<string, number> };

export const getExchangeList = async (): Promise<Array<{ code: string; rate: number }>> => {
	const { data } = await client.get<ExchangeListResponse>(`/latest/USD`, {})
	return Object.entries(data.conversion_rates).map(([code, rate]) => ({ code, rate }))
}

//ИСТОРИЯ
export type HistoricalExchangeRequest = { currencyFrom: string; currencyTo: string };
export type HistoricalExchangeRate = { date: string; rate: number };

export const getExchangeRatesForLast10Days = async ({
	currencyFrom,
	currencyTo,
}: HistoricalExchangeRequest): Promise<HistoricalExchangeRate[]> => {
	const today = new Date()
	const rates: HistoricalExchangeRate[] = []

	for (let i = 0; i < 10; i++) {
		const date = new Date(today)
		date.setDate(today.getDate() - i)
		const formattedDate = date.toISOString().split('T')[0]

		const response = await historyClient.get(`/historical/${formattedDate}.json`)

		rates.push({
			date: formattedDate,
			rate: response.data.rates[currencyTo],
		})
	}

	return rates
}
