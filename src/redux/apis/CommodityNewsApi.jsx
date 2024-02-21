import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const commodityNewsHeaders = {
    'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
    'X-RapidAPI-Host': 'investing4.p.rapidapi.com'
}
const baseUrl = 'https://investing4.p.rapidapi.com'
const createReq = (url) => ({url, headers: commodityNewsHeaders})

export const commoditiesNewsApi = createApi({
    reducerPath : 'commoditiesNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        getCommodityNews : builder.query({
            query : () => createReq(`/news/commodities-news`)
        }),
        getCommodities : builder.query({
            query : () => createReq(`/commodities/get-commodities`)
        }),
    }),
})

export const {useGetCommodityNewsQuery, useGetCommoditiesQuery} = commoditiesNewsApi

