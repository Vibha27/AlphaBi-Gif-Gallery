import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems }) {
  return (
    <div className="gallery-view">
      {currentItems &&
        currentItems.map((item) => (
          <img key={item.url}
          className="col-10 col-md-3"
           src={item.images["preview_gif"].url}
           alt={item.embed_url}/>
          
        ))}
    </div>
  );
}

export const GifGallery = ({ galleryList }) => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  let itemPerPage = 3;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(galleryList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(galleryList.length / itemPerPage));
  }, [itemOffset, itemPerPage, galleryList]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % galleryList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="col-12">
        <Items currentItems={currentItems} />
        <ReactPaginate
        className="pagination"
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="previous"
            renderOnZeroPageCount={null}
        />
        
    </div>
  );
}