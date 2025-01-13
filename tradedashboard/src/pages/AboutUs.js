import React from "react";
import NavTop from "../components/nav/NavTop";
import h1 from "../assets/img/about/h1.png";
import h2 from "../assets/img/about/h2.png";
import h3 from "../assets/img/about/h3.png";
import Male_Team from "../assets/img/about/Male_Team.png";
import AboutFooter from "../components/footer/AboutFooter";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>
          Your Trusted Partner for the Best Online Stock Trading Courses and
          Stock Trading Education
        </title>
        <meta
          name="description"
          content="Discover the story behind our commitment to excellence in online stock trading education.
 As your trusted partner, we provide the best stock trading courses online, empowering you with the knowledge and skills
  for financial success. Join us on your journey to master the art of stock trading."
        />
        <link rel="canonical" href="https://staging.tradershub.ninja/about/" />
      </Helmet>

      <main>
        <div>
          <NavTop />
        </div>

        <section className="container-fluid other_page_hero_Section_hp">
          <div className="container">
            <div className="breadcrumb-title text-center" data-aos="zoom-in-up">
              <h2 className="font-weight-bold">
                TradersHub: Empowering traders with a secure and innovative
                decentralized finance platform.
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
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid HowTOStart_section mt-5">
          <div className="container">
            <div className="row" data-aos="zoom-in-up">
              <div className="col-xl-6 col-lg-7 col-md-10 col-12 m-auto">
                <div className="Section_heading_area_hp">
                  <h1>How to start</h1>
                  <p>
                    Start trading with us by opening an account, funding it,
                    familiarizing yourself with the platform, and executing
                    informed trades.
                  </p>
                </div>
              </div>
            </div>

            <div className="row mt-4 align-items-stretch">
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-5 "
                data-aos="zoom-in"
              >
                <div className="HowTOStart_item_area">
                  <div className="HowTOStart_Number_Area">01</div>
                  <div className="HowTOStart_item_area_img text-center">
                    <img src={h1} alt="" />
                  </div>
                  <div className="HowTOStart_item_content_area text-center">
                    <h4>Get access</h4>

                    <p className="mb-0">
                      Visit our platform's website and navigate to the account
                      opening section. Follow the prompts to complete the
                      registration process. Provide the necessary information,
                      such as personal details and financial information, to set
                      up your trading account.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-5 "
                data-aos="zoom-in"
              >
                <div className="HowTOStart_item_area">
                  <div className="HowTOStart_Number_Area">02</div>
                  <div className="HowTOStart_item_area_img text-center">
                    <img src={h2} alt="" />
                  </div>
                  <div className="HowTOStart_item_content_area text-center">
                    <h4>Familiarize Yourself with the Platform</h4>

                    <p className="mb-0">
                      Take time to explore and familiarize yourself with the
                      features and functionalities of the trading platform.
                      Learn how to navigate the interface, place trades, access
                      market data, and utilize various tools and indicators
                      available.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-5 "
                data-aos="zoom-in"
              >
                <div className="HowTOStart_item_area">
                  <div className="HowTOStart_Number_Area">03</div>
                  <div className="HowTOStart_item_area_img text-center">
                    <img src={h3} alt="" />
                  </div>
                  <div className="HowTOStart_item_content_area text-center">
                    <h4>Develop a Trading Strategy</h4>

                    <p className="mb-0">
                      Create a trading strategy that suits your goals and risk
                      appetite. Define your entry and exit points, risk
                      management techniques, and position sizing rules. Having a
                      well-defined strategy will help you make consistent and
                      disciplined trading decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid OurTeam_section_hp  py-5 bg-color-2">
          <div className="container">
            <div className="row" data-aos="zoom-in-up">
              <div className="col-xl-6 col-lg-7 col-md-10 col-12 m-auto">
                <div className="Section_heading_area_hp">
                  <h1>Our Team</h1>
                  <p>
                    Help agencies to define their new business objectives and
                    then create professional software.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div
                className="col-xl-3 col-lg-3 col-md-6 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="OurTeam_item">
                  <div className="OurTeam_item_img">
                    <img src={Male_Team} alt="Team_Member" />
                  </div>
                  <div className="OurTeam_item_Content">
                    <h4>Girish Kotte</h4>
                    <p>Founder & CEO</p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-3 col-lg-3 col-md-6 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="OurTeam_item">
                  <div className="OurTeam_item_img">
                    <img src={Male_Team} alt="Team_Member" />
                  </div>
                  <div className="OurTeam_item_Content">
                    <h4>Mohit Mundra</h4>
                    <p className="mb-0 mt-1" style={{ lineHeight: 1 }}>
                      Project Manager
                    </p>
                    <p> (Microlent Systems Pvt. Ltd.)</p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-3 col-lg-3 col-md-6 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="OurTeam_item">
                  <div className="OurTeam_item_img">
                    <img src={Male_Team} alt="Team_Member" />
                  </div>
                  <div className="OurTeam_item_Content">
                    <h4>Harshit Prajapat</h4>
                    <p className="mb-0 mt-1" style={{ lineHeight: 1 }}>
                      Web Designer
                    </p>
                    <p> (Microlent Systems Pvt. Ltd.)</p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-3 col-lg-3 col-md-6 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="OurTeam_item">
                  <div className="OurTeam_item_img">
                    <img src={Male_Team} alt="Team_Member" />
                  </div>
                  <div className="OurTeam_item_Content">
                    <h4>Mandeep Joshi</h4>
                    <p className="mb-0 mt-1" style={{ lineHeight: 1 }}>
                      Front Developer
                    </p>
                    <p> (Microlent Systems Pvt. Ltd.)</p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-3 col-lg-3 col-md-6 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="OurTeam_item">
                  <div className="OurTeam_item_img">
                    <img src={Male_Team} alt="Team_Member" />
                  </div>
                  <div className="OurTeam_item_Content">
                    <h4>DPS</h4>
                    <p className="mb-0 mt-1" style={{ lineHeight: 1 }}>
                      Mobile Developer
                    </p>
                    <p> (Microlent Systems Pvt. Ltd.)</p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-3 col-lg-3 col-md-6 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="OurTeam_item">
                  <div className="OurTeam_item_img">
                    <img src={Male_Team} alt="Team_Member" />
                  </div>
                  <div className="OurTeam_item_Content">
                    <h4>Akash</h4>
                    <p>Full Stack Developer</p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-3 col-lg-3 col-md-6 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="OurTeam_item">
                  <div className="OurTeam_item_img">
                    <img src={Male_Team} alt="Team_Member" />
                  </div>
                  <div className="OurTeam_item_Content">
                    <h4>Shynesh Raparla</h4>
                    <p>QA Lead</p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-3 col-lg-3 col-md-6 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="OurTeam_item">
                  <div className="OurTeam_item_img">
                    <img src={Male_Team} alt="Team_Member" />
                  </div>
                  <div className="OurTeam_item_Content">
                    <h4>Abhishek</h4>
                    <p>Backend Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid FAQ_section_hp my-5">
          <div className="container">
            <div className="row" data-aos="zoom-in-up">
              <div className="col-xl-6 col-lg-7 col-md-10 col-12 m-auto">
                <div className="Section_heading_area_hp">
                  <h1>Frequently Asked Question</h1>
                  <p>
                    Help agencies to define their new business objectives and
                    then create professional software.
                  </p>
                </div>
              </div>
            </div>

            <div className="row align-items-stretch" data-aos="zoom-in">
              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingOne">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          1. What is TradersHub?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseOne"
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          TradersHub is a decentralized finance (DeFi) platform
                          that facilitates trading, providing users with a
                          secure and transparent environment to buy, sell, and
                          manage digital assets.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingTwo">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          2. How do I get started with TradersHub?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          To get started, visit our website and sign up for an
                          account. Follow the on-screen instructions to complete
                          the registration process and begin using our platform.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingThree">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          3. Is TradersHub safe and secure?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseThree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          Yes, TradersHub prioritizes user security by utilizing
                          advanced encryption protocols and allowing users to
                          retain ownership of their private keys. We also follow
                          industry best practices to safeguard user funds and
                          personal information.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingFour">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          4. What fees are associated with using TradersHub?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseFour"
                        className="collapse"
                        aria-labelledby="headingFour"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          We have a transparent fee structure that outlines the
                          costs for trading, withdrawals, deposits, and other
                          relevant services. Please refer to our fee schedule
                          for detailed information.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingFive">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          5. How can I contact TradersHub's customer support?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseFive"
                        className="collapse"
                        aria-labelledby="headingFive"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          You can reach our customer support team by visiting
                          our website and accessing the "Contact Us" page. We
                          provide various channels, including email and live
                          chat support, to assist you with any queries or
                          concerns.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingSix">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseSix"
                          aria-expanded="false"
                          aria-controls="collapseSix"
                        >
                          6. Are there any educational resources available on
                          TradersHub?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseSix"
                        className="collapse"
                        aria-labelledby="headingSix"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          Yes, we provide educational resources such as blog
                          articles, tutorials, and guides to help users enhance
                          their trading skills and stay informed about the
                          cryptocurrency market.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingSeven">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseSeven"
                          aria-expanded="false"
                          aria-controls="collapseSeven"
                        >
                          7. Can I connect with other traders on TradersHub?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseSeven"
                        className="collapse"
                        aria-labelledby="headingSeven"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          Absolutely! TradersHub fosters a vibrant community
                          where users can connect, share insights, and engage
                          with fellow traders through forums, chat rooms, and
                          social trading features.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingEight">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseEight"
                          aria-expanded="false"
                          aria-controls="collapseEight"
                        >
                          8. Does TradersHub have a mobile app?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseEight"
                        className="collapse"
                        aria-labelledby="headingEight"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          Yes, TradersHub offers a mobile app for convenient
                          trading on the go. You can download the app from the
                          respective app stores for iOS and Android devices.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingNine">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseNine"
                          aria-expanded="false"
                          aria-controls="collapseNine"
                        >
                          9. Does TradersHub comply with regulatory
                          requirements?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseNine"
                        className="collapse"
                        aria-labelledby="headingNine"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          TradersHub is committed to adhering to applicable
                          regulatory requirements. We work closely with legal
                          advisors to ensure compliance with relevant laws and
                          regulations in the jurisdictions where we operate. We
                          prioritize user security, privacy, and the
                          transparency of our operations.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="FAQ_Item_hp">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header white-bg" id="headingTen">
                        <button
                          className="faq-accordion-btn collapsed btn"
                          data-toggle="collapse"
                          data-target="#collapseTen"
                          aria-expanded="false"
                          aria-controls="collapseTen"
                        >
                          10. Can I access my trading account and trade on
                          TradersHub from different devices?
                          <div className="FAQ_collapsed_Icon">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </button>
                      </div>

                      <div
                        id="collapseTen"
                        className="collapse"
                        aria-labelledby="headingTen"
                        data-parent="#accordion"
                      >
                        <div className="card-body text-light">
                          TradersHub is a decentralized finance (DeFi) platform
                          that facilitates trading, providing users with a
                          secure and transparent environment to buy, sell, and
                          manage digital assets.
                        </div>
                      </div>
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

export default AboutUs;
