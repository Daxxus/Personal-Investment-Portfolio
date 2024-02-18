  import { FaEuroSign } from "react-icons/fa";
  import { FaPoundSign } from "react-icons/fa";
  import { FaDollarSign } from "react-icons/fa"; 
  import millify from "millify"; 
  import { useGetRecentRatesQuery } from "@/redux/apis/CurrencyApi";  
  import { useGetFluctuationRatesQuery } from "@/redux/apis/CurrencyApi";
  import { Typography } from "@material-tailwind/react"
  
   const useCurrenciesStatsDataCard = () => {    
    const {data:latestEUR}= useGetRecentRatesQuery(`EUR`)
    const {data:latestUSD} = useGetRecentRatesQuery(`USD`)
    const {data:latestGBP} = useGetRecentRatesQuery(`GBP`)     

    const today = latestEUR?.date
    const current = new Date();
    current.setDate(current.getDate() - 1)
    const previousDay = current.toLocaleDateString(`en-CA`)
  
    const {data:fluctuationEUR}= useGetFluctuationRatesQuery({
      currency: "EUR",
      endDate: today,
      startDate: previousDay
       })
    const {data:fluctuationUSD}= useGetFluctuationRatesQuery({
      currency: "USD",
      endDate: today,
      startDate: previousDay
      })
    const {data:fluctuationGBP}= useGetFluctuationRatesQuery({
      currency: "GBP",
      endDate: today,
      startDate: previousDay
      })

    const euroChangeToUSD = fluctuationEUR?.rates?.USD?.change_pct
    const euroChangeToPLN = fluctuationEUR?.rates?.PLN?.change_pct
    const usdChangeToCHF = fluctuationUSD?.rates?.CHF?.change_pct
    const usdChangeToPLN = fluctuationUSD?.rates?.PLN?.change_pct
    const gbpChangeToUSD = fluctuationGBP?.rates?.USD?.change_pct   
   
  return [
      {
        color: "green",
        icon:  FaEuroSign,      
        title: "EUR/USD ",        
        value: `${latestEUR?.rates?.USD && millify(latestEUR?.rates?.USD,{precision: 4,
          lowercase: true})}`,        
        footer: {
          color: "text-green-500",
          value: euroChangeToUSD
           > 0 ? <Typography color="green" className=" font-bold">{euroChangeToUSD
             && millify(euroChangeToUSD
            ,{precision:2})} %</Typography>: <Typography color="red" className=" font-bold">{euroChangeToUSD
             &&  millify(euroChangeToUSD
            ,{precision:2})}  %</Typography>,         
          label: "day-to-day",
        },
      },
      {
        color: "green",
        icon: FaPoundSign,
        title: "GBP/USD",
        value: `${latestGBP?.rates?.USD && millify(latestGBP?.rates?.USD,{precision: 4})}`,
        footer: {
          color: "text-green-500",
          value: gbpChangeToUSD
          > 0 ? <Typography color="green" className=" font-bold">{gbpChangeToUSD
            && millify(gbpChangeToUSD
           ,{precision:2})} %</Typography>: <Typography color="red" className=" font-bold">{gbpChangeToUSD
            &&  millify(gbpChangeToUSD
           ,{precision:2})}  %</Typography>,
          label: "day-to-day",
        },
      },
      {
        color: "green",
        icon: FaDollarSign,
        title: "USD/CHF",
        value: `${latestUSD?.rates?.CHF && millify(latestUSD?.rates?.CHF,{precision: 4})}`,        
        footer: {
          color: "text-red-500",
          value: usdChangeToCHF
          > 0 ? <Typography color="green" className=" font-bold">{usdChangeToCHF
            && millify(usdChangeToCHF
           ,{precision:2})} %</Typography>: <Typography color="red" className=" font-bold">{usdChangeToCHF
            &&  millify(usdChangeToCHF
           ,{precision:2})}  %</Typography>,
          label: "day-to-day",
        },
      },
      {
        color: "green",
        icon: FaEuroSign,
        title: "EUR/PLN",
        value: `${latestEUR?.rates?.PLN && millify(latestEUR?.rates?.PLN,{precision: 4})}`,
        footer: {
          // color: "text-red-500",
          value: euroChangeToPLN
          > 0 ? <Typography color="green" className=" font-bold">{euroChangeToPLN
            && millify(euroChangeToPLN
           ,{precision:2})} %</Typography>: <Typography color="red" className=" font-bold">{euroChangeToPLN
            &&  millify(euroChangeToPLN
           ,{precision:2})}  %</Typography>, 
          label: "day-to-day",
        },
      },
      {
        color: "green",
        icon: FaDollarSign,
        title: "USD/PLN",
        value: `${latestUSD?.rates?.PLN && millify(latestUSD?.rates?.PLN,{precision: 4})}`,
        footer: {
          color: "text-green-500",
          value: usdChangeToPLN
          > 0 ? <Typography color="green" className=" font-bold">{usdChangeToPLN
            && millify(usdChangeToPLN
           ,{precision:2})} %</Typography>: <Typography color="red" className=" font-bold">{usdChangeToPLN
            &&  millify(usdChangeToPLN
           ,{precision:2})}  %</Typography>,
          label: "day-to-day",
        },
      },
    ];
    
  }
  export default useCurrenciesStatsDataCard