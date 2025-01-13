import React, { useEffect, useRef, useState } from "react";

import NavBottom from "../nav/NavBottom/NavBottom";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { getStockMarketTopGainersa } from "../../services/UserServices";
import { getStockMarketTopLosersa } from "../../services/UserServices";
import useWebSocket from "../../hooks/useWebsocket";
import WithAuth from "../auth/withAuth";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Modal from "../../utils/Modal";
const Chart = () => {
  const [topGainersData, setTopGainersData] = useState([]);
  const [topLosersData, setTopLosersData] = useState([]);
  const { ws, messages, sendMessage } = useWebSocket();
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


  const navigate = useNavigate()

  const handleNavigate = (ticker) =>{
    navigate(`/search/${ticker}`)
  }
  const getStockMarketTopGainers = async () => {
    try {
      const result = await getStockMarketTopGainersa();
      console.log(result);
      setTopGainersData(result?.data?.data);
    } catch (error) {
      setTopGainersData([]);
    }
  };

  const getStockMarketTopLosers = async () => {
    try {
      const result = await getStockMarketTopLosersa();
      setTopLosersData(result?.data?.data);
    } catch (error) {
      setTopLosersData([]);
    }
  };
  useEffect(() => {
    getStockMarketTopGainers();
    getStockMarketTopLosers();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const dataString = localStorage.getItem("googledata");
      const userDataFromLocalStorage = JSON.parse(dataString);
      const uid = userDataFromLocalStorage?.uid;
      const message = {
        user: uid ? uid : "Anonymous",
        content: "Automatic message from TodaysMarket component",
      };
      sendMessage(message);
    }, 10000);

   
    return () => clearInterval(interval);
  }, [sendMessage]);
  return (
    <>
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid chart_section_hp">
      
          <div className="row">
            <div className="col-md-12 col-xl-8 col-lg-8" >
              <div className="chart_map_area">
                <AdvancedRealTimeChart
                  theme="dark"
                  width={"100%"}
                  height={"90%"}
                  symbol="AAPL"
                ></AdvancedRealTimeChart>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 tab">
              <div className=" tab">
                <h2 className="chart-color Heading_content_hp">Top Gainers</h2>
                <div className="table-responsive tabalignn custom-table">
                  <table
                    className="table stock table-hover"
                    style={{
                      backgroundColor: "#020134",
                      color: "white",
                    }}
                  >
                    <thead>
                      <tr>
                        <th className="">Symbol</th>
                        <th>Price</th>
                        <th>Change($)</th>
                        <th>Change(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topGainersData?.length &&
                        topGainersData?.slice(0, 5).map((item, index) => (
                          <tr
                            key={item.id}
                            className={
                              index % 2 === 0 ? "even-row" : "odd-row"
                            }
                            onClick={()=>handleNavigate(item?.symbol)}
                          >
                            <td className="word">{item.symbol}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{item.change.toFixed(2)}</td>
                            <td>{item.changesPercentage.toFixed(2)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className=" tab mt-4">
                <h2 className="chart-color Heading_content_hp">Top Losers</h2>
                <div className="table-responsive tabalignn custom-table">
                  <table
                    className="table"
                    style={{
                      backgroundColor: "#020134",
                      color: "white",
                    }}
                  >
                    <thead>
                      <tr>
                        <th className="">Symbol</th>
                        <th>Price</th>
                        <th>Change($)</th>
                        <th>Change(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topLosersData?.length &&
                        topLosersData?.slice(0, 5).map((item, index) => (
                          <tr
                            key={item.id}
                            className={
                              index % 2 === 0 ? "even-row" : "odd-row"
                            }
                            onClick={()=>handleNavigate(item?.symbol)}
                          >
                            <td className="word">{item.symbol}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{item.change.toFixed(2)}</td>
                            <td>{item.changesPercentage.toFixed(2)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {  isModalOpen &&  < Modal/>}
    </>
  );
};

export default WithAuth(Chart);
