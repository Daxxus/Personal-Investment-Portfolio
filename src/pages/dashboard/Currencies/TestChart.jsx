import React from 'react'
import { Line } from "react-chartjs-2"
import { Chart,  registerables } from "chart.js"
import { Typography } from "@material-tailwind/react"
import millify from "millify"
Chart.register(...registerables)

const TestChart = ({ historyRates, currentPrice, coinName , passedCurrency}) => {
	const test = []
	const coinPrice = []
	const coinTimestamp = []
	const entries = Object.entries(historyRates?.rates || {})?.sort()?.map(( val) => ( val))	
	
	const first = entries[0][1][`${passedCurrency}`]
	const last = entries[entries.length -1][1][`${passedCurrency}`]
	const change = ((last - first) / first) * 100	

    for (let i = 0; i < entries.length; i ++) {
		// coinPrice.push(entries[i][1][`${passedCurrency}`])
        // coinTimestamp.push(entries[i][0])
		test.push({x: entries[i][0], y: entries[i][1][`${passedCurrency}`]})
	}	
	
	const data = {
		labels: test?.map(({x})  => x),
		datasets: [
			{
				label: `Current price ${currentPrice} $`,				
				data: test?.map(({y})  => y),
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