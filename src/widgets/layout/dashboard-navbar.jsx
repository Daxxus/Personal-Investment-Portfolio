import { useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom"
import { useCalculateContext } from "@/context/Calculation/useCalculateContext";
import {Navbar,Typography,IconButton,Breadcrumbs} from "@material-tailwind/react";
import {Cog6ToothIcon,Bars3Icon} from "@heroicons/react/24/solid";
import millify from 'millify';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import {useMaterialTailwindController,setOpenConfigurator,setOpenSidenav} from "@/context"

const Nav = ({children}) => {
  return(
    <Box
    px={2}
    py={1}    
    >
      {children}
    </Box>
  )
}
export function DashboardNavbar() {
  const {currencyROI, commodityyROI, coinROI } = useCalculateContext()
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller; 
  const sumUp =  Number(currencyROI )  + Number(coinROI) + Number (commodityyROI)
  
  const Links = [
    {label: (
      <Button
      color="neutral"
      fullWidth
      disabled={false}
      loading={false}
      onClick={function(){}}
      size="lg"
      variant="outlined"
      >
         {coinROI > 0 ? <Typography color="green" className="mt-1 mb-2 font-medium">ROI Coins: {millify(coinROI)}</Typography> :<Typography color="red" className="mt-1 mb-2 font-medium">ROI Coins:  {millify(coinROI)}</Typography>}     
       
      </Button>),to : "nowhere"},
    {label: (
      <Button
      fullWidth
      color="neutral"
      disabled={false}
      loading={false}
      onClick={function(){}}
      size="lg"
      variant="outlined"
      >
       {commodityyROI > 0 ? <Typography color="green" className="mt-1 mb-2 font-medium">ROI Commodity: {millify(commodityyROI)}</Typography> :<Typography color="red" className="mt-1 mb-2 font-medium">ROI Commodity:  {millify(commodityyROI)}</Typography>} 
      </Button>),to : "nowhere"},
    {label:   ( <Button
      color="neutral"
      fullWidth
      disabled={false}
      loading={false}
      onClick={function(){}}
      size="lg"
      variant="outlined"
      >
       {currencyROI > 0 ? <Typography color="green" className="mt-1 mb-2 font-medium">ROI Currency: {millify(currencyROI)}</Typography> :<Typography color="red" className="mt-1 mb-2 font-medium">ROI Currency:  {millify(currencyROI)}</Typography>} 
      </Button>),to : "nowhere"},
    {label: (
      <Button
      color="neutral"
      fullWidth
      disabled={false}
      loading={false}
      onClick={function(){}}
      size="lg"
      variant="solid"
      >
        {sumUp > 0 ? <Typography color="green" className="mt-1 mb-2 font-medium">ROI Total: {millify(sumUp)}</Typography> :<Typography color="red" className="mt-1 mb-2 font-medium">ROI Total:  {millify(sumUp)}</Typography>} 
      </Button>),to : "nowhere"},
  ]

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">

          {/* <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          > */}
            {Links.map(({label,to},i)  => (
              <Nav key={i}>
                  <NavLink
                    to={to}
                    
                  >
                    {label}
                  </NavLink>
              </Nav>
            ))}
          {/* </Breadcrumbs> */}
        </div>
        <div className="flex items-center">         
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>        
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

// DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
