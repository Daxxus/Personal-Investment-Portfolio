import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner'
import { useGetCommoditiesQuery } from '@/redux/apis/CommodityNewsApi'
import { Link } from "react-router-dom";
import { Input } from '@material-tailwind/react';
import SingleCommodityCard from './SingleCommodityCard'

export const Commodities = () => {
  const {data: allCommodities, isLoading} = useGetCommoditiesQuery()
  const [commodities, setCommodities] = useState(allCommodities)
  const [searchCommodity, setSearchCommodity] = useState(``)
 
  useEffect(()=>{
    const filter = allCommodities?.data?.filter(el => el.full_name.toLowerCase().includes(searchCommodity.toLowerCase()) )
    setCommodities(filter)
  },[searchCommodity])

   if(isLoading ) return <Audio height="80" width="80" radius="9" color="green"  ariaLabel="loading" wrapperStyle wrapperClass/>
  allCommodities?.data?.map(({name}) => console.log(name))
  return (
    <main>
      <div className="w-max ">
        <Input  placeholder="Search Commodity" onChange={(e)=>setSearchCommodity(e.target.value.toLowerCase())}/>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> 
        { searchCommodity ?       
         commodities?.map(({country,currency, full_name, group, title, name},i)=>(
          <Link to={`/commodity/${name}`} key={i} state={{curr:currency}}>
            <SingleCommodityCard country={country} currency={currency} full_name={full_name} group={group}  title={title}/>           
          </Link> 
         )) :
         allCommodities?.data?.map(({country,currency, full_name, group, title, name},i)=>(
           <Link to={`/commodity/${name}`} key={i} state={{curr:currency}}>
             <SingleCommodityCard country={country} currency={currency} full_name={full_name} group={group}  title={title}/>           
           </Link>
          ))        
        }

      </div>
    </main>
  )
}

export default Commodities