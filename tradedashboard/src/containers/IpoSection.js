import React, { useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import apiHandle from '../services/ApiHandle';
import { getStockUrl } from '../services/UserServices';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function IpoSection( { startDate, endDate }) {

    const [ipoList, setIpoList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate()

    const handleNavigate = (ticker) =>{
      navigate(`/search/${ticker}`)
    }

    const fetchIpoList = async () => {
        const url = getStockUrl(
            "ipo",
            startDate,
            moment(startDate).add("day", 1).format("yyyy-MM-DD"),
            page
        );
        try {
          setLoading(true)
            // const response = await apiHandleD.get(url);
            const response = await apiHandle.get(url);

            if (response.status == 200) {
                setIpoList(response?.data?.data?.data);
                setTotalCount(response?.data?.data?.total_count);

            }
            setLoading(false)
        } catch (error) {
          setLoading(false)

            console.error("Error fetching data:", error);
        }



    }


    useEffect(() => {
        fetchIpoList()
    }, [page, startDate, endDate])












  return (
    <div className="Calender_listContent_Earnings_item">
    <div className="Calender_listContent_Earnings_heading">
      <h5>IPOs</h5>
    </div>
    <div className="Calender_listContent_Earnings_tabs mt-4">
      <div className="Calender_EarningsTable_hp">
        <div className="h35hv">
          <div className="table-responsive tabalignn custom-table">
            <table className="table">
              <thead>
                <tr>
                  <th>TICKER</th>
                  <th>NAME </th>
                  <th>STOCK</th>
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
           
                ipoList?.map((ipo, index) => (
                  
                      <tr key={index}   onClick={()=>handleNavigate(ipo?.symbol)}
                      >
                        <td>{ipo.symbol}</td>
                        <td>{ipo.company}</td>
                        <td>
                          {ipo.exchange ? ipo.exchange : "--"}
                        </td>
                      </tr>
                    )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>  )
}

export default IpoSection