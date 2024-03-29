import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const currenciesHeaders = {
	// 'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
	// 'X-RapidAPI-Key': 'de0ce4fd20msh16fb3ec0272e347p111f3fjsnae6a889af005',
	// 'X-RapidAPI-Key': '2d23020e6dmshd2bc480850281a6p1cbab5jsn65c2899d810e',
	// 'X-RapidAPI-Key': 'a17a05bf27msh37cd5531b809c86p1d8d1ejsnce22fcdb47fb',
	'X-RapidAPI-Key': 'd20f62e177msh53415e5ecd61ddap1dae35jsncb7fa3b0c5b7',
    'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
}

const baseUrl = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: currenciesHeaders })

export const recentExchangeRates = createApi({
	reducerPath: "recentExchangeRates",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getRecentRates :builder.query({
			query:(currency)=>createRequest(`/latest?base=${currency} `)
		}),				
		getHistoricalRates :builder.query({
			query:({base, into, startDate})=>createRequest(`/${startDate}&base=${base}&symbols=${into}`)
		}),				
		getTimeseriesRates :builder.query({
			query:({base, startDate , endDate, into})=>createRequest(`/timeseries&start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${into}`)
		}),				
		getFluctuationRates :builder.query({
			query:({currency, endDate, startDate})=>createRequest(`/fluctuation&start_date=${startDate}&end_date=${endDate}&base=${currency}`)
		}),				
		getFluctuation :builder.query({
			query:({currency, endDate, startDate, into})=>createRequest(`/fluctuation&start_date=${startDate}&end_date=${endDate}&base=${currency}&symbols=${into}`)
		}),				
		getCurrenciesSymbols :builder.query({
			query:()=>createRequest(`/symbols`)
		}),				
	}),
}) 

export const { useGetRecentRatesQuery, useGetHistoricalRatesQuery, useGetTimeseriesRatesQuery, useGetFluctuationRatesQuery, useGetCurrenciesSymbolsQuery, useGetFluctuationQuery } = recentExchangeRates

