import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './filter-module.css'

// const useStyles = makeStyles({
//   root: {
//     width: {10%},
//   },
// });





export default function RangeSlider(props) {

    function valuetext(value) {
        return `${value}"`;
      }  
//   const classes = useStyles();


 



  return (
    <div className="slider">
      <Typography id="range-slider" gutterBottom>
        Snowfall range: {props.value[0]}" - {props.value[1]}"
      </Typography>
      <Slider
        value={props.value}
        onChange={props.onChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={() => valuetext(props.value)}
        max={21}
        // valueLabelFormat={() => valuetext(props.value)}
      />
      <Typography id="range-slider" gutterBottom>
        Max-Temp: {props.tempValue[0]}&#176;f - {props.tempValue[1]}&#176;f
      </Typography>
      <Slider
        value={props.tempValue}
        onChange={props.tempChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={() => valuetext(props.tempValue)}
        max={50}
        // valueLabelFormat={() => valuetext(props.value)}
      />
    </div>
  );
}