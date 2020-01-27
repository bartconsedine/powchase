import React, { useState, useEffect } from 'react';
import '../../../src/App.css';
import ReactMapGL, { Popup, Marker, FlyToInterpolator } from 'react-map-gl';
import Sidebar from '../Sidebar/Sidebar'
import GeoToggle from '../GeoToggle/GeoToggle'
import Filter from '../Filter/Filter'
import Selected from '../Selected/Selected'
import SelectedMobile from '../Selected/SelectedMobile'
import './map-module.css'
import MountainInfo from '../MountainInfo'
import d3 from 'd3';



const Map = () => {


    const viewPortWidth = () => {
        if (window.innerWidth < 700) {

            return window.innerWidth

        }
        return window.innerWidth

    }
    const viewPortHeight = () => {
        if (window.innerWidth < 700) {
            return window.innerHeight * .5
        }
        return window.innerHeight

    }
    const viewPortZoom = () => {
        if (window.innerWidth < 700) {
            return 2
        }
        return 3.5

    }

    const [mapStatic, setMapStatic] = useState(true)

    const [value, setValue] = React.useState([0, 21]);

    const [tempValue, setTempValue] = React.useState([0, 32]);

    const [showLabels, setShowLabels] = useState(false)

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        console.log("slider")
    };

    const handleTempChange = (event, newValue) => {
        setTempValue(newValue);
    };



    const [filter, setFilter] = useState({
        name: "",
        snowTotal: 2,

    })

    const [popup, setPopup] = useState({
        latitude: null,
        longitude: null,
        name: null,
        snowTotal: null,
        snowForecast: []
    })

    const handleFilterChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setFilter(prevFilterData => ({
            ...prevFilterData,
            [name]: value,
        })
        )


    }

    const [viewport, setViewport] = useState({
        width: viewPortWidth(),
        height: viewPortHeight(),
        latitude: 38.2,
        longitude: -96.06,
        zoom: viewPortZoom(),
        transitionDuration: null,


    });

    const [markerHover, setMarkerHover] = useState(null)

    const handleMarkerHover = (name) => {
        // console.log("marker hovered")
        setMarkerHover(name)

    }

    const zoomChange = (value) => {
        const newport = {
            ...viewport,
            zoom: viewport.zoom + value,
            transitionDuration: 5000,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3.easeCubic,

        }
        setViewport(newport)


    }



    const markerClickedHandler = (lat, lon, name, snowTotal, snowForecast) => {
        setMarkerHover(null)
        console.log("clicked")
        const newport = {
            ...viewport,
            latitude: lat,
            longitude: lon,
            zoom: 7,
            transitionDuration: 800, 
            transitionInterpolator: new FlyToInterpolator({curve: 2}),

        }
        setViewport(newport)

        const clickedMarker = {
            ...popup,
            latitude: lat,  
            longitude: lon,
            name: name,
            snowTotal: snowTotal,
            snowForecast: snowForecast


        }
        setPopup(clickedMarker)

    }

    const divStyle = (total) => {
        
        return(
            {backgroundColor: `rgb(0,${255-total*12},255)`}
        )
      };

    const renderMarkers = () => {
        return (
            MountainInfo.map((item, index) => {

                return (
                    (item[0].toLowerCase().includes(filter.name.toLowerCase())
                        && item[5].reduce((a, b) => a + b, 0) >= value[0]
                        && item[5].reduce((a, b) => a + b, 0) <= value[1]
                        && item[4] >= tempValue[0]
                        && item[4] <= tempValue[1]) && <Marker
                            className={"marker"}
                            key={index}
                            latitude={parseFloat(item[1])}
                            longitude={parseFloat(item[2])}
                           
                            onClick={async (e) => {
                                markerClickedHandler(
                                    parseFloat(item[1]),
                                    parseFloat(item[2]),
                                    item[0]
                                )

                            }
                            
                        }
                        >
                        <div
                            className={`markers ${viewport.zoom > 8 ? "" : (viewport.zoom < 5 ? "out-2" : " out")}`}
                            style={divStyle(item[5].reduce((a, b) => a + b, 0))}
                            onMouseOver={() => handleMarkerHover(item[0])}
                            onMouseOut={() => setMarkerHover(null)}
                            onClick={async (e) => {
                                markerClickedHandler(
                                    parseFloat(item[1]),
                                    parseFloat(item[2]),
                                    item[0],
                                    item[3],
                                    item[5]
                                )

                            }}
                        >
                            {/* {markerHover == item[0] &&  <div className="marker-span">{item[0]}</div>} */}
                            {(viewport.zoom > 7 || showLabels  ) && <span className="marker-label" style={divStyle(item[5].reduce((a, b) => a + b, 0))}>{item[0]}</span>}
                        </div>

                    </Marker>


                )
            })

        )
    }


    const changeViewPort = () => {

        const newport = {
            ...viewport,
            width: viewPortWidth(),
            height: viewPortHeight(),

        }
        setViewport(newport)
    }

    useEffect(() => {
        window.addEventListener("resize", changeViewPort)
    }, []);

    const _onViewportChange = viewport => {
        setViewport(viewport)
    }

    const viewWindowListener = () => {
        setViewWidthValue(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', viewWindowListener);
    }, []);

    const [viewWidthValue, setViewWidthValue] = useState(window.innerWidth);


    return (
        <div className="App" >
            <ReactMapGL
                {...viewport}
                className="react-map"
                width={viewport.width}
                height={viewport.height}
                latitude={viewport.latitude}
                longitude={viewport.longitude}
                zoom={viewport.zoom}
                mapStyle="mapbox://styles/bartconsedine/ck4cxmh5r3m8u1co20pckaesc"
                mapboxApiAccessToken='pk.eyJ1IjoiYmFydGNvbnNlZGluZSIsImEiOiJjazBudWVxajUwMXdlM2hwZzFzcDQ5cWR5In0.376OjUpSFMy-y-PVfAeO9A'
                onViewportChange={_onViewportChange}
                dragPan={mapStatic}
                scrollZoom={mapStatic}
                minZoom={2}
            >
                {renderMarkers()}
                {viewWidthValue > 700 &&
                    <div className="side-selected">

                        <div
                            className="map-side"
                            onMouseOver={() => setMapStatic(false)}
                            onMouseOut={() => setMapStatic(true)}>
                            <div>
                                <Filter
                                    filter={filter}
                                    handleFilterChange={handleFilterChange}
                                    value={value}
                                    handleSliderChange={handleSliderChange}
                                    tempValue={tempValue}
                                    handleTempChange={handleTempChange}
                                    setShowLabels={setShowLabels}
                                    showLabels={showLabels}
                                />
                            </div>
                            <div>
                                <Sidebar
                                    markerClickedHandler={markerClickedHandler}
                                    MountainInfo={MountainInfo}
                                    filter={filter}
                                    value={value}
                                    tempValue={tempValue}
                                />
                            </div>
                        </div>

                        {( viewWidthValue > 700) &&
                            <div className="selected-container">
                                <Selected
                                    popup={popup}
                                    setPopup={setPopup}
                                    setViewport={setViewport}
                                    viewport={viewport}
                                    viewWidthValue={viewWidthValue}
                                />
                                <GeoToggle
                                    viewport={viewport}
                                    setViewport={setViewport}
                                />

                            </div>

                        }

                    </div>}

                {popup.latitude &&
                    <Popup
                        className="popup"
                        latitude={popup.latitude}
                        longitude={popup.longitude}
                        offsetLeft={16}
                        // offsetTop={-10}
                        onClose={() => {
                            const clickedMarker = {
                                latitude: null,
                                longitude: null,
                                name: null

                            }
                            setPopup(clickedMarker)
                            const zoomValue = (viewport.zoom > 5.5 ? 5.5 : viewport.zoom)

                            const newport = {
                                ...viewport,
                                zoom: zoomValue,

                            }
                            setViewport(newport)
                        }
                        }
                    >

                        <div><strong>{popup.name}</strong></div>
                        <div>7 Day Snow Forecast:<strong> {popup.snowForecast.reduce((a, b) => a + b, 0)}"</strong></div>

                    </Popup>}

            </ReactMapGL>
            {(popup.name && viewWidthValue < 700)  &&
                        <div className="selected-container sc-mobile">
                            <SelectedMobile
                                popup={popup}
                                setPopup={setPopup}
                                setViewport={setViewport}
                                viewport={viewport}
                            />

                        </div>

                    }

            {viewWidthValue <= 700 &&
                <div className="side-selected ss-mobile">

                    <div
                        className="map-side ms-mobile"
                        onMouseOver={() => setMapStatic(false)}
                        onMouseOut={() => setMapStatic(true)}>
                        <div>
                            <Filter
                                filter={filter}
                                handleFilterChange={handleFilterChange}
                                value={value}
                                handleSliderChange={handleSliderChange}
                                tempValue={tempValue}
                                handleTempChange={handleTempChange}
                            />
                        </div>
                        <div>
                            <Sidebar
                                markerClickedHandler={markerClickedHandler}
                                MountainInfo={MountainInfo}
                                filter={filter}
                                value={value}
                                tempValue={tempValue}
                            />
                        </div>
                    </div>

                  

                </div>}

        </div>
    );
}

export default Map;