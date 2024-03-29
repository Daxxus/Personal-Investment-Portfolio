import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import CircularWithValueLabel from '../../details/loader'
import {Input, Typography} from "@material-tailwind/react";
import { Select, Option } from '@mui/joy';
import {Sidenav,DashboardNavbar,Configurator,Footer} from "@/widgets/layout";
import StackedAreas from './CurrencyChart';
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import {useGetCurrenciesSymbolsQuery,useGetTimeseriesRatesQuery} from '@/redux/apis/CurrencyApi';
import {Tables} from '@/pages/dashboard/Currencies/index';

const CurrencyDetails = () => { 
  const [controller, dispatch] = useMaterialTailwindController();
  const location = useLocation()
  const { sidenavType } = controller
  const {currencyId} = useParams()
  const {data:currencySymbol, isFetching} = useGetCurrenciesSymbolsQuery(`EUR`)
  const [intoCurrency, setIntoCurrency] = useState([currencyId])
  const {baseCurr, dateFrom, dateTo} = location.state
  const [startDate, setStartDate] = useState(dateFrom)
  const [endDate, setEndDate] = useState(dateTo)
  const {data: timeSeries, isLoading} = useGetTimeseriesRatesQuery({
    base: baseCurr,
    into: intoCurrency,
    startDate: startDate ,
    endDate: endDate ,
  }) 

  const passCurrency = (e, val) => {      
    setIntoCurrency(val)   
  }   
 
  if(isFetching || isLoading) return <CircularWithValueLabel/>

  return (
    <main  className="min-h-screen bg-blue-gray-50/50">      
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar/>
          <Configurator/>
          <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
          >
          <Cog6ToothIcon className="h-5 w-5" />
          </IconButton>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-6 max-w-full  '>
            <Input type='date' onChange={(e) =>setStartDate(e.target.value)} label='Date from' />
            <Input type='date' onChange={(e) =>setEndDate(e.target.value)} label='Date to'/>
            <div className='grid grid-cols-subgrid gap-6 md:col-span-2 lg:col-span-1'> 
              
              <Select
                defaultValue={currencyId}
                color="danger"
                // multiple
                disabled={false}
                placeholder="Select the Currencies to compare" 
                size="md"
                variant="outlined"
                onChange={passCurrency }        
              >
                {Object.entries(currencySymbol?.symbols)?.sort()?.map(([key, val]) => (
                      <Option key={key} value={key}>{[key ]} </Option>
                ))}       
                </Select>
            </div>
          </div>        
          <StackedAreas selectedCurrencies={intoCurrency} rates={timeSeries} base={baseCurr} start={startDate} end={endDate} />
          <Tables timeSeries={timeSeries} intoCurrency={intoCurrency} baseCurrency={baseCurr}/>
         
          <div className="text-blue-gray-600 mt-5">
            <Footer />
          </div>
      </div>
    </main>
  )
}

export default CurrencyDetails



