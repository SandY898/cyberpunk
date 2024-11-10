import axios from "axios"
import { createEffect, createStore } from "effector"

const API_KEY = '9d13ba961a19487583c77203'


export const fetchHistoricalRates = createEffect(async ({currencyFrom, currencyTo}: {currencyFrom: string; currencyTo: string;})=>{
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/history/${currencyFrom}/${currencyTo}`,{
        params: {
            start_date: getDateAge(10),
            end_date: new Date().toISOString().split('T')[0]
        },
    });
    return response.data.conversion_rate
})

export const $historicalStore = createStore<{date: string; rate: number}[]>([])
    .on(fetchHistoricalRates.doneData, (_, rates)=>
    Object.entries(rates).map(([date, rate]) => ({date, rate: rate as number}))
    );

function getDateAge(days: number): string {
    const date = new Date();
    date.setDate(date.getDate()-days);
    return date.toISOString().split('T')[0];
}