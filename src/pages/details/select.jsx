import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants({timeSpan, change, period}) {
  // const [age, setAge] = React.useState(`24h`)

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   // change(event.target.value);    
  // } 
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Time Span</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={period}
          onChange={change}
          label="Time span"
        >
          {timeSpan.map((time) => (         
            <MenuItem key={time} value={time} > {time} </MenuItem>
          ))}             
        </Select>
      </FormControl>    
    </div>
  );
}