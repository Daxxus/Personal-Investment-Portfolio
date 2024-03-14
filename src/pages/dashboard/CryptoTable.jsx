import { useEffect, useState, useRef } from "react";
import {Card,CardHeader,CardBody,Typography,Chip, Input} from "@material-tailwind/react";
import { Select, Option } from "@mui/joy";
import { ToastContainer, toast } from 'react-toastify'
import { useCalculateContext } from '@/context/Calculation/useCalculateContext'; 

export const CryptoTable = ({coinHistory, coinName}) => { 
  const [currTransSumUp, setCurrTransSumUp] = useState([])   
  const inputRef = useRef(null)
  const {setCoinROI} = useCalculateContext()
  const [toggle, setToggle] = useState()   
  const [investVal, setInvestVal] = useState(0)
  const [transRate, setTransRate] = useState(0)
  const dataObj = {coinName: coinName ,price: Number(transRate), status:toggle, value: Number(investVal), unit: Number(investVal / transRate).toFixed(4) }
  const [currTransDetails, setCurrTransDetails] = useState([]) 

  const notify = () => toast.error("You have to quote the investment value ",{
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",       
  })
  const notify2 = () => toast.warning("Hola Hola, You have to buy something first !!! ",{
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",       
  })
  const passBuyRates = (e,val) => {         
    setTransRate(val)  
    setToggle(true)
    inputRef.current.value = ""            
  }
  const passSellRates = (e,val) => {      
    setTransRate(val)
    setToggle(false)  
    inputRef.current.value = ""      
  }  
 
  let buy = currTransSumUp.filter(({bought}) => bought)
  buy = buy.reduce((acc,curr) => acc + curr.bought, toggle && Number(investVal))
  let sell = currTransSumUp.filter(({sold}) => sold)
  sell = sell.reduce((acc,curr) => acc + curr.sold, !toggle && Number(dataObj.value)) 

  
  useEffect(()=> {          
    if(buy && sell){      
      const loss = (buy - sell).toFixed(2)         
      setCoinROI(Number(loss))                  
       
      const profit = (sell - buy).toFixed(2)
      setCoinROI(Number(profit))       
    } 
    if(currTransSumUp.length > 0){
      !investVal ? notify() : transRate && setCurrTransDetails([...currTransDetails, dataObj]) 
    }

    if(toggle === false && !buy ){
      notify2()
      setCurrTransDetails([])
    } else {    
      toggle ? setCurrTransSumUp([...currTransSumUp, {bought: Number( investVal)}]) : setCurrTransSumUp([...currTransSumUp, {sold: Number(investVal)}])     
    }      
  },[transRate]) 

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="grid sm:grid-cols-2 mx-4">
          <div className="flex sm:gap-2 gap-0">            
            <Select                             
                color="success"              
                disabled={false}
                placeholder="buy the coin" 
                size="md"
                variant="outlined"                
                onChange={passBuyRates} 
            >
                { Object.values(coinHistory?.data?.history || {})?.sort()?.map((val,i) =>(
                  <Option key={i} value={Number(val.price).toFixed(4)}>{Number(val.price).toFixed(4)} </Option>
                ))}
            </Select>          
            <Select               
                color="danger"             
                disabled={false}
                placeholder="sell the coin " 
                size="md"
                variant="outlined"
                onChange={passSellRates }   
            >
               { Object.values(coinHistory?.data?.history || {})?.sort()?.map((val,i) =>(
                  <Option key={i} value={Number(val.price).toFixed(4)}>{Number(val.price).toFixed(4)} </Option>
                ))}
            </Select>  
          </div>
            <div className=" sm:ml-0">
              <Input inputRef ={inputRef} label="Investment value" type="number" onChange={(e) =>setInvestVal( Number(e.target.value))}/>
              <ToastContainer />
            </div>
        </div>
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              History Transactions
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[340px] table-auto">
              <thead>
                <tr>
                  {["Coin Name", "price", "status", "units", "transaction value"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-0 md:px-5 text-left"
                    >
                      <Typography                       
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
                  ({ coinName, price, status, unit ,value }, key) => {
                    const className = `py-3 px-0 md:px-5 ${
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
                                {coinName}
                              </Typography>                             
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-md font-semibold text-blue-gray-600">
                            {price}
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
                           {unit}
                          </Typography>
                        </td>                      
                        <td className={className}>
                          <Typography className="text-md font-semibold text-blue-gray-600">
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
  )
}

export default CryptoTable