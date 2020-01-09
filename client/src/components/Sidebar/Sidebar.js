import React from 'react';
import './sidebar-module.css'


const Sidebar = (props) => {



    const sideBarInfo = () => {

        return (
            props.MountainInfo.map((item) => {
                return (
                    (
                       props.filter.name == item[0].toLowerCase().includes(props.filter.name.toLowerCase())  || 
                        (item[0].toLowerCase().includes(props.filter.name.toLowerCase())
                        && item[5].reduce((a, b) => a + b, 0) >= props.value[0]
                        && item[5].reduce((a, b) => a + b, 0) <= props.value[1]
                        && item[4] >= props.tempValue[0]
                        && item[4] <= props.tempValue[1])
                        )
                    &&
                    <div className="sidebar-row">
                        <div className="sidebar-name">{item[0]}</div>
                        <div className="sidebar-button">
                        <button
                            className="sidebar-button-element"
                            onClick={async (e) => {
                                e.preventDefault()
                                props.markerClickedHandler(
                                    parseFloat(item[1]),
                                    parseFloat(item[2]),
                                    item[0],
                                    item[3], 
                                    item[5]
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