import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import CardCover from '@mui/joy/CardCover';

export default function SingleCommodityCard({country,currency, full_name, group, title}) {
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
      <Card sx={{ borderRadius: `15px`, width: 300, maxWidth: '100%', padding:`20px`, boxShadow:`10px 10px 10px`}}  
      color="primary"
      invertedColors
      size="md"
      variant="soft"          
      > 
         {/* <CardCover
          sx={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            border: '1px solid',
            borderColor: '#777',
            backdropFilter: 'blur(1px)',           
          }}
        >
          <Typography level="h2" fontSize="lg" textColor="#fff">
            Card Cover
          </Typography>
        </CardCover> */}
        <CardContent>
          <Typography level="body-xs">{full_name} </Typography>
          <Typography level="title-lg">{title} </Typography>
        </CardContent>
    
        <CardOverflow
          variant="soft"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            justifyContent: 'space-around',
            py: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography  level="title-sm">
            {country.toUpperCase()}
          </Typography>
          <Divider orientation="vertical" />
          <Typography  level="title-sm">
            {currency}
          </Typography>
          <Divider orientation="vertical" />
          <Typography  level="title-sm">
            {group.toUpperCase()}
          </Typography>
        </CardOverflow>
      </Card>
    </Box>
  )
    /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */
}
