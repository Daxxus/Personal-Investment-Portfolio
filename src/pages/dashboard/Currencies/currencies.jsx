import React, { useState } from 'react'
import useCurrenciesStatsDataCard from "@/data/stats-currencies-rates.data";
import {Typography, Input} from "@material-tailwind/react";
import {StatsCurrencyCard } from "@/widgets/cards";
import { useGetRecentRatesQuery, useGetHistoricalRatesQuery, useGetTimeseriesRatesQuery, useGetFluctuationRatesQuery, useGetCurrenciesSymbolsQuery } from '@/redux/apis/CurrencyApi';

export const Currencies = () => {
  const currencies = useCurrenciesStatsDataCard()
  const [startDate, setStartDate] = useState(`2012-05-25`)
  const [endDate, setEndDate] = useState(`2012-05-26`)
  const {data: recentRates} = useGetRecentRatesQuery(`EUR`)
  const {data:symbols} = useGetCurrenciesSymbolsQuery()
  const {data: historicalRates} = useGetHistoricalRatesQuery({
    base: `EUR`,
    into: [`USD,CAD,JPY,PLN,AUD`],
    startDate: startDate
  })
  const {data: timeSeries} = useGetTimeseriesRatesQuery({
    base: `EUR`,
    startDate: startDate,
    endDate: endDate,
    into: [`USD,CAD,JPY,PLN,AUD`]
  })
  const {data:fluctuationEUR}= useGetFluctuationRatesQuery({
    currency: "EUR",
    endDate: endDate,
    startDate: startDate,
    into: [`USD,PLN,AUD`]
     })
  // console.log(recentRates);
  // console.log(historicalRates);
  // console.log(symbols);
  // console.log(timeSeries);
  console.log(fluctuationEUR);
  
  return (
    <main>
      <div className='flex'>
        <Input type='date' onChange={(e) =>setStartDate(e.target.value)}/>
        <Input type='date' onChange={(e) =>setEndDate(e.target.value)}/>
      </div>
      

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {currencies.map(({ icon, title, footer, ...rest }) => (
        <StatsCurrencyCard
          key={title}            
          {...rest}
          // color="red"           
          title={title}
          icon={React.createElement(icon, {
            className: "w-6 h-6 text-white ",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600 flex justify-between" variant="h5">
              {/* <strong className={footer.color}> */}
                {footer.value}
                {/* </strong> */}
              &nbsp;{footer.label}
            </Typography>
          }
        />
      ))}
    </div>
    </main>
  )
}

export default Currencies