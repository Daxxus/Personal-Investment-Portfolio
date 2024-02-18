import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoApiNewsHeaders = {
	'X-RapidAPI-Key': '9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42',
    'X-RapidAPI-Host': 'investing4.p.rapidapi.com'
}
// const baseUrl = "https://bing-web-search1.p.rapidapi.com"
const baseUrl = 'https://investing4.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoApiNewsHeaders })

export const cryptoNewsApi = createApi({
	reducerPath: "cryptoNewsApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		fetchCryptoNews :builder.query({
			query:()=>createRequest(`/news/cryptocurrency-news`)
		}),				
	}),
}) 

export const { useFetchCryptoNewsQuery } = cryptoNewsApi
