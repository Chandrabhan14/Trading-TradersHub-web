import React, { useEffect, useRef, useState } from "react";
import NavBottom from "../nav/NavBottom/NavBottom";
import { getTradovate, postJournal } from "../../services/DashboardServices";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import background from "../../../src/assets/img/background.png"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import WithAuth from "../auth/withAuth";



function Tradovate() {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState([]);
  const [page, setPage] = useState(1);

  const [totalCount, setTotalCount] = useState(0);
  const [date, setDate] = useState("");
  const[windata,setWindata] = useState(0)
  const[accumulatve,setAccumulatve] = useState(0)
  const[average,setAverage] = useState(0)



  const uid = localStorage.getItem("uid");

  const handleFileUpload = () => {
    fileRef.current.click();
  };


  const percentage = 66;


  const uploadFile = async (e) => {
 
    try {
      setLoading(true);
      const response = await postJournal(e.target.files[0], "tradovate");
      if (response.status == 200 && response?.data?.statusCode == 200) {
        setLoading(false);
        Swal.fire({
          title: "file uploaded!",
          icon: "success",
        });
        fetchJournalData();
      
        fileRef.current.value = "";
      }
      else if (response?.data?.statusCode == 400) {
 
        setLoading(false);
        Swal.fire({
          title: "Invalid file!",
          text: response.data.message,
          icon: "error",
        });
        fileRef.current.value = "";
      } else {
       
        setLoading(false);
        Swal.fire({
          title: "An error occurred!",
          icon: "error",
        });
      }
      
    } catch (error) {
        setLoading(false);
        Swal.fire({
        
          text: error.message,
          icon: "error",
        });
        fileRef.current.value = "";
        setLoading(false);

    }
  };

  const fetchJournalData = async () => {
    try {
      setLoading(true);
      const response = await getTradovate(uid, page, date);
      if (response.status == 200) {
        const res = response?.data?.data;
        setJournal(res?.row_data);
        setTotalCount(res?.total_count);
        setWindata(res?.win_percentage)
        setAccumulatve(res?.accumulative_return)
        setAverage(res?.average_return)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchJournalData();
  }, [page]);

  useEffect(() => {
    if (date == "") {
      fetchJournalData();
    }
  }, [date]);

  return (
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding Robinhood_section_hp">
        <div className="container-fluid">
          <div className="row mb-3">
            <div id="subscription-status" className="col-4 d-flex" w>
              <a href="/Robinhood" className="btn btn_main_hp ">
                Robinhood
              </a>
              <a href="/Tradovate" className="btn btn_main_hp active">
                Tradovate
              </a>
            </div>
          </div>

          <div className="row justify-content-between align-items-center">
            <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-7 col-12 mb-2">
              <div class="input-group Robinhood_search_area">
                <input
                  onChange={(event) => setDate(event.target.value)}
                  type="date"
                  value={date}
                  class="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn_main_hp m-0"
                    type="button"
                    onClick={() => fetchJournalData()}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-4 col-12">
              <div className="w-100 text-right">
                <button className="btn btn_main2_hp" onClick={handleFileUpload}>
                  {" "}
                  {loading ? "Loading..." : "Import"}
                </button>
                <input
                  type="file"
                  className="d-none"
                  accept=".csv"
                  ref={fileRef}
                  onChange={uploadFile}
                ></input>
              </div>
            </div>
          </div>
          <div className="row  card-Tradovate mt-3">
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="card">
                <div className="card-body">
                  <div className="row h-100">
                  
                    <div className="col-md-6">  <p>Accumulatve Return</p>
                    <h2>$ {accumulatve}
                     {/* <span>25% <i class="fa-solid fa-caret-up"></i></span> */}
                      </h2></div>
                    <div className="col-md-6">
                      <img src={background} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="card">
                <div className="card-body">
                  <div className="row h-100">
                  
                    <div className="col-md-6">  <p>Win Percentage</p>  </div>
                    <div className="col-md-6" >
                      <div className="m-auto" style={{ width: 100, height: 100, padding:"10px" }}  >
                    <CircularProgressbar value={windata.toFixed(2)} text={`${windata.toFixed(2)}%`} />;
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="card">
                <div className="card-body">
                  <div className="row h-100">
                  
                    <div className="col-md-6">  <p>Average Return</p>
                    <h2>{average.toFixed(2)}%
                   
                    </h2></div>
                    <div className="col-md-6">
                      <img src={background} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-4 Robinhood_table_area">
            <div className="col-12">
              <div
                className="table-responsive tabalignn custom-table"
                style={{ backgroundColor: "#020134", color: "#fff" }}
              >
                <table className="table table-hover">
                  <thead>
                    <tr>
                  
                      <th>Status</th>
                      <th>Date</th>
                      <th>Symbol</th>
                      <th>Entry</th>
                      <th>Exit</th>
                      <th>Size</th>
                      <th>Side</th>
                      {/* <th>Return</th> */}
                      <th>Return</th>
                      {/* <th>Setups</th> */}
                      <th>Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="11" className="text-center">
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
                      journal?.map((item, index) => (
                        <tr key={index}>
                        
                          <td>
                            <div className="Robinhood_Status_item">
                              {item.status ? item.status : "--"}
                            </div>
                          </td>
                          <td>
                            {item.boughtTimestamp ? item.boughtTimestamp : "--"}
                          </td>
                          <td>{item.symbol ? item.symbol : "--"}</td>
                          <td>{item.buyPrice ? item.buyPrice : "--"}</td>
                          <td>{item.sellPrice ? item.sellPrice : "--"}</td>
                          <td>{item.qty ? item.qty : "--"}</td>
                          <td>
                            <div className="Robinhood_Side_item">
                              {item.position ? item.position : "--"}
                            </div>
                          </td>
                     
                          <td>{item.return ? item.return : "--"}</td>
                  
                     
                          <td>
                            <div class="progress">
                              <div
                                class="progress-bar"
                                role="progressbar"
                                style={{ width: `${item.efficiency}%` }}
                                aria-valuenow={item.efficiency}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {totalCount / 10 > 1 ? (
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Tradovate);
