import React, { useState, useEffect } from 'react'
import {Input} from "@material-tailwind/react";
import { Select, Option } from '@mui/joy';
import {AllCurrenciesCard} from '@/pages/dashboard/Currencies';
import {useGetFluctuationQuery, useGetCurrenciesSymbolsQuery } from '@/redux/apis/CurrencyApi';
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const Currencies = () => {    
  const notify = () => toast("Maximum of 365 day time range !!!")
  const [baseCurrency, setBaseCurrency] = useState(`EUR`)  
  const {data:currencySymbol, isFetching} = useGetCurrenciesSymbolsQuery(`EUR`)
  const [startDate, setStartDate] = useState(`2024-03-01`)
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString(`en-Ca`))
  const [txt, setTxt]= useState(`Maximum of 365 day time range !!!`)
  let date1 = new Date(startDate);
  let date2 = new Date(endDate);
  let Difference_In_Time = date2.getTime() - date1.getTime();
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  
  const {data:fluctuation, isLoading}= useGetFluctuationQuery({
    currency:baseCurrency,
    endDate: Difference_In_Days < 0 || Difference_In_Days > 365 ? null : endDate,
    startDate: Difference_In_Days < 0 || Difference_In_Days > 365 ? null : startDate ,
    into: []
    })       
          
    useEffect(()=>{   
      if(Difference_In_Days < 0 || Difference_In_Days > 365){
        notify()
        setTxt( <Typography variant='h4'>Warning "Date to" must be higher than "Date from"</Typography>)
      } 
      // else{
      //   setTxt(<Typography>Well done!!!</Typography>)
      // }     
    },[startDate, endDate])

  const passCurrency = (e, val) => {     
    setBaseCurrency(val)   
  }  
 
  if(isLoading || isFetching) return `Loading....`   
 
  return (
    <main>
      <Typography variant=''  color={`red`}>{txt} </Typography>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 mt-3 gap-6 max-w-full  '>
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
    
      <ToastContainer autoClose={5000} />
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"> 
       { Object.entries(fluctuation?.rates || {})?.map(([key, value]) => (
          <Link state={{baseCurr: fluctuation?.base, dateFrom: startDate, dateTo: endDate}} key={key}  to={`/currency/${key}`  }>          
            <AllCurrenciesCard change={value?.change_pct} startRate={value?.start_rate} endRate={value?.end_rate} intoCurrency={key} baseCurrency={fluctuation?.base}/>
          </Link>        
        ))}
      </div>
    </main>
  )
}

export default Currencies

  