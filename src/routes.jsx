import { HomeIcon} from "@heroicons/react/24/solid";
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';
import { BsCurrencyExchange } from "react-icons/bs";
import OilBarrelOutlinedIcon from '@mui/icons-material/OilBarrelOutlined';
import { Home, Cryptos, News, Charts} from "@/pages/dashboard";
import {Currencies, CurrenciesNews} from "@/pages/dashboard/Currencies"
import { Commodities, CommoditiesNews } from "@/pages/dashboard/Commodities";
// import { Link } from "react-router-dom";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/Home",
        element: <Home />,
      },    
    ],
  },
  {
    title: "cryptos details",
    layout: "dashboard",
    pages: [
      {
        icon: <CurrencyBitcoinOutlinedIcon {...icon} />,
        name: "Cryptos",
        path: "/cryptos",
        element: <Cryptos />,
      },
      {
        icon: <NewspaperOutlinedIcon {...icon} />,
        name: "news",      
        path: '/news',
        element: <News />,
      },
      // {
      //   icon: <QueryStatsOutlinedIcon {...icon} />,
      //   name: "charts",
      //   path: "/charts",
      //   element: <Charts />,
      // },     
    ],
  },
  {
    title: "currencies details",
    layout: "dashboard",
    pages: [
      {
        icon: <BsCurrencyExchange {...icon} />,
        name: "Currencies",
        path: "/currencies",
        element: <Currencies/>,
      },
      {
        icon: <NewspaperOutlinedIcon {...icon} />,
        name: "news",
        path: "/currenciesNews",
        element: <CurrenciesNews />,
      },     
    ],
  },
  {
    title: "commodities details",
    layout: "dashboard",
    pages: [
      {
        icon: <OilBarrelOutlinedIcon {...icon} />,
        name: "commodities",
        path: "/commodities",
        element: <Commodities />,
      },
      {
        icon: <NewspaperOutlinedIcon {...icon} />,
        name: "news",
        path: "/commoditiesNews",
        element: <CommoditiesNews />,
      },     
    ],
  },
];

export default routes;
