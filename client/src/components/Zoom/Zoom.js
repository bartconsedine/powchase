import React from 'react';
import './zoom-module.css'


const Zoom = (props) => {

    return (
        <div className="zoom">
            <button onClick={() => props.zoomChange(.5)}>+</button>
            <button onClick={() => props.zoomChange(-.5)}>-</button>

        </div>
    )

}

export default Zoom