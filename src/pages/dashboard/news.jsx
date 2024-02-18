import { useFetchCryptoNewsQuery } from "@/redux/apis/CryptoNewsApi";
import { useGetCryptosQuery } from "@/redux/apis/CryptoApi";
import CircularWithValueLabel from "../details/loader";
import { NewsCard } from "@/pages/dashboard/index";
import { Typography } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function News() {
  const{data:cryptoNews, isLoading}= useFetchCryptoNewsQuery()
  const [news, setNews] = useState("")
  const [searchedNews, setSearchedNews] = useState(cryptoNews)
  const {data:cryptoName}= useGetCryptosQuery(200)
   
  useEffect(()=> {
      const filteredNews = cryptoNews?.data?.filter(item => item.title.toLowerCase().includes(news.toLowerCase()))      
      setSearchedNews(filteredNews)
  },[news] )

  if(isLoading) return <CircularWithValueLabel/>
  return (
    <main>    
      <Typography variant="h3" color="red" className="mb-10">Latest Crypto News</Typography>
   
      <div className="w-max">
        <Select color="blue" label="Select the coin" onChange={(v)=> setNews(v)} >         
          {cryptoName?.data?.coins?.map((coin, i) => (
          <Option key={i} value={coin.name}>
          {coin.name}
          </Option>
      ))}
          </Select>
      </div> 

      {news ?      
          <div className="mt-4 grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-x-5">
             {searchedNews?.map(({link,publisher,shortDescription,title,when},i)=>(
               <NewsCard key={i} title={title} description={shortDescription} when={when} url={link} provider={publisher}/>   
               ) )}
          </div>    :

          <div className="mt-4 grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-x-5">
            {cryptoNews?.data?.map(({link,publisher,shortDescription,title,when},i)=>(
              <NewsCard key={i} title={title} description={shortDescription} when={when} url={link} provider={publisher}/>   
              ) )}
          </div> 
      }

    </main>
  );
}

export default News;
