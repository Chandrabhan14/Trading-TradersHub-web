import React, { useEffect, useRef, useState } from "react";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";
import images from "../../assets/img/about/images.jpeg";
import { Link } from "react-router-dom";
import { BsRocketTakeoff } from "react-icons/bs";
import { BiMessageDetail, BiShareAlt } from "react-icons/bi";
import { PiTagChevron, PiFlagPennantDuotone } from "react-icons/pi";
import NotificationBadge from "./NotificationBadge";
import pink from "../../assets/img/logo/blue.jpg";
import graph1 from "../../assets/img/graph/graph1.png";
import graph2 from "../../assets/img/graph/graph2.png";
import graph3 from "../../assets/img/graph/graph3.png"
import graph4 from "../../assets/img/graph/graph4.png";
import graph5 from "../../assets/img/graph/graph5.png";
import graph6 from "../../assets/img/graph/graph6.png";
import graph7 from "../../assets/img/graph/graph7.png";
import useWebSocket from "../../hooks/useWebsocket";
import WithAuth from "../auth/withAuth";
import moment from "moment";
import Modal from "../../utils/Modal";



const Indicator = () => {

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



  const { ws, sendMessage } = useWebSocket("ws://3.142.132.115:5000/th_backend/");
  const notificationCount = 5;
  const handleTradersHubSupportResistance = () => {
    window.open('https://www.tradingview.com/script/r2qYeagu-Tradershub-Green-Red/', '_blank');
  };
  const handleTradersHubV1 = () => {
    window.open('https://www.tradingview.com/script/x5S4Znv9-Tradershub-WatchList-Charts/', '_blank');
  };
  const handleTradershubMACDSTRATEGY = () => {
    window.open('https://www.tradingview.com/script/BrofENIT-Tradershub-Patterns/', '_blank');
  };
  const handleTradershubTRENDMETER = () => {
    window.open('https://www.tradingview.com/script/GgIF1834-Tradershub-TRENDMETER/', '_blank');
  };
  const handleTradershubWatchListCharts = () => {
    window.open('https://www.tradingview.com/script/C9bHrUw1-Tradershub-Metrics/', '_blank');
  };
  const handleTradershubOptions = () => {
    window.open('https://www.tradingview.com/script/AYkSFGGo-Tradershub-MACD-STRATEGY/', '_blank');
  };
  const handleTradershubMetrics = () => {
    window.open('https://www.tradingview.com/script/x1RtM4o6-TradersHub-V2/', '_blank');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const dataString = localStorage.getItem("googledata");
      const userDataFromLocalStorage = JSON.parse(dataString);
      const uid = userDataFromLocalStorage?.uid;

      const message = {
        user: uid ? uid : "Anonymous",
        content: "Automatic message from WatchList component",
      };
      sendMessage(message);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [sendMessage]);
  return (
    <>
    <div>
     
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid indicator_section_hp">

      
          <Side />
     

          <div className="mb-4 content content_section_hp" >
            <div className="row">

              <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                <div className="card indicator indicator_card_item" >
                  <img className="card-img-top img-responsive" src={graph1} alt="Card image cap" onClick={handleTradersHubSupportResistance} />
                  <div className="card-body">
                    <div className=" indicator_card_title_area mb-3">
                      <div className="d-flex align-items-center">
                        <img src={pink} />
                        <p className="card-title"> TradersHub Green : Red {"  "}<PiFlagPennantDuotone /> </p>
                      </div>
                      <p className="indicator_card_postTime">32 Min. ago</p>
                    </div>
                    <p className="indicator_card_content">
                    This script is published closed-source but you may use it freely. You can favorite it to use it on a chart. You cannot view or modify its source code.
                    </p>

                    <div className="indicator_card_Bottom_Action justify-content-end">
                      <div className="">
                        <Link to="https://www.tradingview.com/script/r2qYeagu-Tradershub-Green-Red/" target="_blank" > <BsRocketTakeoff />{" "} </Link>
                      </div>
                  
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                <div className="card indicator indicator_card_item" >
                  <img className="card-img-top img-responsive" src={graph2} alt="Card image cap" onClick={handleTradersHubV1} />
                  <div className="card-body">
                    <div className=" indicator_card_title_area mb-3">
                      <div className="d-flex align-items-center">
                        <img src={pink} />
                        <p className="card-title"> TradersHub WatchList Charts {"  "}<PiFlagPennantDuotone /> </p>
                      </div>
                      <p className="indicator_card_postTime">32 Min. ago</p>
                    </div>
                    <p className="indicator_card_content">
                    Tradershub WatchList Charts" is a specific feature or tool you'd like to know more about, I recommend visiting the official website or documentation of Tradershub, if it exists, or contacting their customer support or user community for detailed information on how to use this feature and its functionality. It's essential to understand how to navigate and use any trading platform effectively to make informed trading decisions.
                    </p>

                    <div className="indicator_card_Bottom_Action justify-content-end" >
                      <div className="">
                        <Link to="https://www.tradingview.com/script/x5S4Znv9-Tradershub-WatchList-Charts/" target="_blank" > <BsRocketTakeoff />{" "} </Link>
                      </div>
                    
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                <div className="card indicator indicator_card_item" >
                  <img className="card-img-top img-responsive" src={graph3} alt="Card image cap" onClick={handleTradershubMACDSTRATEGY} />
                  <div className="card-body">
                    <div className=" indicator_card_title_area mb-3">
                      <div className="d-flex align-items-center">
                        <img src={pink} />
                        <p className="card-title"> TradersHub Patterns {"  "}<PiFlagPennantDuotone /> </p>
                      </div>
                      <p className="indicator_card_postTime">32 Min. ago</p>
                    </div>
                    <p className="indicator_card_content">
                    In general, when traders refer to "patterns" in the context of technical analysis, they are usually discussing chart patterns or candlestick patterns. These patterns are used to analyze historical price data and make predictions about future price movements. Here are some common chart and candlestick patterns that traders often use:
                    </p>

                    <div className="indicator_card_Bottom_Action justify-content-end">
                      <div className="">
                        <Link to="https://www.tradingview.com/script/BrofENIT-Tradershub-Patterns/" target="_blank" > <BsRocketTakeoff />{" "} </Link>
                      </div>
                  
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                <div className="card indicator indicator_card_item" >
                  <img className="card-img-top img-responsive" src={graph4} alt="Card image cap"
                    onClick={handleTradershubTRENDMETER} />
                  <div className="card-body">
                    <div className=" indicator_card_title_area mb-3">
                      <div className="d-flex align-items-center">
                        <img src={pink} />
                        <p className="card-title"> TradersHub TRENDMETER {"  "}<PiFlagPennantDuotone /> </p>
                      </div>
                      <p className="indicator_card_postTime">32 Min. ago</p>
                    </div>
                    <p className="indicator_card_content">
                    In general, a "trendmeter" or "trend meter" in trading or technical analysis often refers to a tool or indicator used to assess the direction and strength of price trends in financial markets. Trend analysis is a fundamental aspect of trading, and traders use various indicators and methods to identify trends and make informed trading decisions.
                    </p>

                    <div className="indicator_card_Bottom_Action justify-content-end">
                      <div className="">
                        <Link to="https://www.tradingview.com/script/GgIF1834-Tradershub-TRENDMETER/"  target="_blank"> <BsRocketTakeoff />{" "} </Link>
                      </div>
                   
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                <div className="card indicator indicator_card_item" >
                  <img className="card-img-top img-responsive" src={graph5} alt="Card image cap"
                    onClick={handleTradershubWatchListCharts} />
                  <div className="card-body">
                    <div className=" indicator_card_title_area mb-3">
                      <div className="d-flex align-items-center">
                        <img src={pink} />
                        <p className="card-title"> TradersHub Metrics {"  "}<PiFlagPennantDuotone /> </p>
                      </div>
                      <p className="indicator_card_postTime">32 Min. ago</p>
                    </div>
                    <p className="indicator_card_content">
                    "Tradershub Metrics" is not a well-known or widely recognized term or tool in the field of trading or financial analysis as of my last knowledge update in January 2022. It's possible that such a tool or term has emerged or gained popularity after that date, but I do not have information about it.
                    </p>

                    <div className="indicator_card_Bottom_Action justify-content-end">
                      <div className="">
                        <Link to="https://www.tradingview.com/script/C9bHrUw1-Tradershub-Metrics/" target="_blank"> <BsRocketTakeoff />{" "} </Link>
                      </div>
                  
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                <div className="card indicator indicator_card_item" >
                  <img className="card-img-top img-responsive" src={graph6} alt="Card image cap"
                    onClick={handleTradershubOptions} />
                  <div className="card-body">
                    <div className=" indicator_card_title_area mb-3">
                      <div className="d-flex align-items-center">
                        <img src={pink} />
                        <p className="card-title"> TradersHub MACD STRATEGY {"  "}<PiFlagPennantDuotone /> </p>
                      </div>
                      <p className="indicator_card_postTime">32 Min. ago</p>
                    </div>
                    <p className="indicator_card_content">
                    The MACD (Moving Average Convergence Divergence) strategy is a popular technical analysis tool used by traders to identify potential trend reversals and generate trading signals in financial markets. It is a versatile indicator that can be applied to various time frames and asset classes. Here's a description of how the MACD strategy typically works:
                    </p>

                    <div className="indicator_card_Bottom_Action justify-content-end">
                      <div className="">
                        <Link to="https://www.tradingview.com/script/AYkSFGGo-Tradershub-MACD-STRATEGY/" target="_blank"> <BsRocketTakeoff />{" "} </Link>
                      </div>
                
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                <div className="card indicator indicator_card_item" >
                  <img className="card-img-top img-responsive" src={graph7} alt="Card image cap"
                    onClick={handleTradershubMetrics} />
                  <div className="card-body">
                    <div className=" indicator_card_title_area mb-3">
                      <div className="d-flex align-items-center">
                        <img src={pink} />
                        <p className="card-title"> TradersHub Ninja V2 {"  "}<PiFlagPennantDuotone /> </p>
                      </div>
                      <p className="indicator_card_postTime">32 Min. ago</p>
                    </div>
                    <p className="indicator_card_content">
                    This script is published closed-source but you may use it freely. You can favorite it to use it on a chart. You cannot view or modify its source code.
                    </p>

                    <div className="indicator_card_Bottom_Action justify-content-end">
                      <div className="">
                        <Link to="https://www.tradingview.com/script/x1RtM4o6-TradersHub-V2/" target="_blank"> <BsRocketTakeoff />{" "} </Link>
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
    {  isModalOpen &&  < Modal/>}
    </>
  );
};

export default WithAuth(Indicator);
