import React from 'react'
import { Audio } from 'react-loader-spinner'
import { useGetCommoditiesQuery } from '@/redux/apis/CommodityApi'
import axios from 'axios';

export const Commodities = () => {
  const {data: commodities, isLoading} = useGetCommoditiesQuery(`gold`)
  console.log(commodities);




  if(isLoading) return <Audio height="80" width="80" radius="9" color="green"  ariaLabel="loading" wrapperStyle wrapperClass/>
  return (
    <div>Commodities</div>
  )
}

export default Commodities