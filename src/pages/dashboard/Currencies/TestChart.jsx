import React from 'react'
import { Line } from "react-chartjs-2"
import { Chart,  registerables } from "chart.js"
import { Typography } from "@material-tailwind/react"
import millify from "millify"
Chart.register(...registerables)

const TestChart = ({ historyRates, currentPrice, coinName , passedCurrency}) => {

	const currencyValue = Object.values(historyRates?.rates || {})?.map((val) => val)
	const currencyDate = Object.keys(historyRates?.rates || {})?.map((key) => key)
	const coinPrice = []
	const coinTimestamp = []
	// const sss = currencyValue.sort()
	const sorted = currencyDate.sort()


	// console.log(historyRates?.rates)
	// console.log(sorted)
	// console.log(currencyValue)

	const first = currencyValue[0][`${passedCurrency}`]
	const last = currencyValue[currencyValue.length -1][`${passedCurrency}`]
	const change = ((first - last) / last) * 100


    for (let i = 0; i < currencyValue.length; i ++) {
		coinPrice.push(currencyValue[i][`${passedCurrency}`])
        coinTimestamp.push(currencyDate[i])
	}
	// for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
	// 	coinTimestamp.push(
	// 		new Date(
	// 			Number(coinHistory?.data?.history[i]?.timestamp * 1000)
	// 		).toLocaleDateString()
	// 	)
	// }
    // console.log(coinTimestamp)
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
					{ change > 0 ? <Typography color="green" className=" font-bold px-4">Change: {change && millify(change,{precision:2})}%</Typography> :<Typography color="red" className="font-bold px-4">Change: {change &&  millify(change,{precision:2})}%</Typography>}
					<Typography className="font-bold">
					Current {coinName} Price: $ {currentPrice}
					</Typography>
				</div>
			</div>		
			<Line data={data} options={options} />
		</main>
	)
}

export default TestChart