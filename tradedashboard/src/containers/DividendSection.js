import React, { useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import apiHandle from '../services/ApiHandle';
import { getStockUrl } from '../services/UserServices';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
;


function DividendSection({ startDate, endDate }) {

    const [dividendList, setDividendList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [symbol,setSymbol] =useState("");
    const [showInput,setShowInput] = useState(false);
    const[loading,setLoading] = useState(false);

    const fetchDividendList = async () => {
        const url = getStockUrl(
            "dividend",
            startDate,
            moment(startDate).add("day", 1).format("yyyy-MM-DD"),
            page,
            symbol
        );
        try {
          setLoading(true)
            // const response = await apiHandleD.get(url);
            const response = await apiHandle.get(url);

            if (response.status == 200) {
                setDividendList(response?.data?.data?.data);
                setTotalCount(response?.data?.data?.total_count);

            }
            setLoading(false)
        } catch (error) {
          setLoading(false)

            console.error("Error fetching data:", error);
        }



    }
    const navigate = useNavigate()

    const handleNavigate = (ticker) =>{
      navigate(`/search/${ticker}`)
    }

    useEffect(() => {
        fetchDividendList()
    }, [page, startDate, endDate,symbol])


  return (

    <div className="Calender_listContent_Earnings_item mt-4">
    <div className="Calender_listContent_Earnings_heading">
      <h5>Dividends</h5>
      <div className='Calender_listContent_Earnings_search'>
                {showInput ? 
                    <input type="text" value={symbol} placeholder='Searching ...'  onChange={(e) => setSymbol(e.target.value)}/>
                 : null}
                <i className="fa-solid fa-magnifying-glass" onClick={() => setShowInput(!showInput)}></i>
                </div>    </div>
    <div className="Calender_listContent_Earnings_tabs mt-4">
      <div className="Calender_EarningsTable_hp">
        <div className="h35hv">
          <div className="table-responsive tabalignn custom-table">
            <table className="table">
              <thead>
                <tr>
                  <th>COMPANY</th>
                  <th>DECLARATION DATE </th>
                  <th>RECORD DATE</th>
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
           

                dividendList?.map((item, index) => (
               
                      <tr key={index}   onClick={()=>handleNavigate(item?.symbol)}
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            {/* <img src={EarningsImg} className="Calender_EarningsTable_data_logo" alt="Company Logo" /> */}
                            <div className="Calender_EarningsTable_data_company ml-2">
                              <h6>{item.symbol}</h6>
                              {/* <p>{item.company}</p> */}
                            </div>
                          </div>
                        </td>
                        <td>
                          {item.declarationDate
                            ? item.declarationDate
                            : "N/A"}
                        </td>
                        <td>
                          {item.recordDate
                            ? item.recordDate
                            : "N/A"}
                        </td>
                      </tr>
                    )) )}
                 
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
  </div>  )
}

export default DividendSection