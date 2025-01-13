import React, { useEffect, useState } from "react";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";
import { useNavigate } from "react-router-dom";
import { getAllstocks, getsearchstockNews, postmyFavStocks } from "../../services/UserServices";
import ReactPaginate from "react-paginate";

function MyFavourite() {
  const navigate = useNavigate();

  const [allStocks, setAllStocks] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchpage, setSearchPage] = useState(1);


  const [totalCount, setTotalCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0)
  const [search, setSearch] = useState("");
  const [searchNews, setSearchNews] = useState([]);
  const [isloading, setIsLoading] = useState(false);


  const uid = localStorage.getItem("uid");


  const getAllStocks = async () => {
    try {
      setLoading(true);

      const response = await getAllstocks(uid, page);
      if (response?.data?.statusCode === 200) {
        setAllStocks(response?.data?.data);
        setTotalCount(response?.data?.count);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllStocks(uid);
  }, [page]);

  const handleFav = async (ticker, favorite) => {
    const action = favorite === false ? "favorite" : "unfavorite";

    const Obj = {
      symbol: ticker,
      uid: uid,
      action: action,

    };
    try {
      setLoading(true);

      const response = await postmyFavStocks(Obj);
      if (response?.data?.statusCode === 200) {
        setAllStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.ticker === ticker ? { ...stock, favorite: !favorite } : stock
          )
        );



      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };





  const getsearchNews = async () => {
    try {
      setIsLoading(true);

      const response = await getsearchstockNews(uid, search, searchpage);
      if (response?.data?.statusCode === 200) {
        setSearchNews(response?.data?.data);
        setSearchCount(response?.data?.totalCount)
      }
      setIsLoading(false);

    } catch (error) {
      console.log(error);
      setSearchNews([]);

    }
    setIsLoading(false);
  };


  const handleSearchClick = () => {
    getsearchNews();
  };

  useEffect(() => {
    getsearchNews(uid);
  }, [searchpage]);









  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid">
          <Side />

          <div className="mb-4 content content_section_hp">
            <div className="row">
              <div id="subscription-status" className="col-xl-12 d-flex">
            
                <button
                  className="btn btn_main_hp ml-3"
                  onClick={() => navigate("/MyFav")}
                >
                  {" "}
                  My Favourite{" "}
                </button>
  

              </div>
            </div>
            <div className="row mt-4 align-items-stretch">
              <div className="col-xl-6 mb-4 col-lg-12 tab mb-3">
                <div>
                  <h2 className="watchlisthead Heading_content_hp">
                    All Stock
                  </h2>

                  <div
                    className="table-responsive tabalignn custom-table"
                    style={{
                      backgroundColor: "#020134",
                     
                      borderTop: "none",
                      borderRadius: " 0 0 10px 10px",
                    }}
                  >
                    <table className="table stock table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Change</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          allStocks?.map((stock) => (
                            <tr key={stock.id}>
                              <td>{stock?.ticker}</td>
                              <td>{stock?.price?.toFixed(2)}</td>
                              <td>{stock?.change_percent?.toFixed(2)}%</td>
                              <td>
                                <h6
                                  className="myfev_icon"
                                  onClick={() => handleFav(stock?.ticker, stock?.favorite)}
                                >
                               
                                  {stock?.favorite ? (
                                    <i className="fas fa-heart"></i>
                                  ) : (
                                    <i className="far fa-heart"></i>
                                  )}
                                </h6>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>

                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=" >"
                      onPageChange={(event) => {
                        setPage(event.selected + 1);
                      }}
                      pageRangeDisplayed={1}
                      marginPagesDisplayed={1}
                      pageCount={totalCount / 10}
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
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFavourite;
