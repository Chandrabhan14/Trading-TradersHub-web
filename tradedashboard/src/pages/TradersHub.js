import React, { useEffect } from "react";
import NavTop from "../components/nav/NavTop";
import AboutFooter from "../components/footer/AboutFooter";
import { Link, useLocation } from "react-router-dom";
import t1 from "../assets/img/traderhub/watchlist.png";
import t2 from "../assets/img/traderhub/Today’sMarket.png";
import t3 from "../assets/img/traderhub/Bot’s.png";
import t4 from "../assets/img/traderhub/papertrading.png";
import t41 from "../assets/img/traderhub/indicators.png";
import t5 from "../assets/img/traderhub/Subscriptions.png";
import t6 from "../assets/img/traderhub/Chart’s.png";
import t7 from "../assets/img/traderhub/scanner.png";
import t8 from "../assets/img/traderhub/edu.png";
import t81 from "../assets/img/traderhub/options.png";
import t9 from "../assets/img/traderhub/calendar.png";
import t10 from "../assets/img/traderhub/news.png";
import t110 from "../assets/img/traderhub/journal.png";
import t11 from "../assets/img/traderhub/search.png";
import t111 from "../assets/img/traderhub/dash.png";

import t12 from "../assets/img/traderhub/indicator1.png";
import t13 from "../assets/img/traderhub/indicator2.png";
import t14 from "../assets/img/traderhub/indicator3.png";
import t15 from "../assets/img/traderhub/indicator4.png";
import t16 from "../assets/img/traderhub/indicator5.png";
import t17 from "../assets/img/traderhub/indicator6.png";

import t18 from "../assets/img/traderhub/Daily_Levels.png";
import t19 from "../assets/img/traderhub/Discord.png";
import t20 from "../assets/img/traderhub/Pre-Market.png";
import t21 from "../assets/img/traderhub/Today’s_WatchList.png";
import t22 from "../assets/img/traderhub/Options_WatchLis.png";
import t23 from "../assets/img/traderhub/Discord_1.png";
import t24 from "../assets/img/traderhub/Stock_Alerts.png";
import t25 from "../assets/img/traderhub/Stock_Alerts_1.png";
import t26 from "../assets/img/traderhub/TCrypto_Alerts.png";
import t27 from "../assets/img/traderhub/Analysts_Alerts.png";
import t28 from "../assets/img/traderhub/Insightful.png";
import t29 from "../assets/img/traderhub/traders.png";
import t30 from "../assets/img/traderhub/Buddy.png";
import t31 from "../assets/img/traderhub/Education.png";
import { Helmet } from "react-helmet-async";

