import React from 'react';
import login from "../../src/assets/img/login.png";
import thl3 from "../../assets/img/logo/thl3.png";
import profile from "../../assets/img/about/profile.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsBell, BsGear, BsClock } from "react-icons/bs";
import { BiUser, BiImport, BiEnvelope } from "react-icons/bi";
import { LuLogOut, LuWallet } from "react-icons/lu";
import { TfiDashboard, TfiNewWindow} from "react-icons/tfi";
import { PiChartLineUpBold, PiChartPieSliceThin } from "react-icons/pi";
import { useState , useEffect } from 'react'


const Sidebar = () => {
 
  const [email, setEmail] = useState('');
  useEffect(() => {
    const googledata = localStorage.getItem('email');
    if (googledata) {
      setEmail(googledata.email);
    }
  }, []);
  return (
    <>
      <div>
     
        <div className="overlay"></div>
        <header className="header-one header-dashboard-top">
          {/* <!-- Start top bar --> */}
          <div className="topbar-area">
            <div className="container">
              <div className="row">
                <div className=" col-md-8 col-sm-8 col-xs-12">
                  <div className="topbar-left">
                    <ul>
                      <li>
                        <a id="emailLink" href="#">
                          <i className="fa fa-envelope"><BiEnvelope /></i> {email}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-clock-o"><BsClock /></i> Live support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12">
                  <div className="topbar-right">
                    <select className="select d-inline-block">
                      <option>Eng</option>
                      <option>Esp</option>
                      <option>Fra</option>
                      <option>Deu</option>
                    </select>
                    <ul>
                      <li>
                        <a href="#">
                          <img src={login} alt="" />
                          Trade Exit
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End top bar --> */}
          {/* <!-- Start Header Menu --> */}
          <div id="sticker" className="header-menu-area header-area">
            <div className="container" style={{ maxWidth: "100%" }}>
              <div className="row">
                <div className="col-xl-2 col-lg-2 col-md-3 d-flex align-items-center">
                  <div className="logo">
                    <a href="index.html">
                      <img src={thl3} alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-9">
                  <div className="header_menu f-right">
                    <nav id="mobile-menu">
                      <ul className="main-menu">
                        <li>
                          <a href="index.html">Home</a>
                        </li>

                        <li className="menu-item-has-children">
                          <a href="#">TH HUB</a>
                          <ul className="submenu">
                            <li>
                              <a href="stock-scanner.html">Stock Scanner</a>
                            </li>
                            <li>
                              <a href="options.html">Options</a>
                            </li>
                            <li>
                              <a href="crypto.html">Cryptocurrency </a>
                            </li>
                            <li>
                              <a href="forex.html">Forex</a>
                            </li>
                            <li>
                              <a href="futures.html">Futures</a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <a href="#">Calendar</a>
                          <ul className="submenu">
                            <li>
                              <a href="about.html">Earnings</a>
                            </li>
                            <li>
                              <a href="review.html">IPO's</a>
                            </li>
                            <li>
                              <a href="faq.html">Stock Splits </a>
                            </li>
                            <li>
                              <a href="team.html">Economic</a>
                            </li>
                            <li>
                              <a href="terms.html">Dividends</a>
                            </li>
                            <li>
                              <a href="login.html">Holiday's</a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <a href="#">News</a>
                          <ul className="submenu">
                            <li>
                              <a href="blog.html">Stocks</a>
                            </li>
                            <li>
                              <a href="blog-details.html">General</a>
                            </li>
                            <li>
                              <a href="blog-details.html">Cryptocurrency</a>
                            </li>
                            <li>
                              <a href="blog-details.html">FMP Articles</a>
                            </li>
                            <li>
                              <a href="blog-details.html">Forex News</a>
                            </li>
                            <li>
                              <a href="blog-details.html">Press Releases</a>
                            </li>
                          </ul>
                        </li>
                        <li className="contact">
                          <a href="contact.html">Journal</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mobile-menu"></div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Header Menu --> */}
        </header>
        {/* <!-- End header area --> */}
        {/* <!-- End Breadcrumb Area --> */}
        <div className="notify-overlay"></div>
        <div className="dashboard-area bg-color area-padding">
          <div className="container" style={{ maxWidth: "100%" }}>
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-4">
                <aside className="sidebar">
                  <div className="dashboard-side">
                    <div className="dashboard-head">
                      <div className="dashboard-profile">
                        <img src={profile} alt="" />
                        <div className="profile-content">
                          <span className="pro-name">jhon Deo</span>
                          <span className="pro-number">jonedoe@gmail.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard-menu">
                      <ul>
                        <li>
                          <a href="dashboard.html">
                            <i className="ti-dashboard"><TfiDashboard /> </i>
                            Watchlist
                          </a>
                        </li>
                        <li>
                          <a href="todays-market.html">
                            <i className="ti-wallet"><LuWallet /></i>
                            Today's Market
                          </a>
                        </li>
                        <li className="active">
                          <a href="bots.html">
                            <i className="ti-import"><BiImport /> </i>
                            Bot's
                          </a>
                        </li>
                        <li>
                          <a href="indicators.html">
                            <i className="ti-new-window"><TfiNewWindow /> </i>
                            Indicator's
                          </a>
                        </li>
                        
                        <li>
                          <a href="paper-trading.html">
                            <i className="ti-pie-chart"><BsBell /></i>
                            Paper Trading
                          </a>
                        </li>
                        <li>
                          <a href="education.html">
                            <i className="ti-pencil-alt"><PiChartPieSliceThin />  </i>
                            Education
                          </a>
                        </li>
                        <li>
                          <a href="settings.html">
                            <i className="ti-settings"><BsGear /> </i>
                            Settings
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ti-shift-right"><LuLogOut /></i>
                            Help/Support
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-8">
                <div className="dashboard-top">
                  <div className="userboard">
                    <div className="dashboard-header-right d-flex flex-wrap align-items-center">
                      <div className="single-left-icon">
                        <div className="search-inner">
                          <form action="#">
                            <div className="search-option">
                              <input type="text" placeholder="Search..." />
                              <button className="button" type="submit">
                                <i className="fa fa-search"> <BsSearch /> </i>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="single-right-icon">
                        <ul className="dashboard-right-menus">
                          <li>
                            <a href="#0">
                              <i className="ti-bell"> <BsBell /> </i>
                              <span className="number-1">4</span>
                            </a>
                            <div className="notification-area">
                              <div className="notifacation-header d-flex flex-wrap justify-content-between">
                                <span>4 New Notifications</span>
                                <a href="#0">Clear</a>
                              </div>
                              <ul className="notification-body">
                                <li>
                                  <a href="#0">
                                    <div className="noti-line">
                                      deposite money from Don
                                    </div>
                                    <span className="info-n">2 Sec ago</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#0">
                                    <div className="noti-line">
                                      deposite money from Don
                                    </div>
                                    <span className="info-n">2 Sec ago</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#0">
                                    <div className="noti-line">
                                      deposite money from Don
                                    </div>
                                    <span className="info-n">2 Sec ago</span>
                                  </a>
                                </li>
                              </ul>
                              <div className="notifacation-footer text-center">
                                <a href="#0" className="view-all">
                                  View All
                                </a>
                              </div>
                            </div>
                          </li>
                          <li>
                            <a href="#0" className="author">
                              <i className="ti-user"> <BiUser /></i>
                            </a>
                            <div className="notification-area">
                              <div className="author-body">
                                <ul>
                                  <li>
                                    <a href="#0"><i className="ti-user"> <BiUser /></i>Profile
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#0">
                                      <BsGear />
                                      <i className="ti-settings"><BsGear /> </i>
                                      Settings
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#0">
                                      <LuLogOut />
                                      <i className="ti-shift-right"><LuLogOut /> </i>
                                      Log Out
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
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
  )
}

export default Sidebar
