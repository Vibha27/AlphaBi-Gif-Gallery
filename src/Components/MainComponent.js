import React, { useState } from "react";
import { GifGallery } from "./GifGallery";
import { SearchBar } from "./SearchBar";

export const MainComponent = () => {
    const [searchResults, setSearchResults] = useState([]);

    // Giphy API call
    const apiCall = (searchText) => {
        if(searchText !== " ") {
            console.log("search box => ", searchText)
            let giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${process.env.REACT_APP_GIPHY_KEY}`;
            fetch(giphyAPI)
            .then(res => {
                return res.json();
            })
            .then(data=> {
                console.log(data);
                setSearchResults(data.data);
            })
            .catch(err => console.log(err));
        
        }else { setSearchResults([]) }
        
    }
 
    // Hot Search
    const handleChange = (e) => {
        console.log(e.target.value)
        apiCall(e.target.value);
    }
    return <div className="row">
        <SearchBar handleChange={handleChange} />
        <GifGallery galleryList={searchResults} />
    </div>
}