import React, { useEffect, useState } from "react";
import {
  getPortfolioAssets,
  postPapertradingStock,
} from "../../services/UserServices";
import NavBottom from "../../components/nav/NavBottom/NavBottom";
import useWebSocket from "../../hooks/useWebsocket";
import "./PaperTrading.css";
import ModalComponent from "../../components/modal/popup/ModalComponent";
import { useNavigate, useParams } from "react-router-dom";
import allStocks from "./all_stocks.json";
import Select from "react-select";
import { getTickerList } from "../../services/UserServices";
import AsyncSelect from "react-select/async";
import { PiStopCircleLight } from "react-icons/pi";
import ReactPaginate from "react-paginate";

const PaperTradingStocks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const [sellquantity, setSellquantity] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockname] = useState("");
  const [selected, setSelected] = useState(null);
  const [symbolName, setSymbolName] = useState();
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockPrice, setStockprice] = useState(0);
  const [uid, setUid] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [otherAssetData, setOtherAssetData] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const [sellModal, setSellModal] = useState(false);
  const [tickerData, setTickerData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const handleQuantityChange = (e) => {
    // Ensure only positive numbers are allowed
    const inputValue = parseInt(e.target.value) || 0;
    if (inputValue > selectedStock.quantity) {
      setErrorMessage(
        `Quantity should not more than ${selectedStock.quantity} `
      ); // Save the error message in the state variable
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    setErrorMessage("");
    setQuantity(inputValue);
  };

  let portfolioName = useParams().stocks;
  const [balance, setBalance] = useState("0");

  const { ws, messages, sendMessage, initializeWebSocket, closeWebSocket } =
    useWebSocket();

  const handleWebSocketToggle = () => {
    if (ws?.ws) {
      closeWebSocket();
    } else {
      initializeWebSocket();
    }
  };




  const loadOptions = async (inputValue) => {
    try {
      const response = await getTickerList(inputValue);
      const data = response?.data?.data || [];

      const options = data.map((symbol) => ({
        label: symbol,
        value: symbol,
      }));

      return options;
    } catch (error) {
      console.error("Error fetching ticker data:", error);
      return [];
    }
  };

  //getting current time at the time of buy/sell the stocks
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();
  const finalCurDate =
    currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth;

  const customStyles = {
    modalOverlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Custom background color for the modal overlay
    },
    modalContent: {
      maxWidth: "500px", // Custom maximum width for the modal content
    },
    modalClose: {
      color: "red", // Custom color for the modal close button
    },
  };


   const handleModel = (stock) => {
navigate (`/search/${stock}`)
  };

  const closeModel = () => {
    setOpenModal(false);
    setSelectedOption(null);
    setQuantity(0);
    // portfolioAssets(uid);
    setErrorMessage(null);
  };

  const sellcloseModel = () => {
    setSellModal(false);
    setSelectedOption(null);
    setQuantity(0);
    // portfolioAssets(uid);
    setErrorMessage(null);
  };

  const portfolioAssets = async (uId) => {
    try {
      setLoading(true);
      const result = await getPortfolioAssets({ portfolioName, uId }, page);
      setOtherAssetData(result?.data?.data);
      setStocks(result?.data?.data?.asset);
      setTotalCount(result?.data?.data?.total_count);

      setBalance(result?.data?.data?.balance);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };

  const handlePapertradingStock = async (e, type) => {
    e.preventDefault();
    try {
      if (!selectedOption) {
        setErrorMessage("Stocks must be a required.");
        return;
      }

      if (quantity == "" || quantity == 0) {
        setErrorMessage("Quantity must be a required or more then zero.");
        return;
      }

      const response = await postPapertradingStock({
        symbol: selectedOption.value || selectedOption,
        portfolio_name: portfolioName,
        quantity,
        uid,
        date: finalCurDate,
        transaction_type: type,
      });

      if (response?.status == 200 && response?.data?.statusCode == 200) {
        if ( type == "sell"  && stocks?.length == 1&& page > 1) {
          setPage(page - 1);
        }
        else{
          portfolioAssets(uid);
        }

        closeModel();
        sellcloseModel();
        setSelectedOption(null);
        setQuantity("");
      }

      if (response?.data?.statusCode == 400) {
        setErrorMessage("Unable to add stock");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000); // Adjust the duration as needed
      }
    } catch (error) {
      console.log(error);

      setErrorMessage(error?.response?.data?.message);
      // setErrorMessage(error?.response?.data?.status);// Save the error message in the state variable
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // Adjust the duration as needed
    }
  };

  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
    setUid(uid);
    const symbols = allStocks.data?.map((stocks) => {
      return {
        label: stocks.symbol,
        value: stocks.symbol,
        price: stocks.avg_price,
      };
    });
    setSymbolName(symbols);
    portfolioAssets(uid);
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      const message = {
        user: uid ? uid : "Anonymous",
        content: "Automatic message from Watchlist component",
      };
      sendMessage(message);
    }, 10000);

    // Clean up WebSocket connection when the component unmounts
    return () => {
      closeWebSocket(); // Ensure the WebSocket is closed when unmounting
    };
  }, []);

  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding ">
        <div className="container-fluid Paper_Trading_DetailPage_Section_Hp">
          <div className="mb-4 content ">
            <h2 className="Heading_content_hp Paper_Trading_DetailPage_heading mb-4">
              <div className="d-flex align-items-center">
                <div
                  className="back_button"
                  onClick={() => window.history.back()}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                {`${portfolioName}`}
                {/* {`Portfolio Name :  ${portfolioName}`} */}
              </div>
              <button
                className="btn_main_hp btn"
                onClick={() => setOpenModal(true)}
              >
                {" "}
                Add Stocks{" "}
              </button>
            </h2>

            <div className="row align-items-stretch mb-5">
              <div className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4">
                <div className="Paper_Trading_DetailPage_item">
                  <img
                    src={`https://images.livemint.com/img/2023/02/10/600x338/Stock_market_news_1675988415033_1675988415210_1675988415210.jpg`}
                    alt=""
                  />
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4">
                <div className="Paper_Trading_DetailPage_item Paper_Trading_DetailPage_Profit">
                  <div className="Paper_Trading_Detailpage_Item_Content">
                    <h4 className="pt-2">Profit </h4>
                    <h2 className="pt-2">
                      ${" "}
                      {otherAssetData.profit !== null
                        ? otherAssetData.profit
                        : "--"}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4">
                <div className="Paper_Trading_DetailPage_item Paper_Trading_DetailPage_Loss">
                  <div className="Paper_Trading_Detailpage_Item_Content">
                    <h4 className="pt-2">Loss </h4>
                    <h2 className="pt-2">
                      ${" "}
                      {otherAssetData?.loss !== null
                        ? otherAssetData?.loss
                        : "--"}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4">
                <div className="Paper_Trading_DetailPage_item Paper_Trading_DetailPage_wallet">
                  <div className="Paper_Trading_Detailpage_Item_Content">
                    <h4 className="pt-2">Available Money </h4>
                    <h2 className="pt-2">
                      ${" "}
                      {otherAssetData?.balance !== null
                        ? otherAssetData?.balance?.toFixed(2)
                        : "--"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 ">
                <div className="table-responsive tabalignn custom-table">
                  <table className="table">
                    <thead className="">
                      <tr>
                        <th>{"Stock Name"}</th>
                        <th>{"Price"}</th>
                        <th>{"Volume"}</th>
                        <th>{"Change($)"}</th>
                        <th>{"Change(%)"}</th>
                        <th>{"Action"}</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {loading ? (
                        <tr className="text-center">
                          <td colSpan={9} className="text-center w-100">
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
                      ) : stocks && stocks?.length > 0 ? (
                        stocks?.map((stock, index) => {
                          return (
                            <tr
                              key={index}
                              onClick={() => handleModel(stock.symbol)}
                            >
                              <td>
                                <a href="#">{stock.symbol}</a>
                              </td>
                              <td>
                                <a href="#">{stock.curr_price?.toFixed(2)}</a>
                              </td>
                              <td>
                                <a href="#">{stock.quantity}</a>
                              </td>
                              <td>
                                {/* {stock.changes < 0
                                      ? (lossValue += stock.changes)
                                      : (profitValue += stock.changes)} */}
                                <a href="#">{stock.change}</a>
                              </td>
                              <td>
                                <a href="#">{stock.change_perc}</a>
                              </td>
                              <th>
                                <button
                                  onClick={(e) => handleModel(stock)}
                                  className="btn btn_main2_hp"
                                >
                                  {" "}
                                  Sell
                                </button>
                              </th>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Record not found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={(event) => {
                      setPage(event.selected + 1);
                    }}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    pageCount={totalCount / 5}
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

            <div className="col-md-12">
              
            </div>
          </div>
        </div>
      </div>

      <div className="Create_PaperTreading_modal">
        {openModal && (
          <ModalComponent
            isOpen={openModal}
            onClose={closeModel}
            styles={customStyles}
          >
            <form>
              <img
                src="https://images.unsplash.com/photo-1651340981821-b519ad14da7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
                srcset=""
              />
              <div className="p-3 form_Content_area">
                <div className="form-group d-flex align-items- justify-content-between">
                  <label className="text-dark mr-2"> Stock Name </label>
                  <AsyncSelect
                    cacheOptions
                    className="form-select w-75"
                    defaultOptions
                    loadOptions={loadOptions}
                    onChange={(selected) => {
                      setSelectedOption(selected);
                      setErrorMessage("");
                    }}
                    value={selectedOption}
                    placeholder="Select Stocks"
                    isClearable
                  />
                </div>
                <div className="form-group d-flex align-items-center justify-content-between">
                  <label className="text-dark mr-2">{"Quantity:"}</label>
                  <input
                    type="number"
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                      e.preventDefault()
                    }
                    value={quantity}
                    onPaste={(e) => e.preventDefault()}
                    //  onChange={(e) => setQuantity(e.target.value)}
                    onChange={(e) => {
                      // Get the input value
                      let inputValue = e.target.value;

                      if (inputValue.length > 3) {
                        // Truncate the value to 3 characters
                        inputValue = inputValue.slice(0, 3);
                        return;
                      }

                      if (inputValue < 0) {
                        setErrorMessage("Quantity should be greater than zero");
                        setTimeout(() => {
                          setErrorMessage("");
                        }, 5000);
                        return;
                      }

                      // Check if the length exceeds 100 characters
                      if (inputValue > 100) {
                        setErrorMessage("Quantity should not more than 100");
                        setTimeout(() => {
                          setErrorMessage("");
                        }, 5000);
                        return;
                      }

                      // Set the quantity in your state
                      setErrorMessage("");
                      setQuantity(inputValue);
                    }}
                    className="form-control w-75"
                  />
                </div>

               

                <div className="d-flex flex-row justify-content-between mt-4">
                  <button
                    onClick={(e) => handlePapertradingStock(e, "buy")}
                    className="buyBtn w-100"
                  >
                    {" "}
                    BUY{" "}
                  </button>
                 
                </div>

                <div className="availableBtn">
                  {` Available Margin : ${balance - stockPrice * quantity}`}
                </div>
                {errorMessage && (
                  <div style={{ color: "red", textAlign: "center" }}>
                    {errorMessage}
                  </div>
                )}
              </div>
            </form>
          </ModalComponent>
        )}

        {/* sell  modal */}

        {sellModal && (
          <ModalComponent
            isOpen={sellModal}
            onClose={sellcloseModel}
            styles={customStyles}
          >
            <form>
              <img
                src="https://images.unsplash.com/photo-1651340981821-b519ad14da7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
                srcset=""
              />
              <div className="p-3 form_Content_area">
                <div className="form-group d-flex align-items- justify-content-between">
                  <label className="text-dark mr-2"> Stock Name </label>
                  <Select
                   
                    isDisabled
                    value={selectedOption}
                    placeholder="Select Stocks"
                    className="form-select w-75"
                  />

                </div>
                <div className="form-group d-flex align-items-center justify-content-between">
                  <label className="text-dark mr-2">{"Quantity:"}</label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="form-control w-75"
                  />
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <label
                    for="formGroupExampleInput"
                    style={{ color: "black", border: "none" }}
                  >
                    {"Price:"}{" "}
                    <strong className="text-bold">{stockPrice}</strong>
                  </label>

                  <label
                    for="formGroupExampleInput"
                    style={{ color: "black", border: "none" }}
                  >
                    {"Total Price:"} <strong>{stockPrice * quantity}</strong>
                  </label>
                </div>

                <div className="d-flex flex-row justify-content-between mt-4">
              
                  <button
                    onClick={(e) => handlePapertradingStock(e, "sell")}
                    className="sellBtn w-100"
                    disabled={errorMessage ? true : false}
                  >
                    {" "}
                    SELL{" "}
                  </button>
                </div>

                <div className="availableBtn">
                  {` Available Margin : ${balance + stockPrice * quantity}`}
                </div>
                {errorMessage && (
                  <div style={{ color: "red", textAlign: "center" }}>
                    {errorMessage}
                  </div>
                )}
              </div>
            </form>
          </ModalComponent>
        )}
      </div>

      
    </>
  );
};

export default PaperTradingStocks;
