import React, { useState } from "react";

export const SearchBar = () => {
    const [searchText, setSearchText] = useState("");

    const handleChange = (e) => {
        setSearchText(e.target.value);
        console.log(e.target.value)
    }

    return <div>
        <input type="text" value={searchText} onChange={handleChange}/>
    </div>
}