import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { FaChartLine } from "react-icons/fa";
import millify from 'millify';

export function AllCurrenciesCard({currRate, change, startRate, endRate,baseCurrency, intoCurrency}) {
  return (
    <Box
    sx={{
      perspective: '1000px',
      transition: 'transform 0.4s',
      '& > div, & > div > div': {
        transition: 'inherit',
      },
      '&:hover': {
        '& > div': {
          transform: 'rotateY(30deg)',
          '& > div:nth-child(2)': {
            transform: 'scaleY(0.9) translate3d(20px, 30px, 40px)',
          },
          '& > div:nth-child(3)': {
            transform: 'translate3d(45px, 50px, 40px)',
          },
        },
      },
    }}
    >
      <Card
        variant="outlined"
        sx={{
          minHeight: 280,
          maxWidth: 320,
          backgroundColor: '#fff',
          borderColor: '#000',
        }}
        >
        <Typography level="h2" fontSize="md" textColor="#000">
          {baseCurrency}/{intoCurrency} 
          {/* Current Rate: {currRate && millify(currRate,{precision:4})} */}
        </Typography>
        <CardCover
          sx={{
            background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            border: '1px solid',
            borderColor: '#777',
            backdropFilter: 'blur(1px)',
          }}
          >
          <Typography level="h4" fontSize="lg" textColor="#fff" >          
                Start Rate: {+startRate &&  millify(+startRate,{precision:2})} <br/>
                End Rate: {+endRate && millify(+endRate,{precision:2})}
            
          </Typography>
        </CardCover>

        <CardContent
          sx={{
            alignItems: 'self-end',            
            justifyContent: 'flex-end',
            background: 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3))',
            border: '1px solid',
            borderColor: '#000',
            backdropFilter: 'blur(1px)',
          }}
          >
          <Typography level="h2" fontSize="lg" textColor="#fff" m={2} >
           <div className='flex' >
            <FaChartLine  fontSize={25} className='w-12'/>  {change > 0 ? <Typography textColor='lime'> {change && millify(change,{precision:2}) +" %"}  </Typography>:
            <Typography textColor='crimson'> {change && millify(change,{precision:2}) +" %"}  </Typography> }
           </div>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
  /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */
}
export default AllCurrenciesCard
