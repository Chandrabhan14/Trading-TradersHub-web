import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import apiHandle from "../services/ApiHandle";
import { getStockUrl } from "../services/UserServices";
import moment from "moment";
import formatMarketCap  from  "../utils/currencyformate";
import { useNavigate } from "react-router-dom";



function EarningSection({ startDate, endDate }) {
  const [earningList, setEarningList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("all");
  const [totalCount, setTotalCount] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading ,setLoading] = useState(false);
 
  const fetchEarningList = async () => {
    const url = getStockUrl(
      "earnings",
      startDate,
      moment(startDate).add("day", 1).format("yyyy-MM-DD"),
      page,
      symbol,
      search,
    );
    try {
      setLoading(true)
      // const response = await apiHandleD.get(url);
      const response = await apiHandle.get(url);

      if (response.status == 200) {
        setEarningList(response?.data?.data?.data);
        setTotalCount(response?.data?.data?.total_count);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEarningList();
  }, [page, startDate, endDate, search, symbol]);

  const navigate = useNavigate()

const handleNavigate = (ticker) =>{
  navigate(`/search/${ticker}`)
}
  
  return (
    <div className="Calender_listContent_Earnings_item">
      <div className="Calender_listContent_Earnings_heading">
        <h5>Earnings</h5>
        <div className="Calender_listContent_Earnings_search">
          {showInput ? (
            <input
              type="text"
              value={symbol}
              placeholder="Searching ..."
              onChange={(e) => setSymbol(e.target.value)}
            />
          ) : null}
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => setShowInput(!showInput)}
          ></i>
        </div>
      </div>
      <div className="Calender_listContent_Earnings_tabs mt-4">
        <ul
          className="nav nav-pills table-responsive mb-3"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className={`nav-link btn_main_hp pe-auto ${
                search == "all" ? "active" : ""
              }`}
              id="pills-Earnings_All-tab"
              onClick={() => {
                setSearch("all");
              }}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link btn_main_hp pe-auto ${
                search == "bmo" ? "active" : ""
              }`}
              id="pills-EarningsBefore-tab"
              onClick={() => {
                setSearch("bmo");
              }}
            >
              <i className="fa-regular fa-sun mr-1"></i> Before Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link btn_main_hp pe-auto ${
                search == "amc" ? "active" : ""
              }`}
              id="pills-EarningsAfter-tab"
              onClick={() => {
                setSearch("amc");
              }}
            >
              <i className="fa-regular fa-moon mr-1"></i> After Close
            </a>
          </li>
        </ul>

        <div
          className="tab-content Calender_EarningsTable_hp "
          id="pills-tabContent"
        >
          <div
            className="tab-pane fade show active "
            id="pills-Earnings_All"
            role="tabpanel"
            aria-labelledby="pills-Earnings_All-tab"
          >
            <div className="h78hv">
              <div className="table-responsive tabalignn custom-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Market Cap</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                     {loading ? ( 
    <tr>
      <td colSpan="3" className="text-center">
        <div className="spinner-border" style={{ width: '3rem', height: '3rem',color:"white" }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </td>
    </tr>
  ) : (
                    earningList?.map((data, dateIndex) => (
                      <tr key={`${dateIndex}`}   onClick={()=>handleNavigate(data?.symbol)}
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            {/* <img src={EarningsImg} className="Calender_EarningsTable_data_logo" alt="Earnings Logo" /> */}
                            <div className="Calender_EarningsTable_data_company ml-2">
                              <h6>{data.symbol}</h6>
                              <p>{data.companyName}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {formatMarketCap(data.marketCap ? data.marketCap : "0")}
                        </td>
                        <td>
                          {data.time === "bmo" ? (
                            <i className="fa-regular fa-sun"></i>
                          ) : data.time === "amc" ? (
                            <i className="fa-regular fa-moon mr-1"></i>
                          ) : (
                            " --"
                          )}
                        </td>
                      </tr>
                    ))) }
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
                pageCount={totalCount / 20}
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
  );
}

export default EarningSection;
