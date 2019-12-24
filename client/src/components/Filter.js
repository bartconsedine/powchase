import React, { useState, useEffect } from 'react';

const Filter = (props) => {


    const renderAuthors = () => {
        let holder = []

        return (

            props.allExcerpts.map((item, index) => {

                // if(index === 0) holder.push(item.author)
                if (holder.includes(item.author) === true) {

                } else {
                    holder.push(item.author)
                    return (
                        <option value={item.author}>{item.author}</option>

                    )
                }

            }
            )

        )
    }

    const renderOptions = () => {
        let holder = []

        return (

            props.allExcerpts.map((item, index) => {

                // if(index === 0) holder.push(item.author)
                if (holder.includes(item.title) === true) {

                } else {
                    holder.push(item.title)
                    return (
                        item.author == props.filterData.author && <option value={item.title}>{item.title}</option>

                    )
                }

            }
            )

        )
    }

    const renderChapters = () => {
        return (

            props.allExcerpts.map(item =>
                item.title == props.filterData.title && <option value={item.chapter}>{item.chapter}</option>
            )
        )
    }

    return (
        <div className='filter'>
            <form className='form' onSubmit={props.handleFilterSubmit}>

                <div>
                    <label htmlFor='reading speed'>Reading Speed:</label>
                    {/* <input className='select' type='readingSpeed' name="readingSpeed" value={props.filterData.readingSpeed} onChange={props.handleFilterChange} /> */}
                    <select className='select dropdown' name="readingSpeed" onChange={props.handleFilterChange} value={props.filterData.readingSpeed} >
                        <option value={1800}>{230}  </option>
                        <option value={1800}>{230} WPM</option>
                        <option value={1700}>{250} WPM</option>
                        <option value={1600}>{265} WPM</option>
                        <option value={1500}>{285} WPM</option>
                        <option value={1400}>{300} WPM</option>
                        <option value={1300}>{323} WPM</option>
                        <option value={1200}>{350} WPM</option>
                        <option value={1100}>{381} WPM</option>
                        <option value={1000}>{420} WPM</option>
                        <option value={900}>{466} WPM</option>
                        <option value={800}>{525} WPM</option>
                        <option value={700}>{600} WPM</option>
                        <option value={600}>{700} WPM</option>
                        <option value={500}>{840} WPM</option>
                        <option value={450}>{933} WPM</option>
                        <option value={400}>{1050} WPM</option>
                        <option value={350}>{1200} WPM</option>
                        <option value={300}>{1400} WPM</option>
                    </select>
                </div>
                <div>
                    <label>Select Author:</label>
                    <select className='select dropdown' name="author" onChange={props.handleFilterChange} value={props.filterData.author} >
                        <option value=" ">  </option>
                        {renderAuthors()}
                    </select>
                </div>
                {props.filterData.author &&
                    <div>
                        <label>Select Book:</label>
                        <br></br>
                        <select className='select dropdown' name="title" onChange={props.handleFilterChange} value={props.filterData.title} >
                            <option value=" ">  </option>
                            {renderOptions()}

                        </select>
                    </div>}
                {props.filterData.title &&
                    <div>
                        <label>Select Chapter:</label>
                        <select className='select dropdown' name="chapter" onChange={props.handleFilterChange} value={props.filterData.chapter} >
                            <option value=" ">  </option>
                            {renderChapters()}
                        </select>
                    </div>
                }

                {props.filterData.chapter &&
                    <button className="button" type="submit">submit</button>
                }

            </form>

        </div>

    )
}

export default Filter