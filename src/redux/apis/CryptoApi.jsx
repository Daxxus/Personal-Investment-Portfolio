import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoApiHeaders = {
	"X-RapidAPI-Key": "9556836d5emsha94b903c8dce84ap1067fbjsn0931cfa53b42",
	"X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
	// "x-access-token":
	// 	"coinranking09025c3a2ae96a79e11f17f86422dda3f6da49968ca8a532",
}

const baseUrl = `https://coinranking1.p.rapidapi.com`
// const baseUrl = `https://api.coinranking.com/v2`

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
	reducerPath: "crypto",
	baseQuery: fetchBaseQuery({ baseUrl }), //musi być baseUrl jako nazwa
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count} `),
		}),
		getCryptoDetails: builder.query({
			query: (coinId) => createRequest(`/coin/${coinId}`),
		}),

		getCryptoHistory: builder.query({
			query: ({ coinId, period }) =>
				createRequest(`coin/${coinId}/history?timePeriod=${period}`),
		}),

		
	}),
})
export const {
	useGetCryptosQuery,
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} = cryptoApi
