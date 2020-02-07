import React from 'react';
import './sidebar-module.css'


const Sidebar = (props) => {



    const sideBarInfo = () => {

        return (
            props.snowData.map((item) => {
                let snowTotalArray = []
                item.weather_reports.map(item => {
                    snowTotalArray.push(item.precip_accumulation)
                }
                )
                let tempArray = []
                item.weather_reports.map(item => {
                    tempArray.push(item.temperature_high)
                }
                )
                let weatherIconArray = []
                item.weather_reports.map(item => {
                    weatherIconArray.push(item.icon)
                }
                )
                return (
                    (
                        props.filter.name == item.ski_area_name.toLowerCase().includes(props.filter.name.toLowerCase()) ||
                        (item.ski_area_name.toLowerCase().includes(props.filter.name.toLowerCase())
                            && snowTotalArray.reduce((a, b) => a + b, 0) >= props.value[0]
                            && snowTotalArray.reduce((a, b) => a + b, 0) <= props.value[1]
                            // && item[4] >= props.tempValue[0]
                            // && item[4] <= props.tempValue[1]
                        )
                    )
                    &&
                    <div className="sidebar-row">
                        <div className="sidebar-name">{item.ski_area_name}</div>
                        <div className="sidebar-button">
                            <button
                                className="sidebar-button-element"
                                onClick={async (e) => {
                                    e.preventDefault()
                                    props.markerClickedHandler(
                                        item.latitude,
                                        item.longitude,
                                        item.ski_area_name,
                                        snowTotalArray.reduce((a, b) => a + b, 0),
                                        snowTotalArray,
                                        weatherIconArray
                                    )
                                    console.log("clicked")
                                }}>view</button>
                        </div>
                    </div>
                )

            })

        )



    }

    return (
        <div className="sidebar">
            {sideBarInfo()}
        </div>
    )

}

export default Sidebar