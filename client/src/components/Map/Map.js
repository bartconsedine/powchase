import React, { useState, useEffect } from 'react';
import '../../../src/App.css';
import ReactMapGL, { Popup, Marker } from 'react-map-gl';
import Sidebar from '../Sidebar/Sidebar'
import Zoom from '../Zoom/Zoom'
import Filter from '../Filter/Filter'
import './map-module.css'
import MountainInfo from '../MountainInfo'


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
            return 3.5
        }
        return 3.5

    }

    const [filter,setFilter] = useState({
        name: "",

    })

    const [popup, setPopup] = useState({
        latitude: null,
        longitude: null,
        name: null,
    })

    const handleFilterChange = (e) => {

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
        latitude: 42.2,
        longitude: -96.06,
        zoom: viewPortZoom(),
        transitionDuration: 5000

    });

    const zoomChange = (value) => {
        const newport = {
            ...viewport,
            transitionDuration: 5000,
            zoom: viewport.zoom + value,

        }
        setViewport(newport)


    }

    const markerClickedHandler = (lat, lon, name) => {

        const newport = {
            ...viewport,
            latitude: lat,
            longitude: lon,
            zoom: 9,

        }
        setViewport(newport)

        const clickedMarker = {
            ...popup,
            latitude: lat,
            longitude: lon,
            name: name

        }
        setPopup(clickedMarker)

    }


    const renderMarkers = () => {
        return (
            MountainInfo.map((item, index) => {

                return (
                    item[0].toLowerCase().includes(filter.name.toLowerCase()) && <Marker
                        key={index}
                        latitude={parseFloat(item[1])}
                        longitude={parseFloat(item[2])}
                        offsetLeft={-20} offsetTop={-10}
                        onClick={async (e) => {
                            markerClickedHandler(
                                parseFloat(item[1]),
                                parseFloat(item[2]),
                                item[0]
                            )
                            console.log("clicked")
                        }}
                    >
                        <div
                            className={`markers ${viewport.zoom > 8 ?  "" : (viewport.zoom < 5? "out-2": " out")}`}
                            onClick={async (e) => {
                                markerClickedHandler(
                                    parseFloat(item[1]),
                                    parseFloat(item[2]),
                                    item[0]
                                )
                                console.log("clicked")
                            }}
                        >

                        </div>

                    </Marker>


                )
            })

        )
    }

    const showMarkers = () => {

        return (

            renderMarkers()
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


    return (
        <div className="App" >
            <ReactMapGL

                width={viewport.width}
                height={viewport.height}
                latitude={viewport.latitude}
                longitude={viewport.longitude}
                zoom={viewport.zoom}
                speed={0.2}
                mapStyle="mapbox://styles/bartconsedine/ck4cxmh5r3m8u1co20pckaesc"
                mapboxApiAccessToken='pk.eyJ1IjoiYmFydGNvbnNlZGluZSIsImEiOiJjazBudWVxajUwMXdlM2hwZzFzcDQ5cWR5In0.376OjUpSFMy-y-PVfAeO9A'
                onViewportChange={_onViewportChange} >

                {showMarkers()}
                <div className="map-side">

                    <div>
                        <Zoom
                            zoom={viewport.zoom}
                            zoomChange={zoomChange}
                        />
                    </div>
                    <div>
                        <Filter 
                            filter={filter}
                            handleFilterChange={handleFilterChange}
                        />  

                    </div>
                    <div>
                        <Sidebar
                            markerClickedHandler={markerClickedHandler}
                            MountainInfo={MountainInfo}
                            filter={filter}
                        />
                    </div>

                </div>

                {popup.latitude &&
                    <Popup

                        latitude={popup.latitude}
                        longitude={popup.longitude}
                        offsetLeft={-20} offsetTop={-10}
                        onClose={() => {
                            const clickedMarker = {
                                latitude: null,
                                longitude: null,
                                name: null

                            }
                            setPopup(clickedMarker)

                            const newport = {
                                ...viewport,
                                zoom: 7,

                            }
                            setViewport(newport)
                        }
                        }
                    >

                        <div>{popup.name}</div>

                    </Popup>}

            </ReactMapGL>

        </div>
    );
}

export default Map;