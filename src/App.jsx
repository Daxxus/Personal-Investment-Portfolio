import { Routes, Route, Navigate } from "react-router-dom";
// import { Dashboard } from "@/layouts";
import { Suspense, lazy } from "react"
const Error = lazy(() => import("./layouts/error"))
const CryptoDetails = lazy(() => import("./pages/dashboard/cryptoDetails"))
const CommodityDetails = lazy(() => import("./pages/dashboard/Commodities/CommodityDetails"))
const CurrencyDetails = lazy(() => import(`./pages/dashboard/Currencies/CurrencyDetails`))
const Dashboard = lazy(() => import("./layouts/dashboard.jsx"))
// import { CryptoDetails } from "@/pages/dashboard";
import CircularWithValueLabel from "./pages/details/loader";
import {
	QueryClient,
	QueryClientProvider,
	QueryCache,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const queryClient = new QueryClient({
	queryCache: new QueryCache(),
	defaultOptions: {
		queries: {
			staleTime: 60_000,
		},
	},
})

function App() {
  return (    
    <QueryClientProvider client={queryClient}>
      {/* {process.env.NODE_ENV === "development" && (
					<ReactQueryDevtools initialIsOpen={false} position='bottom' />
				)} */}
        <Suspense fallback={<CircularWithValueLabel />}>
          <Routes>
              <Route path="dashboard/*" element={<Dashboard />} />
              <Route element={<CryptoDetails />} path='/crypto/:coinId' />       
              <Route element={<CommodityDetails />} path='/commodity/:commId' />       
              <Route element={<CurrencyDetails />} path='/currency/:currencyId' />       
              <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
              <Route element={<Error />} path='*' />
          </Routes>   
        </Suspense>      
   </QueryClientProvider>
  );
}

export default App;

           