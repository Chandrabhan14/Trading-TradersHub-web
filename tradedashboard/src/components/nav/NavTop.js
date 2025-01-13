import React from "react";
import { Link, useLocation } from "react-router-dom";
import login from "../../assets/img/icon/login.png";
import thl3 from "../../assets/img/logo/thl3.png";
import { BiEnvelope } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import logo from "../../assets/img/logo/thl3.png";
import { useAuth } from "../auth/useAuth";

const NavTop = () => {
  const location = useLocation();
  const hiddenPaths = ["/register"];
  const { user } = useAuth();

  const subscriptionType = localStorage.getItem("subscription_type");

  const handleLogout = () => {
    // Clear user data from localStorage and any other necessary cleanup
    localStorage.clear();


    // Use window.history.replaceState to remove the cached page from history
    const newState = { ...window.history.state, key: null };
    window.history.replaceState(newState, "", "/");

    // Redirect to the login page
    window.location.href = "/login";
  };




  return (
    <>
      <section
        className="container-fluid website_topbar_Section_hp"
        data-aos="zoom-in"
      >
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-4 col-lg-4 col-md-4 website_topbar_mail_Area">
              <Link to="mailto:marketing@tradershub.ninja" className="link ">
                <i className="fa fa-envelope mr-1"></i>{" "}
                marketing@tradershub.ninja
              </Link>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 website_topbar_social_Media ">
              <div className="website_topbar_SocialMedia_Icon">
                <a
                  className="website_topbar_SocialMedia_Icon_item"
                  target="_BLANK"
                  title="Whatsapp"
                  href="https://wa.me/message/4OKFYRZHK5OEF1"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a
                  className="website_topbar_SocialMedia_Icon_item"
                  target="_BLANK"
                  title="Twitter"
                  href="https://twitter.com/TradershubNinja"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  className="website_topbar_SocialMedia_Icon_item"
                  target="_BLANK"
                  title="Youtube"
                  href="https://www.youtube.com/@TradersHubNinja"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a
                  className="website_topbar_SocialMedia_Icon_item"
                  target="_BLANK"
                  title="Twitch"
                  href="https://www.twitch.tv/tradershub_ninja"
                >
                  <i className="fa-brands fa-twitch"></i>
                </a>
                <a
                  className="website_topbar_SocialMedia_Icon_item"
                  target="_BLANK"
                  title="Discord"
                  href="https://discord.com/users/718255257070731334"
                >
                  <i className="fa-brands fa-discord"></i>
                </a>
                <a
                  className="website_topbar_SocialMedia_Icon_item"
                  target="_BLANK"
                  title="Instagram"
                  href="https://www.instagram.com/tradershub_ninja/"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  className="website_topbar_SocialMedia_Icon_item"
                  target="_BLANK"
                  title="Threads"
                  href="https://www.threads.net/@tradershub_ninja"
                >
                  <i className="fa-brands fa-threads"></i>
                </a>
              </div>
            </div>

            {!subscriptionType ? <div className="col-xl-3 col-lg-3 col-md-2">
              <div className="d-flex justify-content-end">
              <div className="topbar-right mr-2">
                  {!hiddenPaths.includes(location.pathname) && (
                    <Link
                      to="/register/lifetime/Trial-Version/free"
                      className="btn website_topbar_login_Btn"
                    >
                      {" "}
                      Free Trial{" "}
                    </Link>
                  )}
                </div>
                <div className="topbar-right">
                  {!hiddenPaths.includes(location.pathname) && (
                    <Link to="/login" className="btn website_topbar_login_Btn">
                      {" "}
                      Login{" "}
                    </Link>
                  )}
                </div>
              </div>
            </div> : null}



            {subscriptionType ?
              <div className="topbar-right">
                <Link to="" className="btn website_topbar_login_Btn" onClick={handleLogout}>
                  Logout{"  "}
                  <i className="fa-solid fa-arrow-right-from-bracket logout logout_icon ml-2"></i>
                </Link>{" "}
              </div> : null}
          </div>
        </div>
      </section>

      <header className=" container-fluid website_header_section_hp px-0">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light px-0">
            <Link className="navbar-brand" to="/" data-aos="zoom-in">
              <img className="p-0" src={logo} alt="" />
            </Link>
            <button
              className="navbar-toggler pr-0"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 75 60"
                fill="none"
              >
                <path d="M67.1475 0H39.8931C34.9816 0 33 2.23617 33 4.99462V5.00538C33 7.76383 34.9816 10 39.8931 10H67.1475C72.0591 10 74.0407 7.79751 74.0407 5.03906V4.99462C74.0407 2.23617 72.0591 0 67.1475 0Z" />
                <path d="M5.06908 0H4.93092C2.20765 0 0 2.23617 0 4.99462V5.00538C0 7.76383 2.20765 10 4.93092 10H5.06908C7.79235 10 10 7.76383 10 5.00538V4.99462C10 2.23617 7.79235 0 5.06908 0Z" />
                <path d="M69.0691 50H68.9309C66.2076 50 64 52.2362 64 54.9946V55.0054C64 57.7638 66.2076 60 68.9309 60H69.0691C71.7924 60 74 57.7638 74 55.0054V54.9946C74 52.2362 71.7924 50 69.0691 50Z" />
                <path d="M34.1475 50H6.89314C1.98159 50 0 52.2362 0 54.9946V55.0054C0 57.7638 1.98159 60 6.89314 60H34.1475C39.0591 60 41.0407 57.7638 41.0407 55.0054V54.9946C41.0407 52.2362 39.0591 50 34.1475 50Z" />
                <path d="M67.779 25H6.09043C1.89835 25 0 27.2376 0 29.9961V30.0068C0 32.7653 1.89835 35 6.09043 35H67.779C71.9711 35 74 32.7653 74 30.0068V29.9961C74 27.2376 71.9711 25 67.779 25Z" />
              </svg>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <div className="header_menu ">
                <ul className="navbar-nav main-menu">
                  {subscriptionType ?
                    <li className="nav-item">
                      <Link className="link nav-link" to="/todays-market">
                        {" "}
                        Today's market{" "}
                      </Link>
                    </li> : null}

                  <li className="nav-item">
                    {!user ?

                      <Link to="/search/AMD" className="link nav-link">
                        Trader's Talk
                      </Link>
                      : null}
                  </li>

                  <li className="nav-item">
                    <Link className="link nav-link" to="/">
                      {" "}
                      Home{" "}
                    </Link>
                  </li>

                  <li className="menu-item-has-children nav-item">
                    <Link className="link nav-link">Pages</Link>
                    <ul className="submenu">
                      

                      <li className="nav-item">
                        <Link to="/PrivacyPolicy" className="link nav-link">
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/traderhub" className="link nav-link">
                          tradershub
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/ThBotServices" className="link nav-link">
                          TH Bot
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ThnCoin" className="link nav-link">
                          THn Coin
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link to="/blog" className="link nav-link">
                      Blog
                    </Link>
                  </li>

                  <li className="contact nav-item">
                    <Link to="/contact" className="link nav-link">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item website_header_MobileView_loginBtn">
                    {!hiddenPaths.includes(location.pathname) && (
                      <Link
                        to="/register/lifetime/Trial-Version/free"
                        className="btn website_topbar_login_Btn mr-2"
                      >
                        {" "}
                        Free Trial{" "}
                      </Link>
                    )}
                  </li>
                  <li className="nav-item website_header_MobileView_loginBtn mt-2">
                    {!hiddenPaths.includes(location.pathname) && (
                      <Link
                        to="/login"
                        className="btn website_topbar_login_Btn nav-link"
                      >
                        {" "}
                        Login{" "}
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* <!-- End header area --> */}
    </>
  );
};

export default NavTop;
