import millify from "millify";
import { SiCoinmarketcap } from "react-icons/si";
import { Ri24HoursLine } from "react-icons/ri";
import { SiMicrosoftexchange } from "react-icons/si";
import { SiMarketo } from "react-icons/si";
import { useGetCryptosQuery } from "@/redux/apis/CryptoApi";

 const useStatisticCard = () => {
const {data:crypt} = useGetCryptosQuery(1)  

return [
    {
      color: "gray",
      icon: SiCoinmarketcap,
      title: "Total Cryptos Market Cap",
      // value: millify(crypt?.data.stats.totalMarketCap) ,
      value: `${crypt?.data.stats.totalMarketCap && millify(crypt?.data.stats.totalMarketCap)}`,        
      footer: {
        color: "text-green-500",
        value: "+515%",
        label: "than last week",
      },
    },
    {
      color: "gray",
      icon: Ri24HoursLine,
      title: "Total Cryptos 24h vol.",
      value: `${crypt?.data.stats.total24hVolume && millify(crypt?.data.stats.total24hVolume)}`,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "gray",
      icon: SiMicrosoftexchange,
      title: "Total Cryptos Exchange",
      value: `${crypt?.data.stats.totalExchanges && millify(crypt?.data.stats.totalExchanges)}`,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: SiMarketo,
      title: "Total Cryptos Markets",
      value: `${crypt?.data.stats.totalMarkets && millify(crypt?.data.stats.totalMarkets)}`,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];
  
}
export default useStatisticCard

