import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


function Items({ currentItems }) {
  return (
    <div className="gallery-view">
      {currentItems &&
        currentItems.map((item) => (<>
          <img key={item.url}
          className="col-6 col-md-3"
           src={item.images["preview_gif"].url}
           alt={item.embed_url}/>
          </>
        ))}
    </div>
  );
}

export const GifGallery = ({ galleryList, totalCount }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setItemPerPage(4)
    } else {
      setItemPerPage(3)
    }
  }

  const [itemPerPage, setItemPerPage] = useState(3);

  useEffect(() => {
    // first checking screen size
    handleResize();

    const endOffset = itemOffset + itemPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    setCurrentItems(galleryList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(galleryList.length / itemPerPage));

    // checking for resize event also
    window.addEventListener('resize', handleResize);

  }, [itemOffset, itemPerPage, galleryList]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % totalCount;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="col-12 col-md-12">
        {totalCount > 0 ? <> 
        <Items currentItems={currentItems} />
        <ReactPaginate
        className="pagination"
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            activeClassName={'active'}
        />
        </>
         : <p textAlign="center">Not Found</p>}
    </div>
  );
}