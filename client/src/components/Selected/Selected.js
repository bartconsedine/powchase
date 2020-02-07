import React from 'react'
import './selected-module.css'



const Selected = (props) => {

    const renderForecast = () => {
        return (
            props.popup.snowForecast && props.popup.snowForecast.map((item, index) => {
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
                        <div className="weather-icon">

                        </div>
                        <div>
                            {props.popup.weatherIcons[index]}
                        </div>
                    </div>
                )

            })
        )
    }

    const selectedToggle = () => {
        if (props.popup.name) {
            return null
        } else return { width: "18em", margin: "0 -1em 0 0" }

    }

    return (
        <div className="selected" style={selectedToggle()}>
            {props.viewWidthValue > 700 &&
                <div className="popup-content">
                    <div className="forecast-logo">

                    </div>

                    {props.popup.name &&
                    <>
                        <div className="popup-name">
                            <strong>{props.popup.name}</strong>
                        </div>
                        <div className="forecast">
                            {/* <div>FORECAST:   </div> */}
                            <div className="snow-by-day">
                                {renderForecast()}
                            </div>


                        </div>
                        </>
}
                    {props.popup.name &&
                        <button className="close-btn" onClick={() => {
                            const clickedMarker = {
                                latitude: null,
                                longitude: null,
                                name: null

                            }
                            props.setPopup(clickedMarker)
                            const zoomValue = (props.viewport.zoom > 4 ? 4 : props.viewport.zoom)

                            const newport = {
                                ...props.viewport,
                                zoom: zoomValue,

                            }
                            props.setViewport(newport)
                        }
                        }
                        >
                            Close
                </button>}


                </div>
            }


        </div>
    )
}

export default Selected