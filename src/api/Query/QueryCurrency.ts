import { createEffect } from "effector";
import { exchangeClient, getLatestExchange } from '../Client/ClientCurrency';
import { CurrenciesRequest, CurrenciesResponse, ExchangeRateRequest, ExchangeRateResponse, ExchangeRate } from "../Type/TypeCurrency";

// Получение списка валют
export const getCurrencies = async (): Promise<CurrenciesRequest[]> => {
  const response = await exchangeClient.get<CurrenciesResponse>('/codes');
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
  const response = await exchangeClient.get<ExchangeRateResponse>(
    `/pair/${currencyFrom}/${currencyTo}`
  );
  return response.data.conversion_rate;
};

// вращающаяся фигнгя
export const getExchangeListFx = createEffect<void, ExchangeRate[], Error>(
  async () => {
    const response = await getLatestExchange('USD');
    return Object.entries(response.data.conversion_rates).map(
      ([code, rate]) => ({
        code,
        rate,
      })
    );
  }
);