const TradersHub = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Helmet>
        <title>
          {" "}
          Empower Your Investments with Top Online Trading Tools | Leading
          Trading Platform in USA
        </title>
        <meta
          name="description"
          content="Unlock the potential of your investments with our cutting-edge online trading tools.
 Explore a feature-rich trading platform in the USA designed for success. Elevate your trading experience today."
        />
      </Helmet>
      <main>
        <div>
          <NavTop />
        </div>

        <section className="container-fluid other_page_hero_Section_hp">
          <div className="container">
            <div className="breadcrumb-title text-center" data-aos="fade-up">
              <h2 className="font-weight-bold">
                TradersHub: Your gateway to decentralized trading and financial
                empowerment in the trading world.
              </h2>
              <div className="bread-come">
                <nav aria-label="breadcrumb ">
                  <ol className="list-unstyled d-flex flex-wrap p-0 mb-0 justify-content-center">
                    <li className="breadcrumb-items">
                      <Link to="/" className="text-light text-decoration-none">
                        Home
                      </Link>
                      <i className="ti-angle-right" aria-hidden="true"></i>
                    </li>

                    <li className="breadcrumb-items mr-2">
                      <i className="fa-solid fa-angle-right text-white"></i>
                    </li>

                    <li className="breadcrumb-items">
                      <a className="font-weight-bold text-white text-decoration-none">
                        {" "}
                        Tradershub{" "}
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
      

        <section className="container-fluid Features_section mb-5">
          <div className="container">
            <ul
              className="nav nav-pills mb-3 Features_Tabs_Links_area row justify-content-center"
              id="pills-tab"
              role="tablist"
              data-aos="zoom-in"
            >
              <li
                className="nav-item col-xl-3 col-lg-3 col-md-4 px-0"
                role="presentation"
              >
                <button
                  className="nav-link w-100 active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  data-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Website
                </button>
              </li>
              <li
                className="nav-item col-xl-3 col-lg-3 col-md-4 px-0"
                role="presentation"
              >
                <button
                  className="nav-link w-100"
                  id="pills-profile-tab "
                  data-toggle="pill"
                  data-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Indicators
                </button>
              </li>
              <li
                className="nav-item col-xl-3 col-lg-3 col-md-4 px-0"
                role="presentation"
              >
                <button
                  className="nav-link w-100"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  data-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Discord
                </button>
              </li>
            </ul>

            <div className="tab-content " id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img
                        src="/Tabs_images/Website_MarketRecap.png"
                        width="100%"
                      />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Market Recap: Daily / Weekly Summary</h3>
                      <p>
                        5PM CST will Post Daily Market recap + Sunday 6Pm CST :
                        Weekly Recap + Weekly Summary of our Team
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>WatchList</h3>
                      <p>
                        10:30PM CST will update Watchlist for Next day runners +
                        Bot Alert’s
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t1} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t2} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Today’s Market</h3>
                      <p>
                        Live Market : Top Gainers, Losers, Actives, Sector
                        Performance + Social Sentiment : How Social Network
                        going over tickers.
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>My Favourite</h3>
                      <p>
                        Pick your favourite tickers and get live News updates!
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t3} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t4} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Paper Trading</h3>
                      <p>
                        Trader Tickers with fake Money to learn how it’s acting
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Indicators</h3>
                      <p>Get Access to all our Indicators</p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t41} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t5} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      
                      <p>
                        We can follow other traders to know what’s going around
                        and we can do our own post’s
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Chart’s</h3>
                      <p>Live Chart’s</p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t6} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t8} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Education</h3>
                      <p>EBook’s / Video’s</p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Stock Scanner</h3>
                      <p>
                        You can filter to scanner : Make cap, beta, Volume,
                        Sector, Exchange, Dividend and Country
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t7} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t81} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Options World</h3>
                      <p>
                        Live Options World : Get access to all our Options
                        Options Flow
                        Daily Levels
                        NinjaTradez Alert’s
                        Notifications
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Calendar</h3>
                      <p>
                        Shows Calendar of current Week : Earnings, IPO’s, Stock
                        Splits, Economic, Dividends and Holiday’s
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t9} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t10} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>NEWS</h3>
                      <p>
                        Live Market News: Stocks, General, CryptoCurrency, Forex
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Dashboard</h3>
                      <p>
                        Dashboard of all trades : Earnings, News, Options, News
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t111} alt="" />
                    </div >
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Journal</h3>
                      <p>
                        Journal to Sync Daily Trades, Gains, Lose and more
                        analytics
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t110} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t11} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Stock Search</h3>
                      <p>
                        Get More Details of Stock with Searching them: Inside
                        Trades, Stock News, Financial Reports, Balance, Volume
                        Avg. , Market Cap and current changes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 */}

              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t12} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>How to Add Indicators:</h3>
                      <p>
                        Please Share your TradingView ID to
                        marketing@tradershub.ninja
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>How to Add them To Charts?</h3>
                      <p>
                        Once you got confirmation from our US! Open Some Ticker
                        : SPY
                      </p>
                      <p>
                        Click On Those Indicators Then you can see them on your
                        charts
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t13} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t14} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Tradershub Options</h3>
                      <p>
                        BUY:CALLs / BUY:PUTs - DayTraders use 5Mins TimeFrame,
                        Swing: 15Mins/30Mins
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Tradershub Support Resistance</h3>
                      <p>
                        Shows multiple Support And Resistance Lines to watch and
                        make you easy
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t15} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t16} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Tradershub v1</h3>
                      <p>For Stock When to BUY / SELL</p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Tradershub v1</h3>
                      <p>
                        No need TradingView Subscription to use 2 indicators
                        once. Our Recommendations : Option Traders/dayTraders =
                        Tradershub Options + Tradershub Support Resistance with
                        5mins
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t17} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t18} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Daily Levels</h3>
                      <p>
                        Daily 7PM CST : $SPY $QQQ $TSLA $AMD $NVDA $META $MSFT
                        $AAPL - 5Mins and 30Mins Will help for Next Day Options
                        Trading
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Discord</h3>
                      <p>
                        Daily Watchlist : 11PM CST : For Next Day Pre-market
                        Runners where they are crazy Volatile can run 1000% +
                        but should be very careful on this and this highly
                        helpful for Pre-Market Traders
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t19} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t20} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Pre-Market Runners</h3>
                      <p>List Update: 4:30AM CST and 7:30AM CST Everyday</p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Today’s WatchList</h3>
                      <p>
                        8:35AM CST : When Market starts will send Updated
                        Watchlist to watch for Day and Same they have lot of
                        volatile and run crazy. Check Someone our Alert’s
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t21} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t22} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Options WatchList</h3>
                      <p>
                        8:45AM CST : When Market starts will see analysis on
                        This Stocks: $SPY $QQQ $TSAL $AMD $NVDA $NFLX $META
                        $MSFT And we give Alert on 1 or 3 to watch
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Discord</h3>
                      <p>
                        So our traders Will watch for Break and we will Update
                        our commentary in Chat-room
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t23} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t24} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Stock-Alerts</h3>
                      <p>Options: BUY:PUTS / BUY:CALLS</p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Stock-Alerts:</h3>
                      <p>Options: BUY:PUTS / BUY:CALLS</p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t25} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t26} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Crypto-Alerts</h3>
                      <p>
                        BUY/SELL , When Support Or Resistance Broke : $BTC,
                        $ETH, $DOGE, $SHIB, Support&Resistance for Current Price
                        Every 45Mins and 120Mins
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Analysts-Alerts: JCOOP, LIVI</h3>
                      <p>Swing/Options WatchList for Next Day over Video</p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t27} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t28} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Analysts-Alerts: Insightful-investor</h3>
                      <p>
                        Long Term Investor + Financial Guru - Give us complete
                        analysis on Long term stocks + Do 1-1 Couching to help
                        their financial growth
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Analysts-Alerts: traders hub</h3>
                      <p>
                        Day Trader/Options WatchList - 11PM CST: Next Day
                        Watchlist on Penny Stocks, 8:45AM CST : 1 or 3 Option
                        Alert’s for dayTrading, Gap Up&Downs
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t29} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3 features_website_reverse"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t30} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text">
                      <h3>Buddy</h3>
                      <p>
                        He will be your friend to check anything with commands:
                        TradersHub (th) + Stocks (s) = /ths Ticker = /ths TSLA
                        || for floating (f) = /thf TSLA for help : /th help ||
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
                <div
                  className="row features-website align-items-center py-3"
                  data-aos="zoom-in"
                >
                  <div className="col-xl-7 col-lg-7 col-md-7 col-12">
                    <div className="Features_Tabs_detail_text ">
                      <h3>Education</h3>
                      <p>1000+ Book’s + YouTube Education + Live Voice</p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                    <div className="Features_Tabs_detail_img">
                      <img className="w-100" src={t31} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutFooter />
      </main>
    </>
  );
};

export default TradersHub;
