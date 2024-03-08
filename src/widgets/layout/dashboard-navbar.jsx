import { useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom"
import { useCalculateContext } from "@/context/Calculation/useCalculateContext";
import {Navbar,Typography,IconButton,Breadcrumbs} from "@material-tailwind/react";
import {Cog6ToothIcon,Bars3Icon} from "@heroicons/react/24/solid";
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
  const {currencyROI, commodityyROI, coinROI, totalROI } = useCalculateContext()
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  
  const Links = [
    {label: (
      <Button
      color="primary"
      disabled={false}
      loading={false}
      onClick={function(){}}
      size="lg"
      variant="plain"
      >
       ROI Coins: {coinROI}
      </Button>),to : "/fdf"},
    {label: (
      <Button
      color="success"
      disabled={false}
      loading={false}
      onClick={function(){}}
      size="lg"
      variant="soft"
      >
       ROI Commodities: {commodityyROI}
      </Button>),to : "/fwefew"},
    {label:   ( <Button
      color="danger"
      disabled={false}
      loading={false}
      onClick={function(){}}
      size="lg"
      variant="outlined"
      >
       ROI Currencies: {currencyROI}
      </Button>),to : "/"},
    {label: (
      <Button
      color="neutral"
      disabled={false}
      loading={false}
      onClick={function(){}}
      size="lg"
      variant="solid"
      >
       ROI Total: {totalROI}
      </Button>),to : "/"},
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
        <div className="">

          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            {Links.map(({label,to},i)  => (
              <Nav key={i}>
                  <NavLink
                    to={to}
                    // end
                  >
                    {label}
                  </NavLink>
              </Nav>

            ))}

            {/* <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link> */}
            {/* <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
             ROI
            </Typography> */}
          </Breadcrumbs>
          {/* <Typography variant="h6" color="blue-gray">
           patrz DashboardNavbar
          </Typography> */}

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

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
