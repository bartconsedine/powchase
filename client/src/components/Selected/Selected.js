import React from 'react'
import './selected-module.css'
import { render } from 'react-dom'



const Selected = (props) => {

    console.log(props)



    const renderForecast = () => {
        return (
            props.popup.snowForecast.map((item, index) => {
                let date = new Date();
                let sfDateUnix = date.setDate(date.getDate() + index)
                let sfDate = new Date(sfDateUnix)
                let month = sfDate.getMonth()
                let day = sfDate.getDate()
                let year = sfDate.getFullYear()

                return (
                    <div className="sf-column">
                        <div className="sf-day">{month + 1}/{day}/{year}</div>
                        <div className="sf-total">{item}"</div>
                    </div>
                )

            })
        )
    }

    return (
        <div className="selected">
            <div className="popup-content">
                <div className="popup-name">
                    {props.popup.name}
                </div>
                <div className="forecast">
                    <div>FORECAST:   </div>
                    <div className="snow-by-day">
                        {renderForecast()}
                    </div>

                </div>

            </div>
            <div className="close-button">
                <button onClick={() => {
                    const clickedMarker = {
                        latitude: null,
                        longitude: null,
                        name: null

                    }
                    props.setPopup(clickedMarker)
                    const zoomValue = (props.viewport.zoom > 7 ? 7 : props.viewport.zoom)

                    const newport = {
                        ...props.viewport,
                        zoom: zoomValue,

                    }
                    props.setViewport(newport)
                }
                }
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default Selected