import {
    Card,
    CardHeader,
    CardBody,
    Typography,   
    Chip,
    Tooltip,
   
  } from "@material-tailwind/react";
  import { Select, Option } from '@mui/joy';
  import { useCalculateContext } from '@/context/Calculation/useCalculateContext';
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { useEffect, useState } from "react";
  
 export function Tables({timeSeries, intoCurrency}) {
  const {setCurrencyROI} = useCalculateContext()
  const [buyCurrRate, setBuyCurrRate] = useState()
  const [buyCurrDate, setBuyCurrDate] = useState(``)
  const [sellCurrRate, setSellCurrRate] = useState()
  const [sellCurrDate, setSellCurrDate] = useState(``)
  const [currTransDetails, setCurrTransDetails] = useState([
    {     
      forexPair: "John Michael",     
      currency: intoCurrency,
      status: false,
      date: buyCurrDate,
    },
    {     
      forexPair: "Alexa Liras",     
      currency: intoCurrency,
      status: true,
      date: `sellCurrDate`,
    },
])
 
  // console.log(timeSeries?.rates)

const passBuyRates = (e,val) => {  
  setBuyCurrRate(val?.value)
  setBuyCurrDate(val?.date)
}
const passSellRates = (e,val) => {
  setSellCurrDate(val?.date)
  setSellCurrRate(val?.value)
}
// console.log(buyCurrDate, buyCurrRate)
// console.log(sellCurrDate, sellCurrRate)

  
useEffect(()=> {
  
},[setCurrencyROI])

    return (
      <div className="mt-24 mb-8 flex flex-col gap-12">
        <div className="flex justify-between">
          <Select
              defaultValue={`currencyId`}
              color="primary"              
              disabled={false}
              placeholder="Price of the date from" 
              size="md"
              variant="outlined"
              onChange={passBuyRates }  
          >
              { Object.entries(timeSeries?.rates || {})?.sort()?.map(([key,val],i) =>(
                <Option key={i} value={{date:key, value: val[`${intoCurrency}`]}}>{key} : {val[`${intoCurrency}`]} </Option>
              ))}
          </Select>
          <Select
              defaultValue={`currencyId`}
              color="primary"
              // multiple
              disabled={false}
              placeholder="Price of the date to" 
              size="md"
              variant="outlined"
              onChange={passSellRates }   
          >
               { Object.entries(timeSeries?.rates || {})?.sort()?.map(([key,val],i) =>(
                <Option key={i} value={{date:key, value: val[`${intoCurrency}`]}}>{key} : {val[`${intoCurrency}`]} </Option>
              ))}
          </Select>
        </div>
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              History Transactions
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["forex pair", "currency", "status", "transaction date"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currTransDetails.map(
                  ({ forexPair, currency, status, date }, key) => {
                    const className = `py-3 px-5 ${
                      key === currTransDetails.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={forexPair}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                          
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {forexPair}
                              </Typography>                             
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {currency}
                          </Typography>                        
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={status ? "green" : "blue-gray"}
                            value={status ? "online" : "offline"}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {date}
                          </Typography>
                        </td>
                      
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>      
      </div>
    );
  }
  
  export default Tables;