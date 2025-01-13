import React, { useEffect, useRef, useState } from "react";
import NavBottom from "../nav/NavBottom/NavBottom";
import {
  
  getRobinhood,
  postJournal,
} from "../../services/DashboardServices";


import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import WithAuth from "../auth/withAuth";
import moment from "moment";
import Modal from "../../utils/Modal";

function Journals() {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const[date,setDate] = useState("");

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
  

  const uid = localStorage.getItem("uid");

  const handleFileUpload = () => {
    fileRef.current.click();
  };

  const uploadFile = async (e) => {
    console.log("file here", e.target.files[0]);
    console.log(fileRef.current);
    try {
      setLoading(true);
      const response = await postJournal(e.target.files[0], "robinhood");
      console.log("response===========",response)
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
        // Handle status code 400 (Bad Request) here
        setLoading(false);
        Swal.fire({
          title: "Invalid file!",
          text: response.data.message,
          icon: "error",
        });
        fileRef.current.value = "";
      } else {
        // Handle other cases
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

      console.log("error", error);
    }
  };

  const fetchJournalData = async () => {
    try {
      setLoad(true);
      const response = await getRobinhood(uid, page,date);
      if (response.status == 200) {
        const res = response?.data?.data;
        setJournal(res?.row_data);
        setTotalCount(res?.total_count);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      setJournal([]);
        setTotalCount(0);

      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchJournalData();
  }, [page]);


  useEffect(()=>{
    if(date == ""){
      fetchJournalData();

    }

  },[date])

  return (
    <>
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding Robinhood_section_hp">
        <div className="container-fluid">
          <div className="row mb-3">
            <div id="subscription-status" className="col-12 d-flex">
              <a href="/Robinhood" className="btn btn_main_hp active">
                Robinhood
              </a>
              <a href="/Tradovate" className="btn btn_main_hp">
                Tradovate
              </a>
            </div>
          </div>

          <div className="row justify-content-between align-items-center">
            <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-7 col-12 mb-2">
              <div class="input-group Robinhood_search_area">
                <input
                 onChange={(event) => setDate(event.target.value)}
                  value={date}
                  type="date"
                  class="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn_main_hp m-0"
                 onClick={() => fetchJournalData()}

                   type="button">
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

          <div className="row my-4 Robinhood_table_area">
            <div className="col-12">
              <div
                className="table-responsive tabalignn custom-table"
                style={{ backgroundColor: "#020134", color: "#fff" }}
              >
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Activity Date</th>
                      <th>Process Date</th>
                      <th>Settle Date</th>
                      <th>Instrument</th>
                      <th>Description</th>
                      <th>Trans Code</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {load ? (
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
                          <td>{item["Activity Date"]}</td>
                          <td>{item["Process Date"]}</td>
                          <td>{item["Settle Date"]}</td>
                          <td> {item.Instrument ? item.Instrument : "--"}</td>
                          <td>{item.Description ? item.Description : "--"}</td>
                          <td>{item["Trans Code"]}</td>
                          <td>{item.Quantity ? item.Quantity : "--" }</td>
                          <td>{item.Price ? item.Price : "--"}</td>
                          <td>{item.Amount  ? item.Amount : "--"}</td>
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {  isModalOpen &&  < Modal/>}
    </>

   
  );
}

export default  WithAuth(Journals);
