import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import r1 from "../../assets/img/review/r1.webp";
import r6 from "../../assets/img/review/r2.webp";
import r2 from "../../assets/img/review/r5.webp";
import r5 from "../../assets/img/review/r6.webp";
import Hero_Img from "../../assets/img/background/Hero_Img.png";
import CustomPlan_Img from "../.././assets/img/background/Customplan.png";
import abicon1 from "../.././assets/img/about/money.gif";
import abicon2 from "../.././assets/img/about/coin_about.gif";
import abicon3 from "../.././assets/img/about/ab-icon3.png";
import abicon4 from "../.././assets/img/about/check.gif";
import h1 from "../.././assets/img/about/h1.png";
import h2 from "../.././assets/img/about/h2.png";
import h3 from "../.././assets/img/about/h3.png";

import hp1 from "../../assets/img/feature/hp1.png";
import b7 from "../../assets/img/blog/b7.png";
import b8 from "../../assets/img/blog/b8.png";
import b9 from "../../assets/img/blog/b9.png";
import { Helmet } from 'react-helmet';

import all_members from "../../assets/img/GIF/account.gif";
import Total_Deposit from "../../assets/img/GIF/savings.gif";
import Setting from "../../assets/img/GIF/Settings.gif";
import Educational from "../../assets/img/GIF/assignment.gif";
import wallet from "../../assets/img/GIF/wallet.gif";
import Track_Record from "../../assets/img/GIF/trending-up.gif";
import Competitive_Pricing from "../../assets/img/GIF/credit-card.gif";
import WorldDollar from "../../assets/img/GIF/DaysToGO.gif";

import Slider from "react-slick";

import s2 from "../../assets/img/slider/s2.png";
import s3 from "../../assets/img/slider/s3.png";
import s4 from "../../assets/img/slider/s4.png";
import s5 from "../../assets/img/slider/s5.png";

import Trade from "../../assets/img/Trade.png";
import Share from "../../assets/img/share.png";
import Earn from "../../assets/img/Earn.png";
import Traders_sideImg from "../../assets/img/feature/stock11.jpg";



// import welcome_SideImg from "../../assets/img/background/Login_slider1.png";
import welcome_SideImg from "../../assets/img/background/Login_slider2.jpg";

// import Welcome_bg from "../../assets/img/background/Welcome_bg.png";
import AboutFooter from "../footer/AboutFooter";
import {
  BsApple,
  BsFillCaretRightFill,
  BsFillCalendar2DayFill,
  BsGraphUpArrow,
} from "react-icons/bs";
import { TbSettingsDollar, TbUserDollar, TbWorldDollar } from "react-icons/tb";
import { GrShieldSecurity } from "react-icons/gr";
import {
  FaFileInvoiceDollar,
  FaWallet,
  FaUserAlt,
  FaCommentDots,
  FaPlay,
  FaPiggyBank,
} from "react-icons/fa";
import { PiHandCoinsBold } from "react-icons/pi";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";


import useCounter from "../hook/useCounter";
import { newsLetterSubscribe } from "../../services/DashboardServices";
import { AxiosError } from "axios";
import ReactGA from "react-ga4";

