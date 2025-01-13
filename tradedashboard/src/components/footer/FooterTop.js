import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsTwitter,
  BsGoogle,
  BsPinterest,
  BsInstagram,
} from "react-icons/bs";

const FooterTop = () => {
  return (
    <div>
      
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-8">
              <div className="footer-content logo-footer">
                <div className="footer-head">
                  <h4>About TradersHub</h4>
                  <p>
                    TradersHub is a cutting-edge platform that empowers traders
                    with advanced tools and insights. It offers a comprehensive
                    suite of features designed to enhance trading strategies,
                    including real-time market data, analysis tools, and a
                    supportive community. TradersHub enables users to make
                    informed decisions and stay ahead in the dynamic world of
                    trading.
                  </p>
                  <div className="footer-icons">
                    <ul>
                      <li>
                        <Link className="link">
                            <BsFacebook />
                        </Link>
                      </li>
                      <li>
                        <Link className="link">
                          
                            <BsTwitter />{" "}
                        </Link>
                      </li>
                      <li>
                        <Link className="link">
                         
                            <BsGoogle />{" "}
                        </Link>
                      </li>
                      <li>
                        <Link className="link">
                          
                            <BsPinterest />
                        </Link>
                      </li>
                      <li>
                        <Link className="link">
                            <BsInstagram />
                          
                        </Link>
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
  );
};

export default FooterTop;
