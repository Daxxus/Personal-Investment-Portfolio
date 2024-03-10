import * as React from 'react';
import { useGetRecentRatesQuery } from '@/redux/apis/CurrencyApi';
import { Line } from "react-chartjs-2"
import { useState } from 'react';
import { useEffect } from 'react';
import { Typography } from '@material-tailwind/react';
import millify from 'millify';

export default function StackedAreas({selectedCurrencies, rates, base, start, end}) {
  const {data: recent} = useGetRecentRatesQuery(base)
  const recentRate = Object.entries(recent?.rates || {})?.find(([key, val])=> key === `${selectedCurrencies}` && val)
  const value = Object.values(rates?.rates || {})?.sort()?.map(val => val[`${selectedCurrencies}`] )
  
  const obj = {label: `Rate`, fill : true, backgroundColor: "#" + parseInt(Math.random() * 16777215).toString(16), borderColor: "#0071bd", borderWidth: 1, data : value}   

  const [chartData, setChartData] = useState([obj]) 
  const key = Object.keys(rates?.rates || {})?. sort()?.map(key => key)
  
  const chart = () => {    
    setChartData([obj])
  }

  useEffect(() => {
    chart()
  },[selectedCurrencies, rates])
 
 const data = {
  labels: key,
  datasets: chartData,
 
}
let startDate = Object.entries(rates?.rates || {})?.sort()?.find(([key,val])  => key === start && val ) 
startDate  = startDate && startDate[1][`${selectedCurrencies}`]
let endDate = Object.entries(rates?.rates || {})?.sort()?.find(([key,val])  => key === end && val ) 
endDate  = endDate && endDate[1][`${selectedCurrencies}`]
const change = +((endDate - startDate) / startDate *100).toFixed(2) 

const options = {
  responsive:true,		 
    plugins: {
    legend: {
      display: true,
      position: "top",
    },    
    title: {      
      display: true,      
      // text:  `${base} / ${selectedCurrencies} recent rate:`,
    },  
  },  
}

  return (
    <div className='h-96' >
      <div className='flex justify-between '>
        <Typography variant="h4" color='teal' >{base} / {selectedCurrencies} recent rate: {(recentRate && recentRate[1].toFixed(4) )} </Typography>

        {(change) > 0 ? <Typography  variant="h4"  color="green">Change: {change && millify(change,{precision:2})}%</Typography> :<Typography  variant="h4"  color="red" >Change: { change &&millify(change,{precision:2})}%</Typography>}                       
       
      </div>
      <Line data={data} options={options} />
    </div>  
  );
}