const Content = () => {
  const { count } = useCounter(22609, 0.001, 20000);
  const { count: moneycount } = useCounter(500, 100, 420);
  const { count: countrycount } = useCounter(80, 100, 0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // const buttonRef = useRef(null);
  // const skipRef = useRef(null);

  // const navigate = useNavigate();


  // const validateEmail = (input) => {
  //   // Email validation regex pattern
  //   const emailRegex = /^[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/;

  //   if (!input) {
  //     setError('Email cannot be empty');
  //     return false;
  //   } else if (!emailRegex.test(input)) {
  //     setError('Please enter a valid email address');

  //     return false;
  //   } else {
  //     setError('');
  //     return true;
  //   }
  // };

  // const handleSubscription = async () => {
  //   if (!validateEmail(email)) {
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await newsLetterSubscribe(email);
  //     if (res.status == 200) {
  //       setLoading(false);
  //       setEmail("");
  //       setSuccess("News-letter successfully subscribed.");
  //       const TrackGoogleAnalyticsEvent = (
  //         category,
  //         event_name,
  //         label,
  //         data
  //       ) => {
  //         console.log("GA event:", category, ":", event_name, ":", label);
  //         let event_params = {
  //           category,
  //           label,
  //           ...data,
  //         };
  //         // Send GA4 Event
  //         ReactGA.event(event_name, event_params);
  //       };
  //       TrackGoogleAnalyticsEvent(
  //         "Subscribe-page",
  //         "Subscribe_" + email.split('@')[0],
  //         window.location.pathname + window.location.search,
  //         {}
  //       );
  //       setTimeout(() => {
  //         skipRef.current.click();
  //       }, 500);
  //     }
  //     setLoading(false);
  //   } catch (e) {
  //     if (e instanceof AxiosError) {
  //       if (e.response.status == 409) {
  //         setError("Email already subscribe.");
  //         setLoading(false);

  //         return;
  //       }
  //     }
  //     setError("News-letter subscription failed.");
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   const loadScript = () => {
  //     // Load the VismeForms script dynamically
  //     const script = document.createElement('script');
  //     script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
  //     script.async = true;
  //     document.head.appendChild(script);
  //   };

  //   // Add a delay before loading the script (adjust the delay time as needed)
  //   const timeout = setTimeout(loadScript, 1000);

  //   // Clean up the timeout when the component unmounts
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []); 

  // useEffect(() => {
  //   // Access the DOM element using the ref
  //   const buttonElement = buttonRef.current;


  //   if (buttonElement && !sessionStorage.getItem("firstVisit")) {
  //     sessionStorage.setItem("firstVisit", true);

  //     buttonElement.click();
  //   }
  // }, []);

  const settings = {
    // infinite: true,s
    speed: 2000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  useEffect(() => {
    // Load the iframeResizer script
    const script = document.createElement('script');
    script.src = 'https://testimonial.to/js/iframeResizer.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize the iframeResizer after the script has loaded
      window.iFrameResize({ log: false, checkOrigin: false }, '#testimonialto-carousel-tradershub-testimonials-tag-all-light');
    };
  }, []);
  return (
    <div>
      <main>
        {/* <!-- Start intro area --> */}
        <section className="container-fluid Hero_Banner_section_hp">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-7 col-lg-7 col-md-12 mb-4">
                <div className="Hero_Banner_content_area" data-aos="zoom-in-up">
                  <p>TradersHub</p>
                  <h1 className="Hero_Banner_main_line">
                    Empowering Traders with Cutting-edge Tools and Insights
                  </h1>
                  <Link
                    to="/register/lifetime/Trial-Version/free"
                    className="Hero_Banner_GetStarted_btn btn link"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-12 mb-4">
                <div className="Hero_Banner_side_img" data-aos="zoom-in-up">
                  <Slider {...settings}>
                    <div>
                      <img src={s2} alt="" width="100%" />
                    </div>
                    <div>
                      <img src={s3} alt="" width="100%" />
                    </div>
                    <div>
                      <img src={s4} alt="" width="100%" />
                    </div>
                    <div>
                      <img src={s5} alt="" width="100%" />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End intro Area --> */}

        {/* <!-- Button trigger modal --> */}
        {/* <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#WelcomeModal"
          ref={buttonRef}
          style={{ display: "none" }}
        >
          Launch static backdrop modal
        </button> */}




        {/* <!-- Start Counter area -->  */}
        <section className="container-fluid Counting_section_hp my-5 ">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4 m-auto mb-4"
                data-aos="zoom-in"
              >
                <div className="single-fun">
                  <span className="counter-icon">
                    {/* <TbUserDollar /> */}
                    <img src={all_members} alt="" />
                  </span>
                  <div className="counter-text">
                    <h2>
                      {count} <i className="fa-solid fa-plus"></i>
                    </h2>
                    <p>All Members</p>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4 m-auto mb-4"
                data-aos="zoom-in"
              >
                <div className="single-fun">
                  <span className="counter-icon">
                    <img src={Total_Deposit} alt="" />
                  </span>
                  <div className="counter-text">
                    <h2>
                      {" "}
                      $<span className="count ml-1 mr-2">
                        {moneycount}
                      </span>K{" "}
                    </h2>
                    <p>Total Deposit</p>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4 m-auto mb-4"
                data-aos="zoom-in"
              >
                <div className="single-fun">
                  <span className="counter-icon">
                    <img src={WorldDollar} alt="" />
                    {/* <TbWorldDollar /> */}
                  </span>
                  <div className="counter-text">
                    <h2>
                      {countrycount} <i className="fa-solid fa-plus"></i>
                    </h2>
                    <p>World Country</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end Counter area -->  */}


        <section className="container-fluid py-5 today_market_section_hp">
          <div className="container">
            <div className="row" data-aos="zoom-out">
              <div className="col-xl-7 col-lg-9 col-md-11 col-12 m-auto">
                <div className="Page_section_Heading_area">
                  <h1>Traders's Talk</h1>
                  <p>
                    Join TradersHub Community for Trading Discussions, Insights, Sharing, Learning and Earning Profits.
                  </p>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4 m-auto"  >
                    <div className="single-fun w-100 mb-3" data-aos="zoom-in">
                      <div className="counter-text text-center w-100">
                        <img src={Share} alt=""/>
                        <h2> Share </h2>
                        <p>Share your trading experience with us</p>
                      </div>
                    </div>

                    <div className="single-fun w-100 mb-3" data-aos="zoom-in">
                      <div className="counter-text text-center w-100">
                        <img src={Trade} alt=""/>
                        <h2> Trade  </h2>
                        <p>Do Live trading with us</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4 m-auto mb-4" >
                    <div className="single-fun w-100" data-aos="zoom-in">
                      <div className="counter-text text-center w-100">
                        <img src={Earn} alt=""/>
                        <h2> Earn </h2>
                        <p>Learn and Earn millions with us</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="today_market_sideImg_Area" data-aos="zoom-in">
                  <img src={Traders_sideImg} alt="" width="100%" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Start About area -->  */}
        <section className="container-fluid Custom_Plan_section_hp my-5">
          <div className="container">
            <div className="row" data-aos="zoom-out">
              <div className="col-xl-7 col-lg-9 col-md-11 col-12 m-auto">
                <div className="Page_section_Heading_area">
                  <h1>Custom Plan</h1>
                  <p>
                    Unlock your trading potential with a custom plan tailored to
                    your specific needs and preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="row align-items-stretch">
              <div
                className="col-xl-6 col-lg-6 col-md-12 col-12 mb-4"
                data-aos="zoom-in"
              >
                <div className="Custom_Plan_content_img">
                  {/* <img src={CustomPlan_Img} alt="" /> */}
                  <div className="video-content">
                    <Link
                      to="https://youtu.be/L23fYEohhRQ"
                      className="video-play video-zone link"
                      target="_BLANK"
                    >
                      {/* <i className="fa fa-play"> <FaPlay /> </i> */}
                      <i className="fa-solid fa-play"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <div className="Custom_Plan_content_area">
                  <div className="Custom_Plan_content_item" data-aos="zoom-in">
                    <img className="support-images" src={abicon1} alt="" />
                    <div className="support-content">
                      <h5>Sub-Domain With your company name</h5>
                      <p>
                        To provide customized subdomains (e.g.,
                        alpha.tradershub.ninja) for each client, we configure
                        DNS settings, set up server routing, and manage data in
                        a secure manner, ensuring clients access their specific
                        content.
                      </p>
                    </div>
                  </div>

                  <div className="Custom_Plan_content_item" data-aos="zoom-in">
                    <img className="support-images" src={abicon4} alt="" />
                    <div className="support-content">
                      <h5>Easy Access to your Team</h5>
                      <p>
                        Our platform is designed for seamless team
                        collaboration, making it easy for your team to access
                        and manage custom pricing plans, logs, and branding
                        through your dedicated subdomain, such as
                        alpha.tradershub.ninja.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-6 col-lg-6 col-md-12 col-12 mb-3"
                data-aos="zoom-in"
              >
                <div className="Custom_Plan_content_area ">
                  <div className="Custom_Plan_content_item">
                    <img className="support-images" src={abicon2} alt="" />

                    <div className="support-content">
                      <h5>Customize your own plan</h5>
                      <p>
                        Our clients have the flexibility to customize their own
                        pricing plans, alongside personalized subdomains like
                        alpha.tradershub.ninja
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-6 col-lg-6 col-md-12 col-12 mb-3"
                data-aos="zoom-in"
              >
                <div className="Custom_Plan_content_area ">
                  <div className="Custom_Plan_content_item">
                    <img className="support-images" src={abicon3} alt="" />
                    <div className="support-content">
                      <h5>Customize Your Log / Brand</h5>
                      <p>
                        In addition to custom pricing plans, our clients have
                        the power to personalize their logs and branding, all
                        under their unique subdomains like
                        alpha.tradershub.ninja.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End About Area -->

        <!-- Start tradershub area --> */}
        <section className="container-fluid WhyChooseUs_section_hp my-5">
          <div className="container">
            <div className="row" data-aos="zoom-out">
              <div className="col-xl-7 col-lg-9 col-md-11 col-12 m-auto">
                <div className="Page_section_Heading_area">
                  <h1>Why choose us</h1>
                  <p>
                    Choose us for a comprehensive and innovative trading
                    experience that empowers your success.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="WhyChooseUs_item_area">
                  <div className="link WhyChooseUs_item_Img">
                    {/* <TbSettingsDollar /> */}
                    <img src={Setting} alt="" />
                  </div>
                  <h4 className="WhyChooseUs_item_heading">
                    Comprehensive Suite of Tools
                  </h4>
                  <p className="WhyChooseUs_item_content">
                    Enhance your trading experience with our comprehensive suite
                    of tools, including indicators, bots, advanced charts, and a
                    trading journal.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="WhyChooseUs_item_area">
                  <div className="link WhyChooseUs_item_Img WhyChooseUs_item_Img_pathColor">
                    <GrShieldSecurity />
                  </div>
                  <h4 className="WhyChooseUs_item_heading">
                    Cutting-Edge Technology
                  </h4>
                  <p className="WhyChooseUs_item_content">
                    Empower your trading with our comprehensive suite of tools,
                    including indicators, alert bots, advanced charts, and a
                    performance-tracking journal.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="WhyChooseUs_item_area">
                  <div className="link WhyChooseUs_item_Img">
                    <img src={Educational} alt="" />
                  </div>
                  <h4 className="WhyChooseUs_item_heading">
                    Educational Resources
                  </h4>
                  <p className="WhyChooseUs_item_content">
                    Experience the power of customizable tools, reliable alerts,
                    exceptional support, and a personalized trading journey for
                    informed decision-making and success.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="WhyChooseUs_item_area">
                  <div className="link WhyChooseUs_item_Img">
                    <img src={wallet} alt="" />
                  </div>
                  <h4 className="WhyChooseUs_item_heading">
                    Reliable and Timely Alerts
                  </h4>
                  <p className="WhyChooseUs_item_content">
                    Join our supportive community for an enriched trading
                    journey towards lasting success. With reliable support,
                    educational resources, and innovative tools.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="WhyChooseUs_item_area">
                  <div className="link WhyChooseUs_item_Img">
                    <img src={Track_Record} alt="" />
                  </div>
                  <h4 className="WhyChooseUs_item_heading">
                    Track Record of Success
                  </h4>
                  <p className="WhyChooseUs_item_content">
                    Choose us for a comprehensive suite of tools, proven
                    success, innovative solutions, exceptional support, and a
                    supportive community—your trading partner for success..
                  </p>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
                data-aos="zoom-in-up"
              >
                <div className="WhyChooseUs_item_area">
                  <div className="link WhyChooseUs_item_Img">
                    <img src={Competitive_Pricing} alt="" />
                  </div>
                  <h4 className="WhyChooseUs_item_heading">
                    Competitive Pricing
                  </h4>
                  <p className="WhyChooseUs_item_content">
                    At our platform, we offer highly competitive pricing and low
                    fees to ensure that you can optimize your tradershub returns
                    without unnecessary expenses eating into your profits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Choose area -->
        
        <!-- Start Testimonials --> */}
        <section className="container-fluid Testimonial_section_hp my-5">
          <div className="container">
            <div className="row" data-aos="zoom-out">
              <div className="col-xl-7 col-lg-9 col-md-11 col-12 m-auto">
                <div className="Page_section_Heading_area">
                  <h1>Testimonial</h1>
                  <p>
                    A testimonial is a statement of approval or recommendation
                    from someone who has had a positive experience with a
                    product, service, or person.
                  </p>
                </div>
              </div>
            </div>

            <div className="row" data-aos="zoom-in-up">
              <div className="col-12">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide Testimonial_slider_area"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    {/* <div className="carousel-item active">
                      <div className="Testimonial_content_item">
                        <div className="Testimonial_content_img_Name_area">
                          <img src={r1} alt="" />
                          <div className="Testimonial_content_Name">
                            <h4>JohnDoe92</h4>
                            <samp>Platinum customer</samp>

                            <p>
                              TradersHub has been a game-changer for me! The
                              platform's user-friendly interface, diverse range
                              of cryptocurrencies, and transparent fee structure
                              have made trading a breeze. Highly recommended!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="Testimonial_content_item">
                        <div className="Testimonial_content_img_Name_area">
                          <img src={r5} alt="" />
                          <div className="Testimonial_content_Name">
                            <h4>CryptoEnthusiast23</h4>
                            <samp>Diamond customer</samp>

                            <p>
                              I've tried several trading platforms, but
                              TradersHub stands out with its exceptional
                              customer support. They promptly address my queries
                              and provide valuable assistance whenever needed.
                              Great team!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="Testimonial_content_item">
                        <div className="Testimonial_content_img_Name_area">
                          <img src={r2} alt="" />
                          <div className="Testimonial_content_Name">
                            <h4>TraderPro2021</h4>
                            <samp>Gold customer</samp>
                            <p>
                              When replacing a multi-lined selection of text,
                              the generated dummy text maintains the amount of
                              lines. When replacing a selection. help agencies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="Testimonial_content_item">
                        <div className="Testimonial_content_img_Name_area">
                          <img src={r6} alt="" />
                          <div className="Testimonial_content_Name">
                            <h4>SecureInvestor123</h4>
                            <samp>Diamond customer</samp>
                            <p>
                              I appreciate TradersHub's commitment to security.
                              With features like two-factor authentication and
                              custody of private keys, I feel confident that my
                              funds are protected. Trustworthy and reliable!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div> */}
                     <iframe
      id='testimonialto-carousel-tradershub-testimonials-tag-all-light'
      src="https://embed-v2.testimonial.to/carousel/all/tradershub-testimonials?theme=light&autoplay=on&showmore=on&one-row=on&hideDate=on&hideSource&same-height=on&tag=all&arrowColor=9BA9B4&minimizeAttachedImages"
      frameBorder="0"
      scrolling="no"
      width="100%"
      style={{ minHeight: '400px' }} // Set a minimum height to ensure visibility
    ></iframe>
                  </div>

      
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Testimonials -->  */}

        <AboutFooter />
      </main>

      {/* <!-- Welcome Modal --> */}
      {/* <div class="visme_d" data-title="Copy of Special Offers Subscription Form" data-url="y43m4qng-copy-of-special-offers-subscription-form" data-domain="forms" data-full-page="false" data-min-height="500px" data-form-id="10018"></div> */}
      {/* 
       <div
        className="modal fade WelcomeModal_section_hp"
        id="WelcomeModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="WelcomeModalLabel"
        aria-hidden="true "
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <button
                className="btn WelcomeModal_skip_btn"
                type="button"
                data-dismiss="modal"
                ref={skipRef}
              >
                Skip
              </button>
              <div className="row align-items-stretch">
                <div className="col-xl-7 col-lg-6 col-md-12">
                  <div className="welcome_content_Area">
                    <div className="WelcomeModal_Content">
                      <h1>Welcome to Traders Hub</h1>
                      <div className="welcome_Newsletter_area d-block">
                        <h3>For More Details</h3>
                        <h3>Subscribe to our Newsletter!</h3>
                        <p>
                          Be the first to got exciusive offers and the latest
                          news
                        </p>

                        <div class="input-group">
                          <input
                            type="email"
                            class="form-control"
                            value={email}
                            required
                            placeholder="Enter the your Email"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn_main2_hp"
                              type="button"
                              onClick={handleSubscription}
                              disabled={!email}
                            >
                              {!loading ? (
                                <i class="fa-solid fa-paper-plane"></i>
                              ) : (
                                "Loading..."
                              )}
                            </button>
                          </div>
                        </div>

                        {error && (
                          <p className="text-danger mt-2 text-left">{error}</p>
                        )}
                        {success && (
                          <p className="text-success mt-2 text-left">{success}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="visme_d" data-title="Copy of Special Offers Subscription Form" data-url="y43m4qng-copy-of-special-offers-subscription-form" data-domain="forms" data-full-page="false" data-min-height="500px" data-form-id="10018"></div>
                </div>
                <div className="col-xl-5 col-lg-6 col-md-12 pl-0">
                  <div className="welcome_side_img h-100">
                    <img src={welcome_SideImg} onClick={() => window.location.href = "/pricingplans"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  */}


    </div>
  );
};

export default Content;
