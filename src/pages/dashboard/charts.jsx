import React from "react";
import {Chart, defaults, registerables,} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
// import "chartjs-adapter-date-fns"
// import {enGB} from "date-fns/locale"
import rev from "../../datas/RevenuesData.json"

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "lime";

defaults.animation = true;
defaults.showScale = true;
defaults.scaleOverride = false;
defaults.scaleSteps = null;
defaults.scaleStepWidth = null;
defaults.scaleStartValue = null;
defaults.scaleLineColor = "rgba(0,0,0,.1)";
defaults.scaleLineWidth = 1;
defaults.scaleShowLabels = true;
defaults.scaleLabel = "<%=value%>";
defaults.scaleIntegersOnly = true;
defaults.scaleBeginAtZero = false;
defaults.scaleFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
defaults.scaleFontSize = 12;
defaults.scaleFontStyle = "normal";
defaults.scaleFontColor = "#666";
defaults.showTooltips = true;
defaults.customTooltips = false;
defaults.tooltipEvents = ["mousemove", "touchstart", "touchmove"];
defaults.tooltipFillColor = "rgba(0,0,0,0.8)";
defaults.tooltipFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
defaults.tooltipFontSize = 14;
defaults.tooltipFontStyle = "normal";
defaults.tooltipFontColor = "#fff";
defaults.tooltipTitleFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
defaults.tooltipTitleFontSize = 14;
defaults.tooltipTitleFontStyle = "bold";
defaults.tooltipTitleFontColor = "#fff";
defaults.tooltipYPadding = 6;
defaults.tooltipXPadding = 6;
defaults.tooltipCaretSize = 8;
defaults.tooltipCornerRadius = 6;
defaults.tooltipXOffset = 10;
defaults.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>";
defaults.multiTooltipTemplate = "<%= value %>";
defaults.onAnimationProgress = function() {};
defaults.onAnimationComplete = function() {};

export function Charts() {
  const labels = rev.map(({label})=> label)
  const revenues = rev.map(({revenue})=> revenue)
  //  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < 1000; i++) {
  prev += 5 - Math.random() * 10;
  data.push({x: i, y: prev});
  prev2 += 5 - Math.random() * 10;
  data2.push({x: i, y: prev2});
} 

var dacia = [
  {
    x: '01.12.2019',
    y: 20
  },
  {
    x: '19.03.2020',
    y: 26
  },
  {
    x: '01.08.2021',
    y: 9
  },
  {
    x: '11.01.2022',
    y: 55
  }
];

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
 }
 const datas = {
  // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']  ,         
    datasets: [{
      borderColor: `red`,
      borderWidth: 1,
      radius: 0,
      data: data,
    },
    {
      borderColor: `blue`,
      borderWidth: 1,
      radius: 0,
      data: data2,
    }
  ]            
  } 

  const options = {
    animation,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      legend: false,
      title: {
        text: "Monthly Revenue & Cost",
      },
    },
    scales: {
       x: {
        type: 'linear',
        time: {
          unit: 'day',
          parser: 'dd.mm.yyyy'
        },
      },
    }
   }      
  //  var myChart = new Chart(
  //   document.getElementById('myChart'),
  //   config
  // );

   return (
    <div>
      <Line data={datas} options={options}/>
    </div>
          
    )    
 }
export default Charts