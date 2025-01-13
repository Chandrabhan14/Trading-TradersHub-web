import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NavBottom from "../nav/NavBottom/NavBottom";
import { SymbolOverview } from "react-ts-tradingview-widgets";
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { deleteLongTermData, getSearchResult, longTermGet, longTermPost } from '../../services/UserServices';
import Swal from 'sweetalert2';

// Validation schema
const schema = yup.object().shape({
    stock: yup.string().required("Stock symbol is required"),
    currentPrice: yup.number().typeError("Current Price must be a number").required("Current Price is required"),
    targetPrice: yup.number().typeError("Target Price must be a number").required("Target Price is required"),
});

const LongTerm = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const user = JSON.parse(localStorage.getItem("user"));

    const [longTermStock,setLongTermStock] = useState([])
    const [searchData, setSearchData] = useState(null);
    const [selectedTicker, setSelectedTicker] = useState('');
console.log(selectedTicker,"selectedTicker")
    const postLongTermStock = async (data) => {
        const userData = JSON.parse(localStorage.getItem("googledata"));
        const uid = userData?.uid;

        const payload = {
            uid,
            ticker: data.stock.toUpperCase(),
            alert_price: data.currentPrice,
            target_price: data.targetPrice
        };

        try {
            
            const response = await longTermPost(payload);

            if (response.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Posted Successfully!",
                    showConfirmButton: false,
                    timer: 2000, 
                    timerProgressBar: true, 
                    toast: true, 
                    position: "top-end", 
                    showCloseButton: true, 
                  });
                  getLongtermStocks();
                  const modal = document.getElementById('LongTerm');
                  const bootstrapModal = new window.bootstrap.Modal(modal);
                  bootstrapModal.hide(); // Use hide() instead of close()
                  reset();
            } 
        } catch (error) {
            console.error(error);
        }
    };
    const getLongtermStocks = useCallback(async () => {
        try {
          const response = await longTermGet();
          if (response.status === 200) {
            setLongTermStock(response?.data?.data);
            setSelectedTicker(response?.data?.data[0].ticker);
            
          }
        } catch (error) {
          console.error(error);
        }
      }, []);
    
  

      const getSearchResults = useCallback(async (symbol) => {
        try {
    
          const response = await getSearchResult(symbol);
          if (response?.data?.statusCode == 200) {
            setSearchData(response?.data?.data);
           
          }
        
        } catch (error) {
        
            console.error("No records found");
          }
         
      }, []);


      useEffect(() => {
        getLongtermStocks();
    }, [getLongtermStocks]);

    useEffect(() => {
        if (selectedTicker) {
            getSearchResults(selectedTicker);
        }
    }, [selectedTicker, getSearchResults]);

    const handleTickerSelect = (ticker) => {
        setSelectedTicker(ticker);
    };



    const deleteItem = async (sym) => {
        // Display confirmation dialog
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this item.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel'
        }).then(async (result) => {
          if (result.isConfirmed) {
          
      
            try {
    
                const data = {
                    uid: localStorage.getItem("uid"),
                    symbol: sym,
                  };
    
                  const  uid =  localStorage.getItem("uid")
                  const     symbol = data?.symbol
              // Call the API to delete the item
              const response = await deleteLongTermData(uid,symbol);
          
              if(response.status == 200 ){
                Swal.fire(
                    'Deleted!',
                    'symbol has been deleted.',
                    'success'
                  );
                
              }
          getLongtermStocks()
           
            } catch (error) {
              console.error("Error deleting item:", error);
            
            }
          }
        });
      };


      
    
    return (
        <>
            <NavBottom isStyleChanged />
            <div className="notify-overlay"></div>
            <div className='dashboard-area bg-color area-padding'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-xl-5 col-lg-5 col-md-6'>
                            <div style={{ background: '#150550', borderRadius: '10px', padding: '10px' }}>
                                <div className='row align-items-center mb-2'>
                                    <div className='col-lg-6'>
                                        <h2 className="watchlisthead Heading_content_hp">Long Term</h2>
                                    </div>
                                 {   user.is_admin ?  (
                                    <>
                                 <div className='col-lg-6 text-right'>
                                        <button type="button" className="btn_main2_hp m-0" data-toggle="modal" data-target="#LongTerm">Add Long Term</button>
                                    </div> 
                                    </>
                                ) :''}
                                
                                    <div className="modal fade Bot_TradersHub_ninja" id="LongTerm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Add Long Term</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={() => reset()}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <form onSubmit={handleSubmit(postLongTermStock)}>
                                                    <div className="modal-body">
                                                        <div className="mb-2">
                                                            <label>Long Term stock</label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                                                {...register("stock")}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.stock?.message}
                                                            </div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <label>Alert Price</label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.currentPrice ? 'is-invalid' : ''}`}
                                                                {...register("currentPrice")}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.currentPrice?.message}
                                                            </div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <label>Price Target</label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${errors.targetPrice ? 'is-invalid' : ''}`}
                                                                {...register("targetPrice")}
                                                            />
                                                            <div className="invalid-feedback">
                                                                {errors.targetPrice?.message}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="submit" className="btn btn_main2_hp">Save</button>
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => reset()}>Close</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive tabalignn custom-table">
                                    <div className="content">
                                        <table className="table stock table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Symbol</th>
                                                    <th>Alert Price</th>
                                                    <th>Price Target</th>
                                                    <th> Alert Date</th>
                                                    <th>Change(%)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {longTermStock.map((stock, index) => (
                                                <tr key={index} onClick={() => handleTickerSelect(stock.ticker)} className="even-row">
                                                    {/* <td data-tooltip-id="my-tooltip-1" data-tooltip-content="CERo Therapeutics Holdings, Inc.">CERO</td> */}
                                                    <td>{stock.ticker}</td>
                                                        <td>{stock?.alert_price}</td>
                                                        <td>{stock?.target_price}</td>
                                                        <td>{new Date(stock?.time).toLocaleDateString()}</td>
                                                        <td>{stock?.percent_change !== null ? `${stock.percent_change.toFixed(2)}%` : "--"}</td>

                                                        {user?.is_admin ? (<>
                              <td >
                             
                        <button  className="btn_main2_hp" onClick={() => deleteItem(stock.ticker)}>Delete</button> {/* Delete button */}
                  
                              </td></>):''} 
                                                </tr>
                                                  ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-7 col-lg-7 col-md-6'>
                            <div className='searching_Reault_Section'>
                                <div className='searching_Reault_Right_area'>
                                    <div className='tab-content'>
                                        <div className="row content ">
                                            <div className="col-xl-7 col-lg-12 col-12 mb-3">
                                                <div className="searching_Reault_Right_overview_table">
                                                {selectedTicker && (
                                                    <SymbolOverview
                                                        colorTheme="dark"
                                                        autosize
                                                        chartType="candlesticks"
                                                        downColor="#800080"
                                                        borderDownColor="#800080"
                                                        wickDownColor="#800080"
                                                        symbols={selectedTicker}
                                                    />
                                                )}
                                                </div>
                                            </div>
                                            <div className="col-xl-5 col-lg-12 col-12 mb-3">
                                                <div className="searching_Reault_Right_overview_table">
                                                {selectedTicker && (
                                                    <TechnicalAnalysis
                                                        colorTheme="dark"
                                                        width="100%"
                                                     symbol={selectedTicker}
                                                    ></TechnicalAnalysis>
                                                )}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-12 col-md-6 col-12 mb-3">
                                                <div className="searching_Reault_Right_overview_table">
                                                    <h2 className="watchlisthead Heading_content_hp mb-2"> Price Highlights </h2>
                                                    <div className="table-responsive tabalignn custom-table searching_Reault_Right_table_Responsive ">
                                                        <table className="table table-hover mb-0">
                                                        <tbody>
                                  <tr>
                                    <td>Open Price</td>
                                    <td>${searchData?.company_quote?.open}</td>
                                  </tr>
                                  <tr>
                                    <td>Today-Price Range</td>
                                    <td>
                                      $
                                      {searchData?.company_quote?.previousClose}{" "}
                                      - ${searchData?.company_quote?.open}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Previous-Close Price</td>
                                    <td>
                                      $
                                      {searchData?.company_quote?.previousClose}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>volume</td>
                                    <td>{searchData?.company_quote?.volume}</td>
                                  </tr>
                                  <tr>
                                    <td>Average Volume</td>
                                    <td>
                                      {searchData?.company_quote?.avgVolume}
                                    </td>
                                  </tr>
                                </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-12 col-md-6 col-12 mb-3">
                                                <div className="searching_Reault_Right_overview_table">
                                                    <h2 className="watchlisthead Heading_content_hp mb-2"> Share Statistics </h2>
                                                    <div className="table-responsive tabalignn custom-table searching_Reault_Right_table_Responsive">
                                                        <table className="table table-hover mb-0">
                                                        <tbody>
                                  <tr>
                                    <td>Shares Outstanding</td>
                                    <td>
                                      {
                                        searchData?.ShareStats
                                          ?.SharesOutstanding
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Shares Float</td>
                                    <td>
                                      {searchData?.ShareStats?.SharesFloat}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Shares Short</td>
                                    <td>
                                      {searchData?.ShareStats?.SharesShort}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Shares Short Prior Month</td>
                                    <td>
                                      {
                                        searchData?.ShareStats
                                          ?.SharesShortPriorMonth
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Short Float</td>
                                    <td>
                                      {
                                        searchData?.ShareStats
                                          ?.ShortPercentFloat
                                      }
                                    </td>
                                  </tr>
                                </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                                <div className="searching_Reault_Right_overview_table">
                                                    <h2 className="watchlisthead Heading_content_hp mb-2"> Financial Highlights </h2>
                                                    <div className="table-responsive tabalignn custom-table searching_Reault_Right_table_Responsive">
                                                        <table className="table table-hover mb-0">
                                                        <tbody>
                                  <tr>
                                    <td>P/E Ratio</td>
                                    <td>{searchData?.Highlights?.PERatio}</td>
                                  </tr>
                                  <tr>
                                    <td>Dividend Per Share</td>

                                    <td>
                                      {searchData?.Highlights?.DividendShare}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Dividend Yield</td>
                                    <td>
                                      {searchData?.Highlights?.DividendYield}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>EPS </td>
                                    <td>
                                      {
                                        searchData?.Highlights
                                          ?.EPSEstimateCurrentYear
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Profit Margin</td>
                                    <td>
                                      {searchData?.Highlights?.ProfitMargin}
                                    </td>
                                  </tr>
                                </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LongTerm;
