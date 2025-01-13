
import NavBottom from '../nav/NavBottom/NavBottom'
import Side from '../sidebar/side'
import React, { useEffect, useRef, useState } from "react";
import { getOptionFlowData } from '../../services/UserServices';
import ReactPaginate from "react-paginate";
import moment from "moment";
import {Link, useNavigate} from "react-router-dom";
import Modal from '../../utils/Modal';


function OptionsWorld() {

  const [flowData, setFlowData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const skipRef = useRef(null);

  useEffect(() => {
    // Access the DOM element using the ref
    const SkipElement = skipRef.current;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isFirstLogin = user?.first_login;

    const currentDate = moment().tz("America/New_York");

    // Parse the plan end date string
    const planEndDateString = user?.plan_end_date;
    const planEndDate = moment(planEndDateString).tz("America/New_York");

    // Compare the dates
    if (currentDate.isAfter(planEndDate)) {
      console.log("Plan has expired!");
       setIsModalOpen(true)
    } else {
      console.log("Plan is still active.");
    }
  }, []);
const handleNavigate = (ticker) =>{
  navigate(`/search/${ticker}`)
}
  useEffect(() => {
    const fetchOptionData = async () => {
      const limit = 20;
      try {
        setLoading(true);
        const response = await getOptionFlowData(page, limit);
        if (response.status == 200) {
          setFlowData(response?.data?.data?.data);
          setTotalCount(response?.data?.data?.total_count);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flow data:", error);
      }
      setLoading(false);
    };

    fetchOptionData();
  }, [page]);
  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid">
          <Side />
          <div className=" mb-4 content content_section_hp">

            <div className="row mb-3">
              <div id="subscription-status" className="col-4 d-flex" >
                {/* <Link className="btn btn_main_hp" to="/DailyLevel"> */}
                <Link  to="/DailyLevel" className="btn btn_main_hp ml-3"  >
                  Daily Level
                </Link>
                <Link   to="/ninjaWorld" className="btn btn_main_hp ml-3" >
                  Ninja World
                </Link>
              </div>
            </div>

            <div className="container-fluid Option_main_section_hp">

              <div className="row mt-4 Option_heatmap_table_area">
                <div className="col-lg-12 tab">
                  <div className="table-responsive tabalignn custom-table ">
                  <table className="table text-white">
                  <thead>
                    <tr>
                      

                      <th>TIME</th>
                      <th>SYMBOL</th>
                      <th>EXP</th>
                      <th>STRIKE</th>
                      <th>C/P</th>
                      <th>SPOT</th>
                      <th>DETAILS</th>
                      <th>CONTRACT PRICE</th>
                      <th>VOLUME</th>
                  
                    </tr>
                  </thead>
                  <tbody>
                    {!loading && flowData.length === 0 ? (
                      <tr>
                        <td colSpan="21" className="text-center py-5">
                          <p
                            className="text-center py-5"
                            style={{ fontSize: "24px", fontWeight: "bold" }}
                          >
                            Record Not Found
                          </p>
                        </td>
                      </tr>
                    ) : null}

                    {loading ? (
                      <tr>
                        <td colSpan="21" className="text-center py-5">
                          <div
                            className="spinner-border"
                            style={{
                              width: "3rem",
                              height: "3rem",
                              color: "white",
                            }}
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {flowData.map((item, index) => (
                          <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
      
                              
                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                               
         { moment.utc(item.id.creationTime).local().format("HH:mm:ss")}
                               </td>

                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                                 {item.symbol}
                               </td>
                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                          {moment.utc(item.expiration)
                               .local()
                                .format("MM/DD/YYYY")}
                               </td>
                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                                 {item.strike}
                               </td>
                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                                 {item.callPut}
                               </td>
                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                              {item.spot.toFixed(2)}
                               </td>
                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                                 {item.details}
                               </td>
                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                                 {item.contractPrice}
                               </td>
                               <td
                                 style={{
                                   color:
                                     item.callPut === "PUT"
                                       ? "red"
                                       : "#00d000",
                                 }}
                               >
                                 {item.volume}
                               </td>
                   
                              
                             </tr>
                        ))}
                      </>
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
                pageCount={totalCount / 20}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                renderOnZeroPageCount={null}
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


    </>
  )
}

export default OptionsWorld

