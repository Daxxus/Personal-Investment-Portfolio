import React from 'react'
import { useParams } from 'react-router-dom'
import CircularWithValueLabel from '../../details/loader'
import {Sidenav,DashboardNavbar,Configurator,Footer} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useGetSingleCommoditiesQuery } from '@/redux/apis/CommodityApi'
import CommodityLineChart from './CommodityChart';
import { useLocation } from 'react-router-dom'
import {Card,	CardHeader,	CardBody,	Typography,	} from "@material-tailwind/react";
import { FcComboChart } from "react-icons/fc";
import {CommodityTableTransactions} from "@/pages/dashboard/Commodities/index"

export const CommodityDetails = () => {
  const location = useLocation()
  const { curr } = location.state || {}
  let {commId} = useParams()  

 if(commId.slice(0,3) === `MCX`){
      if(commId.includes(`WTI`)){   
          commId =  commId.slice(4,-4)   
      }else{
        commId =  commId.slice(4) 
      } 
  } 

  if(commId.includes(``)){
    commId = commId.replace(/\s+/g, '-')
  } 

  if(commId.includes(`WTI`)){
    commId =  commId.slice(0,-4) 
  }  

  const {data: singleCommodity, isFetching} = useGetSingleCommoditiesQuery(commId)
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
 
  if(isFetching) return <CircularWithValueLabel/>
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
          <CommodityLineChart history={singleCommodity} name={commId} currency={curr}/>   
          <Typography variant="h4" color="blue" className="font-normal m-5" >
			      <a href="#table"> <button> Check out Your transaction history </button> </a>
		      </Typography>
          <Card className='mt-12 mb-8'>
            <CardHeader variant="gradient" color="teal" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              {commId} 30 days Value Stats
            </Typography>
            </CardHeader>
            <CardBody >
              <table className="w-full table-auto ">	
             
                
                <tbody>				
                  {singleCommodity?.data.map((item,i) =>  (    
                      <tr key={i} className='flex justify-between border-b border-blue-gray-50  text-sm'>
                        <td className={" py-2 px-3 "}>
                         {/* { console.log(item[`Change %`].slice(0,-1)   > 0) } */}
                            <div className='grid xs:grid-cols-1 sm:grid-cols-2'>
                              <Typography
                              variant="h6"
                              color="blue-gray"
                              className="font-normal flex "                          
                              >
                                <div className="mr-2 text-xl ">								
                                  <FcComboChart />  
                                </div>
                                {item.Date}
                              </Typography>
                            </div>
                        </td>			
                        
                        <td className={"py-2 "}>
                          <div className='grid xs:grid-cols-1 sm:grid-cols-3'>
                              <Typography className=" font-normal text-blue-gray-500 px-4" >
                              {item.Price.toFixed(2)}
                              </Typography>
                              
                              {item["Change %"].slice(0,-1) > 0 ?   <Typography color='green' className="font-bold ">
                              {item["Change %"]}
                              </Typography> :
                                <Typography className="font-bold " color="red">
                                {item["Change %"]}
                                </Typography> }                            

                              <Typography className=" font-semibold text-blue-gray-600">
                              {item["Vol."]}
                              </Typography>
                          </div>
                        </td>								
                      </tr>                   
                  ) )}             
                </tbody>
              </table>
            </CardBody>
			    </Card>
          <div id='table'>
            <CommodityTableTransactions name={commId} commodityHistory={singleCommodity}/>
          </div>
          
          <div className="text-blue-gray-600" >
            <Footer />
          </div>
        </div>
    </main>
  )
}

export default CommodityDetails

