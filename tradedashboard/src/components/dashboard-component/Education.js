import React, { useEffect, useRef, useState } from "react";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";
import logo from "../../assets/img/logo/log.jpg";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Soulzs from "../../assets/pdf/begginner/Soulzs.pdf";
import Volume_Profile from "../../assets/pdf/begginner/Volume_Profile.pdf";
import Price_Action_WadeFX from "../../assets/pdf/begginner/Price_Action_WadeFX.pdf";
import Cheatsheet_compilation from "../../assets/pdf/begginner/Cheatsheet_compilation.pdf";

import Japanese_Candlesticks from "../../assets/pdf/candlestics/Japanese_Candlesticks.pdf";
import Major_Candlestick from "../../assets/pdf/candlestics/Major_Candlestick.pdf";
import Trading_With_Ichimoku from "../../assets/pdf/candlestics/Trading_With_Ichimoku.pdf";
import Candlestick_Trading_Bible from "../../assets/pdf/candlestics/Candlestick_Trading_Bible.pdf";
import The_Art_of_Candlesticks from "../../assets/pdf/candlestics/The_Art_of_Candlesticks.pdf";
import High_Profit_Candlestick from "../../assets/pdf/candlestics/High_Profit_Candlestick.pdf";

import Price_Action_Trading from "../../assets/pdf/priceAction/Price_Action_Trading.pdf";
import Price_Action_Cheat_Sheet from "../../assets/pdf/priceAction/Price_Action_Cheat_Sheet.pdf";
import Price_Action_Concepts from "../../assets/pdf/priceAction/Price_Action_Concepts.pdf";
import Highs_and_Lows from "../../assets/pdf/priceAction/Highs_and_Lows.pdf";
import Order_Block_Playbook from "../../assets/pdf/priceAction/Order_Block_Playbook.pdf";
import ZM_Capital_Academy_eBook from "../../assets/pdf/priceAction/ZM_Capital_Academy_eBook.pdf";
import A_Practical_Guide from "../../assets/pdf/priceAction/A_Practical_Guide.pdf";
import Swing_Failure_Pattern from "../../assets/pdf/priceAction/Swing_Failure_Pattern.pdf";
import Short_Trading_book_ from "../../assets/pdf/priceAction/Short_Trading_book_.pdf";
import Choosing_Direction from "../../assets/pdf/priceAction/Choosing_Direction.pdf";
import Trading_book_no_indicators from "../../assets/pdf/priceAction/Trading_book_no_indicators.pdf";
import TRADING_HUB from "../../assets/pdf/priceAction/TRADING_HUB_2.O_eBook_n.pdf";
import Tradable_Order_Blocks from "../../assets/pdf/priceAction/Tradable_Order_Blocks_by_Kenne_Dyne.pdf";
import Inducement_Cycle from "../../assets/pdf/priceAction/Inducement_Cycle.pdf";
import Wyckoff_Method from "../../assets/pdf/priceAction/Wyckoff-Method-Wyckoff-Analytics-English-V2.pdf";

import Fundamental_Analysis_for_Dummies from "../../assets/pdf/fundamentals/Fundamental_Analysis_for_Dummies.pdf";
import Macroeconomics_7th_Edition from "../../assets/pdf/fundamentals/Macroeconomics_7th_Edition.pdf";

import The_Psychology_of_Money from "../../assets/pdf/psychology/The_Psychology_of_Money.pdf";
import Mark_Douglas_Trading_in_the_Zone from "../../assets/pdf/psychology/Mark_Douglas_Trading_in_the_Zone_.pdf";
import inside_a_traders_mind from "../../assets/pdf/psychology/inside_a_traders_mind.pdf";
import Market_Wizards_Interviews_with_top_Traders from "../../assets/pdf/psychology/Market_Wizards_Interviews_with_top_Traders.pdf";
import Mental_fitness_for_traders from "../../assets/pdf/psychology/Mental_fitness_for_traders.pdf";
import The_Complete_TurtleTrader from "../../assets/pdf/psychology/The_Complete_TurtleTrader_.pdf";
import the_essence_of_trading_psychology from "../../assets/pdf/psychology/the_essence_of_trading_psychology.pdf";
import The_Mental_Game_of_Trading from "../../assets/pdf/psychology/The_Mental_Game_of_Trading.pdf";
import Trading_for_a_living_by_Elder_Alexander from "../../assets/pdf/psychology/Trading_for_a_living_by_Elder_Alexander.pdf";
import why_emotions_mess_your_trading from "../../assets/pdf/psychology/why_emotions_mess_your_trading.pdf";

