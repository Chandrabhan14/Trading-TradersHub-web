import React, { useEffect, useState } from 'react';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";

import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the default styles for rc-slider

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { prediction, predictionPostData, predictionSearchData, predictionSymData, scorePridiction, stockCurrentValue } from '../../services/UserServices';
import { useForm } from 'react-hook-form';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';
import 'rc-slider/assets/index.css';


function MakePrediction() {
  const [selectedSymbol, setSelectedSymbol] = useState(''); // Initial range

  const [predictionType, setPredictionType] = useState('');

  const [loading, setLoading] = useState(false);
  const [predictionData, setPrediction] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [tickerValue, setPredictonTicker] = useState([]);
  const [predictionMessage, setPredictionMessage] = useState('');

  const [isloading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [predicSearch, setPredicSearch] = useState([]);
  const [score, setScore] = useState([])
  const [searchingValue, setSearchingValue] = useState("");
  const [predictionValue, setPredictionValue] = useState(0);
  const [range, setRange] = useState({});
  const [loadingFeature,setLoadingFeature] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const fetchprediction = async () => {
    try {
      // setLoading(true);
      setLoadingFeature(true)
      const response = await prediction();
      if (response.status == 200) {
        setPrediction(response?.data?.data);
      }
      setLoadingFeature(false);
    } catch (error) {
      console.error("Error fetching flow data:", error);
    }
    setLoadingFeature(false);
  };


  const getpredictionda = async (selectedSymbol) => {
    try {
      //   setLoading(true);
      const response = await predictionSymData(selectedSymbol);
      if (response.status == 200) {
        setPredictonTicker(response?.data?.data);
      }
      //   setLoading(false);
    } catch (error) {
      console.error("Error fetching flow data:", error);
    }
    // setLoading(false);
  };


  useEffect(() => {
    fetchprediction();

  }, [])



  const handleChange = (e) => {
    setSearchingValue(e.target.value);
  };



  const handleMakePredictionClick = (symbol, type) => {
    setSelectedSymbol(symbol);
    setPredictionType(type);
    getpredictionda(symbol);

    if (type === 'close') {
      setPredictionMessage(`Where ${symbol} will Close Today`);
    } else if (type === 'high') {
      setPredictionMessage(`${symbol} high for the rest of the day`);
    } else if (type === 'low') {
      setPredictionMessage(`${symbol} low for the rest of the day`);
    }
  };


  const uid = localStorage.getItem("uid")

  const onSubmit = async (data) => {

    setIsActive(true)
    console.log(" i am in ")
    console.log("daat ooff prediction ", data)


    const formData = {
      "uid": uid,
      "symbol": selectedSymbol,
      "predicted_value": predictionValue,
      "option": predictionType

    }
    console.log("daat ooff prediction ", formData)

    try {

      const response = await predictionPostData(formData);
      if (response.status == 200) {

        reset();

        const closeButton = document.getElementById('closeButton');
        if (closeButton) {
          closeButton.click();
        }
        toast.success("Prediction submitted", { autoClose: 2000 })
        setIsActive(false)

      }

    } catch (error) {
      console.log(error, 'oo')
      toast.error(error.response.data.message, { autoClose: 1000 });
      reset();
    }
  };

  const handleModalClose = () => {
    reset();
  };


  const closePridectionModal = () => {
    const closeButton = document.getElementById('closeButton');
    if (closeButton) {
      closeButton.click(); // Simulate a click on the close button
    }
    reset();
  }



  const handleSearchClick = () => {
    getFavstocks();
    setShowInput((prevShowInput) => !prevShowInput);
  };


  const getFavstocks = async (search) => {
    try {
      setLoading(true);
      const response = await predictionSearchData(search);

      if (response.status == 200 && response?.data?.statusCode == 200) {

        setPredicSearch(response?.data?.data);
        // setLoading(false);
      }
    } catch (error) {
      //   setLoading(false);
      console.log(error);
    }
  };

  const fetchScore = async () => {
    try {
      setLoading(true);
      const response = await scorePridiction();
      if (response.status == 200 && response?.data?.statusCode == 200) {
        setScore(response?.data?.data);
        setLoading(false);
      }
    } catch (error) {
        setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScore();
  }, []);

  const navigate = useNavigate();

  const handleSuggestionSelected = (event, { suggestion }) => {
    setSelectedSymbol(suggestion.ticker);
    // setPredictionType(type);
    const modal = document.getElementById('MakePrediction_Modal');
    const bootstrapModal = new window.bootstrap.Modal(modal); // Use window.bootstrap
    bootstrapModal.show();
  };


  //for getting range from api
  const fetchRangeData = async () => {
    try {
      const response = await stockCurrentValue(selectedSymbol);
      if (response.status == 200) {
        setRange(response?.data?.data)
        setPredictionValue(response.data.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching range:", error);
    }
  };

  useEffect(() => {
    if (selectedSymbol) {
      fetchRangeData();
    }
  }, [selectedSymbol]);



  const handlePredictionValueChange = (value) => {
    console.log(value)
    setPredictionValue(value);
  };

  const generateLabels = () => {
    const labels = [];
    const step = (range.current_price + 5 - (range.current_price - 5)) / 10; // Generate 10 steps
    for (let i = 0; i <= 10; i++) {
      labels.push((range.current_price - 5 + step * i).toFixed(2));
    }
    return labels;
  };

  const labels = generateLabels().reverse();
  return (
    <>
      <div>
        <NavBottom isStyleChanged />
        <div className="notify-overlay"></div>
        <div className="dashboard-area bg-color area-padding">
          <div className="container-fluid">
            {/* Sidebar Section */}
            <Side />
            {/* Sidebar Section */}

            <div className="mb-4 content content_section_hp">
              <div className='MakePrediction_page_section_hp'>
                <div className='d-flex align-items-center justify-content-between'>
                  <h4 className='MakePrediction_page_heading_hp me-2'>Make a Prediction</h4>

                  <div className="form-group myfev_search_area mb-0 h-100">



                    <Autosuggest
                      suggestions={predicSearch || []}
                      onSuggestionsFetchRequested={({ value }) => getFavstocks(value)}
                      getSuggestionValue={(suggestion) => suggestion.company_name}
                      
                      defaultShouldRenderSuggestions={false}

                      multiSelect={true}
                      renderSuggestion={(suggestion) => (
                        <div>

                          {suggestion.company_name}  {suggestion.ticker}
                        </div>
                      )}
                      inputProps={{
                        placeholder: 'Stock Searches.....',
                        value: searchingValue?.trim() || '',
                        onChange: handleChange,
                
                      }}
                      onSuggestionSelected={handleSuggestionSelected} 
                    />
                    <button
                      className="btn"
                      onClick={handleSearchClick}

                      disabled={isloading}
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>



                <div className='MakePrediction_items_area_hp mt-4'>
                  <div className='row'>
                    <div className='col-xl-5 col-lg-6 col-md-12 col-12 mb-3'>
                      <div className=" Heading_content_hp">
                        <h2 className="watchlisthead mb-0 pb-0">My Favourite</h2>
                      </div>

                      {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center" >
                        <div
                          className="spinner-border"
                          style={{
                            width: "3rem",
                            height: "3rem",
                            color: "white",
                            alignItems: "center",
                          }}
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) :
                        <div className="my_fav_list_table_area_hp mt-2">
                        <div
                          className="table-responsive tabalignn custom-table"
                          style={{
                            backgroundColor: "#020134",
                           
                            borderTop: "none",
                          }}
                        >
                          <table className="table stock table-hover">
                            <tbody>
                              {score.map((item, i) => (
                                <tr key={i}>
                                  <td>{i + 1}</td> 
                                  <td>{item.name}</td>
                                  
                                  <td>{item.percentage.toFixed(2)}%</td>
                                  <td>{item.total} predictions</td>
                                </tr>
                              ))}

                            </tbody>
                          </table>
                        </div>
                      </div>}
                    </div>
                    {loadingFeature ? (
                    <tr>
                      <td colSpan="12" className="text-center py-5" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <div
                          className="spinner-border  "
                          style={{
                            width: "3rem",
                            height: "3rem",
                            color: "white",
                            alignItems: "center",
                          }}
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : <div className='col-xl-7 col-lg-6 col-md-12 col-12 mb-3'>
                      
                      <div className='row align-items-stretch'>
                        {predictionData.map((item, i) => (<div className='col-xl-6 col-lg-6 col-md-6 col-6 mb-3'>
                          <button className='w-100 h-100 MakePrediction_item_hp' type="button" data-toggle="modal" data-target="#MakePrediction_Modal" onClick={() => handleMakePredictionClick(item.symbol)}>
                            <h4>{item?.company_name}</h4>
                            <p>{item?.symbol}</p>
                          </button>
                        </div>))}
                      </div>
                    </div>}
                  </div>

                  <div class="modal fade" id="MakePrediction_Modal" tabindex="-1" aria-labelledby="MakePrediction_ModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <div>
                            <h5 class="modal-title" id="MakePrediction_ModalLabel">Make a Prediction</h5>
                            <p className='mb-0'>Select what type of prediction you'd like to make</p>
                          </div>
                          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                        
                          <button className='btn mb-2' type="button" data-toggle="modal" data-target="#MakePrediction_Modal_second" data-dismiss="modal" aria-label="Close" onClick={() => handleMakePredictionClick(selectedSymbol, 'close')}>Where {selectedSymbol} will Close Today</button>
                          <button className='btn mb-2' type="button" data-toggle="modal" data-target="#MakePrediction_Modal_second" data-dismiss="modal" aria-label="Close" onClick={() => handleMakePredictionClick(selectedSymbol, 'high')}>{selectedSymbol} high for the rest of the day</button>
                          <button className='btn mb-2' type="button" data-toggle="modal" data-target="#MakePrediction_Modal_second" data-dismiss="modal" aria-label="Close" onClick={() => handleMakePredictionClick(selectedSymbol, 'low')}>{selectedSymbol} low for the rest of the day</button>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div class="modal fade" id="MakePrediction_Modal_second" tabindex="-1" aria-labelledby="MakePrediction_Modal_secondLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <div>
                            <h5 class="modal-title" id="MakePrediction_Modal_secondLabel">Make a Prediction</h5>
                          </div>
                          <button type="button" class="close text-white" id="closeButton" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='d-flex align-items-center justify-content-between'>
                              <p className='mb-0'>{selectedSymbol}</p>
                              <button className='btn'   type="button"  onClick={closePridectionModal}>Change Symbol</button>
                            </div>

                            <div class="modal-header">
                              <div>
                                <h5 class="modal-title" id="MakePrediction_Modal_secondLabel">
                               
                                  {predictionMessage ? predictionMessage : 'No prediction selected'}
                                </h5>
                                <p>Select the price below by dragging the slider up and down</p>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-10 timechart' >
                                <div className='pb-0spr-0 pt-0 ps-2' style={{height:"400px !important"}}>
                                <AdvancedRealTimeChart symbol={selectedSymbol} theme="dark" autosize></AdvancedRealTimeChart>
                                  
                                </div>
                              </div>
                              <div className='col-2 p-0'>
                                <div style={{ height: '400px', width: '80px', display: "flex"}}>
                                  <Slider
                                    vertical
                                    min={range.current_price - 5}
                                    max={range.current_price + 5}
                                    step={0.01}
                                    value={predictionValue}
                                    onChange={handlePredictionValueChange}

                                  />
                                  <div style={{ color: "white", height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    {labels.map((label, index) => (
                                      <div key={index} style={{ transform: 'translateY(-50%)' }}>
                                        {label}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                          
                            

                          



                        
                            <div>
                         

                            </div>

                            <div className='mt-5 text-center'>
                              <button className={`btn btn_main_hp ${isActive ? 'active' : ''}`} type='submit'>Make Prediction</button>
                            </div>
                          </form>
                        </div>

                      </div>
                    </div>
                  </div>
                  <ToastContainer position="top-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default MakePrediction