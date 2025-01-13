import React from "react";
import NavTop from "../components/nav/NavTop";
import AboutFooter from "../components/footer/AboutFooter";
import r1 from "../assets/img/review/r1.webp";
import r2 from "../assets/img/review/r2.webp";
import r3 from "../assets/img/review/r3.webp";
import r4 from "../assets/img/review/r4.webp";
import r5 from "../assets/img/review/r5.webp";
import r6 from "../assets/img/review/r6.webp";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Reviews = () => {
  return (
    <>
      <Helmet>
        <title>
          {" "}
          Best Price Action Course & Top Option Indicator Reviews | Traders Hub
        </title>
        <meta
          name="description"
          content="Explore unbiased reviews to find the top price action course and indicator for precise option trading.
 Real user insights and expert analysis for your successful trading journey.."
        />
      </Helmet>
      <div>
        <NavTop />
      </div>

      <div className="page-area bread-pd">
        <div className="breadcumb-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb-title text-center">
                <h2 className="font-weight-bold">
                  "TradersHub: Revolutionizing decentralized finance with secure
                  trading, powerful features, and a vibrant trader community."
                </h2>
                <div className="bread-come">
                  <nav aria-label="breadcrumb ">
                    <ol className="list-unstyled d-flex flex-wrap p-0 mb-0 justify-content-center">
                      <li className="breadcrumb-items">
                        <Link
                          to="/"
                          className="text-light text-decoration-none"
                        >
                          Home
                        </Link>
                        <i className="ti-angle-right" aria-hidden="true"></i>
                      </li>
                      <li className="breadcrumb-items mr-2">
                        <i className="fa-solid fa-angle-right text-white"></i>
                      </li>
                      <li className="breadcrumb-items">
                        <a
                          className="text-light text-decoration-none"
                          href="about.html"
                        >
                          Reviews
                        </a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-page-area bg-color area-padding-2">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-testi">
                <div className="testi-text">
                  <div className="clients-text">
                    <div className="testi-img ">
                      <img src={r1} alt="img" />
                      <div className="guest-details">
                        <h4>JohnDoe92</h4>
                        <span className="guest-rev text-light">
                          Platinum customer
                        </span>
                      </div>
                    </div>
                    <div className="client-rating">
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                    </div>
                    <p>
                      TradersHub has been a game-changer for me! The platform's
                      user-friendly interface, diverse range of
                      cryptocurrencies, and transparent fee structure have made
                      trading a breeze. Highly recommended!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-testi">
                <div className="testi-text">
                  <div className="clients-text">
                    <div className="testi-img ">
                      <img src={r2} alt="img" />
                      <div className="guest-details">
                        <h4>CryptoEnthusiast23</h4>
                        <span className="guest-rev text-light">
                          Diamond customer
                        </span>
                      </div>
                    </div>
                    <div className="client-rating">
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                    </div>
                    <p>
                      I've tried several trading platforms, but TradersHub
                      stands out with its exceptional customer support. They
                      promptly address my queries and provide valuable
                      assistance whenever needed. Great team!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-testi">
                <div className="testi-text">
                  <div className="clients-text">
                    <div className="testi-img ">
                      <img src={r3} alt="img" />
                      <div className="guest-details">
                        <h4>TraderPro2021</h4>
                        <span className="guest-rev text-light">
                          Gold customer
                        </span>
                      </div>
                    </div>
                    <div className="client-rating">
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                    </div>
                    <p>
                      TradersHub's educational resources have been instrumental
                      in expanding my knowledge of the crypto market. Their blog
                      articles and tutorials are informative, well-written, and
                      have helped me make better trading decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-testi">
                <div className="testi-text">
                  <div className="clients-text">
                    <div className="testi-img ">
                      <img src={r4} alt="img" />
                      <div className="guest-details">
                        <h4>SecureInvestor123</h4>
                        <span className="guest-rev text-light">
                          Diamond customer
                        </span>
                      </div>
                    </div>
                    <div className="client-rating">
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                    </div>
                    <p>
                      I appreciate TradersHub's commitment to security. With
                      features like two-factor authentication and custody of
                      private keys, I feel confident that my funds are
                      protected. Trustworthy and reliable!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-testi">
                <div className="testi-text">
                  <div className="clients-text">
                    <div className="testi-img ">
                      <img src={r5} alt="img" />
                      <div className="guest-details">
                        <h4>NoviceTrader21</h4>
                        <span className="guest-rev text-light">
                          Sliver customer
                        </span>
                      </div>
                    </div>
                    <div className="client-rating">
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                    </div>
                    <p>
                      As a beginner in crypto trading, TradersHub has been my
                      go-to platform. Their intuitive interface,
                      beginner-friendly tools, and demo trading option have
                      allowed me to learn and practice without any pressure.
                      Thank you, TradersHub!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-testi">
                <div className="testi-text">
                  <div className="clients-text">
                    <div className="testi-img ">
                      <img src={r6} alt="img" />
                      <div className="guest-details">
                        <h4>Graham</h4>
                        <span className="guest-rev text-light">
                          Gold customer
                        </span>
                      </div>
                    </div>
                    <div className="client-rating">
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                      <a href="#">
                        <i className="ti-star"></i>
                      </a>
                    </div>
                    <p>
                      TradersHub's community is fantastic! The ability to
                      connect with fellow traders, share insights, and learn
                      from experienced investors has been invaluable. The
                      platform truly fosters a supportive and collaborative
                      environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <AboutFooter />
      </div>
    </>
  );
};

export default Reviews;
