import React from "react";
import {Chart as ChartJS, defaults} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Typography } from "@material-tailwind/react"
import revenuesData from "../../../datas/RevenuesData.json"
import millify from "millify"
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "lime";

export function ProgressiveLineChart({historyRates, passedCurrency, currentPrice}) {
    // console.log(historyRates)
  const testArray = []
  const data = [];
  const data2 = [];
  const entries = Object.entries(historyRates?.rates || {})?.sort()?.map(( val) => ( val))	
  const first = entries[0][1][`${passedCurrency}`]
  const last = entries[entries.length -1][1][`${passedCurrency}`]
  const change = ((last - first) / first) * 100

  let prev = 100
  let prev2 = 80
  for (let i = 0; i < entries.length; i++) {
    // console.log(entries[i][1][`${passedCurrency}`])
    // console.log(entries[i][0]);
      
    testArray?.push({x: entries[i][0], y: entries[i][1][`${passedCurrency}`]});
    prev += 5 - Math.random() * 10;
    data.push({x: entries[i][0], y: entries[i][1][`${passedCurrency}`]});
    // prev2 += 5 - Math.random() * 10;
    // data2.push({x: i, y: prev2});
  }
  
 testArray?.map(({x})  => console.log(x))
  const totalDuration = 10000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'string',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };
  const datas = {
    // labels: testArray?.map(({x})  => x),
        datasets: [{
          label: `Revenue`,
          // data: testArray?.map(({[x,y]})  => x,y),
        //   data: revenuesData.map(({revenue}) => revenue),
          borderColor: `red`,
          borderWidth: 1,
          radius: 0,
          data: data,
          hoverBackgroundColor: [
            "rgb(0,0,0)",  
        ],
        },
        // {
        //   label: "Cost",
        //   borderColor: `blue`,
        //   borderWidth: 1,
        //   radius: 0,
        //   borderRadius:5,
        //   data: data2,
        // //    backgroundColor: [
        // //     "rgba(43,63,229,0.8",         
        // //     "rgba(250,192,19,0.8",         
        // //     "rgba(253,135,135,0.8",         
        // // ],
        // }
    ]
      } 
const options = {
    // animation,
    
    interaction: {
      intersect: true
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      // legend: true,
      title: {
        text: "Monthly Revenue & Cost",
      },
    },
    scales: {
      x: {
        type: 'linear'
      }
    }}
  
   return (
      <div>
        <div className="flex justify-between p-4 ">
				<Typography className="font-bold">
				{`coinName`} Price Chart
				</Typography>
				<div className="justify-between flex  "> 
					{ change > 0 ? <Typography color="green" className=" font-bold px-4">Change: {change && millify(change,{precision:2})}%</Typography> :<Typography color="red" className="font-bold px-4">Change: {change &&  millify(change,{precision:2})}%</Typography>}
					<Typography className="font-bold">
					Current {`coinName`} Price: $ {currentPrice}
					</Typography>
				</div>
			</div>
        <Line data={datas} options={options} />
      </div>      
   )     
}

export default ProgressiveLineChart;