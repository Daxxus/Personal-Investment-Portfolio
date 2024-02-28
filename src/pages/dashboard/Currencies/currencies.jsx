import React, { useState } from 'react'
import {Input} from "@material-tailwind/react";
import { Select, Option } from '@mui/joy';
import {AllCurrenciesCard} from '@/pages/dashboard/Currencies';
import {useGetFluctuationQuery, useGetCurrenciesSymbolsQuery } from '@/redux/apis/CurrencyApi';
import { Link } from "react-router-dom";

export const Currencies = () => {    
  const [startDate, setStartDate] = useState(`2024-01-01`)
  const [endDate, setEndDate] = useState(`2024-02-28`)
  const [baseCurrency, setBaseCurrency] = useState(`EUR`)
  const {data:currencySymbol, isFetching} = useGetCurrenciesSymbolsQuery(`EUR`)
  const {data:fluctuation, isLoading}= useGetFluctuationQuery({
    currency:baseCurrency,
    endDate: endDate,
    startDate: startDate,
    into: []
     } )  

  const passCurrency = (e, val) => {     
    // const pass = val?.target?.innerHTML.slice(0,3)  
    setBaseCurrency(val)   
  }  

  if(isLoading || isFetching) return `Loading....`   
console.log(fluctuation)
  return (
    <main>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-6 max-w-full  '>
        <Input type='date' onChange={(e)=> setStartDate(e.target.value)} label='Date from' />
        <Input type='date' onChange={(e)=> setEndDate(e.target.value)} label='Date to'/>
        <div className='grid grid-cols-subgrid gap-6 md:col-span-2 lg:col-span-1'> 

            <Select
              color="danger"
              // value={baseCurrency}         
              // className='col-start-1'
              disabled={false}
              placeholder="Select the base Currency" 
              size="md"
              variant="outlined"
              onChange={passCurrency }        
            >
              {Object.entries(currencySymbol?.symbols || {})?.map(([key, val]) => (
                    <Option key={key} value={key}>{[key +`: ` + val]} </Option>
                  ))}       
            </Select>
        </div>
      </div>      

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"> 
       { Object.entries(fluctuation?.rates || {})?.map(([key, value]) => (
          <Link state={{baseCurr: fluctuation?.base, dateFrom: fluctuation?.start_date, dateTo: fluctuation?.end_date}} key={key}  to={`/currency/${key}`  }>          
            <AllCurrenciesCard change={value?.change_pct} startRate={value?.start_rate} endRate={value?.end_rate} intoCurrency={key} baseCurrency={fluctuation?.base}/>
          </Link>        
        ))}
      </div>
    </main>
  )
}

export default Currencies

  