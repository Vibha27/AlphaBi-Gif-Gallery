import React, { useState } from "react";

export const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        props.handleChange(e.target.value); 
    }
    const handleSubmit = () => {
        if(searchValue !== "") {
            props.handleChange(searchValue); 
        }
    }

    return <div className="col-12 search-container">
        <input type="text"
        className="col-8 col-md-8 search-box" 
        value={searchValue} 
        placeholder="Search by Article name or Keywords..."
        onChange={handleChange}/>
        <button className="search-button" onClick={handleSubmit}>Search</button>
    </div>
}