import Fibonacci_Retracement_trading_book from "../../assets/pdf/indicators/Fibonacci_Retracement_trading_book.pdf";
import elliot_wave_trading_book from "../../assets/pdf/indicators/elliot_wave_trading_book.pdf";
import RSI_trading_book from "../../assets/pdf/indicators/RSI_trading_book.pdf";
import Trading_book_no_indicators_ from "../../assets/pdf/indicators/Trading_book_no_indicators.pdf";

import A_Practical_Guide_to_Swing_Trading from "../../assets/pdf/ebooks/A_Practical_Guide_to_Swing_Trading.pdf";
import Constructing_the_best_trading_strategy_A_new_general_framework from "../../assets/pdf/ebooks/Constructing_the_best_trading_strategy_A_new_general_framework.pdf";
import Forex_Trading_for_Beginners_Author_Comparic from "../../assets/pdf/ebooks/Forex_Trading_for_Beginners.pdf";
import Introduction_to_Trading_System_Development from "../../assets/pdf/ebooks/Introduction_to_Trading_System_Development.pdf";
import Swing_Trading_Strategy_for_Steady_Profits from "../../assets/pdf/ebooks/Swing_Trading_Strategy_for_Steady_Profits.pdf";
import The_Wizetraders_Guide_to_Effective_Day_Trading from "../../assets/pdf/ebooks/The_Wizetraders-Guide_to_Effective_Day_Trading.pdf";
import How_to_Trade_On_Binance_For_Beginners from "../../assets/pdf/ebooks/How_to_Trade_On_Binance_For_Beginners.pdf";
import Advanced_and_Profitable_Trading_Strategies from "../../assets/pdf/ebooks/Advanced_and_Profitable_Trading_Strategies.pdf";
import How_to_Swing_Trade from "../../assets/pdf/ebooks/How_to_Swing_Trade.pdf";
import Momentum_Strategies_in_Intraday_Trading_Presentation from "../../assets/pdf/ebooks/Momentum_Strategies_in_Intraday_Trading_Presentation.pdf";
import Swing_Trading_The_Definitive_Guide from "../../assets/pdf/ebooks/Swing_Trading_The_Definitive_Guide.pdf";
import Basics_Of_Stock_Market from "../../assets/pdf/ebooks/Basics_Of_Stock_Market.pdf";
import Introduction_to_Options_The_Basics from "../../assets/pdf/ebooks/Introduction_to_Options-The_Basics.pdf";
import Introduction_To_Stock_Options_TheBasics from "../../assets/pdf/ebooks/Introduction_To_Stock_Options_The_Basics.pdf";
import Options_Trading_Cheat_Sheet from "../../assets/pdf/ebooks/Options_Trading_Cheat-Sheet.pdf";
import Beginners_Guide_to_Forex_Trading from "../../assets/pdf/ebooks/Beginners_Guide_to_Forex_Trading.pdf";
import rules_to_master_swing_Article from "../../assets/pdf/ebooks/rules_to_master_swing_Article.pdf";
import moment from "moment";
import Modal from "../../utils/Modal";

