import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  getSearchfavstocks,
  getmyFavStockNews,
  lowerPriceAlert,
  postmyFavStocks,
} from "../../services/UserServices";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Modal from "../../utils/Modal";
import { ToastContainer, toast } from "react-toastify";

function MyFav() {
  const navigate = useNavigate();
  const [favstocks, setFavstocks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocknews, setStocknews] = useState([]);
  const [enteredPrices, setEnteredPrices] = useState({});
  const [search, setSearch] = useState("");

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const currentDate = moment().tz("America/New_York");

    // Parse the plan end date string
    const planEndDateString = user?.plan_end_date;
    const planEndDate = moment(planEndDateString).tz("America/New_York");

    // Compare the dates
    if (currentDate.isAfter(planEndDate)) {
      console.log("Plan has expired!");
      setIsModalOpen(true);
    } else {
      console.log("Plan is still active.");
    }
  }, []);

  const getFavstocks = async () => {
    try {
      setLoading(true);
      const response = await getSearchfavstocks(uid, search);
      if (response.status == 200 && response?.data?.statusCode == 200) {
        setFavstocks(response?.data?.data);
        const data = response.data.data;
        const pricesMap = {};
        data.forEach((item) => {
          pricesMap[item.ticker] = item.desired_price;
        });
        setFavstocks(data);
        setEnteredPrices(pricesMap);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getFavstocks(uid);
  }, [search]);

  const handleSearchClick = () => {
    getFavstocks();
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const handleFav = async (ticker, favorite) => {
    const action = favorite == false ? "favorite" : "unfavorite";

    const Obj = {
      symbol: ticker,
      uid: uid,
      action: action,
    };
    try {
      setLoading(true);

      const response = await postmyFavStocks(Obj);
      if (response?.data?.statusCode == 200) {
        // If the API call is successful, update the state for the specific stock
        setFavstocks((prevStocks) =>
          prevStocks.map((stocks) =>
            stocks.ticker === ticker
              ? { ...stocks, favorite: !favorite }
              : stocks
          )
        );

        getFavstocks();

        getFavstockNews(uid);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getFavstockNews = async (uid) => {
    try {
      setIsLoading(true);
      const response = await getmyFavStockNews(uid, page);
      if (response.status == 200 && response?.data?.statusCode == 200) {
        setStocknews(response?.data?.data);
        setTotalCount(response?.data?.totalCount);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getFavstockNews(uid);
  }, [page]);

  const handleStockSearch = (ticker) => {
    navigate(`/search/${ticker}`);
  };

  const sendAlert = async (ticker, low) => {
    const uid = localStorage.getItem("uid");
    const Obj = {
      symbol: ticker,
      desired_price: low,
      uid: uid,
    };

    console.log(Obj, "'qasadsada");
    try {
      const response = await lowerPriceAlert(Obj);
      if (response.status == 200) {
        toast.success("Alert Submitted");
      } else {
        console.error("Failed to send alert");
      }
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  const handleSubmit = (ticker) => {
    const price = +enteredPrices[ticker];

    sendAlert(ticker, price);
  };

  const handlePriceChange = (e, ticker) => {
    const price = e.target.value;
    setEnteredPrices((prevPrices) => ({
      ...prevPrices,
      [ticker]: price,
    }));
  };

  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid">
          <Side />

          <div className="mb-4 content content_section_hp">
            <div className="row align-items-stretch">
              <div className="col-xl-6 mb-4 col-lg-12 tab mb-3">
                <div>
                  <div className=" Heading_content_hp d-flex justify-content-between flex-wrap">
                    <h2 className="watchlisthead mb-0 pb-0">My Favourite</h2>
                    <div className="form-group myfev_search_area mb-0">
                      {showInput ? (
                        <input
                          type="text"
                          placeholder="Stock Search..."
                          className="form-control"
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSearchClick();
                            }
                          }}
                        />
                      ) : null}
                      <button
                        className="btn"
                        onClick={handleSearchClick}
                        disabled={isloading}
                      >
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </div>

                  <div className="my_fav_list_table_area_hp">
                    <div
                      className="table-responsive tabalignn custom-table"
                      style={{
                        backgroundColor: "#020134",

                        borderTop: "none",
                      }}
                    >
                      <table className="table stock table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change</th>
                            <th>52(W) High</th>
                            <th>52(W) Low</th>
                            <th>Action</th>
                            {favstocks.some((stock) => stock.favorite) && ( // Check if any stock has time information
                              <>
                                <th>Alert value</th>
                                <th>Submit</th>
                                <th>Email Sent</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="8" className="text-center">
                                <div className="spinner-border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </td>
                            </tr>
                          ) : favstocks && favstocks.length > 0 ? (
                            favstocks.map((stocks, index) => (
                              <tr key={index}>
                                <td
                                  data-tooltip-id="my-tooltip-fav"
                                  data-tooltip-content={stocks?.company_name}
                                  onClick={() =>
                                    handleStockSearch(stocks?.ticker)
                                  }
                                >
                                  {stocks?.ticker}

                                  <ReactTooltip
                                    id="my-tooltip-fav"
                                    place="bottom"
                                    variant="info"
                                  />
                                </td>
                                <td
                                  onClick={() =>
                                    handleStockSearch(stocks?.ticker)
                                  }
                                >
                                  {" "}
                                  {stocks?.price?.toFixed(2)}
                                </td>
                                <td
                                  onClick={() =>
                                    handleStockSearch(stocks?.ticker)
                                  }
                                >
                                  {stocks?.change_percent?.toFixed(2)}%
                                </td>
                                <td
                                  onClick={() =>
                                    handleStockSearch(stocks?.ticker)
                                  }
                                >
                                  {stocks?.high?.toFixed(2)}
                                </td>
                                <td
                                  onClick={() =>
                                    handleStockSearch(stocks?.ticker)
                                  }
                                >
                                  {" "}
                                  {stocks?.low?.toFixed(2)}
                                </td>

                                <td>
                                  <h6
                                    className="myfev_icon"
                                    onClick={() =>
                                      handleFav(
                                        stocks?.ticker,
                                        stocks?.favorite
                                      )
                                    }
                                  >
                                    {stocks?.favorite ? (
                                      <i className="fas fa-heart"></i>
                                    ) : (
                                      <i className="far fa-heart"></i>
                                    )}
                                  </h6>
                                </td>
                                {stocks?.favorite && (
                                  <>
                                    <td>
                                      <input
                                        min={0}
                                        max={10000000000}
                                        type="number"
                                        placeholder="Enter price"
                                        className="form-control"
                                        value={
                                          enteredPrices[stocks?.ticker] || ""
                                        }
                                        onChange={(e) =>
                                          handlePriceChange(e, stocks?.ticker)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <button
                                        className="btn"
                                        style={{
                                          backgroundColor: "deeppink",
                                          color: "white",
                                        }}
                                        onClick={() => {
                                          handleSubmit(stocks?.ticker);
                                        }}
                                      >
                                        Submit
                                      </button>
                                    </td>
                                    <td>
                                      {" "}
                                      {stocks?.mail_sent ? (
                                        <i className="fa fa-check"></i>
                                      ) : (
                                        "--"
                                      )}
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8S" className="text-center">
                                No records found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 mb-4 col-lg-12 mb-3">
                <div className="searching_Reault_Section myfav_News_table_section_hp">
                  <div className="searching_Reault_Right_area">
                    <div className="tab-content">
                      <div className="searching_Reault_Right_overview_table border-0 p-0 ">
                        <h2 className="watchlisthead Heading_content_hp">
                          News
                        </h2>
                        <div className="table-responsive tabalignn custom-table searching_Reault_Right_table_Responsive">
                          <table className="table table-hover mb-0">
                            <tbody>
                              {isloading ? (
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ) : stocknews && stocknews.length > 0 ? (
                                stocknews.map((news, index) => (
                                  <tr key={index}>
                                    <td>
                                      <a
                                        href={news.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                        }}
                                      >
                                        <h6 className="mb-0 font-weight-bolder">
                                          {news.title}
                                        </h6>
                                        <p className="mb-0">
                                          {news.publishedDate}
                                          <span className="mx-1">|</span>{" "}
                                          {news.text}
                                        </p>
                                      </a>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    No records found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
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
                      <ToastContainer position="top-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal />}
    </>
  );
}

export default MyFav;
