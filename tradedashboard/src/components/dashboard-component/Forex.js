import React, { useEffect, useState } from "react";
import NavBottom from "../../components/nav/NavBottom/NavBottom";
import axios from "axios";
import { getForex } from "../../services/DashboardServices";
import ReactPaginate from 'react-paginate';


const Forex = () => {
  const [forexData, setForexData] = useState([]);

  const fetchForexData = async () => {
    try {
      const response = await getForex();
      if (response.status == 200) {
        const res = response?.data;
        setForexData(res?.forexList);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchForexData();
  }, []);



  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;


  const ForexItems = forexData?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(forexData?.length / itemsPerPage);

  const handleForexClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % forexData.length;
    setItemOffset(newOffset);
  };









  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding vh-100">
        <div className="container-fluid ShortInterst_section_hp">
          <div className="row">
            <div className="col-lg-12 col-md-6 tab">
              <div className="table-responsive tabalignn custom-table">
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th className="p-4">Symbol</th>


                      <th className="p-4">Bid</th>
                      <th className="p-4">Ask</th>
                      <th className="p-4">Date </th>
                      <th className="p-4">Open</th>
                      <th className="p-4">Day Low</th>
                      <th className="p-4">Day High</th>
                      <th className="p-4">Changes</th>




                    </tr>
                  </thead>
                  <tbody>
                    {ForexItems?.map((data, index) => (
                      <tr key={index}>
                        <td className="p-4">{data.ticker}</td>
                       <td className="p-4">{data.bid}</td>
                        <td className="p-4">{data.ask}</td>
                        <td className="p-4">{data.date}</td>

                        <td className="p-4">{data.open}</td>
                        <td className="p-4">{data.low}</td>
                        <td className="p-4">{data.high}</td>

                       <td className="p-4">{data.changes}</td>
               
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handleForexClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
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
    </>
  );
};

export default Forex;
