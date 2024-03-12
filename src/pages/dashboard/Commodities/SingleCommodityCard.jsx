import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

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
            '& > div:nth-of-type(2)': {
              transform: 'scaleY(0.9) translate3d(20px, 30px, 40px)',
            },
            '& > div:nth-of-type(3)': {
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
   
}
