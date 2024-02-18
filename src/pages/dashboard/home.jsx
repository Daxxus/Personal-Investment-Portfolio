import React from "react";
import {Typography} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { StatisticsCard, StatsCurrencyCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import useStatisticCard from "@/data/statistics-cards-data";
import useCurrenciesStatsDataCard from "@/data/stats-currencies-rates.data";
import { Cryptos } from "./cryptos";
import { useGetCryptosQuery } from "@/redux/apis/CryptoApi";
import { projectsData, statisticsChartsData } from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";


export function Home() { 
  const cryptos  = useStatisticCard()
  const currencies = useCurrenciesStatsDataCard()

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {cryptos.map(({ icon, title, footer, ...rest }) => (//carty total
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
            Top 5 Crypto Currencies
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
            Top 5 Forex Currency pairs
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              <Link to={`/dashboard/cryptos`}>More Forex Pairs</Link>              
            </Typography>
        </div>
           {/* <Cryptos top5 />        */}
      </div>
    </div>
  );
}

export default Home;

{/* <Card className=" mb-6  border border-blue-gray-100">
<CardBody className="p-4">
<div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
 {projectsData.map(
   ({ img, title, description, tag, route }) => (
     <Card key={title} color="transparent" shadow={false}>
       <CardHeader
         floated={false}
         color="gray"
         className="mx-0 mt-0 mb-4 h-64 xl:h-40"
       >
         <img
           src={img}
           alt={title}
           className="h-full w-full object-cover"
         />
       </CardHeader>
       <CardBody className="py-0 px-1">
         <Typography
           variant="small"
           className="font-normal text-blue-gray-500"
         >
           {tag}
         </Typography>
         <Typography
           variant="h5"
           color="blue-gray"
           className="mt-1 mb-2"
         >
           {title}
         </Typography>
         <Typography
           variant="small"
           className="font-normal text-blue-gray-500"
         >
           {description}
         </Typography>
       </CardBody>
       <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
      
       </CardFooter>
     </Card>
   )
 )}
</div>
</CardBody>
</Card> */}