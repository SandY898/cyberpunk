import { createEffect } from "effector";
import { client } from "../Client/ClientCurrency";
import { CurrenciesRequest, CurrenciesResponse, ExchangeRateRequest, ExchangeRateResponse, ExchangeRate, ExchangeListResponse } from "../Type/TypeCurrency";

// Получение списка валют
export const getCurrencies = async (): Promise<CurrenciesRequest[]> => {
  const response = await client.get<CurrenciesResponse>('/codes');
  return response.data.supported_codes.map(([code, name]) => ({
    code,
    name,
  }));
};

// Получение курса межу двумя
export const getExchangeRate = async ({
  currencyFrom,
  currencyTo,
}: ExchangeRateRequest): Promise<number> => {
  const response = await client.get<ExchangeRateResponse>(
    `/pair/${currencyFrom}/${currencyTo}`
  );
  return response.data.conversion_rate;
};

// вращающаяся фигнгя
export const getExchangeListFx = createEffect<void, ExchangeRate[], Error>(
  async () => {
    const response = await client.get<ExchangeListResponse>('/latest/USD');
    return Object.entries(response.data.conversion_rates).map(
      ([code, rate]) => ({
        code,
        rate,
      })
    );
  }
);
