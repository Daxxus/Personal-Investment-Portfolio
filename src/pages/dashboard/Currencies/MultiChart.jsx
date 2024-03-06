import React from 'react'
import {Chart as ChartJS, defaults} from 'chart.js/auto';
import { Line , Bar} from 'react-chartjs-2';
import sourceData from "../../../datas/chartData.json"
import revenuesData from "../../../datas/RevenuesData.json"

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "lime";



const MultiChart = () => {
  return (
    <main>

        <div> <Line
            data={{
                labels: revenuesData.map(({label}) => label),
                datasets: [
                {
                    label: `Revenue`,
                    data: revenuesData.map(({revenue}) => revenue),
                    backgroundColor: "#064FF0",
                    hoverBackgroundColor: [
                        "rgb(0,0,0)",  
                    ],
                    borderColor: "#064FF0" 
                 },
                 {
                    label: "Cost",
                    data: revenuesData.map(({cost}) => cost),
                    backgroundColor: "#FF3030",
                    borderColor: "#FF3030",
                  },
            ]
            }} 
            options={{
                elements: {
                  line: {
                    tension: 0.5,
                  },
                },
                plugins: {
                  title: {
                    text: "Monthly Revenue & Cost",
                  },
                },
              }}

        /></div>
        <div> <Bar
            data={{
                labels: sourceData.map(({label}) => label),
                datasets: [
                {
                    label: `count`,
                    data: sourceData.map(({value}) => value),
                    backgroundColor: [
                        "rgba(43,63,229,0.8",         
                        "rgba(250,192,19,0.8",         
                        "rgba(253,135,135,0.8",         
                    ],
                    hoverBackgroundColor: [
                        "rgb(120,120,120)",  
                        "rgb(180,120,120)",  
                    ],
                    borderRadius:5
                },
                {
                    label: `Loss`,
                    data:[20,60,40]
                }
            ]
            }} 
                   
        /></div>
    </main>
  )
}

export default MultiChart
