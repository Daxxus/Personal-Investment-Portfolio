import React from 'react'
import CurrencyCard from './currencyCard'
import { Typography } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import {useState } from "react";
import { useGetCurrenciesNewsQuery } from '@/redux/apis/CurrencyNewsApi'

export const CurrenciesNews = () => {
  const [currencyFrom, setCurrencyFrom] = useState(`EUR`)
  const [currencyTo, setCurrencyTo] = useState(`USD`)
  const {data:currencyNews, isFetching} = useGetCurrenciesNewsQuery({currencyFrom, currencyTo}) 

  const currenciesSymbols = [`USD`, `EUR`,`CHF`, `PLN`,`GBP`, `SEK`,`AUD`, `NZD`, `JPY`, `CAD`,`DKK`, `HKD`,`TRY`, `SGD`,`NOK`, `CNH`, `MXN`, `HUF`, `CZK`, `ZAR`] 

  if(isFetching) return "Loading....."  

  return (
    <main>    
        <Typography variant="h3" color="teal" className="mb-10">Up to the minute Forex News</Typography> 

        <div className="flex justify-between">
          <Select  color="blue" label="Select Currency From" onChange={(v)=> setCurrencyFrom(v) } >         
            {currenciesSymbols.map((currency) => (
            <Option key={currency} value={currency}>
            {currency}
            </Option>
          ))}
          </Select>
          <Select color="blue" label="Select Currency To" onChange={(v)=> setCurrencyTo(v)} >         
            {currenciesSymbols.map((currency) => (
            <Option key={currency} value={currency}>
            {currency}
            </Option>
          ))}
          </Select>
        </div> 

        <div className="mt-4 grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {currencyNews?.data?.news?.map(({article_photo_url, article_title, article_url, post_time_utc, source})=>(
            <CurrencyCard key={article_url} pic={article_photo_url} title={article_title} url={article_url} source={source} postTime={post_time_utc} />   
            ) )}
        </div> 
  </main>
  )
}

export default CurrenciesNews