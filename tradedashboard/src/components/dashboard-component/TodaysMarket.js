import React, { useEffect, useState } from "react";
import { getSectorPerformersa } from "../../services/UserServices";
import { getStockMarketTopActiversa } from "../../services/UserServices";
import { getStockMarketTopGainersa } from "../../services/UserServices";
import { getStockMarketTopLosersa } from "../../services/UserServices";
import { getStockNewsa } from "../../services/UserServices";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";
import Table from "../fields/Table";
import WithAuth from "../auth/withAuth";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";

import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { Tooltip as ReactTooltip } from 'react-tooltip'



const TodaysMarket = () => {
  const [topGainersData, setTopGainersData] = useState([]);
  const [topLosersData, setTopLosersData] = useState([]);
  const [topActivesData, setTopActivesData] = useState([]);
  const [sectorPerformanceData, setSectorPerformanceData] = useState([]);
  const [stockNews, setStockNews] = useState([]);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://3.128.172.201:5000/todays_market_ws/",
    {
      onOpen: () => console.log(' Today market opened'),
      
      shouldReconnect: (closeEvent) => true,
    }
  );

  const getSectorPerformers = async () => {
    try {
      const result = await getSectorPerformersa();
      setSectorPerformanceData(result?.data?.data);
    } catch (error) {
      setSectorPerformanceData([]);
    }
  };
  const getStockMarketTopActivers = async () => {
    try {
      const result = await getStockMarketTopActiversa();
      setTopActivesData(result?.data?.data);
    } catch (error) {
      setTopActivesData([]);
    }
  };

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

  const getStockNews = async () => {
    try {
      const result = await getStockNewsa();
      setStockNews(result?.data?.data);
    } catch (error) {
      setStockNews([]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const dataString = localStorage.getItem("googledata");
      const userDataFromLocalStorage = JSON.parse(dataString);
      const uid = userDataFromLocalStorage?.uid;
      const message = {
        user: uid ? uid : "Anonymous",
        content: "Automatic message from TodaysMarket component",
      };
      sendJsonMessage(message);
    }, 10000);

    return () => clearInterval(interval);
  }, [sendJsonMessage]);

  useEffect(() => {
    getSectorPerformers();
    getStockMarketTopActivers();
    getStockMarketTopLosers();
    getStockMarketTopGainers();
    getStockNews();
  }, []);


  const navigate = useNavigate();

  const onTileClick = (ticker) => {
    navigate(`/search/${ticker}`)
  };

  useEffect(() => {
    console.log(lastJsonMessage, "last Today market  message json")
    if (lastJsonMessage) {
      const updatedTopgainerList = topGainersData.map((item) => {
        if (item?.symbol?.toLowerCase() === lastJsonMessage?.symbol?.toLowerCase()) {
          item.price = lastJsonMessage?.price;
          item.change = lastJsonMessage?.change;
          item.changesPercentage = lastJsonMessage?.change_perc
          return item
        }
        return item
      })
      setTopGainersData(updatedTopgainerList)
    }
    if (lastJsonMessage) {
      const updatedToploserList = topLosersData.map((item) => {
        if (item?.symbol?.toLowerCase() === lastJsonMessage?.symbol?.toLowerCase()) {
          item.price = lastJsonMessage?.price;
          item.change = lastJsonMessage?.change;
          item.changesPercentage = lastJsonMessage?.change_perc
          return item
        }
        return item
      })
      setTopLosersData(updatedToploserList)
    }
    if (lastJsonMessage) {
      const updatedTopactiveList = topActivesData.map((item) => {
        if (item?.symbol?.toLowerCase() === lastJsonMessage?.symbol?.toLowerCase()) {
          item.price = lastJsonMessage?.price;
          item.change = lastJsonMessage?.change;
          item.changesPercentage = lastJsonMessage?.change_perc
          return item
        }
        return item
      })
      setTopLosersData(updatedTopactiveList)
    }
    if (lastJsonMessage) {
      const updatedTopactiveList = topActivesData.map((item) => {
        if (item?.symbol?.toLowerCase() === lastJsonMessage?.symbol?.toLowerCase()) {
          item.price = lastJsonMessage?.price;
          item.change = lastJsonMessage?.change;
          item.changesPercentage = lastJsonMessage?.change_perc
          return item
        }
        return item
      })
      setTopActivesData(updatedTopactiveList)
    }
    if (lastJsonMessage) {
      const updatedSectorList = sectorPerformanceData.map((item) => {
        if (item?.sector?.toLowerCase() === lastJsonMessage?.sector?.toLowerCase()) {
          item.changesPercentage = lastJsonMessage?.change_perc
          return item
        }
        return item
      })
      setSectorPerformanceData(updatedSectorList)
    }



  }, [lastJsonMessage])



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
              <div className="dashboard-top">
                <div className="userboard">
                  <div className="row">
                    <div className="col-xl-8 mb-4 col-lg-12 mb-4">
                      <div className="row">
                        <di className="col-md-6 mb-4 tab">
                          <h2 className="Heading_content_hp">Top Gainers</h2>
                          <div
                            className="table-responsive tabalignn custom-table"
                            style={{
                              backgroundColor: "#020134",
                              color: "white",
                            }}
                          >
                        
                            <Table
                              listItems={
                                topGainersData?.length
                                  ? topGainersData?.slice(0, 5)
                                  : null
                              }
                            />
                          </div>
                        </di>

                        <div className="col-md-6 mb-4 tab">
                          <h2 className="Heading_content_hp">Top Losers</h2>
                          <div
                            className="table-responsive tabalignn custom-table"
                            style={{
                              backgroundColor: "#020134",
                              color: "white",
                            }}
                          >
                         
                            <Table
                              listItems={
                                topLosersData?.length
                                  ? topLosersData?.slice(0, 5)
                                  : null
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4 tab">
                          <h2 className="Heading_content_hp">Top Actives</h2>
                          <div
                            className="table-responsive tabalign custom-table"
                            style={{
                              backgroundColor: "#020134",
                              color: "white",
                            }}
                          >
                           
                            <Table
                              listItems={
                                topActivesData?.length
                                  ? topActivesData?.slice(0, 5)
                                  : null
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4 tab">
                          <h2 className="Heading_content_hp">
                            Sector Performance
                          </h2>
                          <div
                            className="table-responsive tabalign custom-table"
                            style={{
                              backgroundColor: "#020134",
                              color: "white",
                            }}
                          >
                            <table className="table" table-hover>
                              <thead>
                                <tr>
                                  <th>Sector</th>
                                  <th>Change(%)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sectorPerformanceData?.length &&
                                  sectorPerformanceData
                                    ?.slice(0, 5)
                                    .map((item, index) => (
                                      <tr
                                        key={item.id}
                                        className={
                                          index % 2 === 0
                                            ? "even-row"
                                            : "odd-row"
                                        }
                                      >
                                    
                                        <td data-tooltip-id="my-tooltip-3" data-tooltip-content={item?.sector}>{item.sector}

                                          <ReactTooltip
                                            id="my-tooltip-3"
                                            place="bottom"
                                            variant="info"
                                          />
                                        </td>
                                        <td>
                                          {parseFloat(
                                            item.changesPercentage
                                          ).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 mb-4 col-lg-12 mb-4">
                      <h2 className="Heading_content_hp">Social Sentiment</h2>
                      <div
                        className="table-responsive custom-table tabalign w-100"
                        style={{
                          color: "white",
                          backgroundColor: "#020134;",
                        }}
                      >
                        <table className="table">
                          <thead>
                            <tr style={{ fontSize: "15px" }}>
                              <th className="">Symbol</th>
                              <th> Posts </th>
                              <th>Likes</th>
                              <th>Impressions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stockNews?.length &&
                              stockNews?.slice(0, 12).map((item, index) => (
                                <tr
                                  key={item.id}
                                  className={
                                    index % 2 === 0 ? "even-row" : "odd-row"
                                  }
                                  onClick={() => onTileClick(item.symbol)}
                                >
                                 
                                  <td data-tooltip-id="my-tooltip-2" data-tooltip-content={item?.symbol}>{item.symbol}

                                    <ReactTooltip
                                      id="my-tooltip-2"
                                      place="bottom"
                                      variant="info"
                                    />
                                  </td>
                                  <td>{item.stocktwitsPosts}</td>
                                  <td>{item.stocktwitsLikes}</td>
                                  <td>{item.stocktwitsImpressions}</td>
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
        </div>
      </div>
    </>
  );
};

export default WithAuth(TodaysMarket);
