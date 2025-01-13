import React, { useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import apiHandle from '../services/ApiHandle';
import { getStockUrl } from '../services/UserServices';
import moment from 'moment';


function EconomicSection({ startDate, endDate }) {

  const [economicList, setEconomicList] = useState([]);
  const [worldeconomicList, setWorldconomicList] = useState([]);

  const [page, setPage] = useState(1);
  const[worldpage,setWorldPage]= useState(1)

  const [totalCount, setTotalCount] = useState(0);
  const [worldCount, setWorldCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);



  const fetchEconmicList = async () => {
    const url = getStockUrl(
      "economic",
      startDate,
      moment(startDate).add("day", 1).format("yyyy-MM-DD"),
      page
    );
    try {
      setLoading(true)
      // const response = await apiHandleD.get(url);
      const response = await apiHandle.get(url);

      if (response.status == 200) {
        setEconomicList(response?.data?.data?.data);
        setTotalCount(response?.data?.data?.total_count);

      }
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.error("Error fetching data:", error);
    }



  }


  useEffect(() => {
    fetchEconmicList()
  }, [page, startDate, endDate])

  

  const fetchWorldEconmicList = async () => {
    const url = getStockUrl(
      "worldEconomic",
      startDate,
      moment(startDate).add("day", 1).format("yyyy-MM-DD"),
      worldpage
    );
    try {
      setLoad(true)
      // const response = await apiHandleD.get(url);
      const response = await apiHandle.get(url);

      if (response.status == 200) {
        setWorldconomicList(response?.data?.data?.data);
        setWorldCount(response?.data?.data?.total_count);

      }
      setLoad(false)

    } catch (error) {
      setLoad(false)
      console.error("Error fetching data:", error);
    }



  }


  useEffect(() => {
    fetchWorldEconmicList()
  }, [worldpage, startDate, endDate])











  return (




    <div className="Calender_listContent_Earnings_item">
      <div className="Calender_listContent_Earnings_heading">
        <h5>Economic</h5>
      </div>
      <div className="Calender_listContent_Earnings_tabs mt-4">
        <div className="Calender_EarningsTable_hp ">
          <p className="text-white mb-1">US Market</p>
          <div className="h35hv">
            <div className="table-responsive tabalignn custom-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>IMPACT ACTUAL</th>
                    <th>EST</th>
                    <th>PREV</th>
                    <th>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? ( 
                    <tr>
                      <td colSpan="5" className="text-center">
                        <div className="spinner-border" style={{ width: '3rem', height: '3rem', color: "white" }} role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (




                    economicList?.map((item, index) => (

                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
 
                            <div className="Calender_EarningsTable_data_company ml-2">
                              <h6>{item.event}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {/* Replace the star icons and the rating with actual data */}
                            <p className="ml-1 mb-0">
                              {item.impact ? item.impact : "--"}
                            </p>
                          </div>
                        </td>
                        <td>
                          {item.estimate ? item.estimate : "--"}
                        </td>
                        <td>
                          {item.previous ? item.previous : "--"}
                        </td>
                        <td>
                          {new Date(item.date).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </td>
                      </tr>
                    )))}

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
        </div>
         
      <div className="Calender_EarningsTable_hp mt-4">
        <p className="text-white mb-1">Rest of the World Market</p>
        <div className="h35hv">
          <div className="table-responsive tabalignn custom-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>IMPACT	ACTUAL</th>
                  <th>EST</th>
                  <th>PREV</th>
                  <th>TIME</th>
                </tr>
              </thead>
              <tbody>
                  {load ? ( 
                    <tr>
                      <td colSpan="5" className="text-center">
                        <div className="spinner-border" style={{ width: '3rem', height: '3rem', color: "white" }} role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (

                    worldeconomicList?.map((item, index) => (

                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
           
                            <div className="Calender_EarningsTable_data_company ml-2">
                              <h6>{item.event}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {/* Replace the star icons and the rating with actual data */}
                            <p className="ml-1 mb-0">
                              {item.impact ? item.impact : "--"}
                            </p>
                          </div>
                        </td>
                        <td>
                          {item.estimate ? item.estimate : "--"}
                        </td>
                        <td>
                          {item.previous ? item.previous : "--"}
                        </td>
                        <td>
                          {new Date(item.date).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </td>
                      </tr>
                    )))}

                </tbody>
            </table>
          </div>
           <ReactPaginate
              breakLabel="..."
              nextLabel=" >"
              onPageChange={(event) => {
                setWorldPage(event.selected + 1);
              }}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}

              pageCount={worldCount / 10}
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
    </div>)
}

export default EconomicSection