import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';
import { useGetRecentRatesQuery } from '@/redux/apis/CurrencyApi';
import { Line } from "react-chartjs-2"
import { useState } from 'react';
import { useEffect } from 'react';

import millify from 'millify';
// import { Chart,  registerables } from "chart.js"
// Chart.register(...registerables)

export default function StackedAreas({selectedCurrencies, rates, base}) {
  const {data: recent} = useGetRecentRatesQuery(base)
  const recentRate = Object.entries(recent?.rates || {})?.find(([key, val])=> key === `${selectedCurrencies}` && val)
// console.log(recentRate)
  const value = Object.values(rates?.rates || {})?. sort()?.map(val => val[`${selectedCurrencies}`] )
  
  const obj = {label: `Price`, fill : true, backgroundColor: "#" + parseInt(Math.random() * 16777215).toString(16), borderColor: "#0071bd", borderWidth: 1, data : value}   
  const [chartData, setChartData] = useState([obj])
 
  const key = Object.keys(rates?.rates || {})?. sort()?.map(key => key)
  const chart = () => {
    // setChartData([...chartData, obj])
    setChartData([obj])

  };

  useEffect(() => {
    chart()
  },[selectedCurrencies, rates])
 
 const data = {
  labels: key,
  datasets: chartData,
 
}


const options = {
  responsive:true,		
    plugins: {
    legend: {
      display: true,
      position: "top",
    },
    stackingOrder: 'descending',
    // height: 1400,
    // margin: { left: 55 },
    title: {
      
      display: true,
      text:`${base} / ${selectedCurrencies} recent rate:` + (recentRate && recentRate[1].toFixed(4) ),
    },
  },  
}

  return (
    <div className='h-96'>
    <Line data={data} options={options} />
    </div>  
  );
}
