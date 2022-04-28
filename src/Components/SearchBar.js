import React, { useState } from "react";

export const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Giphy API call
    const apiCall = async () => {
        let giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${process.env.REACT_APP_GIPHY_KEY}&limit=5`;
        fetch(giphyAPI)
        .then(response => {
            return response.json();
        })
        .then(data=> {
            console.log(data);
            setSearchResults(data.data);

        })
        .catch(err => console.log(err));
        
    }
 
    // Hot Search
    const handleChange = (e) => {
        setSearchText(e.target.value);
        console.log(e.target.value)
        apiCall();
    }

    return <div>
        <input type="text" value={searchText} onChange={handleChange}/>
    </div>
}