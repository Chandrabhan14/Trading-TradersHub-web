import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogGet } from "../services/UserServices";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "../components/store/Reducers";
import ReactPaginate from "react-paginate";


const Blog = () => {

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getBlogs = async () => {
 
    try {
      setLoading(true);

      const response = await blogGet(page);
      if (response?.data?.statusCode == 200) {
        setSearchData(response?.data?.data?.posts);
        setTotalCount(response?.data?.data?.count);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page]);


  const handleClick = (postData) => {
    console.log(postData, "postData");
    dispatch(setSelectedPost(postData));
    navigate("/blog-overview");
  };
  return (
    <section className="container-fluid blog-area my-5 blog_section_hp">
      <div className="container">
        <div className="row align-content-stretch">

         {searchData?.map((items,i) =>( 
         <div key={i} className="col-xl-4 col-lg-4 col-md-6 mb-4">
            <div className="blog_item_area"  onClick={() => handleClick(items)} >
              <div className="blog_item_img_area">
               
                  <img
                    src={items?.image_urls}
                    alt="Blog img"
                  />
              
                <div className="blog_category_area">
                  Weekly-Recap
                </div>
              </div>
              <div className="blog_item_content_area">
                <div className="blog-meta">
                  <span className="admin-type">
                    <i className="fa fa-user"></i> TradersHub
                  </span>
                  <span className="date-type">
                    <i className="fa fa-calendar"></i>{moment(items?.created_at).format(' D MMMM YYYY')}
                  </span>
                </div>
                <Link to="/blog-overview">
                  <h4 className="blog_item_content_title" dangerouslySetInnerHTML={{ __html: items?.text }}></h4>
                </Link>
              </div>
            </div>
          </div>
        ))}

        </div>

        <ReactPaginate
                          breakLabel="..."
                          nextLabel=" >"
                          onPageChange={(event) => {
                            setPage(event.selected + 1);
                          }}
                          pageRangeDisplayed={1}
                          marginPagesDisplayed={1}
                          pageCount={totalCount / 9}
                          previousLabel="< "
                          renderOnZeroPageCount={null}
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          containerClassName="pagination"
                          activeClassName="active"
                        />

      </div>
    </section>
  );
};
export default Blog;
