import React from "react";
import { Link } from "react-router-dom";

import Footer_logo from "../../assets/img/logo/Full_logo.png";

const AboutFooter = () => {
  return (
    <div>
      <footer className="container-fluid Website_footer_section">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-12 col-md-12 col-12 mb-4">
              <div className="Website_footer_about_item">
                <img
                  src={Footer_logo}
                  alt="footer Logo"
                  className="footer_logo_img"
                />
                <p>
                  TradersHub is your gateway to cutting-edge trading, offering
                  advanced tools and real-time insights. With a supportive
                  community, it empowers users to make informed decisions and
                  stay ahead in the dynamic world of trading.
                </p>

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
            </div>

            <div className="col-xl-2 col-lg-4 col-md-4 col-12 mb-4">
              <div className="Website_footer_links_item">
                <h4> Quick link </h4>
                <ul className="mb-0">
                  <li>
                    <Link to="/" className="link">
                      {" "}
                      Home{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/traderhub" className="link">
                      {" "}
                      tradershub{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/PricingPlans" className="link">
                      {" "}
                      Plans{" "}
                    </Link>
                  </li>
                  {/* <li><Link to="/review" className="link"> Reviews </Link></li> */}
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-4 col-md-4 col-12 mb-4">
              <div className="Website_footer_links_item">
                <h4> Accounts link </h4>
                <ul className="mb-0">
                  {/* <li><Link to="" className="link"> Sign Up </Link></li> */}
                  <li>
                    <Link to="/login" className="link">
                      {" "}
                      Sign in{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-4 col-md-4 col-12 mb-4">
              <div className="Website_footer_links_item">
                <h4> Supports link </h4>
                <ul className="mb-0">
                  <li>
                    <Link to="/PrivacyPolicy" className="link">
                      {" "}
                      Terms & Condition{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="link">
                      {" "}
                      Contact Us{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="">
        <div className="footer-area-bottom py-3">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="copyright text-center">
                  <p className="mb-0">
                    Copyright © 2021 <a href="#"> TradersHub</a> All Rights
                    Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutFooter;
