import { Line } from "react-chartjs-2"
import { Chart,  registerables } from "chart.js"
import React from "react"
import { Typography } from "@material-tailwind/react"
import millify from "millify"
Chart.register(...registerables)

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
	// console.log(coinHistory)
	// console.log(currentPrice);
	const coinPrice = []
	const coinTimestamp = []
	const change = coinHistory?.data?.change

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		coinPrice.push(coinHistory?.data?.history[i]?.price)
	}
	for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
		coinTimestamp.push(
			new Date(
				Number(coinHistory?.data?.history[i]?.timestamp * 1000)
			).toLocaleDateString()
		)
	}
// console.log(coinTimestamp);
	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: `Current price ${currentPrice} $`,				
				data: coinPrice,
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
				display: false,
				position: "top",
			},
			title: {
				display: false,
				text: coinName,
			},
		},
	}

	return (
		<main>		
			<div className="flex justify-between p-4 ">
				<Typography className="font-bold">
				{coinName} Price Chart
				</Typography>
				<div className="justify-between flex  "> 
					{ change > 0 ? <Typography color="green" className=" font-bold px-4">Change: {change && millify(change)}%</Typography> :<Typography color="red" className="font-bold px-4">Change: {change &&  millify(change)}%</Typography>}
					<Typography className="font-bold">
					Current {coinName} Price: $ {currentPrice}
					</Typography>
				</div>
			</div>	
			<div className='h-96'>
			    <Line data={data} options={options} />
			</div>	
		</main>
	)
}

export default LineChart