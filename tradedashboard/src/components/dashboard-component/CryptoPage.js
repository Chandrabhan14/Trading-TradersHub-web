import React, { useEffect, useState } from "react";
import NavBottom from "../../components/nav/NavBottom/NavBottom";

import {getCryptocurrency} from "../../services/DashboardServices"
import ReactPaginate from 'react-paginate';


const CryptoPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
 
  const fetchCryptoData = async () => {

    try {
        const response = await getCryptocurrency();
        if(response.status == 200){
            const res = response?.data
            setCryptoData(res)

        }
       
    }
    catch (error) {
        console.error('Error:', error);
    }

}
useEffect(() => {
  fetchCryptoData();
}, []);



const [itemOffset, setItemOffset] = useState(0);
const itemsPerPage = 10;
const endOffset = itemOffset + itemsPerPage;


const CryptoItems = cryptoData?.slice(itemOffset, endOffset);
const pageCount = Math?.ceil(cryptoData?.length / itemsPerPage);

const handleCryptoClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % cryptoData.length;
  setItemOffset(newOffset);
};


  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding vh-100">
        <div className="container-fluid ShortInterst_section_hp">
          <div className="row">
            
            <div className="col-lg-12 col-md-12 tab">
              <div className="table-responsive tabalignn custom-table" >
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th className="p-4">Symbol</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Currency</th>
                      <th className="p-4">StockExchange</th>


                      <th className="p-4">ExchangeShortName</th>




                    </tr>
                  </thead>
                  <tbody>
              
                    {CryptoItems?.map((data, index) => (
                      <tr key={index}>
                        <td className="p-4">{data.symbol}</td>
                        <td className="p-4">{data.name}</td>
                        <td className="p-4">{data.currency}</td>
                        <td className="p-4">{data.stockExchange}</td>
                        <td className="p-4">{data.exchangeShortName}</td>
                     
                      </tr>
                    ))}
                  </tbody>
                </table>

                <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handleCryptoClick}
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

export default CryptoPage;
