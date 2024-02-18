import { chartsConfig } from "@/configs";


// const useCustomChart = ({cryptoHistory}) => {

// }

const dailySalesChart = {
  type: "line",
  height: 280,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Daily Sales title",
    description: "15% increase in today sales",
    footer: "updated 4 min ago footer",
    chart: dailySalesChart,
  }

];

export default statisticsChartsData;
