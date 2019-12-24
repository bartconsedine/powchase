import React from 'react'

const Filter = (props) => {

    return (
        <div>
            <form>
                <div></div>
                <label>Name:</label>
                <input 
                    type="text"
                    name="name" 
                    onChange={props.handleFilterChange}
                    value={props.filter.name}
                    /> 
                    <div></div>
            </form>
        </div>
    )
}

export default Filter
