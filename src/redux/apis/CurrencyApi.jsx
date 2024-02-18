import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const currenciesHeaders = {
    'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
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
			query:()=>createRequest(`/${`2019-10-29`}&base=${`PLN`}&symbols=${`USD,CAD,JPY`}`)
		}),				
		getTimeseriesRates :builder.query({
			query:()=>createRequest(`/timeseries?start_date=${`2012-05-01`}&end_date=${`2012-05-25`}&base=${`EUR`}&symbols=${`USD,PLN,CHF`}`)
		}),				
		getFluctuationRates :builder.query({
			query:({currency, endDate, startDate})=>createRequest(`/fluctuation?start_date=${startDate}&end_date=${endDate}&base=${currency}`)
		}),				
		getCurrenciesSymbols :builder.query({
			query:()=>createRequest(`/symbols`)
		}),				
	}),
}) 

export const { useGetRecentRatesQuery, useGetHistoricalRatesQuery, useGetTimeseriesRatesQuery, useGetFluctuationRatesQuery, useGetCurrenciesSymbolsQuery } = recentExchangeRates

