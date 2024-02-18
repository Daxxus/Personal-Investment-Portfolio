import React, { useState, useEffect } from 'react'
import { Typography, Input } from "@material-tailwind/react";
import CommodityCard from './CommodityCard'
import { useGetCommodityNewsQuery } from '@/redux/apis/CommodityNewsApi'
import CircularWithValueLabel from '@/pages/details/loader'

 export const CommoditiesNews = () => {
  const {data: commodityNews, isLoading} = useGetCommodityNewsQuery()
  const [news, setNews] = useState(``)
  const [searchedNews, setSearchedNews] = useState(commodityNews)

  useEffect(()=> {
    const filteredNews = commodityNews?.data?.filter(item => item.title.toLowerCase().includes(news.toLowerCase()))   
    setSearchedNews(filteredNews)
  },[news])

  if(isLoading) return <CircularWithValueLabel/>
  
  return (
    <main>
       <Typography variant="h3" color="teal" className="mb-10">Up to the minute Commodities News</Typography>
      <div className='w-max'>
          <Input placeholder='Search Commodity' onChange={(e)=> setNews(e.target.value.toLowerCase())}/>
      </div>
      
          {news ?
            <div className="mt-4 grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-5">
            {searchedNews?.map(({link, publisher, shortDescription, title, when}) => (
              <CommodityCard key={link} url={link} provider={publisher} description={shortDescription} title={title} when={when} />
              ))} 
            </div> : 
            <div className="mt-4 grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-5">
              { commodityNews?.data?.map(({link, publisher, shortDescription, title, when}) =>(
              <CommodityCard key={link} url={link} provider={publisher} description={shortDescription} title={title} when={when} />
              ))}
            </div>}       
             
    </main>   
  )
}

export default CommoditiesNews