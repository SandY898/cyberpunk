import axios from "axios";

export const historyClient = axios.create({
  baseURL: `https://openexchangerates.org/api`,
  params: { app_id: import.meta.env.VITE_OPENEXCHANGERATES_API_KEY },
});
