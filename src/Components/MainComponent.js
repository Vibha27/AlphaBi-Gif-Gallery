import React, { useState } from "react";
import { GifGallery } from "./GifGallery";
import { SearchBar } from "./SearchBar";

export const MainComponent = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [totalCount, setTotalcount] = useState(0);
    const [hasText, setHasText] = useState(false);

    // Giphy API call
    const apiCall = (searchText) => {
        if(searchText !== "") {
            console.log("search box => ", searchText);
            setHasText(true);
            let giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${process.env.REACT_APP_GIPHY_KEY}`;
            fetch(giphyAPI)
            .then(res => {
                return res.json();
            })
            .then(data=> {
                console.log(data);
                setTotalcount(data.pagination.total_count);
                setSearchResults(data.data);
            })
            .catch(err => console.log(err));
        
        }else { 
            setSearchResults([]);
            setTotalcount(0);
            setHasText(false);

        }
        
    }
 
    // Hot Search
    const handleChange = (textVal) => {
        console.log(textVal)
        apiCall(textVal);
    }
    return <div className="container mt-2 pt-5">
        <div className="row search-gallery-container">
            <SearchBar handleChange={handleChange} />
            {hasText && <GifGallery galleryList={searchResults} totalCount={totalCount} />}
        </div>
    </div>
}