import {Card,CardHeader,CardBody,Typography,Chip,Tooltip, Input} from "@material-tailwind/react";
// import { Select, Option } from "@material-tailwind/react";
import { Select, Option } from "@mui/joy";
import { ToastContainer, toast } from 'react-toastify'
  import { useCalculateContext } from '@/context/Calculation/useCalculateContext';
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { useEffect, useState } from "react";
import { SliderValueLabel } from "@mui/material";
  
  export function Tables({timeSeries, intoCurrency, baseCurrency}) {
    const [currTransSumUp, setCurrTransSumUp] = useState([])
  
    const notify = () => toast.error("You have to quote the investment value ",{
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      // transition: Bounce,
    
    })
    const {setCurrencyROI} = useCalculateContext()
    const [toggle, setToggle] = useState()   
    const [investVal, setInvestVal] = useState(0)
    const [transRate, setTransRate] = useState(0)
    const dataObj = {forexPair: `${baseCurrency}/${intoCurrency}` ,rate: Number(transRate), status:toggle, value: Number(transRate * investVal).toFixed(2) }
    const [currTransDetails, setCurrTransDetails] = useState([])   

    const passBuyRates = (e,val) => {         
      setTransRate(val)  
      setToggle(true)      
       
    }
    const passSellRates = (e,val) => {      
      setTransRate(val)
      setToggle(false)  
         
    }     
    
    useEffect(()=> {  
      !investVal ? notify() : transRate && setCurrTransDetails([...currTransDetails, dataObj]) 

      toggle ? setCurrTransSumUp([...currTransSumUp, {bought: Number(transRate * investVal)}]) : setCurrTransSumUp([...currTransSumUp, {sold: Number(transRate * investVal)}])
    },[transRate])
    const bought = currTransSumUp.reduce((acc,current) => acc + current.bought, 0)
    const sold = currTransSumUp.reduce((acc,current) => acc + current.sold, 0)

    console.log(transRate, investVal)
    console.log(currTransSumUp)
    console.log(bought)
    console.log(sold)
    
    return (
      <div className="mt-24 mb-8 flex flex-col gap-12">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Select
                // defaultValue={transRate}            
                color="primary"              
                disabled={false}
                placeholder="buy" 
                size="md"
                variant="outlined"                
                onChange={passBuyRates} 
            >
                { Object.entries(timeSeries?.rates || {})?.sort()?.map(([key,val],i) =>(
                  <Option key={i} value={val[`${intoCurrency}`]}>{val[`${intoCurrency}`]} </Option>
                ))}
            </Select>          
            <Select
                // defaultValue={transRate}
                color="primary"
                // multiple
                disabled={false}
                placeholder="sell " 
                size="md"
                variant="outlined"
                onChange={passSellRates }   
            >
                { Object.entries(timeSeries?.rates || {})?.sort()?.map(([key,val],i) =>(
                  <Option key={i} value={val[`${intoCurrency}`]}>{val[`${intoCurrency}`]} </Option>
                ))}
            </Select>

          </div>
            <div>
              <Input label="Investment value"  onChange={(e) =>setInvestVal( Number(e.target.value)  )} />
              <ToastContainer />
            </div>
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
                  {["forex pair", "rate", "status", "transaction value"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        // variant="small"
                        className="text-[18px] font-bold uppercase text-blue-800"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currTransDetails.map(
                  ({ forexPair, rate, status, value }, key) => {
                    const className = `py-3 px-5 ${
                      key === currTransDetails.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={key} >
                        <td className={className}>
                          <div className="flex items-center gap-4">
                          
                            <div>
                              <Typography
                                variant="h6"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {forexPair}
                              </Typography>                             
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-md font-semibold text-blue-gray-600">
                            {rate}
                          </Typography>                        
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={status ? "green" : "red"}
                            value={status ? "Bought" : "Sold"}
                            className="py-0.5 px-2 text-[15px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-md font-semibold text-blue-gray-600">
                            {/* {status==="Bought" ? value : (-value) } */}
                           {value}
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