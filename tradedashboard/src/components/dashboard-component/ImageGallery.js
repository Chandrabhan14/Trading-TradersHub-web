import React, { useState } from 'react'
import FsLightbox from "fslightbox-react";
const ImageGallery = ({ img, post, index }) => {
    const [toggler, setToggler] = useState(false);
  
    return (
      <>
        <img
          key={index}
          className="mb-2"
          src={`${img}`}
          alt="Card image cap"
          onClick={() => {
            setToggler(!toggler);
          }}
          style={{ cursor: "pointer" }}
        />
  
        <FsLightbox type="image" toggler={toggler} sources={post?.image_urls} />
      </>
    );
  };

export default ImageGallery