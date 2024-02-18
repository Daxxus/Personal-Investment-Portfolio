import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

export default function CurrencyCard({pic, title, url, postTime, source}) {
  return (
    // sx={{ width: 320 }}
    <Card variant="outlined" > 
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={pic}
            srcSet={pic}
            loading="lazy"
            alt="currency"
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{title} </Typography>
        <Typography level="body-lg" textColor={`red`} fontWeight={`md`}>{source}  </Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
        <Button > <a href={url} target="_blank" rel="noopener noreferrer">Read more</a></Button>
            {/* <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
              6.3k views
            </Typography> */}
            <Divider orientation="vertical" />
            <Typography level="body-md" fontWeight="md" textColor="text.secondary" mt={1}>
              {postTime}
            </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
  
  // import {
  //   Card,
  //   CardBody,
  //   CardFooter,
  //   Typography,
  //   Button,
  // } from "@material-tailwind/react";
  
  
  // <Card className="mt-6 max-w-96">
  //   <CardBody>
  //     <Typography variant="h5" color="blue-gray" className="mb-2">        
  //       {title}
  //     </Typography>
  //     <Typography> {description} </Typography>
  //     <Typography className="font-semibold text-[#1da1f2]" >{provider} </Typography>
  //   </CardBody>
  //   <CardFooter className="pt-0 flex justify-between">
  //     <Button > <a href={url} target="_blank" rel="noopener noreferrer">Read more</a></Button>
  //     <Typography variant="h6" className="mt-2">{when} </Typography>
  //   </CardFooter>
  // </Card>