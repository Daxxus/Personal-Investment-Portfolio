import {
  Card,
  CardBody,
  CardHeader,
  CardFooter, 
  Typography, 
  Input,  
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "@/redux/apis/CryptoApi";
import millify from "millify";
import { useEffect, useState } from "react";

export function Cryptos({top5}) {  
  const number = top5 ? 5:200
  const {data:crypto, isLoading}=useGetCryptosQuery(number)
  const [cryptos, setCryptos] = useState([])
  const [searchCrypto, setSearchCrypto]= useState(``)
  
  useEffect(()=>{
    const filterCryptos = crypto?.data.coins.filter(crypt => crypt.name.toLowerCase().includes(searchCrypto.toLowerCase()))
    setCryptos(filterCryptos)
  },[crypto,searchCrypto] )

  // console.log(crypto?.data.coins);
  if(isLoading)return "Loading...."
  return (
    <>
        {!top5 &&(
          <main>
            <div className="w-64 mx-auto">
              <Input  placeholder="Search Cryptos" onChange={(e)=>setSearchCrypto(e.target.value.toLowerCase())}/>
            </div>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
              <div className="absolute inset-0 h-full w-full bg-gray-800/75" />
            </div>
          </main>
        )}

      <main>
        <Card className="mx-3 -mt-20 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">          
          <div className="px-4 pb-4"> 

            <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5">
      
              {cryptos?.map(({uuid,rank,name,iconUrl,price, marketCap,change})=> (
              <Link to={`/crypto/${uuid}`}key={uuid}>
                <Card  className=" hover:shadow-2xl" >
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={iconUrl}
                        alt={name}
                        className="h-full w-full "
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                    
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2 pl-2"
                      >
                         {rank}.  {name}
                      </Typography >
                    
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Typography
                        variant="h6"                    
                        className="mt-1 mb-2 pl-2 font-medium"
                      >                       
                        Price: {millify(price)} <br />
                        MarketCap: {millify(marketCap)} <br />
                        {(change) > 0 ? <Typography color="green" className="mt-1 mb-2 font-medium">Daily Change: {millify(change)}%</Typography> :<Typography color="red" className="mt-1 mb-2 font-medium">Daily Change: {millify(change)}%</Typography>}
                       
                      </Typography>
                     
                    </CardFooter>
                  </Card>
               </Link>
              ) )}            
            </div>
          </div>
        </CardBody>
      </Card>
      </main>
      
    </>
  );
}

export default Cryptos;
