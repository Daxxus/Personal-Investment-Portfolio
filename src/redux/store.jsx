
import { configureStore } from "@reduxjs/toolkit"
import { cryptoApi } from "./apis/CryptoApi"
import { cryptoNewsApi } from "./apis/CryptoNewsApi"
import { recentExchangeRates } from "./apis/CurrencyApi"
import { currencyNewsApi } from "./apis/CurrencyNewsApi"
import { commoditiesNewsApi } from "./apis/CommodityNewsApi"
import { commoditiesApi } from "./apis/CommodityApi"

export default configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
		[cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
		[recentExchangeRates.reducerPath]:recentExchangeRates.reducer,
		[currencyNewsApi.reducerPath]:currencyNewsApi.reducer,
		[commoditiesNewsApi.reducerPath]:commoditiesNewsApi.reducer,
		[commoditiesApi.reducerPath]:commoditiesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			cryptoApi.middleware,
			cryptoNewsApi.middleware,
			recentExchangeRates.middleware, 
			currencyNewsApi.middleware,
			commoditiesNewsApi.middleware,
			commoditiesApi.middleware,
		]),
	
})
