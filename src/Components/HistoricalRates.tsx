import React, { useEffect } from "react"
import { $historicalStore, fetchHistoricalRates } from "../store/HistoricalStore";
import { useStore } from "effector-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { $currencyStore } from "../store/CurrencyStore";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExchangeRateHistory: React.FC = () =>{
    const { currencyFrom, currencyTo } = useStore($currencyStore);
    const historicalRates = useStore($historicalStore)

    useEffect(()=>{
        fetchHistoricalRates({currencyFrom, currencyTo})
    }, [currencyFrom, currencyTo])

    useEffect(() => {
        console.log(historicalRates); // Проверим, что данные загружаются
      }, [historicalRates]);

    const data = {
        labels: historicalRates.map((entry)=>entry.date),
        datasets: [
            {
                label: `H1sto0ry C0nVers10n ${currencyFrom} t0 ${currencyTo}`,
                data: historicalRates.map((entry)=>entry.date),
                fill: false,
                borderColor: '#00FF66',
                tension: 0.1,
                
            }
        ]
    }
    return(
        <div>
            <Line data={data}/>
        </div>
    )
}

export default ExchangeRateHistory