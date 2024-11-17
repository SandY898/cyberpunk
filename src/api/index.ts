import axios from "axios";

const client = axios.create({
    baseURL: `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}`,
  });

//ПОЛУЧАЕМ КОДЫ 
export type CurrenciesRequest = {code: string, name: string}
export type CurrenciesResponse = { supported_codes: Array<[string, string]> };

export const getCurrencies = async (): Promise<Array<{ code: string; name: string }>>=>{
    const {data} = await client.get<CurrenciesResponse>
    (`/codes`,{})
    return data.supported_codes.map(([code, name]) => ({ code, name }))
}

//ПОЛУЧАЕМ КОНВЕРСИЮ

export type ExchangeRateRequest = {currencyFrom: string, currencyTo: string};
export type ExchangeRateResponse = { conversion_rate: number };

export const getExchangeRate = async({
    currencyFrom,
    currencyTo
}: ExchangeRateRequest): Promise<number>=>{
    const {data} = await client.get<ExchangeRateResponse>
    (`/pair/${currencyFrom}/${currencyTo}`,{})
    return data.conversion_rate;
}

//ВРАЩАЮЩАЯСЯ ФИГНЯ СВЕРХУ

export type ExchangeListRequest = {};
export type ExchangeListResponse = { conversion_rates: Record<string, number> };

export const getExchangeList = async (): Promise<Array<{ code: string; rate: number }>> => {
    const { data } = await client.get<ExchangeListResponse>(`/latest/USD`, {});
    return Object.entries(data.conversion_rates).map(([code, rate]) => ({ code, rate }));
};
