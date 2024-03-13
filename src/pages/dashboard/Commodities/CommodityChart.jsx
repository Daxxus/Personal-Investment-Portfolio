import { Line } from "react-chartjs-2"
import { Chart,  registerables } from "chart.js"
import React from "react"
import { Typography } from "@material-tailwind/react"
import millify from 'millify';
import { useState, useEffect } from "react";
Chart.register(...registerables)

const CommodityLineChart = ({ history, name, currency }) => {    
	const [chartData, setChartData] = useState([])
	// const commodityPrice = []
	// const commodityDate = []
    const currentPrice = history?.data[0]?.Price
    const lastPrice = history?.data[history?.data.length -1]?.Price
	const change = (currentPrice - lastPrice) / lastPrice *100
		
	// for (let i = 0; i < history?.data?.length; i ++) {
	// 	commodityPrice.push(history?.data[i]?.Price)
    //     commodityDate.push(history?.data[i]?.Date)
	// }	

	const chart = () => {
		setChartData(history.data.map(({Price}) => Price ))
	}
	useEffect(() => {
		chart();
	  },[])
	  

	const data = {
		labels: history?.data?.map(({Date}) => Date ),
		datasets: [
			{
				label: `Current price ${currentPrice && millify(currentPrice,{precision:3})} ${currency} `,				
				data: chartData,
				fill: true,
				backgroundColor: "#0071bd",
				borderColor: "#0071bd",
				borderWidth: 1,
			},
		],
	}
	
	const options = {
		responsive:true,		
			plugins: {
			legend: {
				display: true,
				position: "top",
			},
			title: {
				display: false,
				text: name,
			},
		},
	}

	return (
		<main>		
			<div className="flex justify-between p-4 ">
				<Typography className="font-bold">
				{name} 30 days Price Chart
				</Typography>
				<div className="justify-between flex  "> 
					{ change > 0 ? <Typography color="green" className=" font-bold px-4">Change: {change && millify(change, {precision:2})}%</Typography> :<Typography color="red" className="font-bold px-4">Change: {change && millify(change, {precision:2})}%</Typography>}
					<Typography className="font-bold">
					Current {name} Price: {currency} {currentPrice}
					</Typography>
				</div>
			</div>		
			<div className='h-96'>
			    <Line data={data} options={options} />
			</div>	
		</main>
	)
}

export default CommodityLineChart
