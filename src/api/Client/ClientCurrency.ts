import axios from "axios";
import { ExchangeListResponse } from '@/api/Type/TypeCurrency.ts';
import { ExchangeRateAPICurrency } from './currencies';

export const exchangeClient = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGERATE_API_KEY}`,
});

export const getLatestExchange = async (currency: ExchangeRateAPICurrency) => await exchangeClient.get<ExchangeListResponse>(`/latest/${currency}`);
