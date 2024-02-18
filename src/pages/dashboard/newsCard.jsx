import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function NewsCard({url,provider, description, title, when}) {
    return (
      <Card className="mt-6 max-w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">        
            {title}
          </Typography>
          <Typography> {description} </Typography>
          <Typography className="font-semibold text-[#1da1f2]" >{provider} </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
          <Button > <a href={url} target="_blank" rel="noopener noreferrer">Read more</a></Button>
          <Typography variant="h6" className="mt-2">{when} </Typography>
        </CardFooter>
      </Card>
    );
  }
  