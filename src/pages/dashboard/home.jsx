import React from "react";
import {Typography} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { StatisticsCard, StatsCurrencyCard } from "@/widgets/cards";
import useStatisticCard from "@/data/statistics-cards-data";
import useCurrenciesStatsDataCard from "@/data/stats-currencies-rates.data";
import { Cryptos } from "./cryptos";
import { Commodities } from "./Commodities";
import { StatisticsChart } from "@/widgets/charts";
import { useGetCryptosQuery } from "@/redux/apis/CryptoApi";
import { projectsData, statisticsChartsData } from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";


export function Home() { 
  const cryptos  = useStatisticCard()
  const currencies = useCurrenciesStatsDataCard()

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {cryptos.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}            
            {...rest}          
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white ",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {currencies.map(({ icon, title, footer, ...rest }) => (
          <StatsCurrencyCard
            key={title}            
            {...rest}
            // color="red"           
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white ",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 flex justify-between" variant="h5">
                {/* <strong className={footer.color}> */}
                  {footer.value}
                  {/* </strong> */}
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-1 xl:grid-cols-1 ">
        {statisticsChartsData.map((props) => (//charty
          <StatisticsChart          
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
      {/* xl:grid-cols-3 */}
      <div className="mb-4 grid grid-cols-1 gap-6 ">
        <div className="flex justify-between mb-20">
           <Typography variant="h6" color="blue-gray" className="mb-2">
            Top 5 Cryptos
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              <Link to={`/dashboard/cryptos`}>More Cryptos</Link>              
            </Typography>
        </div>
           <Cryptos top5 />       
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 ">
        <div className="flex justify-between mb-20">
           <Typography variant="h6" color="blue-gray" className="mb-2">
            Top 5 Commodities
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              <Link to={`/dashboard/commodities`}>More Commodities</Link>              
            </Typography>
        </div>
        <div>

       
        </div>
      </div>
    </div>
  );
}

export default Home;

