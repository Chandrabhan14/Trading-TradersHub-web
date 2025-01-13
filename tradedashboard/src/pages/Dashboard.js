
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsBell, BsGear, BsBarChartLine, } from "react-icons/bs";
import { BiUser, BiMoneyWithdraw,  } from "react-icons/bi";
import { LuLogOut, } from "react-icons/lu";
import { TfiWallet } from "react-icons/tfi";
import { MdOutlineSavings } from "react-icons/md";
import { GoCrossReference } from "react-icons/go";
import { TbMoneybag } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import NavBottom from "../components/nav/NavBottom/NavBottom";
import NavTop from "../components/nav/NavTop";
import Side from "../components/sidebar/side";
import Footer from "../components/footer/Footer";


const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleWatchClick = () => {
    navigate('/watchlist');
  };

  const handleTodayMarketClick = () => {
    navigate('/todays-market');
  };

  const handleBotClick = () => {
    navigate('/bot');
  };
  
  return (
    <div>
     
      <div className="overlay"></div>
      <header className="header-one header-dashboard-top">
     <NavTop/>
      
     <NavBottom/>
      </header>
    
      <main>
       
        <div className="notify-overlay"></div>
        <div className="dashboard-area bg-color area-padding">
        <div className="container" style={{ maxWidth: "100%" }}>
          <div className="row" >
            <div className="col-md-2">
              <div className="">
                <Side />
              </div>
            </div>
            <div
              className="col-lg-10 col-xl-10 col-md-10 botcard "
              style={{ paddingLeft: "5%" }}
            >
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
                            <Link to="" className="link">
                              <i className="ti-bell"> <BsBell /> </i>
                              <span className="number-1">4</span>
                            </Link>
                            <div className="notification-area">
                              <div className="notifacation-header d-flex flex-wrap justify-content-between">
                                <span>4 New Notifications</span>
                                <Link to="" className="link">Clear</Link>
                              </div>
                              <ul className="notification-body">
                                <li>
                                  <Link to="" className="link">
                                    <div className="noti-line">
                                      deposite money from Don
                                    </div>
                                    <span className="info-n">2 Sec ago</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="" className="link"> 
                                    <div className="noti-line">
                                      deposite money from Don
                                    </div>
                                    <span className="info-n">2 Sec ago</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="" className="link">
                                    <div className="noti-line">
                                      deposite money from Don
                                    </div>
                                    <span className="info-n">2 Sec ago</span>
                                  </Link>
                                </li>
                              </ul>
                              <div className="notifacation-footer text-center">
                                <Link to="" className="view-all link">
                                  View All
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li>
                            <Link to="" className="author link">
                              <i className="ti-user"> <BiUser /></i>
                            </Link>
                            <div className="notification-area">
                              <div className="author-body">
                                <ul>
                                  <li>
                                    <Link to="" className="link"><i className="ti-user"> <BiUser /></i>Profile
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="" className="link">
                                      <BsGear />
                                      <i className="ti-settings"><BsGear /> </i>
                                      Settings
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="" className="link">
                                     {/* onClick={logOut} */}
                                      <LuLogOut />
                                      <i className="ti-shift-right"><LuLogOut /> </i>
                                      Log Out
                                    </Link>
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
                <div className="row dashboard-content">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Deposite</span>
                          <span className="pro-money">$500</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-035-savings"><MdOutlineSavings /></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Withdraw</span>
                          <span className="pro-money">$500</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-041-umbrella"><BiMoneyWithdraw /> </i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Invest</span>
                          <span className="pro-money">$500</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-004-bar-chart"><BsBarChartLine /> </i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Wallet</span>
                          <span className="pro-money">$1200</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-042-wallet"><TfiWallet /> </i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Referral</span>
                          <span className="pro-money">$500</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-010-cloud"><GoCrossReference /> </i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <span className="pro-name">Profite</span>
                          <span className="pro-money">$500</span>
                        </div>
                        <div className="invest-tumb">
                          <i className="flaticon-027-money-bag"><TbMoneybag /> </i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="send-money-form transection-log">
                      <div className="form-text">
                        <h4 className="form-top">Last tradershub</h4>
                        <div className="form-inner table-inner">
                          <table>
                            <tr>
                              <th>Date</th>
                              <th>Transaction ID</th>
                              <th>Amount</th>
                              <th>Details</th>
                            </tr>
                            <tr>
                              <td>10/03/2021</td>
                              <td>XE2GB4DF5X</td>
                              <td>$600</td>
                              <td>Payment recieve from Don</td>
                            </tr>
                            <tr>
                              <td>10/03/2021</td>
                              <td>XE2GB4DF5X</td>
                              <td>$600</td>
                              <td>Payment recieve from Don</td>
                            </tr>
                            <tr>
                              <td>10/03/2021</td>
                              <td>XE2GB4DF5X</td>
                              <td>$600</td>
                              <td>Payment recieve from Don</td>
                            </tr>
                            <tr>
                              <td>10/03/2021</td>
                              <td>XE2GB4DF5X</td>
                              <td>$600</td>
                              <td>Payment recieve from Don</td>
                            </tr>
                            <tr>
                              <td>10/03/2021</td>
                              <td>XE2GB4DF5X</td>
                              <td>$600</td>
                              <td>Payment recieve from Don</td>
                            </tr>
                            <tr>
                              <td>10/03/2021</td>
                              <td>XE2GB4DF5X</td>
                              <td>$600</td>
                              <td>Payment recieve from Don</td>
                            </tr>
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
      </main>
      
     <Footer/>
      <script src="js/vendor/modernizr-3.5.0.min.js"></script>
      <script src="js/vendor/jquery-1.12.4.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/owl.carousel.min.js"></script>
      <script src="js/jquery.meanmenu.js"></script>
      <script src="js/jquery.counterup.min.js"></script>
      <script src="js/waypoints.js"></script>
      <script src="js/magnific.min.js"></script>
      <script src="js/wow.min.js"></script>
      <script src="js/plugins.js"></script>
      <script src="js/main.js"></script>
    </div>
  );
};

export default Dashboard;
