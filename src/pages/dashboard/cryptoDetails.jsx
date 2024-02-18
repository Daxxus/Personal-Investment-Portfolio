import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import { useParams } from "react-router-dom"
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '@/redux/apis/CryptoApi'
import CircularWithValueLabel from '../details/loader'
import { FaSackDollar } from "react-icons/fa6";
import { MdNumbers } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { SiMaxplanckgesellschaft } from "react-icons/si";
import { GrCurrency } from "react-icons/gr";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { PiListNumbersThin } from "react-icons/pi";
import { SiMicrosoftexchange } from "react-icons/si";
import { FaTrademark } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { AiOutlineStop } from "react-icons/ai";
import { IconButton } from "@material-tailwind/react";
import { SiVirustotal } from "react-icons/si";
import { MdBlurCircular } from "react-icons/md";
import SelectVariants from '../details/select'
import LineChart from './lineChart'
import {
	Card,
	CardHeader,
	CardBody,
	Typography,	
  } from "@material-tailwind/react";

import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export const CryptoDetails = () => {
  const {coinId} = useParams()
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [period, setPeriod ] = useState(`24h`)
  const {data:cryptoHistory}= useGetCryptoHistoryQuery({coinId, period})
  const {data:cryptoDetail, isFetching} = useGetCryptoDetailsQuery(coinId)

  const periodArray = ["1h","3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"]
  const singleCryptoDetail = cryptoDetail?.data.coin

  const setSelect = (e) => {	
	setPeriod(e.target.value)
  }

  const coinPrice = []
  const coinTimestamp = []

  for (let i = 0; i < cryptoHistory?.data?.history?.length; i += 1) {
	  coinPrice.push(cryptoHistory?.data?.history[i]?.price)
  }
  for (let i = 0; i < cryptoHistory?.data?.history?.length; i++) {
	  coinTimestamp.push(
		  new Date(
			  Number(cryptoHistory?.data?.history[i]?.timestamp * 1000)
		  ).toLocaleDateString()
	  )
  }
 
  const cryptoStats = [
    { title: "Rank", value: singleCryptoDetail?.rank, icon: <MdNumbers /> },
		{
			title: "Price to USD",
			value: `$ ${singleCryptoDetail?.price && millify(singleCryptoDetail?.price)}`,
			icon: <FaSackDollar />,
		},
		{
			title: "24h Volume",
			value: `$ ${
				singleCryptoDetail?.[`24hVolume`] && millify(singleCryptoDetail?.[`24hVolume`])
			}`,
			icon: <FcSalesPerformance />,
		},
		{
			title: "Market Cap",
			value: `$ ${
				singleCryptoDetail?.marketCap && millify(singleCryptoDetail?.marketCap)
			}`,
			icon: <GrCurrency />,
		},
		{
			title: "All-time-high",
			value: `$ ${
				singleCryptoDetail?.allTimeHigh?.price &&
				millify(singleCryptoDetail?.allTimeHigh?.price)
			}`,
			icon: <SiMaxplanckgesellschaft />,
		},
	]
  const otherStats = [
		{
			title: "Number Of Markets",
			value: singleCryptoDetail?.numberOfMarkets,
			icon: <PiListNumbersThin />,
		},
		{
			title: "Number Of Exchanges",
			value: singleCryptoDetail?.numberOfExchanges,
			icon: <SiMicrosoftexchange />,
		},
		{
			title: "Aprroved Supply",
			value: singleCryptoDetail?.approvedSupply ? (
				<CiCircleCheck />
			) : (
				<AiOutlineStop />
			),
			icon: <FaTrademark />,
		},
		{
			title: "Total Supply",
			value: `$ ${
				singleCryptoDetail?.supply?.total && millify(singleCryptoDetail?.supply?.total)
			}`,
			icon: <SiVirustotal />,
		},
		{
			title: "Circulating Supply",
			value: `$ ${
				singleCryptoDetail?.supply?.circulating &&
				millify(singleCryptoDetail?.supply?.circulating)
			}`,
			icon: <MdBlurCircular />,
		},
	]  
  
    if(isFetching) return <CircularWithValueLabel/>

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />       
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
          >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <SelectVariants timeSpan={periodArray} change={setSelect} period={period}/>
        <LineChart coinHistory={cryptoHistory} currentPrice={singleCryptoDetail?.price && millify(singleCryptoDetail?.price)} coinName={singleCryptoDetail?.name}/>

		<div className="mt-12 mb-8 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-10">
			<Card>
				<CardHeader variant="gradient" color="gray" className="mb-8 p-6">
				<Typography variant="h6" color="white">
					{singleCryptoDetail?.name} Value Stats
				</Typography>
				</CardHeader>
				<CardBody >
					<table className="w-full table-auto ">				
						<tbody>				
							{cryptoStats.map(({title,icon,value},i) =>  (

							<tr key={i} className='flex justify-between border-b border-blue-gray-50  text-lg'>
								<td className={" py-3 px-5 "}>
									<div className="">								
										<div className='flex '>
											<Typography
											variant="h4"
											color="blue-gray"
											className="font-semibold"
											>
											{icon}
											</Typography>
											<Typography className=" font-normal text-blue-gray-500 px-4">
											{title}
											</Typography>
										</div>
									</div>
								</td>			
								
								<td className={"py-3 px-5"}>
									<Typography className=" font-semibold text-blue-gray-600">
									{value}
									</Typography>
								</td>								
							</tr>
							) )}								
					
						</tbody>
					</table>
				</CardBody>
			</Card>
			<Card>
				<CardHeader variant="gradient" color="gray" className="mb-8 p-6">
				<Typography variant="h6" color="white">
					{singleCryptoDetail?.name} Other Stats
				</Typography>
				</CardHeader>
				<CardBody >
					<table className="w-full table-auto ">				
						<tbody>				
							{otherStats.map(({title,icon,value},i) =>  (
							<tr key={i} className='flex justify-between border-b border-blue-gray-50  text-lg'>
								<td className={" py-3 px-5 "}>
									<div className="">								
										<div className='flex '>
											<Typography
											variant="h4"
											color="blue-gray"
											className="font-semibold"
											>
											{icon}
											</Typography>
											<Typography className=" font-normal text-blue-gray-500 px-4">
											{title}
											</Typography>
										</div>
									</div>
								</td>			
								
								<td className={"py-3 px-5"}>
									<Typography className=" font-semibold text-blue-gray-600">
									{value}
									</Typography>
								</td>								
							</tr>
							) )}								
					
						</tbody>
					</table>
				</CardBody>
			</Card>
			
		</div>   
		<div className="mt-12 mb-8 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-10">
			<Card>
				<CardHeader variant="gradient" color="gray" className="mb-8 p-6">
				<Typography variant="h6" color="white">
					What is {singleCryptoDetail?.name} about?
				</Typography>
				</CardHeader>
				<CardBody >
					<Typography className=" font-semibold text-blue-gray-600">
						{HTMLReactParser(singleCryptoDetail?.description)}									
					</Typography>
					
				</CardBody>
			</Card>
			<Card>
				<CardHeader variant="gradient" color="gray" className="mb-8 p-6">
				<Typography variant="h6" color="white">
					{singleCryptoDetail?.name} Links
				</Typography>
				</CardHeader>
				<CardBody >
					<table className="w-full table-auto ">				
						<tbody>				
							{singleCryptoDetail?.links?.map(({type,url,name},i) =>  (
							<tr key={i} className='flex justify-between border-b border-blue-gray-50  text-lg'>
								<td className={" py-3 px-5 "}>
									<div className="">								
										<div className='flex '>
											<Typography
											variant="h5"
											color="blue-gray"
											className="font-semibold"
											>
											{type}
											</Typography>										
										</div>
									</div>
								</td>			
								
								<td className={"py-3 px-5"}>
									<Typography className=" font-semibold text-blue-gray-600">
									<a href={url} target='_blank' rel='norefferer' >{name} </a>
									</Typography>
								</td>								
							</tr>
							) )}								
					
						</tbody>
					</table>
				</CardBody>
			</Card>			
		</div>        
		<div className="text-blue-gray-600">
			<Footer />
			</div>
      </div>
    </div>
  );
}

export default CryptoDetails


