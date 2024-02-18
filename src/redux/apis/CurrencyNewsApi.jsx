import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const currencyNewsHeaders = {
    // 'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
    // 'X-RapidAPI-Host': 'investing4.p.rapidapi.com'
    'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com',
    // params: {
    //     from_symbol: 'USD',
    //     to_symbol: 'EUR',
    //     language: 'en'
    //   },
}

// const baseUrl = 'https://investing4.p.rapidapi.com'
const baseUrl = 'https://real-time-finance-data.p.rapidapi.com'
const createRequest = (url)=>({url, headers: currencyNewsHeaders})

export const currencyNewsApi = createApi({
        reducerPath : 'currencyNewsApi',
        baseQuery : fetchBaseQuery({baseUrl}),
        endpoints : (builder) =>({
            getCurrenciesNews : builder.query({
                query : ({currencyFrom, currencyTo}) => createRequest(`/currency-news?from_symbol=${currencyFrom}&to_symbol=${currencyTo}`)
            }),
        }),
})

export const {useGetCurrenciesNewsQuery} = currencyNewsApi