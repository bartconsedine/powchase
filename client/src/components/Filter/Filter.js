import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './filter-module.css'
import Slider from './Slider';



function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider(props) {


    return (
        <div className="filters-div">
            <div className="filters slider">
                <Slider

                    value={props.value}
                    handleSliderChange={props.handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    tempValue={props.tempValue} 
                    tempChange={props.handleTempChange}
                    setShowLabels={props.setShowLabels}
                    showLabels={props.showLabels}
                />

            </div>

            <form className="filters filter-only">
                <label>name: </label>
                <input
                    type="text"
                    onChange={props.handleFilterChange}
                    value={props.filter.name}
                    name="name"
                />
            </form>
        </div>
    );
}