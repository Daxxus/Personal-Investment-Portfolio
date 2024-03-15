import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const commodityHeaders = {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
    'X-RapidAPI-Host': 'investing4.p.rapidapi.com'
}

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		// 'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
        'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
		'X-RapidAPI-Host': 'investing4.p.rapidapi.com'
	},      
    body: new URLSearchParams({commodity: ``})
};

const baseUrl = 'https://investing4.p.rapidapi.com/commodities/historical-30days'
const createRequest = (url) => (url, options)

export const commoditiesApi = createApi({
    reducerPath : 'commoditiesApi',
    baseQuery: fetchBaseQuery({baseUrl}),    
    endpoints: (builder) =>({
        getSingleCommodities : builder.query({
            query : (val) => createRequest(`${options.body.set("commodity", val)}`)
        }),
    }),
})
// console.log(options.body.get(`commodity`))
export const {useGetSingleCommoditiesQuery} = commoditiesApi

// name, country, from_date, to_date, interval	Copper, United States, 01/03/2022, 04/03/2022, Daily