const EducationVideo = {
  dots: false, // Show navigation dots
  infinite: true, // Enable infinite loop
  speed: 500, // Transition speed (in milliseconds)
  slidesToShow: 3, // Number of slides to show at once
  slidesToScroll: 1, // Number of slides to scroll at a time
  responsive: [
    {
      breakpoint: 1200,
      EducationVideo: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      EducationVideo: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 991,
      EducationVideo: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 767,
      EducationVideo: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const EducationBooks = {
  dots: true, // Show navigation dots
  infinite: true, // Enable infinite loop
  speed: 500, // Transition speed (in milliseconds)
  slidesToShow: 4, // Number of slides to show at once
  slidesToScroll: 1, // Number of slides to scroll at a time
  responsive: [
    {
      breakpoint: 1200,
      EducationBooks: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      EducationBooks: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 991,
      EducationBooks: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 767,
      EducationBooks: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Education = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
  }, []);

  const Beginner = [
    { title: "Soulzs Playbook", link: Soulzs },
    { title: "Volume Profile", link: Volume_Profile },
    { title: "Price Action WadeFX", link: Price_Action_WadeFX },
    { title: "Cheatsheet Compilation", link: Cheatsheet_compilation },
  ];

  const CandleStick = [
    { title: "Japanese_Candlesticks", link: Japanese_Candlesticks },
    { title: " Major_Candlestick", link: Major_Candlestick },
    { title: "Candlestick Trading Bible", link: Candlestick_Trading_Bible },
    { title: "The Art of Candlesticks", link: The_Art_of_Candlesticks },
    { title: "High_Profit_Candlestick", link: High_Profit_Candlestick },
    {
      title: "Trading With Ichimoku Cloudsessential guide",
      link: Trading_With_Ichimoku,
    },
  ];

  const PriceAction = [
    {
      title: "Price Action Trading in Crypto Markets",
      link: Price_Action_Trading,
    },
    { title: " Price Action Cheat Sheet", link: Price_Action_Cheat_Sheet },
    { title: "Price Action Concepts", link: Price_Action_Concepts },
    { title: "Highs and Lows", link: Highs_and_Lows },
    { title: "Order Block Playbook", link: Order_Block_Playbook },
    { title: "ZM Capital Academy eBook", link: ZM_Capital_Academy_eBook },
    { title: "A PracticalGuide To Swing Trading", link: A_Practical_Guide },
    { title: "Swing Failure Pattern", link: Swing_Failure_Pattern },
    { title: "Short_Trading_book_", link: Short_Trading_book_ },
    { title: "Choosing_Direction", link: Choosing_Direction },

    { title: "Trading_book_no_indicators", link: Trading_book_no_indicators },
    { title: "TRADING_HUB_2.O_eBook", link: TRADING_HUB },
    {
      title: "Tradable_Order_Blocks_by_Kenne_Dyne",
      link: Tradable_Order_Blocks,
    },
    { title: "Inducement_Cycle", link: Inducement_Cycle },
    {
      title: "Wyckoff-Method-Wyckoff-Analytics-English-V2",
      link: Wyckoff_Method,
    },
  ];

  const Fundamentals = [
    {
      title: "Fundamental_Analysis_for_Dummies",
      link: Fundamental_Analysis_for_Dummies,
    },
    { title: "Macroeconomics_7th_Edition", link: Macroeconomics_7th_Edition },
  ];

  const Phychology = [
    { title: "The Psychology of Money", link: The_Psychology_of_Money },
    {
      title: "Mark Douglas Trading in the Zone",
      link: Mark_Douglas_Trading_in_the_Zone,
    },
    { title: "inside a traders mind", link: inside_a_traders_mind },
    {
      title: "Market Wizards Interviews with top Traders",
      link: Market_Wizards_Interviews_with_top_Traders,
    },
    { title: "Mental fitness for traders", link: Mental_fitness_for_traders },
    { title: "The Complete TurtleTrader", link: The_Complete_TurtleTrader },
    {
      title: "The essence of trading psychology",
      link: the_essence_of_trading_psychology,
    },
    { title: "The Mental Game of Trading", link: The_Mental_Game_of_Trading },
    {
      title: "Trading for a living by Elder Alexander",
      link: Trading_for_a_living_by_Elder_Alexander,
    },
    {
      title: "Why emotions mess your trading",
      link: why_emotions_mess_your_trading,
    },
  ];

  const Indicators = [
    {
      title: "Fibonacci Retracement trading book",
      link: Fibonacci_Retracement_trading_book,
    },
    { title: "Elliot wave trading book", link: elliot_wave_trading_book },
    { title: "RSI trading book", link: RSI_trading_book },
    { title: "Trading book no indicators", link: Trading_book_no_indicators_ },
  ];

  const Ebooks = [
    {
      title: "A Practical Guide to Swing Trading",
      link: A_Practical_Guide_to_Swing_Trading,
    },
    {
      title: "Constructing the best trading strategy A new general framework",
      link: Constructing_the_best_trading_strategy_A_new_general_framework,
    },
    {
      title: "Forex Trading for Beginners Author Comparic",
      link: Forex_Trading_for_Beginners_Author_Comparic,
    },
    {
      title: "Introduction to Trading System Development ",
      link: Introduction_to_Trading_System_Development,
    },
    {
      title: "Swing Trading Strategy for Steady Profits",
      link: Swing_Trading_Strategy_for_Steady_Profits,
    },
    {
      title: "The Wizetraders Guide to Effective Day Trading ",
      link: The_Wizetraders_Guide_to_Effective_Day_Trading,
    },
    {
      title: "How to Trade On Binance For Beginners  ",
      link: How_to_Trade_On_Binance_For_Beginners,
    },
    {
      title: "9 Advanced and Profitable Trading Strategies ",
      link: Advanced_and_Profitable_Trading_Strategies,
    },
    { title: "How to Swing Trade ", link: How_to_Swing_Trade },
    {
      title: "Momentum Strategies in Intraday Trading Presentation",
      link: Momentum_Strategies_in_Intraday_Trading_Presentation,
    },
    {
      title: "Swing Trading The Definitive Guide",
      link: Swing_Trading_The_Definitive_Guide,
    },
    { title: "Basics Of Stock Market ", link: Basics_Of_Stock_Market },
    {
      title: "Introduction to Options-The Basics",
      link: Introduction_to_Options_The_Basics,
    },
    {
      title: "Introduction To Stock Options The Basics ",
      link: Introduction_To_Stock_Options_TheBasics,
    },
    { title: "Options Trading Cheat-Sheet", link: Options_Trading_Cheat_Sheet },
    {
      title: "Beginners Guide to Forex Trading ",
      link: Beginners_Guide_to_Forex_Trading,
    },
    {
      title: "30-rules to master swing article ",
      link: rules_to_master_swing_Article,
    },
  ];
  const podcastData = [
    {
      src: "https://player.rss.com/traders-talk-time/1240279",
      title: "Trader's Talk Time",
      link: "https://rss.com/podcasts/traders-talk-...",
    },
    {
      src: "https://player.rss.com/traders-talk-time/1231619",
      title: "Trader's Talk Time",
      link: "https://rss.com/podcasts/traders-talk-...",
    },
    {
      src: "https://player.rss.com/traders-talk-time/1218589",
      title: "Trader's Talk Time",
      link: "https://rss.com/podcasts/traders-talk-...",
    },
    {
      src: "https://player.rss.com/traders-talk-time/1213636",
      title: "Trader's Talk Time",
      link: "https://rss.com/podcasts/traders-talk-...",
    },
    {
      src: "https://player.rss.com/traders-talk-time/1201783",
      title: "Trader's Talk Time",
      link: "https://rss.com/podcasts/traders-talk-...",
    },
    {
      src: "https://player.rss.com/traders-talk-time/1194089",
      title: "Trader's Talk Time",
      link: "https://rss.com/podcasts/traders-talk-...",
    },
  ];







  return (
  <>
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid Education_section_hp">
          {/* Sidebar Section */}
          <Side />
          {/* Sidebar Section */}

          <div className="mb-4 content content_section_hp">
            <ul className="nav nav-pills mb-5" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link btn_main_hp active"
                  id="pills-Video-tab"
                  data-toggle="pill"
                  data-target="#pills-Video"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Video
                </button>
              </li>
              <li className="nav-item ml-3" role="presentation">
                <button
                  className="nav-link btn_main_hp"
                  id="pills-Books-tab"
                  data-toggle="pill"
                  data-target="#pills-Books"
                  type="button"
                  role="tab"
                  aria-controls="pills-Books"
                  aria-selected="false"
                >
                  Books
                </button>
              </li>
              <li className="nav-item ml-3" role="presentation">
                <button
                  className="nav-link btn_main_hp"
                  id="pills-Broadcast-tab"
                  data-toggle="pill"
                  data-target="#pills-Broadcast"
                  type="button"
                  role="tab"
                  aria-controls="pills-Broadcast"
                  aria-selected="false"
                >
                  Broadcast
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-Video"
                role="tabpanel"
                aria-labelledby="pills-Video-tab"
              >
                <div className="row mb-4">
                  <div className="col-12">
                    <h5
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginBottom: "15px",
                      }}
                    >
                      {"Topic-1: CandleStick Patterns"}
                    </h5>
                  </div>
                  <div className="col-11 m-auto">
                    <Slider {...EducationVideo}>
                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/RgADITVyUb4?si=lTmiJ9Sc9YWAdT5v"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                            
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">1/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              How To Read CandleStick Beginners Series
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/RSr5og9Fv5o?si=CXjbwalEKsHpOvCK"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                  
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">2/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Bullish and Bearish</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/FOBOqJcKU_Q?si=L-nH4sNV9wYNmCvy"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                         
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">3/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              Candlestick Patterns Explaned: Hammer Vs Hanging
                              Man - Part1
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/00liIpSv9rM?si=HAMGPM7R0XHNhPt0"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
    
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">4/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              Candlestick Patterns Explaned: Hammer Vs Hanging
                              Man - Part2
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/MH0E1JUlX4U?si=AEn1UWAxUmVfGT_V"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                          
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">5/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              Shooting Star Vs Inverted Hammer : Part-1
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Z9k1E6ksOkk?si=2PfV0wUGMmFJrfT-"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                   
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">6/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              Shooting Star Vs Inverted Hammer : Part-2
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/6JRMyhuFVQE?si=Z_GO1NYoMltfBs8X"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                           
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">7/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              Bullish & Bearish Engulfing Patterns
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/y5KgmCRmy5k?si=NPrvN5udp5QX452g"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                     
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">8/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Double Bottom Pattern</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/NhV-6bb2rHo?si=4il_n_IPf35eb8jg"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                   
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">9/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Double Top Pattern</p>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <h5
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginBottom: "15px",
                      }}
                    >
                      {"Live Recordings"}
                    </h5>
                  </div>
                  <div className="col-11 m-auto">
                    <Slider {...EducationVideo}>
                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/jl-I9_Cg7SQ?si=vP9rBa8OZxER2EnY"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                    
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">1/5</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">TradersHub Ninja Features</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/C2Mtp0ks8Uo?si=-FOvi5zSZ_vzjzpI"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                        
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">2/5</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Getting to Know Us Better!</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/D2uvXbnWW2E?si=r1uH4jjl6v3Aw78n"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                            
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">3/5</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              Trading Made Easy: Utilizing Our Indicators
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/yvaBYvlRZ7s?si=lSai0iOsprDea6Ia"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                          
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">4/5</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Penny Stock Alert's Live</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/iLUb9oTDVPA?si=uy6Tznz1iqpsQBq6"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                           
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">5/5</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Buddy Bot Launch Event</p>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <h5
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginBottom: "15px",
                      }}
                    >
                      {"Why TradersHub Ninja"}
                    </h5>
                  </div>
                  <div className="col-11 m-auto">
                    <Slider {...EducationVideo}>
                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/jl-I9_Cg7SQ?si=SwQdC8dLsTsCIkOZ"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                           
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">1/7</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Tradershub Web Features</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/N5zYP0gKNVA?si=Uudtsfp389sFBNSJ"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                    
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">2/7</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Tradershub Discord Features</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Ekyvt-szaCk?si=m3yplaTx1Ri3TILs"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                           
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">3/7</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              Explore Our Powerful Features!
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/L23fYEohhRQ?si=DyNn_DovPY4hvafm"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">4/7</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Education_card_timeView</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/2KRFOAdUyzo?si=qe7skjZ5ecXlFxgK"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
        
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">5/7</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Education_card_timeView</p>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <h5
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginBottom: "15px",
                      }}
                    >
                      {"Short's"}
                    </h5>
                  </div>
                  <div className="col-11 m-auto">
                    <Slider {...EducationVideo}>
                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/gROgNzR31Ng?si=JcZVvvh9RSk7aPR6"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                    
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">1/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">TradersHub Ninja Features</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/yybfFTbhCXA?si=4tpmEM4dhgdhH9zL"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
               
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">2/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Getting to Know Us Better!</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/2KRFOAdUyzo?si=JpCf2X8jNnBeQVGZ"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                     
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">3/5</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">
                              Trading Made Easy: Utilizing Our Indicators
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Y9qzXI9cCdU?si=yR1GjBtFXVMq0H51"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                          
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">4/11</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Education_card_timeView</p>
                          </div>
                        </div>
                      </div>

                      <div className="card Education_card_item">
                        <div className="Education_card_img">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/sKa13kDMsiQ?si=Q3NnEITG9P76QhHY"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          />
                        </div>
                        <div className="Education_card_content">
                          <div className="Education_card_title_area mb-2">
                           
                            <p className="card-title">
                              {" "}
                              TradersHub Ninja {"  "}
                            </p>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </div>
                          <div className="Education_card_timeView">
                            <p className="mb-0">5/5</p>
                            <i className="fa-solid fa-circle mx-2"></i>
                            <p className="mb-0">Education_card_timeView</p>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>

       
              </div>

              <div
                className="tab-pane fade"
                id="pills-Books"
                role="tabpanel"
                aria-labelledby="pills-Books-tab"
              >
                <div>
                  <div className="row mb-4">
                    <div className="col-12">
                      <h5
                        style={{
                          fontWeight: "bold",
                          fontSize: "24px",
                          marginBottom: "15px",
                        }}
                      >
                        {"Beginner"}
                      </h5>
                    </div>

                    <div className="col-11 m-auto">
                      <Slider {...EducationBooks}>
                        {Beginner?.map((item, index) => (
                          <div
                            key={index}
                            className="card Education_card_item Education_card_PDF_item "
                          >
                            <a
                              href={item.link}
                              target="_BLANK"
                              className="Education_card_img"
                            >
                              <img src={logo} alt="PDF" />
                            </a>
                            <div className="Education_card_content">
                              <div className="Education_card_title_area text-center w-100">
                                <p className="card-title">{item.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <h5
                        style={{
                          fontWeight: "bold",
                          fontSize: "24px",
                          marginBottom: "15px",
                        }}
                      >
                        {"Candlesticks"}
                      </h5>
                    </div>

                    <div className="col-11 m-auto">
                      <Slider {...EducationBooks}>
                        {CandleStick?.map((item, index) => (
                          <div
                            key={index}
                            className="card Education_card_item Education_card_PDF_item "
                          >
                            <a
                              href={item.link}
                              target="_BLANK"
                              className="Education_card_img"
                            >
                              <img src={logo} alt="PDF" />
                            </a>
                            <div className="Education_card_content">
                              <div className="Education_card_title_area text-center w-100">
                                <p className="card-title">{item.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <h5
                        style={{
                          fontWeight: "bold",
                          fontSize: "24px",
                          marginBottom: "15px",
                        }}
                      >
                        {"Patters price action"}
                      </h5>
                    </div>

                    <div className="col-11 m-auto">
                      <Slider {...EducationBooks}>
                        {PriceAction?.map((item, index) => (
                          <div
                            key={index}
                            className="card Education_card_item Education_card_PDF_item "
                          >
                            <a
                              href={item.link}
                              target="_BLANK"
                              className="Education_card_img"
                            >
                              <img src={logo} alt="PDF" />
                            </a>
                            <div className="Education_card_content">
                              <div className="Education_card_title_area text-center w-100">
                                <p className="card-title">{item.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-12">
                      <h5
                        style={{
                          fontWeight: "bold",
                          fontSize: "24px",
                          marginBottom: "15px",
                        }}
                      >
                        {"Fundamentals macro economics"}
                      </h5>
                    </div>
                    <div className="col-11 m-auto">
                      <div className="row">
                        {Fundamentals?.map((item, index) => (
                          <div className="col-lg-3 col-md-4">
                            <div
                              key={index}
                              className="card Education_card_item Education_card_PDF_item "
                            >
                              <a
                                href={item.link}
                                target="_BLANK"
                                className="Education_card_img"
                              >
                                <img src={logo} alt="PDF" />
                              </a>
                              <div className="Education_card_content">
                                <div className="Education_card_title_area text-center w-100">
                                  <p className="card-title">{item.title}</p>
                                </div>
                              </div>
                            </div>
                            {/* </Slider> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <h5
                        style={{
                          fontWeight: "bold",
                          fontSize: "24px",
                          marginBottom: "15px",
                        }}
                      >
                        {"Phychology"}
                      </h5>
                    </div>

                    <div className="col-11 m-auto">
                      <Slider {...EducationBooks}>
                        {Phychology?.map((item, index) => (
                          <div
                            key={index}
                            className="card Education_card_item Education_card_PDF_item "
                          >
                            <a
                              href={item.link}
                              target="_BLANK"
                              className="Education_card_img"
                            >
                              <img src={logo} alt="PDF" />
                            </a>
                            <div className="Education_card_content">
                              <div className="Education_card_title_area text-center w-100">
                                <p className="card-title">{item.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <h5
                        style={{
                          fontWeight: "bold",
                          fontSize: "24px",
                          marginBottom: "15px",
                        }}
                      >
                        {"Indicators"}
                      </h5>
                    </div>

                    <div className="col-11 m-auto">
                      <Slider {...EducationBooks}>
                        {Indicators?.map((item, index) => (
                          <div
                            key={index}
                            className="card Education_card_item Education_card_PDF_item "
                          >
                            <a
                              href={item.link}
                              target="_BLANK"
                              className="Education_card_img"
                            >
                              <img src={logo} alt="PDF" />
                            </a>
                            <div className="Education_card_content">
                              <div className="Education_card_title_area text-center w-100">
                                <p className="card-title">{item.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <h5
                        style={{
                          fontWeight: "bold",
                          fontSize: "24px",
                          marginBottom: "15px",
                        }}
                      >
                        {"Ebooks"}
                      </h5>
                    </div>

                    <div className="col-11 m-auto">
                      <Slider {...EducationBooks}>
                        {Ebooks?.map((item, index) => (
                          <div
                            key={index}
                            className="card Education_card_item Education_card_PDF_item "
                          >
                            <a
                              href={item.link}
                              target="_BLANK"
                              className="Education_card_img"
                            >
                              <img src={logo} alt="PDF" />
                            </a>
                            <div className="Education_card_content">
                              <div className="Education_card_title_area text-center w-100">
                                <p className="card-title">{item.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="pills-Broadcast"
                role="tab"
                aria-labelledby="pills-Broadcast-tab"
              >
                <div className="row">
                  {podcastData?.map((podcast, index) => (
                    <div className="col-md-4 col-lg-3 mb-3">
                      <iframe
                        key={index}
                        src={podcast.src}
                        style={{ width: "100%", height: "100%" }}
                        title={podcast.title}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      >
                        <a href={podcast.link} target="_blank">
                          {podcast.title}
                        </a>
                      </iframe>
                    </div>
                  ))}
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

export default Education;
