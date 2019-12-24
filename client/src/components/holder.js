return ( <
    div className = "App" >
    <
    ReactMapGL width = { viewport.width }
    height = { viewport.height }
    latitude = { viewport.latitude }
    longitude = { viewport.longitude }
    zoom = { viewport.zoom }
    mapStyle = "mapbox://styles/bartconsedine/ck4cxmh5r3m8u1co20pckaesc"
    mapboxApiAccessToken = 'pk.eyJ1IjoiYmFydGNvbnNlZGluZSIsImEiOiJjazBudWVxajUwMXdlM2hwZzFzcDQ5cWR5In0.376OjUpSFMy-y-PVfAeO9A'

    onViewportChange = { _onViewportChange } >
    <
    Sidebar / >
    <
    /ReactMapGL> < /
    div >
);