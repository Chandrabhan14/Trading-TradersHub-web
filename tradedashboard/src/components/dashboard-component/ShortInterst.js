import React, { useState, useEffect, useRef } from "react";
import NavBottom from "../nav/NavBottom/NavBottom";
import { getShortList } from "../../services/UserServices";
import ReactPaginate from "react-paginate";
import WithAuth from "../auth/withAuth";
import { useNavigate } from "react-router-dom";
import Modal from "../../utils/Modal";
import moment from "moment";

const ShortInterest = () => {
  const [shortInterest, setShortInterest] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const skipRef = useRef(null);

  useEffect(() => {
  
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
  }; 
  const divRef = useRef();

  console.log("shprt intserset is consoled ", shortInterest);

  const fetchData = async () => {
    // setIsLoading(true);

    try {
      setLoading(true);
      const response = await getShortList(page);
      if (response.status == 200) {
        const newData = response.data.ORTEX;
        setShortInterest(newData);
        console.log(response.data.total_count, "--------------------digit");
        setTotalCount(response?.data?.total_count);

        // setPage(pageNumber + 1);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleScroll = () => {
    const div = divRef.current;
    const { scrollTop, scrollHeight, clientHeight } = div;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      fetchData(page);
    }
  };

  useEffect(() => {
    const refDiv = divRef.current;

    refDiv.addEventListener("scroll", handleScroll);

    return () => {
      refDiv.removeEventListener("scroll", handleScroll);
    };
  }, [page, isLoading]);

  console.log(shortInterest, "32456789765432456789");

  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid ShortInterst_section_hp">
          <div className="row">
            <div className="col-lg-12 tab" ref={divRef}>
              <div className="table-responsive tabalignn custom-table ">
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th>Ticker</th>
                      <th>Company</th>
                      <th>MktCap</th>
                      <th>RcntPrice</th>
                      <th>Sqzablty</th>
                      <th>Juice Tgt</th>
                      <th>RcntSqz</th>
                      <th>ShortInt</th>
                      <th>ShrsAvl</th>
                      <th>DTC</th>
                      <th>CTB</th>

                      <th>FFLoan</th>
                      <th>NkdShrts</th>
                      <th>FinHlth</th>
                      <th>Social</th>

                      <th>Float</th>

                      <th>FTDs</th>
                      <th>ShrtLoss</th>
                      <th>Volume</th>
                      <th>Theme</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    <tr>
                      <td colSpan="21" className="text-center py-5">
                        {!loading && shortInterest.length === 0 ? (
                  <p className="text-center py-5" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  Record Not Found
                </p>
                
                        ) : null}
                      </td>
                    </tr>

                    {loading ? (
                      <tr>
                        <td colSpan="14" className="text-center py-5">
                          <div
                            className="spinner-border  "
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
                        {shortInterest?.map((item, index) => (
                          <tr
                            key={index}
                            style={{ fontWeight: "bolder" }}
                            className={index % 2 === 0 ? "even-row" : "odd-row"}
                            onClick={()=>handleNavigate(item?.Ticker)}

                          >
                            <td>{item.Ticker}</td>
                            <td>{item.Company}</td>
                            <td>{item?.MktCap}</td>
                            <td>{item?.RcntPrice}</td>
                            <td>{item?.Sqzablty}</td>
                            <td>{item?.['Juice Tgt']}</td>
                            <td>{item.RcntSqz}</td>
                            <td>{item?.ShortInt}</td>
                            <td>{item.ShrsAvl}</td>
                            <td>{item?.DTC}</td>
                            <td>{item?.CTB}</td>
                            <td>{item?.FFLoan}</td>
                            <td>{item.NkdShrts}</td>
                            <td>{item?.FinHlth}</td>
                            <td>{item?.Social}</td>
                            <td>{item?.Float}</td>
                            <td>{item?.FTDs}</td>
                            <td>{item?.ShrtLoss}</td>
                            <td>{item.Volume}</td>
                            <td>{item?.Theme}</td>
                            <td>{item?.Options}</td>
                           
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
      {  isModalOpen &&  < Modal/>}
    </>
  );
};

export default WithAuth(ShortInterest);
