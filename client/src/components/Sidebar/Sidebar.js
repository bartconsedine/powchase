import React from 'react';
import './sidebar-module.css'


const Sidebar = (props) => {



    const sideBarInfo = () => {

        return (
            props.MountainInfo.map((item) => {
                return (
                    item[0].includes(props.filter.name) && <div>
                        <div>{item[0]}</div>
                        <button onClick={async (e) => {
                                props.markerClickedHandler(
                                    parseFloat(item[1]),
                                    parseFloat(item[2]),
                                    item[0]
                                    )
                                console.log("clicked")
                            }}>button</button>
                    </div>
                )

            })

        )



    }

    return (
        <div className="sidebar">
            <div>

            </div>
            <div>
            {sideBarInfo()}
            </div>

        </div>
    )

}

export default Sidebar