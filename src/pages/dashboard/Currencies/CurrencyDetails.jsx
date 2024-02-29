import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import CircularWithValueLabel from '../../details/loader'
import StackedAreas from './CurrencyChart'
import {Input, Typography} from "@material-tailwind/react";
import { Select, Option } from '@mui/joy';
import SelectMultiple from './Select'
import TestChart from './TestChart'
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import {useGetFluctuationQuery, useGetCurrenciesSymbolsQuery, useGetRecentRatesQuery,  useGetTimeseriesRatesQuery } from '@/redux/apis/CurrencyApi';

const CurrencyDetails = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller
  const {data:currencySymbol, isFetching} = useGetCurrenciesSymbolsQuery(`EUR`)
  const {currencyId} = useParams()
  const [intoCurrency, setIntoCurrency] = useState(currencyId)
  const location = useLocation()
  const {baseCurr, dateFrom, dateTo} = location.state

  const {data: timeSeries, isLoading} = useGetTimeseriesRatesQuery({
    base: baseCurr,
    into: intoCurrency,
    startDate: dateFrom ,
    endDate: dateTo ,
  })
 
  console.log(currencyId)
  const passCurrency = (e, val) => {   
    // const pass = val?.target?.innerHTML.slice(0,3)
    setIntoCurrency(val)   
  } 
  // Maximum of 365 day time range
  console.log(timeSeries)
 
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
                defaultValue={[currencyId]}
                color="danger"
                multiple
                disabled={false}
                placeholder="Select the Currencies to compare" 
                size="md"
                variant="outlined"
                onChange={passCurrency }        
              >
                {Object.entries(currencySymbol?.symbols)?.map(([key, val]) => (
                      <Option key={key} value={key}>{[key ]} </Option>
                ))}       
                </Select>
            </div>
          </div>  
          <Typography variant='h5' className="mt-1 mb-2 pl-2 font-medium">{baseCurr} current Rate: </Typography>
          <TestChart historyRates={timeSeries} passedCurrency={currencyId}/>
          {/* <StackedAreas selectedCurrencies={[`AUS`,`PLN`, `CHF`]} rates={timeSeries}/> */}
          idClicked:{currencyId}/ baseCurrency:{baseCurr} /from: {dateFrom} / to: {dateTo}

          <div className="text-blue-gray-600">
            <Footer />
          </div>
      </div>
    </main>
  )
}

export default CurrencyDetails



