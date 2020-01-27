import React from 'react'
import GeoToggleValues from './GeoToggleValues'
import './GeoToggle.css'

const GeoToggle = (props) => {

    const geoClickHandle = (location) => {
        console.log(GeoToggleValues)
        const newport = {
            ...props.viewport,
            zoom: GeoToggleValues[location][3],
            transitionDuration: 800,
            latitude: GeoToggleValues[location][1],
            longitude: GeoToggleValues[location][2]

        }
        props.setViewport(newport)
    }

    const showGeoToggles = () => {

        return(
            GeoToggleValues.map((item, index) =>{
                return <button className="geo-button" onClick={() => geoClickHandle(index)} >{item[0]}</button>
            })
        )

    }

    return (
        <div className="geo-toggle">
            Go To Region:
            <div className="geo-list">
                {showGeoToggles()}
            </div>
        </div>

    )

}

export default GeoToggle