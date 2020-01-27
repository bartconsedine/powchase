import React from 'react'
import './selected-mobile-module.css'

const SelectedMobile = (props) => {

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
        <div className="selected-mobile">
            <button className="close-btn-m" onClick={() => {
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
                    CloseR
                </button>
                

            <div className="popup-content-m">
                <div className="popup-name-m">
                    <strong>{props.popup.name}</strong>
                </div>
                <div className="forecast-m">
                    
                    <div className="snow-by-day-m">
                        {renderForecast()}
                    </div>

                </div>
                

            </div>


        </div>
    )
}

export default SelectedMobile