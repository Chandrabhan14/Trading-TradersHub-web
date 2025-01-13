import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  aiCompanyPerformance,
  aiPredictionData,
  getFollowersNumber,
  getOptionFlowData,
  getSearchResult,
  getSearchfavstocks,
  getStockFeeds,
  postmyFavStocks,
  userPosts,
} from "../../services/UserServices";

import NavBottom from "../../components/nav/NavBottom/NavBottom";
import "./StockSearches.css";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { MiniChart, Timeline } from "react-ts-tradingview-widgets";
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { SymbolOverview } from "react-ts-tradingview-widgets";
import StockNews from "./StockNews";
import ReactPaginate from "react-paginate";
import moment from "moment";
import {
  getSearchFinancials,
  getSearchNews,
} from "../../services/UserServices";
import html2canvas from "html2canvas";
import thl3 from "../../assets/img/logo/log.jpg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FsLightbox from "fslightbox-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Typewriter from "typewriter-effect";
import Robot from "../../assets/img/Robot.png";

const StockSearches = (props) => {
  const schema = yup.object().shape({
    text: yup
      .string()
      .required("Text is required")
      .max(10000, "Text must not be exceed 10000 characters"),
    file: yup.mixed(), // Image field is optional
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [searchData, setSearchData] = useState(null);
  console.log(searchData,'qwerty')
  const searchingValue = useParams();
  const [loading, setLoading] = useState(false);
  const [flowData, setFlowData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFlowTabVisible, setIsFlowTabVisible] = useState(false);
  const [feedTabVisible, setIsFeedTabVisible] = useState(false);
  const [isFinanceTabVisible, setIsFinanceTabVisible] = useState(false);
  const [isNewsTabVisible, setIsNewsTabVisible] = useState(false);

  const [flowLoading, setFlowLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [activetab, setActivetab] = useState(null);
  const [feedStock, setFeedStock] = useState([]);
  const [imageName, setImageName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const searchedStock = searchingValue?.stockName;
  const quotedStock = `'${searchedStock}'`;
  const [favstocks, setFavstocks] = useState([]);

  const [pageFeed, setPageFeed] = useState(1);

  const [selectedSentiment, setSelectedSentiment] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [bullishDisabled, setBullishDisabled] = useState(false);
  const [bearishDisabled, setBearishDisabled] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userPresent, setUserPresent] = useState(false);
  const [aiData, setAiData] = useState({});
  const [aiTabVisible, setAiTabVisible] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCompanyData, setAiCompanyData] = useState({});
  const [followedUserPosts, setFollowedUserPosts] = useState({});
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);



  const mySubs = useCallback(async (uid) => {
    try {
      const limit = 4;
      const page = 1;
      const response = await getFollowersNumber(uid, page, limit);
      if (response.status === 200) {
        setFollowedUserPosts((prev) => ({
          ...prev,
          [uid]: response.data.total_followers,
        }));
      }
    } catch (error) {
      console.error("Error fetching follower count:", error);
    }
  }, []);

  useEffect(() => {
    if (feedStock && feedStock.length > 0) {
      feedStock.map((item) => {
        mySubs(item.uid);
      });
    }
  }, [feedStock]);

  const FetchCompanyData = useCallback(async (symbol = searchedStock) => {
    try {
      const response = await aiCompanyPerformance(symbol);
     

      if (response.data.statusCode == 200) {

        setAiCompanyData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [searchedStock]);
  const FetchAiData = useCallback(async (symbol = searchedStock) => {
    try {
      setAiLoading(true);
      const response = await aiPredictionData(symbol);
      if (response?.data?.statusCode == 200) {
        setAiData(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoading(false);
    }
  }, [searchedStock]);

  useEffect(() => {
    if (aiTabVisible) {
      FetchAiData(searchingValue.stockName);
    }
  }, [aiTabVisible, searchingValue.stockName]);

  useEffect(() => {
    if (aiTabVisible) {
      FetchCompanyData(searchingValue.stockName);
    }
  }, [aiTabVisible, searchingValue]);

  useEffect(() => {
    if (user) {
      setUserPresent(true);
    }
  }, [user]);

  const getFavstocks = useCallback(async () => {
    try {
      const uid = localStorage.getItem("uid");
      const response = await getSearchfavstocks(uid, searchedStock);
      if (response.status === 200 && response?.data?.statusCode === 200) {
        setFavstocks(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [searchedStock]);

  useEffect(() => {
    getFavstocks();
  }, []);

  useEffect(() => {
    fetchData(); // Fetch initial data when component mounts
  }, []);

  const fetchData = useCallback(async (page = pageFeed) => {
    const limit = 5;
    try {
      const response = await getStockFeeds(quotedStock, limit, page);
      const newData = response.data.data;
      setFeedStock(newData);
      if (newData?.length > 0) {
        setHasMore(true);
      } else {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [pageFeed, quotedStock]);


  const fetchMoreData = useCallback(async () => {
    const limit = 5;
    try {
      const response = await getStockFeeds(searchedStock, limit, pageFeed);
      const newData = response.data.data;
      setFeedStock((prevItems) => [...prevItems, ...newData]);
  // Check if newData is not empty
  if (newData.length > 0) {
    setPageFeed((prevPage) => prevPage + 1); // Increment page for next fetch
  } else {
    setHasMore(false); // No more data available
  }    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [pageFeed, searchedStock]);

  const getNewsResult = useCallback(async (symbol = searchedStock) => {
    try {
      setFlowLoading(true);
      const response = await getSearchNews(symbol);
      if (response.status == 200 || response?.data?.statusCode == 200) {
        setNewsData(response.data.data);
      } else {
        throw new Error("Failed to fetch news data");
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
    } finally {
      setFlowLoading(false);
    }
  }, [searchedStock]);
  
  const getFinancailResult = useCallback(async (symbol = searchingValue?.stockName) => {
    try {
      setFlowLoading(true);
      const response = await getSearchFinancials(symbol);
      if (response?.data?.statusCode == 200) {
        setFinanceData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFlowLoading(false);
    }
  }, [searchingValue?.stockName]);

  const getSearchResults = useCallback(async (symbol = searchingValue?.stockName) => {
    try {
      setLoading(true);

      const response = await getSearchResult(symbol);
      if (response?.data?.statusCode == 200) {
        setSearchData(response?.data?.data);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      if (error?.response?.status == 404) {
        window.location.href = "/search/SPY";
      } else {
        console.error("No records found");
      }
    } finally {
      setLoading(false);
    }
  }, [searchingValue.stockName]);

  useEffect(() => {
    getSearchResults();
  }, [getSearchResults]);

  const renderMarketChange = useMemo(() => {
    if (searchData?.company_quote?.open >= searchData?.company_quote?.previousClose) {
      return (
        <span style={{ color: "#00d000" }}>
          ${searchData?.company_quote?.change} ({searchData?.company_quote?.changesPercentage}%){" "}
        </span>
      );
    } else {
      return (
        <span style={{ color: "red" }}>
          ${searchData?.company_quote?.change} ({searchData?.company_quote?.changesPercentage}%){" "}
        </span>
      );
    }
  }, [searchData]);

  const fetchOptionData = async (symbol = searchingValue.stockName) => {
    const limit = 20;

    try {
      setFlowLoading(true);
      const response = await getOptionFlowData(page, limit, symbol);

      if (response.status == 200) {
        const allFlowData = response?.data?.data?.data;
        setTotalCount(response?.data?.data?.total_count);
        setFlowData(allFlowData);
      }
      setFlowLoading(false);
    } catch (error) {
      console.error("Error fetching flow data:", error);
    }
    finally {
    setFlowLoading(false);
    }
  };

  useEffect(() => {
    // getStockPost(searchingValue?.stockName, pageFeed);
    reset();
    setSelectedFiles([]);
    setShowEmojiPicker(false);
    setBullishDisabled(false);
    setBearishDisabled(false);
    setSelectedSentiment("");
    setImageName("");
  }, [searchingValue?.stockName, pageFeed]);

  useEffect(() => {
    if (isFlowTabVisible) {
      fetchOptionData(searchingValue.stockName);
    }
  }, [isFlowTabVisible, searchingValue.stockName, page]);

  useEffect(() => {
    if (isFinanceTabVisible) {
      getFinancailResult(searchingValue.stockName);
    }
  }, [isFinanceTabVisible, searchingValue.stockName]);

  useEffect(() => {
    if (isNewsTabVisible) {
      getNewsResult(searchingValue.stockName);
    }
  }, [isNewsTabVisible, searchingValue.stockName]);

  const handleFlowTabClick = () => {
    setIsFlowTabVisible(true);
  };

  const handlePredictionClick = () => {
    setAiTabVisible(true);
    reset();
    setSelectedFiles([]);
    setShowEmojiPicker(false);
    setBullishDisabled(false);
    setBearishDisabled(false);
    setSelectedSentiment("");
    setImageName("");
  };

  const handleFeedTabClick = () => {
    setIsFeedTabVisible(true);
    reset();
    setSelectedFiles([]);
    setShowEmojiPicker(false);
    setBullishDisabled(false);
    setBearishDisabled(false);
    setSelectedSentiment("");
    setImageName("");
  };

  const handleFinanceTabClick = () => {
    setIsFinanceTabVisible(true);
    setIsFlowTabVisible(false);
    reset();
    setSelectedFiles([]);
    setShowEmojiPicker(false);
    setBullishDisabled(false);
    setBearishDisabled(false);
    setSelectedSentiment("");
    setImageName("");
  };

  const handleNewsTabClick = () => {
    setIsNewsTabVisible(true);
    setIsFlowTabVisible(false);
    reset();
    setSelectedFiles([]);
    setShowEmojiPicker(false);
    setBullishDisabled(false);
    setBearishDisabled(false);
    setSelectedSentiment("");
    setImageName("");
  };

  const handleOptionClick = () => {
    setIsFlowTabVisible(false);
    reset();
    setSelectedFiles([]);
    setShowEmojiPicker(false);
    setBullishDisabled(false);
    setBearishDisabled(false);
    setSelectedSentiment("");
    setImageName("");
  };

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <div>
      
// <Timeline colorTheme="dark" feedMode="market" market="crypto" height={400} width="150%"></Timeline>          
//         </div>
//       </div>
//     );
//   }

  const handleScreenshot = () => {
    const targetDiv = document.getElementById("capture"); // Replace with your div ID
    targetDiv.style.backgroundColor = "#010033";
    targetDiv.classList.add("pt-5");

    html2canvas(targetDiv, { scrollX: -window.scrollX }).then(
      (originalCanvas) => {
        const logo = new Image();

        logo.src = thl3; // Replace with your logo path

        logo.onload = () => {
          const newCanvas = document.createElement("canvas");
          const context = newCanvas.getContext("2d");

          // Set the dimensions of the new canvas
          newCanvas.width = originalCanvas.width;
          newCanvas.height = originalCanvas.height;

          // Draw the original canvas onto the new canvas
          context.drawImage(originalCanvas, 0, 0);

          const logoWidth = 100;
          const logoHeight = (logoWidth / logo.width) * logo.height;
          const topMargin = 20;
          const rightMargin = 20;

          // Draw the logo on the new canvas
          context.drawImage(
            logo,
            newCanvas.width - logoWidth - rightMargin,
            topMargin,
            logoWidth,
            logoHeight
          );

          const screenshot = newCanvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = screenshot;
          downloadLink.download = "screenshot.png";

          downloadLink.click();
        };
      }
    );
    targetDiv.classList.remove("pt-5");
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      // Display error message if more than 5 files are selected
      Swal.fire({
        icon: "error",
        title: "Maximum 5 images only!",
        showConfirmButton: false,
        timer: 2000, // Automatically close after 2 seconds
        timerProgressBar: true, // Show progress bar
        toast: true, // Display as toast (notification)
        position: "top-end", // Position of the toast
        showCloseButton: true, // Show close button
      });
      return;
    }

    if (files && files.length > 0) {
      setSelectedFiles([...files]);
      // Assuming you want to display the names of all selected files
      const names = Array.from(files)
        .map((file) => file.name)
        .join(", ");
      setImageName(names);
    }
  };

  const handleSentimentSelection = (sentiment) => {
    // Toggle the sentiment
    setSelectedSentiment((prevSentiment) =>
      prevSentiment === sentiment ? null : sentiment
    );
  };

  const handleEmojiSelect = (emoji) => {
    const currentValue = getValues("text");
    setValue("text", currentValue + emoji.emoji, { shouldValidate: true }); // Update form value
    setShowEmojiPicker(false);
  };

  const onSubmit = async (data) => {
    const uid = localStorage.getItem("uid");

    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("text", data.text);
    formData.append("tag", selectedSentiment);
    selectedFiles?.map((file) => {
      formData.append("images", file);
    });

    try {
      const response = await userPosts(formData);
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Posted Successfully!",
          showConfirmButton: false,
          timer: 2000, // Automatically close after 2 seconds
          timerProgressBar: true, // Show progress bar
          toast: true, // Display as toast (notification)
          position: "top-end", // Position of the toast
          showCloseButton: true, // Show close button
        });

        reset();
        setSelectedFiles([]);
        setShowEmojiPicker(false);
        setBullishDisabled(false);
        setBearishDisabled(false);
        setSelectedSentiment("");
        setImageName("");
        setPageFeed(1);
        fetchData(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFav = async (ticker, favorite) => {
    const action = favorite == false ? "favorite" : "unfavorite";
    const uid = localStorage.getItem("uid");
    const Obj = {
      symbol: ticker,
      uid: uid,
      action: action,
    };
    try {
      const response = await postmyFavStocks(Obj);
      if (response?.data?.statusCode == 200) {
        setFavstocks((prevStocks) =>
          prevStocks.map((stocks) =>
            stocks.ticker === ticker
              ? { ...stocks, favorite: !favorite }
              : stocks
          )
        );

        getFavstocks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  function makeTickerLinksClickable(text) {
    const tickerRegex = /\$(\w+)(?!\d)/g;

    // Replace ticker symbols with clickable links
    let replacedText = text.replace(tickerRegex, (match, ticker) => {
      return `<a href="search/${ticker}" style="text-decoration: none">${match}</a>`;
    });

    // Regular expression to match bold text enclosed in **
    replacedText = replacedText.replace(
      /\*\*(\s*.*?(\n.*?)*)\*\*/g,
      "<strong>$1</strong>"
    );
    replacedText = replacedText.replace(/\n/g, "<br>");
    // Return the replaced text with ticker links and bold text
    return (
      <div
        className="text-break"
        dangerouslySetInnerHTML={{ __html: replacedText }}
      />
    );
  }


  return (
    <>
      <NavBottom isStyleChanged />

      <div className="notify-overlay"></div>

      {/* {searchData ? ( */}
        <div className="dashboard-area bg-color area-padding">
          <div className="container-fluid searching_Reault_Section">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-12 mb-3">
                <div className="searching_Reault_left_area">
                  <div className="searching_reault_heading mb-3">
                    <div className="searching_reault_heading_content w-100">
                      <div className="row justify-content-between">
                        <h4 className="font-weight-bolder col-10">
                          {searchData?.General?.Name}
                        </h4>

                        {favstocks?.map((stocks, index) => (
                          <h6
                            className="myfev_icon  col-2"
                            key={index}
                            onClick={() =>
                              handleFav(stocks?.ticker, stocks?.favorite)
                            }
                          >
                            {stocks?.ticker === searchedStock &&
                              (stocks?.favorite ? (
                                <i className="fas fa-heart"></i>
                              ) : (
                                <i className="far fa-heart"></i>
                              ))}
                          </h6>
                        ))}
                      </div>
                      <p className="mb-0">
                        <span className="mx-1">
                          {searchData?.General?.Code}
                        </span>{" "}
                        <span className="mx-1">STOCK</span>{" "}
                        <span className="mx-1">
                          {searchData?.General?.Exchange}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap justify-content-between">
                    <div className="searching_reault_MarketTOpen mb-3 mx-1">
                      <label>MARKET OPEN</label>
                      <h5>
                        ${searchData?.company_quote?.open}{" "}
                        {renderMarketChange}
                      </h5>
                    </div>

                    <div className="searching_reault_MarketTOpen mb-3 mx-1">
                      <label>POST MARKET</label>
                      <h5>${searchData?.company_quote?.previousClose}</h5>
                    </div>
                  </div>

                  <div className="mb-3">
                    <MiniChart
                      colorTheme="dark"
                      width="100%"
                      symbol={searchData?.General?.Code}
                    ></MiniChart>
                  </div>

                  <div className="searching_reault_market_Values">
                    <div className="searching_reault_MarketTOpen mb-3">
                      <label>MARKET CAP</label>
                      <h5>{searchData?.company_quote?.marketCap}</h5>
                    </div>
                    <div className="searching_reault_MarketTOpen mb-3">
                      <label>FLOAT</label>
                      <h5>{searchData?.ShareStats?.SharesFloat}</h5>
                    </div>
                    <div className="searching_reault_MarketTOpen mb-3">
                      <label>SHORT FLOAT</label>
                      <h5>
                        {searchData?.ShareStats?.ShortPercentFloat
                          ? searchData?.ShareStats?.ShortPercentFloat
                          : "--"}
                      </h5>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="d-flex align-items-center mb-2">
                      <p className="w-40 m-0 color_deeppink font-weight-bold">
                        SECTOR
                      </p>
                      <p className="w-60 mb-0">{searchData?.General?.Sector}</p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <p className="w-40 m-0 color_deeppink font-weight-bold">
                        INDUSTRY
                      </p>
                      <p className="w-60 mb-0">
                        {searchData?.General?.Industry}
                      </p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <p className="w-40 m-0 color_deeppink font-weight-bold">
                        WEBSITE
                      </p>
                      <p className="w-60 mb-0 word-wrap_kj">
                        <a
                          href={searchData?.General?.WebURL}
                          target="_BLANK"
                          className="text-decoration-none"
                        >
                          <i className="fa-solid fa-link mr-1"></i>
                          {searchData?.General?.WebURL}
                        </a>
                      </p>
                    </div>
                    <p className="mt-3 mb-0">
                      {searchData?.General?.Description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-xl-8 col-lg-7 col-12 mb-3">
                <div className="searching_Reault_Right_area">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-Traders-Talk-tab"
                        data-toggle="pill"
                        data-target="#pills-Traders-Talk"
                        type="button"
                        role="tab"
                        aria-controls="pills-Traders-Talk"
                        aria-selected="true"
                        onClick={handleFeedTabClick}
                      >
                        Traders Talk
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link "
                        id="pills-Overview-tab"
                        data-toggle="pill"
                        data-target="#pills-Overview"
                        type="button"
                        role="tab"
                        aria-controls="pills-Overview"
                        aria-selected="false"
                        onClick={handleOptionClick}
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-Financials-tab"
                        data-toggle="pill"
                        data-target="#pills-Financials"
                        type="button"
                        role="tab"
                        aria-controls="pills-Financials"
                        aria-selected="false"
                        onClick={handleFinanceTabClick}
                      >
                        Financials
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-News-tab"
                        data-toggle="pill"
                        data-target="#pills-News"
                        type="button"
                        role="tab"
                        aria-controls="pills-News"
                        aria-selected="false"
                        onClick={handleNewsTabClick}
                      >
                        News
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-Flow-tab"
                        data-toggle="pill"
                        data-target="#pills-Flow"
                        type="button"
                        role="tab"
                        aria-controls="pills-Flow"
                        aria-selected="false"
                        onClick={handleFlowTabClick}
                      >
                        Flow
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-Predictions-tab"
                        data-toggle="pill"
                        data-target="#pills-Predictions"
                        type="button"
                        role="tab"
                        aria-controls="pills-Predictions"
                        aria-selected="false"
                        onClick={handlePredictionClick}
                      >
                        AI Analytics
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade "
                      id="pills-Overview"
                      role="tabpanel"
                      aria-labelledby="pills-Overview-tab"
                    >
                      <div className="row">
                        <div className="col-xl-7 col-lg-12 col-12">
                          <div className="searching_Reault_Right_overview_table">
                            <SymbolOverview
                              colorTheme="dark"
                              autosize
                              chartType="candlesticks"
                              downColor="#800080"
                              borderDownColor="#800080"
                              wickDownColor="#800080"
                              symbols={searchData?.General?.Code}
                            />
                          </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 col-12">
                          <div className="searching_Reault_Right_overview_table">
                            <TechnicalAnalysis
                              colorTheme="dark"
                              width="100%"
                              symbol={searchData?.General?.Code}
                            ></TechnicalAnalysis>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-xl-6 col-lg-12 col-md-6 col-12 mb-3">
                          <div className="searching_Reault_Right_overview_table">
                            <h2 className="watchlisthead Heading_content_hp mb-2">
                              {" "}
                              Price Highlights{" "}
                            </h2>
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
                            <h2 className="watchlisthead Heading_content_hp mb-2">
                              {" "}
                              Share Statistics{" "}
                            </h2>
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
                            <h2 className="watchlisthead Heading_content_hp mb-2">
                              {" "}
                              Financial Highlights{" "}
                            </h2>
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

                    {/* flow  tab */}
                    <div
                      className="tab-pane fade"
                      id="pills-Flow"
                      role="tabpanel"
                      aria-labelledby="pills-Flow-tab"
                    >
                      <div className="d-flex justify-content-end w-100">
                        {isFlowTabVisible && (
                          <div className="Calender_Screenshot_area">
                            <button
                              onClick={handleScreenshot}
                              className="btn btn_main2_hp"
                              title="Screenshot"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                fill="none"
                              >
                                <path d="M22.2402 8H39.0002C39.2655 8 39.5198 8.10536 39.7073 8.29289C39.8949 8.48043 40.0002 8.73478 40.0002 9V10.31C40.0002 10.5752 40.1056 10.8296 40.2931 11.0171C40.4807 11.2046 40.735 11.31 41.0002 11.31C41.2655 11.31 41.5198 11.2046 41.7073 11.0171C41.8949 10.8296 42.0002 10.5752 42.0002 10.31V8H45.0002C45.2655 8 45.5198 7.89464 45.7073 7.70711C45.8949 7.51957 46.0002 7.26522 46.0002 7C46.0002 6.73478 45.8949 6.48043 45.7073 6.29289C45.5198 6.10536 45.2655 6 45.0002 6H42.0002V3C42.0002 2.73478 41.8949 2.48043 41.7073 2.29289C41.5198 2.10536 41.2655 2 41.0002 2C40.735 2 40.4807 2.10536 40.2931 2.29289C40.1056 2.48043 40.0002 2.73478 40.0002 3V6H22.2402C21.975 6 21.7207 6.10536 21.5331 6.29289C21.3456 6.48043 21.2402 6.73478 21.2402 7C21.2402 7.26522 21.3456 7.51957 21.5331 7.70711C21.7207 7.89464 21.975 8 22.2402 8ZM22.7602 19C22.7602 20.0364 23.0676 21.0495 23.6433 21.9112C24.2191 22.7729 25.0375 23.4445 25.995 23.8411C26.9525 24.2377 28.006 24.3415 29.0225 24.1393C30.039 23.9371 30.9726 23.4381 31.7055 22.7052C32.4383 21.9724 32.9374 21.0387 33.1396 20.0223C33.3417 19.0058 33.238 17.9522 32.8414 16.9947C32.4448 16.0373 31.7731 15.2189 30.9114 14.6431C30.0497 14.0673 29.0366 13.76 28.0002 13.76C26.6113 13.7626 25.28 14.3156 24.2979 15.2977C23.3158 16.2798 22.7629 17.6111 22.7602 19ZM31.2402 19C31.2402 19.6408 31.0502 20.2672 30.6942 20.8C30.3382 21.3329 29.8322 21.7481 29.2401 21.9934C28.6481 22.2386 27.9966 22.3028 27.3681 22.1777C26.7396 22.0527 26.1623 21.7441 25.7092 21.291C25.2561 20.8379 24.9475 20.2606 24.8225 19.6321C24.6975 19.0036 24.7616 18.3521 25.0069 17.7601C25.2521 17.1681 25.6674 16.6621 26.2002 16.306C26.733 15.95 27.3594 15.76 28.0002 15.76C28.8587 15.7626 29.6813 16.1048 30.2883 16.7119C30.8954 17.3189 31.2376 18.1415 31.2402 19Z" />
                                <path d="M45 40H42V15.61C42 15.3448 41.8946 15.0904 41.7071 14.9029C41.5196 14.7154 41.2652 14.61 41 14.61C40.7348 14.61 40.4804 14.7154 40.2929 14.9029C40.1054 15.0904 40 15.3448 40 15.61V30.07L38 27.44C37.7148 27.077 37.3544 26.78 36.9436 26.5694C36.5327 26.3588 36.0812 26.2396 35.62 26.22C35.1512 26.1947 34.6824 26.2709 34.2457 26.4435C33.809 26.6161 33.4148 26.881 33.09 27.22L29 31.49C28.8805 31.6149 28.7369 31.7144 28.578 31.7823C28.419 31.8502 28.2479 31.8853 28.075 31.8853C27.9021 31.8853 27.731 31.8502 27.572 31.7823C27.4131 31.7144 27.2695 31.6149 27.15 31.49L22.74 26.2C22.4508 25.8641 22.0956 25.5914 21.6965 25.3987C21.2974 25.206 20.8629 25.0975 20.42 25.08C19.9752 25.0605 19.5312 25.1321 19.1151 25.2903C18.6989 25.4485 18.3195 25.69 18 26L8 35.82V24.43C8 24.1648 7.89464 23.9104 7.70711 23.7229C7.51957 23.5354 7.26522 23.43 7 23.43C6.73478 23.43 6.48043 23.5354 6.29289 23.7229C6.10536 23.9104 6 24.1648 6 24.43V40H3C2.73478 40 2.48043 40.1054 2.29289 40.2929C2.10536 40.4804 2 40.7348 2 41C2 41.2652 2.10536 41.5196 2.29289 41.7071C2.48043 41.8946 2.73478 42 3 42H6V45C6 45.2652 6.10536 45.5196 6.29289 45.7071C6.48043 45.8946 6.73478 46 7 46C7.26522 46 7.51957 45.8946 7.70711 45.7071C7.89464 45.5196 8 45.2652 8 45V42H40V45C40 45.2652 40.1054 45.5196 40.2929 45.7071C40.4804 45.8946 40.7348 46 41 46C41.2652 46 41.5196 45.8946 41.7071 45.7071C41.8946 45.5196 42 45.2652 42 45V42H45C45.2652 42 45.5196 41.8946 45.7071 41.7071C45.8946 41.5196 46 41.2652 46 41C46 40.7348 45.8946 40.4804 45.7071 40.2929C45.5196 40.1054 45.2652 40 45 40ZM38 40H9.17C8.94048 40.0122 8.71262 39.9548 8.51631 39.8352C8.32001 39.7157 8.16444 39.5396 8.07 39.33C8.02815 39.2248 8.00448 39.1132 8 39C7.98968 38.8696 8.00958 38.7387 8.05815 38.6173C8.10671 38.4959 8.18263 38.3873 8.28 38.3L19.38 27.38C19.5034 27.2596 19.6511 27.167 19.8132 27.1084C19.9754 27.0498 20.1481 27.0264 20.32 27.04C20.4877 27.0457 20.6524 27.086 20.8038 27.1583C20.9552 27.2305 21.0901 27.3332 21.2 27.46L25.61 32.7C25.9081 33.0427 26.2742 33.3198 26.685 33.5136C27.0958 33.7074 27.5424 33.8138 27.9964 33.8261C28.4505 33.8383 28.9022 33.7561 29.3228 33.5846C29.7434 33.4131 30.1239 33.1562 30.44 32.83L34.49 28.56C34.6153 28.4353 34.765 28.3378 34.9298 28.2739C35.0946 28.2099 35.2709 28.1807 35.4475 28.1882C35.6241 28.1958 35.7973 28.2398 35.9561 28.3175C36.1148 28.3953 36.2558 28.5051 36.37 28.64L39.79 33.06C39.9125 33.2172 39.9793 33.4107 39.98 33.61V39C39.957 39.2876 39.821 39.5543 39.6017 39.7418C39.3823 39.9292 39.0977 40.0221 38.81 40H38ZM3 8H6V19.12C6 19.3852 6.10536 19.6396 6.29289 19.8271C6.48043 20.0146 6.73478 20.12 7 20.12C7.26522 20.12 7.51957 20.0146 7.70711 19.8271C7.89464 19.6396 8 19.3852 8 19.12V9C8 8.73478 8.10536 8.48043 8.29289 8.29289C8.48043 8.10536 8.73478 8 9 8H16.94C17.2052 8 17.4596 7.89464 17.6471 7.70711C17.8346 7.51957 17.94 7.26522 17.94 7C17.94 6.73478 17.8346 6.48043 17.6471 6.29289C17.4596 6.10536 17.2052 6 16.94 6H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8Z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="Option_main_section_hp">
                        <div
                          className="row mt-4 Option_heatmap_table_area "
                          id="capture"
                        >
                          <div className="col-lg-12 tab">
                            <div className="table-responsive tabalignn custom-table ">
                              <table className="table text-white">
                                <thead>
                                  <tr>
                                    <th>TIME</th>
                                    <th>SYMBOL</th>
                                    <th>EXP</th>
                                    <th>STRIKE</th>
                                    <th>C/P</th>
                                    <th>SPOT</th>
                                    <th>DETAILS</th>
                                    <th>CONTRACT PRICE</th>
                                    <th>VOLUME</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {flowLoading ? (
                                    <tr>
                                      <td
                                        colSpan="21"
                                        className="text-center py-5"
                                      >
                                        <div
                                          className="spinner-border  "
                                          style={{
                                            width: "3rem",
                                            height: "3rem",
                                            color: "white",
                                          }}
                                          role="status"
                                        >
                                          <span className="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  ) : flowData.length === 0 ? (
                                    <tr>
                                      <td
                                        colSpan="21"
                                        className="text-center py-5"
                                      >
                                        <p
                                          className="text-center py-5"
                                          style={{
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Record Not Found
                                        </p>
                                      </td>
                                    </tr>
                                  ) : (
                                    flowData.map((item, index) => (
                                      <tr key={index}>
                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {moment
                                            .utc(item.id.creationTime)
                                            .local()
                                            .format("HH:mm:ss")}
                                        </td>

                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {item.symbol}
                                        </td>
                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {moment
                                            .utc(item.expiration)
                                            .local()
                                            .format("MM/DD/YYYY")}
                                        </td>
                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {item.strike}
                                        </td>
                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {item.callPut}
                                        </td>
                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {item.spot.toFixed(2)}
                                        </td>
                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {item.details}
                                        </td>
                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {item.contractPrice}
                                        </td>
                                        <td
                                          style={{
                                            color:
                                              item.callPut === "PUT"
                                                ? "red"
                                                : "#00d000",
                                          }}
                                        >
                                          {item.volume}
                                        </td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>
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
                              pageClassName="page-item"
                              pageLinkClassName="page-link"
                              previousClassName="page-item"
                              previousLinkClassName="page-link"
                              renderOnZeroPageCount={null}
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

                    <div
                      className="tab-pane fade"
                      id="pills-Financials"
                      role="tabpanel"
                      aria-labelledby="pills-Financials-tab"
                    >
                      <div className="row mt-4">
                        <div className="col-12 mb-3">
                          <div className="searching_Reault_Right_overview_table">
                            <h2 className="watchlisthead Heading_content_hp mb-2">
                              {" "}
                              Earnings History{" "}
                            </h2>
                            <div className="table-responsive tabalignn custom-table searching_Reault_Right_table_Responsive">
                              <table className="table table-hover mb-0">
                                <thead>
                                  <tr>
                                    <th>REPORT DATE</th>
                                    <th>Revenue</th>
                                    <th>Earning</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {flowLoading ? (
                                    <tr>
                                      <td
                                        colSpan="3"
                                        className="text-center py-5"
                                      >
                                        <div
                                          className="spinner-border"
                                          role="status"
                                        >
                                          <span className="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  ) : financeData?.revenue &&
                                    financeData?.revenue.length > 0 ? (
                                    financeData?.revenue.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.revenue}</td>
                                        <td>{item.earnings}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan="3"
                                        className="text-center py-5"
                                      >
                                        <p
                                          className="text-center py-5"
                                          style={{
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          No Record Found
                                        </p>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-News"
                      role="tabpanel"
                      aria-labelledby="pills-News-tab"
                    >
                      <div className="row">
                        {flowLoading ? (
                          <div className="col-12 text-center py-5">
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : newsData?.news && newsData?.news.length > 0 ? (
                          <StockNews news={newsData?.news} />
                        ) : (
                          <div className="col-12 text-center py-5">
                            <p
                              className="text-center py-5"
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                              }}
                            >
                              No Record Found
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade show active"
                      id="pills-Traders-Talk"
                      role="tabpanel"
                      aria-labelledby="pills-Traders-Talk-tab"
                    >
                      <div className="row">
                        <div className="col-xl-7 col-lg-12 col-md-6">
                          <div className="Traders_talk_comment_form_area mb-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="Traders_talk_top_profile_area">
                                <img
                                  className="profile_img ml-2"
                                  src={user?.profile_pic || thl3}
                                  alt={user?.username
                                    .substring(0, 2)
                                    .toUpperCase()}
                                />
                                <div className="form-group w-100 mb-0">
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    {...register("text")}
                                    defaultValue={`$${searchedStock}`}
                                    cols={4}
                                  ></textarea>
                                  {
                                    <span className="text-danger">
                                      {errors?.text?.message}
                                    </span>
                                  }
                                </div>
                              </div>

                              <div className="Traders_talk_top_btn_area mt-3">
                                <div className="Traders_talk_top_tag_area">
                                  <button
                                    className={`btn ${
                                      selectedSentiment === "Bullish"
                                        ? "active"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                      handleSentimentSelection("Bullish")
                                    }
                                    disabled={bearishDisabled}
                                  >
                                    Bullish
                                  </button>
                                  <button
                                    className={`btn ${
                                      selectedSentiment === "Bearish"
                                        ? "active"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                      handleSentimentSelection("Bearish")
                                    }
                                    disabled={bullishDisabled}
                                  >
                                    Bearish
                                  </button>
                                </div>
                                <div className="d-flex flex-wrap align-items-center">
                                  <div className="upload-btn-wrapper">
                                    <button className="btn_file btn">
                                      <i className="fa-solid fa-image"></i>
                                    </button>
                                    <input
                                      type="file"
                                      {...register("file")}
                                      name="myfile"
                                      multiple
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      disabled={!userPresent}
                                    />
                                    <span className="text-white">
                                      {imageName}
                                    </span>
                                    {
                                      <span className="text-danger">
                                        {errors?.file?.message}
                                      </span>
                                    }
                                  </div>
                                  <button
                                    className="btn_file btn"
                                    type="button"
                                    onClick={() =>
                                      setShowEmojiPicker(!showEmojiPicker)
                                    }
                                    disabled={!userPresent}
                                  >
                                    <i className="fa-regular fa-face-smile"></i>
                                  </button>
                                  {showEmojiPicker && (
                                    <EmojiPicker
                                      open={showEmojiPicker}
                                      onEmojiClick={handleEmojiSelect}
                                      reactionsDefaultOpen={false}
                                      disabled={!userPresent}
                                    />
                                  )}

                                  <button
                                    type="submit"
                                    className="btn btn-Post btn_main_hp active"
                                    disabled={!userPresent}
                                  >
                                    {" "}
                                    Post{" "}
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>

                          <div className="card-search Traders_talk_section">
                            <InfiniteScroll
                              dataLength={feedStock.length}
                              next={fetchMoreData}
                              hasMore={hasMore}
                              loader={
                                feedStock.length > 0 && <h4>Loading...</h4>
                              }
                              endMessage={
                                feedStock.length > 0 && (
                                  <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                  </p>
                                )
                              }
                            >
                              {feedStock && feedStock.length > 0 ? (
                                feedStock?.map((item, index) => (
                                  <div className="card mb-2" key={index}>
                                    <div className="card-header">
                                      {item?.profile_pic ? (
                                        <img
                                          className="profile_img"
                                          src={item?.profile_pic}
                                        />
                                      ) : (
                                        <div className="profile_img">
                                          {user.username
                                            .substring(0, 2)
                                            .toUpperCase()}
                                        </div>
                                      )}
                                      <div className="card-content w-100">
                                        <h6>
                                          {item?.name}
                                          <small className="ml-2">
                                            {item?.time}
                                          </small>{" "}
                                          <span className="btn_main2_hp px-2 py-1 ms-2 float-right me-auto">
                                            <i class="fa-solid fa-user-plus me-2"></i>{" "}
                                            {followedUserPosts[item.uid]}
                                          </span>
                                        </h6>

                                        <p className="mt-2">
                                          {makeTickerLinksClickable(item?.text)}
                                          <span
                                            className={`${
                                              item?.tag === "Bullish"
                                                ? "bullish-tag"
                                                : "bearish-tag"
                                            }`}
                                          >
                                            {item?.tag}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="card-body card-img_kj">
                                      {item?.image_urls?.map((img, index) => {
                                        return (
                                          <ImageGallery
                                            img={img}
                                            post={item}
                                            index={index}
                                          />
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-white">
                                  No record found.
                                </div>
                              )}
                            </InfiniteScroll>
                          </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 col-md-6">
                          <div className="searching_Reault_Right_overview_table mb-2">
                            <TechnicalAnalysis
                              colorTheme="dark"
                              width="100%"
                              symbol={searchData?.General?.Code}
                            ></TechnicalAnalysis>
                          </div>
                          <div className="searching_Reault_Right_overview_table mb-2">
                            <h2 className="watchlisthead Heading_content_hp mb-2">
                              {" "}
                              Price Highlights{" "}
                            </h2>
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

                          <div className="searching_Reault_Right_overview_table mb-2">
                            <h2 className="watchlisthead Heading_content_hp mb-2">
                              {" "}
                              Share Statistics{" "}
                            </h2>
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
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-Predictions"
                      role="tabpanel"
                      aria-labelledby="pills-Predictions-tab"
                    >
                      {aiLoading ? (
                        <div className="col-12 text-center py-5">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        aiTabVisible && (
                          <>
                            <div className="AIAnalytics_section_hp">
                              <div className="AIAnalytics_content_area">
                                <div className="row">
                                  <div className="col-xl-9 col-lg-9 col-md-10 col-12 ">
                                    <div className="AIAnalytics_content_area_left">
                                      <div className="row">
                                        <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                                          <div>
                                            <label
                                              className=" pb-1 mb-1"
                                              style={{ color: "#f1f1f1" }}
                                            >
                                              {" "}
                                              Closing Price(
                                              {aiData?.prediction_date})
                                            </label>
                                            <h5 className="font-weight-bold ms-2">
                                              {aiData?.predicted_closing_price
                                                ? aiData?.predicted_closing_price.toFixed(
                                                    2
                                                  )
                                                : "--"}
                                            </h5>
                                          </div>
                                        </div>
                                        <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                                          <div>
                                            <label
                                              className=" pb-1 mb-1"
                                              style={{ color: "#f1f1f1" }}
                                            >
                                              {" "}
                                              50 Day(MA)
                                            </label>
                                            <h5 className="font-weight-bold ms-2">
                                              {aiData?.["50DayMA"]
                                                ? aiData?.["50DayMA"].toFixed(2)
                                                : "--"}
                                            </h5>
                                          </div>
                                        </div>
                                        <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                                          <div>
                                            <label
                                              className=" pb-1 mb-1"
                                              style={{ color: "#f1f1f1" }}
                                            >
                                              {" "}
                                              200 Day(MA)
                                            </label>
                                            <h5 className="font-weight-bold ms-2">
                                              {aiData?.["200DayMA"]
                                                ? aiData?.["200DayMA"].toFixed(
                                                    2
                                                  )
                                                : "--"}
                                            </h5>
                                          </div>
                                        </div>
                                        <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                                          <div>
                                            <label
                                              className=" pb-1 mb-1"
                                              style={{ color: "#f1f1f1" }}
                                            >
                                              {" "}
                                              1 YearTarget
                                            </label>
                                            <h5 className="font-weight-bold ms-2">
                                              {aiData?.["1YearTarget"]
                                                ? aiData?.[
                                                    "1YearTarget"
                                                  ].toFixed(2)
                                                : "--"}
                                            </h5>
                                          </div>
                                        </div>
                                        <div className="col-xl-10 col-md-11 col-sm-12 mb-3">
                                          <div>
                                            <p className="">
                                              <Typewriter
                                                options={{
                                                  strings: aiCompanyData?.data,
                                                  autoStart: true,
                                                  loop: false,
                                                }}
                                              />
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="robot_img_area_hp">
                                <img src={Robot} alt="" />
                              </div>
                            </div>
                          </>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* ) : ( */}
        {/* <h1
          className="dashboard-area bg-color mt-5 area-padding text-center"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          No Record Found.
        </h1>
      )} */}
    </>
  );
};

const ImageGallery = ({ img, post, index }) => {
  const [toggler, setToggler] = useState(false);

  return (
    <>
      <img
        key={index}
        className="mb-2"
        src={`${img}`}
        alt="Card image cap"
        onClick={() => {
          setToggler(!toggler);
        }}
        style={{ cursor: "pointer" }}
      />

      <FsLightbox type="image" toggler={toggler} sources={post?.image_urls} />
    </>
  );
};

export default StockSearches;
