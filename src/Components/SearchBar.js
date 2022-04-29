import React, { useState } from "react";

export const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState(" ");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        props.handleChange(e); 
    }

    return <div className="col-12">
        <input type="text" 
        value={searchValue} 
        onChange={handleChange}/>
    </div>
}