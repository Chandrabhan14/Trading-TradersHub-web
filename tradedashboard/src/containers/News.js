import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import LogoPink from "../assets/img/logo/pink.jpg";
import {
  getNewsUrl,
  getStockMarketTopActiversa,
} from "../services/UserServices";
import { getStockMarketTopGainersa } from "../services/UserServices";
import NavBottom from "../components/nav/NavBottom/NavBottom";
import { useNavigate, useParams } from "react-router-dom";

import useWebSocket from "../hooks/useWebsocket";
import apiHandle from "../services/ApiHandle";
import WithAuth from "../components/auth/withAuth";
import Modal from "../utils/Modal";



const News = () => {
  const [topGainersData, setTopGainersData] = useState([]);
  const [topActivesData, setTopActivesData] = useState([]);
  
  const [page, setPage] = useState(1);
  const { ws, messages, sendMessage } = useWebSocket();
  const { type } = useParams();

  const limit = 20;

  const [stocks, setStocks] = useState([]);
  const [generals, setGenerals] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [forexs, setForexs] = useState([]);
  const [smallcaps, setSmallcaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
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
       setIsModalOpen(true)
    } else {
      console.log("Plan is still active.");
    }
  }, []);

  const getStocksList = async () => {
    try {
      setLoading(true);
        const accessToken = JSON.parse(localStorage.getItem('googledata')).access_token;
    

      const res = await apiHandle.get(getNewsUrl(type, limit, page)
  
    );
      const response = res?.data;

      if (res.status === 200) {

        switch (type) {
          case "stock":
            setStocks([...stocks, ...response?.data?.news]);
            break;
          case "general":
            setGenerals([...generals, ...response?.data?.news]);
            break;
          case "crypto":
            setCryptos([...cryptos, ...response?.data?.news]);
            break;
          case "forex":
            setForexs([...forexs, ...response?.data?.news]);
            break;
          case "small_cap_news":
            setSmallcaps([...smallcaps, ...response?.data?.data]);
            break;
        }
        setTotalCount(response?.data?.total_count);
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      console.error(e);
    }
  };

  const onScroll = useRef(null);

  // Automatically send a message every 5 seconds
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
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [sendMessage]);

  const getStockMarketTopActivers = async () => {
    try {
      const result = await getStockMarketTopActiversa();
      setTopActivesData(result.data.data);
    } catch (error) {
      setTopActivesData([]);
    }
  };

  const getStockMarketTopGainers = async () => {
    try {
      const result = await getStockMarketTopGainersa();
      setTopGainersData(result?.data?.data);
    } catch (error) {
      setTopGainersData([]);
    }
  };

  const handelInfiniteScroll = async () => {
    try {
      const divElement = onScroll.current;
      const isAtBottom =
        divElement.scrollTop + divElement.clientHeight >=
        divElement.scrollHeight - 100;
      if (isAtBottom && !loading) {
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalCount / 20);

        // Check if there are more pages to fetch
        if (page < totalPages) {
          setPage((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStockMarketTopActivers();
    getStockMarketTopGainers();
  }, []);




  useEffect(()=> {
     setPage(1)
  },[type])

  useEffect(() => {
    getStocksList();
  }, [type, page]);

  const navigate = useNavigate()

  const handleNavigate = (ticker) =>{
    navigate(`/search/${ticker}`)
  }
  
  return (
    <>
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="container-fluid area-padding news_section_hp">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-12 col-12 stockdata mb-4">
            <h2 className="Heading_content_hp mb-4">
              {" "}
              {type.replaceAll("_", " ")}{" "}
            </h2>
            <div
              className="news_details_area"
              ref={onScroll}
              onScroll={handelInfiniteScroll}
            >
             
              {type === "stock" && stocks?.length > 0 && (
                <>
                  {stocks?.map((news) => {
                    return (
                      <div className="news_detail_item_area">
                        <a
                          href={news.url ? news.url : "#"}
                          target="_blank"
                          className="row"
                          key={news.url}
                        >
                          <div className="col-md-4 ">
                            <div className="news_detail_item_Img">
                              <img
                                className="img-responsive"
                                src={news.image ? news.image : LogoPink}
                                alt={news.title}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="news_detail_item_content">
                              <h5 className="mb-3"> {news.title} </h5>
                              <p>{news.text}</p>
                              <p className="news_detail_item_content_dete">
                                {" "}
                                Date:{" "}
                                {moment.utc(news.publishedDate).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </>
              )}

              {type === "general" && generals?.length > 0 && (
                <>
                  {generals?.map((news) => {
                    return (
                      <div className="news_detail_item_area">
                        <a
                          href={news.url ? news.url : "#"}
                          target="_blank"
                          className="row"
                          key={news.url}
                        >
                          <div className="col-md-4 ">
                            <div className="news_detail_item_Img">
                              <img
                                className="img-responsive"
                                src={news.image ? news.image : LogoPink}
                                alt={news.title}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="news_detail_item_content">
                              <h5 className="mb-3"> {news.title} </h5>
                              <p>{news.text}</p>
                              <p className="news_detail_item_content_dete">
                                {" "}
                                Date:{" "}
                                {moment.utc(news.publishedDate).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </>
              )}

              {type === "crypto" && cryptos?.length > 0 && (
                <>
                  {cryptos?.map((news) => {
                    return (
                      <div className="news_detail_item_area">
                        <a
                          href={news.url ? news.url : "#"}
                          target="_blank"
                          className="row"
                          key={news.url}
                        >
                          <div className="col-md-4 ">
                            <div className="news_detail_item_Img">
                              <img
                                className="img-responsive"
                                src={news.image ? news.image : LogoPink}
                                alt={news.title}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="news_detail_item_content">
                              <h5 className="mb-3"> {news.title} </h5>
                              <p>{news.text}</p>
                              <p className="news_detail_item_content_dete">
                                {" "}
                                Date:{" "}
                                {moment.utc(news.publishedDate).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </>
              )}

              {type === "forex" && forexs?.length > 0 && (
                <>
                  {forexs?.map((news) => {
                    return (
                      <div className="news_detail_item_area">
                        <a
                          href={news.url ? news.url : "#"}
                          target="_blank"
                          className="row"
                          key={news.url}
                        >
                          <div className="col-md-4 ">
                            <div className="news_detail_item_Img">
                              <img
                                className="img-responsive"
                                src={news.image ? news.image : LogoPink}
                                alt={news.title}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="news_detail_item_content">
                              <h5 className="mb-3"> {news.title} </h5>
                              <p>{news.text}</p>
                              <p className="news_detail_item_content_dete">
                                {" "}
                                Date:{" "}
                                {moment.utc(news.publishedDate).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </>
              )}

              {type === "small_cap_news" && smallcaps?.length > 0 && (
                <>
                  {smallcaps?.map((news) => {
                    return (
                      <div className="news_detail_item_area">
                        <a
                          href={news.link ? news.link : "#"}
                          target="_blank"
                          className="row"
                          key={news.url}
                        >
                          
                          <div className="col-md-8">
                            <div className="news_detail_item_content">
                              <h5 className="mb-3"> {news.title} </h5>
                              <p>{news.text}</p>
                              <p className="news_detail_item_content_dete">
                                {" "}
                                Date:{" "}
                                {moment(news.date).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </>
              )}
              {loading && (
                <div
                  className="spinner-border text-center m-auto"
                  style={{ width: "3rem", height: "3rem", color: "white" }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-12 mb-4">
            <div className="row">
              <div className="col-lg-12 col-md-6 col-12 mb-4">
                <h2 className="Heading_content_hp">Top Gainers</h2>
                <div
                  className="table-responsive tabalignn custom-table"
                  style={{
                    backgroundColor: "#020134",
                    color: "white",
                  }}
                >
                  <table className="table stock table-hover text-white">
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Change</th>
                        <th>Price</th>
                        <th>Change(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topGainersData?.slice(0, 5).map((item, index) => (
                        <tr
                          key={item.id}
                          className={index % 2 === 0 ? "even-row" : "odd-row"}
                          onClick={()=>handleNavigate(item?.symbol)}

                        >
                          <td className="word">{item.symbol}</td>
                          <td>{item.change.toFixed(2)}</td>
                          <td>{item.price.toFixed(2)}</td>
                          <td>{item.changesPercentage.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-12 col-md-6 col-12 mb-4">
                <h2 className="Heading_content_hp">Top Actives</h2>
                <div
                  className="table-responsive tabalign custom-table"
                  style={{
                    backgroundColor: "#020134",
                    color: "white",
                    overflow: "auto",
                  }}
                >
                  <table className="table text-white">
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Change</th>
                        <th>Price</th>
                        <th>Change(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topActivesData?.slice(0, 5).map((item, index) => (
                        <tr
                          key={item.id}
                          className={index % 2 === 0 ? "even-row" : "odd-row"}
                          onClick={()=>handleNavigate(item?.symbol)}

                        >
                          <td className="word">{item?.symbol}</td>
                          <td>{item?.change.toFixed(2)}</td>
                          <td>{item?.price.toFixed(2)}</td>
                          <td>{item?.changesPercentage.toFixed(2)}</td>
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

export default WithAuth(News);
