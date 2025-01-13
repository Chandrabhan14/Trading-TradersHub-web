// import React, { useEffect, useState } from "react";
// import NavTop from "../components/nav/NavTop";
// import AboutFooter from "../components/footer/AboutFooter";
// import { Link, useLocation } from "react-router-dom";
// import p1 from "../assets/img/plan/p_1.png";
// import { postCheckoutProduct } from "../services/UserServices";
// import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { useAuth } from "../components/auth/useAuth";
// import axios from "axios";

// const PricingPlans = () => {
//   const location = useLocation();
//   const [uid, setUid] = useState(null);
//   const navigate = useNavigate();
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const token = localStorage.getItem("token");
//   const { user } = useAuth();


//   const handleContact = () => {
//     window.location.href = "/contact"
//   }
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const dataString = localStorage.getItem("googledata");
//     const userDataFromLocalStorage = JSON.parse(dataString);
//     const uId = userDataFromLocalStorage?.uid;
//     setUid(uId);
//   }, [location]);


//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);
//     console.log(query, "qurry data");

//     if (query.get("success")) {
//       console.log("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       console.log(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);
//   const subscriptionType = localStorage.getItem("subscription_type");


//   const onSubmit = async (e, url) => {
//     e.preventDefault();
//     try {
//       if (user) {
//         const segments = url.split("/");
//         const lookupKey = segments[2];
//         const checkoutResponse = await axios.post(
//           `${apiUrl}/api/create_checkout_session?lookup_key=${lookupKey}&email=${user?.email}`,
//           null,
//           {
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               // Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (
//           checkoutResponse.status === 200 &&
//           checkoutResponse.data?.checkout_url
//         ) {
//           window.location.href = `${checkoutResponse.data.checkout_url}`; // Redirect the user
//         }
//       } else {
//         navigate(url);
//       }
//     } catch {
//       console.log("error when checkout");
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>
//           Flexible Trading Pricing Plans in USA | Best Subscriptions for Traders
//         </title>
//         <meta
//           name="description"
//           content="Explore our trading pricing plans in the USA, offering the 
// best subscription options for traders. Learn about transparent costs for our top-notch trading services. 
// Choose a plan that aligns with your financial goals and trading preferences today."
//         />
//       </Helmet>
//       <main>
//         <NavTop />
//       </main>

//       <section className="container-fluid other_page_hero_Section_hp">
//         <div className="container">
//           <div className="breadcrumb-title text-center" data-aos="zoom-in-up">
//             <h2 className="font-weight-bold">Pricing Plans</h2>
//             <div className="bread-come">
//               <nav aria-label="breadcrumb ">
//                 <ol className="list-unstyled d-flex flex-wrap p-0 mb-0 justify-content-center">
//                   <li className="breadcrumb-items">
//                     <Link to="/" className="text-light text-decoration-none">
//                       Home
//                     </Link>
//                     <i className="ti-angle-right" aria-hidden="true"></i>
//                   </li>

//                   <li className="breadcrumb-items mr-2">
//                     <i className="fa-solid fa-angle-right text-white"></i>
//                   </li>

//                   <li className="breadcrumb-items">
//                     <a className="font-weight-bold text-white text-decoration-none">
//                       {" "}
//                       Pricing Plans{" "}
//                     </a>
//                   </li>
//                 </ol>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="pricingplans py-5 bg-color footer-area">
//         <div className="container">
//           <div className="row">
//             {!subscriptionType ? (
//               <div
//                 className="col-xl-12 col-lg-12 col-md-12 d-flex flex-column mb-3"
//                 data-aos="zoom-in-up"
//               >
//                 <form
//                   onSubmit={(e) =>
//                     onSubmit(e, "/register/lifetime/Trial-Version/free")
//                   }
//                   className="plan_table_list  text-center flex-grow-1 card bg-img-none"
//                 >
//                   <div className="card-body p-0">
//                     <div className="row align-items-center">
//                       <div className="top-plan-inner mb-0 col-lg-5">
//                         <h3>7 Days Free Trial</h3>
//                         <div className="rates">
//                           <span className="plan_prices"> Free</span>
//                         </div>
//                       </div>
//                       <ol className="plan-list-text col-lg-5 mb-0">
//                         <li className="check">
//                           <i className="fa-solid fa-check mr-1"></i>{" "}
//                           <b>Everything from the Yearly Plan</b>
//                         </li>
//                         <li className="check">
//                           <i className="fa-solid fa-check mr-1"></i> Personal
//                           Financial Planner.
//                         </li>
//                         <li className="check">
//                           <i className="fa-solid fa-check mr-1"></i> 1-1 Live
//                           Calls/Chat
//                         </li>
//                         <li className="check">
//                           <i className="fa-solid fa-check mr-1"></i> Personal
//                           1-1 Education Session
//                         </li>
//                         <li className="check">
//                           <i className="fa-solid fa-check mr-1"></i> Q&A With
//                           all our Analysts/month
//                         </li>
//                       </ol>
//                       <div className="col-md-2">
//                         {user ? (
//                           <div className="plans-footer card-footer px-0">
//                             <button className="btn-Signup" type="submit">
//                               Buy Now
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="plans-footer card-footer">
//                             <button className="btn-Signup" type="submit">
//                               Signup
//                             </button>
//                           </div>
//                         )}

//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             ) : null}
//             <div
//               className="col-xl-4 col-lg-4 col-md-6 d-flex flex-column mb-3"
//               data-aos="zoom-in-up"
//             >
//               <form
//                 // onSubmit={(e) => onSubmit(e, `/register/basic_new_key/15.99/month`)}
//                 className="plan_table_list text-center flex-grow-1 card"
//               >
//                 <div className="card-body p-0">
//                   <div className="top-plan-inner">
//                     <h3>Bot Plan </h3>
//                     <div className="rates">
//                       {/* <span className="plan_prices">
//                         {" "}
//                         <span>$</span> 15.99
//                       </span> */}
//                       <div className="d-flex justify-content-center">
//                           <s className="plan_prices discount_prices">
//                             <span>$</span> 45.99{" "}
//                           </s>
//                           <span className="plan_prices">
//                             <span>$</span> 29.99{" "}
//                           </span>
//                         </div>
//                       <p className="users">/ Month</p>
//                     </div>
//                   </div>
//                   <ol className="plan-list-text">
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Discord Access
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Ticker We
//                       Focus: $SPY $QQQ $TSLA $AAPL $AMD $NVDA $META $MSFT $NFLX
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Option Alert's
//                       : BUY:CALLs || BUY:PUTs{" "}
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Daily Levels
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Support &
//                       Resistance Alert's
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Penny Stock
//                       Alert's
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Small Cap News{" "}
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Buddy : Bot to
//                       help You{" "}
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Crypto Alert's{" "}
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> 1000+ Books In
//                       Education
//                     </li>
//                     {/* <li className="check"><i className="fa-solid fa-check mr-1"></i> Assign Buddy</li> */}
//                   </ol>
//                 </div>
//                 {/* {user ? (
//                   <div className="plans-footer card-footer px-0">
//                     <button className="btn-Signup" type="submit">
//                       Buy Now
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="plans-footer card-footer">
//                     <button className="btn-Signup" type="submit">
//                       Signup
//                     </button>
//                   </div>
//                 )} */}
                 
//                       <div className="plans-footer card-footer">
//                         <a className="btn-Signup" href="https://www.tradershub.ninja/contact" type="submit">
//                         Contact Us
//                         </a>
//                       </div>
                    

//               </form>
//             </div>

//             <div
//               className="col-xl-4 col-lg-4 col-md-6 d-flex flex-column mb-3"
//               data-aos="zoom-in-up"
//             >
//               <form
//                 // onSubmit={(e) => onSubmit(e, "/register/pro_new_key/27.99/month")}
//                 className="plan_table_list text-center flex-grow-1 card"
//               >
//                 <div className="card-body p-0">
//                   <div className="top-plan-inner">
//                     <h3>Pro Plan</h3>
//                     <div className="rates">
//                       <span className="plan_prices">
//                         <span>$</span> 29.99
//                       </span>
//                       <p className="users">/ Month</p>
//                     </div>
//                   </div>
//                   <ol className="plan-list-text">
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i>{" "}
//                       <b>Everything from the Basic Plan </b>
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Alpha
//                       Alert's(Swing)
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> TradersHub
//                       Alert's (DayTrading : Options){" "}
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Insightful
//                       Investor Alert's(Long Term)
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Top 3
//                       TradingView indicators{" "}
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Website Access
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Quick Response
//                       in Group
//                     </li>
//                   </ol>
//                 </div>
//                 {/* {user ? (
//                   <div className="plans-footer card-footer px-0">
//                     <button className="btn-Signup" type="submit">
//                       Buy Now
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="plans-footer card-footer">
//                     <button className="btn-Signup" type="submit">
//                       Signup
//                     </button>
//                   </div>
//                 )} */}
//                       <div className="plans-footer card-footer">
//                         <a className="btn-Signup"
//                          href="https://www.patreon.com/checkout/TradersHubNinja?rid=22545916" 
//                          type="submit">
//                           Signup
//                         </a>
//                       </div>
                    
//               </form>
//             </div>

//             <div
//               className="col-xl-4 col-lg-4 col-md-6 d-flex flex-column mb-3"
//               data-aos="zoom-in-up"
//             >
//               <form
//                 // onSubmit={(e) => onSubmit(e, "/register/yearly_new_key/299.99/yearly")}
//                 className="plan_table_list text-center flex-grow-1 card"
//               >
//                 <div className="card-body p-0">
//                   <div className="top-plan-inner">
//                     <h3>Yearly Plan </h3>
//                     <div className="rates">
//                       <span className="plan_prices">
//                         <span>$</span> 299.99
//                       </span>
//                       <p className="users">/ Year</p>
//                     </div>
//                   </div>
//                   <ol className="plan-list-text">
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i>{" "}
//                       <b>Everything from Pro Plan </b>
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Quick Response
//                       In 1-1 Chat{" "}
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Live Classes of
//                       30 Hour's
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> Early Features
//                       Releases{" "}
//                     </li>
//                     <li className="check">
//                       <i className="fa-solid fa-check mr-1"></i> +3 Indicator
//                       Access
//                     </li>
//                   </ol>
//                 </div>
//                 {/* {user ? (
//                   <div className="plans-footer card-footer px-0">
//                     <button className="btn-Signup" type="submit">
//                       Buy Now
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="plans-footer card-footer">
//                     <button className="btn-Signup" type="submit">
//                       Signup
//                     </button>
//                   </div>
//                 )} */}

//                       <div className="plans-footer card-footer">
//                         <a className="btn-Signup"
//                          href="https://www.patreon.com/TradersHubNinja/shop/yearly-plan-148554?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=productshare_creator&utm_content=join_link" 
//                         type="submit">
//                           Signup
//                         </a>
//                       </div>
                   
//               </form>
//             </div>

//             <div
//               className="col-xl-12 col-lg-12 col-md-12 d-flex flex-column mb-3"
//               data-aos="zoom-in-up"
//             >
//               <form
//                 // onSubmit={(e) =>
//                 //   onSubmit(e, "/register/lifetime_new_key/1499.00/lifetime")
//                 // }
//                 className="plan_table_list  text-center flex-grow-1 card bg-img-none"
//               >
//                 <div className="card-body p-0">
//                   <div className="row align-items-center">
//                     <div className="top-plan-inner mb-0 col-lg-5">
//                       <h3>Life Long Plan</h3>
//                       <div className="rates">
//                         <div className="d-flex justify-content-center">
//                           {/* <s className="plan_prices discount_prices">
//                             <span>$</span> 1799.00{" "}  1499.00 to 
//                           </s> */}
//                           <span className="plan_prices">
//                             <span>$</span> 2999.99{" "}
//                           </span>
//                         </div>
//                         <p className="users"> /Life Time</p>
//                       </div>
//                     </div>
//                     <ol className="plan-list-text col-lg-5 mb-0">
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i>{" "}
//                         <b>Everything from the Yearly Plan</b>
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> Personal
//                         Financial Planner.
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> 1-1 Live
//                         Calls/Chat
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> Personal 1-1
//                         Education Session
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> Q&A With all
//                         our Analysts/month
//                       </li>
//                     </ol>
//                     {/* <div className="col-md-2">
//                       {user ? (
//                         <div className="plans-footer card-footer px-0">
//                           <button className="btn-Signup"   type="submit">
//                             Buy Now
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="plans-footer card-footer">
//                           <a className="btn-Signup" href="https://www.patreon.com/TradersHubNinj...=join_link"type="submit">
//                             Signup
//                           </a>
//                         </div>
//                       )}
//                     </div> */}
//                     <div className="col-md-2">
//                       <div className="plans-footer card-footer">
//                         <a className="btn-Signup"
//                          href="https://www.patreon.com/TradersHubNinja/shop/lifetime-plan-148560?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=productshare_creator&utm_content=join_link"
//                          type="submit">
//                           Signup
//                         </a>
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </form>
//             </div>

//             <div
//               className="col-xl-12 col-lg-12 col-md-12 d-flex flex-column mb-3"
//               data-aos="zoom-in-up"
//             >
//               <form
//                 // onClick={handleContact}
//                 className="plan_table_list  text-center flex-grow-1 card bg-img-none"
//               >
//                 <div className="card-body p-0">
//                   <div className="row align-items-center">
//                     <div className="top-plan-inner mb-0 col-lg-5">
//                       {/* <h3>Custom Plan</h3> */}
//                       <div className="rates">
//                         <span className="plan_prices">
//                           <span></span> Custom Plan{" "}
//                         </span>
//                         <p> Contact Us: marketing@tradershub.ninja</p>
//                       </div>
//                     </div>
//                     <ol className="plan-list-text col-lg-5 mb-0">
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> Sub-Domain
//                         With your company name
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> Customize
//                         your own plan
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> Customize
//                         Your Log / Brand
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> Easy Access
//                         to your Team{" "}
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> Everything In
//                         One Place
//                       </li>
//                       <li className="check">
//                         <i className="fa-solid fa-check mr-1"></i> You plan, we
//                         care about you
//                       </li>
//                     </ol>
//                     <div className="col-md-2">
//                       <div className="plans-footer card-footer">
//                         <a className="btn-Signup" href="/register/custom/0/0" type="submit">
//                           Signup
//                         </a>
//                       </div>
//                       {/* {user ? (
//                         <div className="plans-footer card-footer px-0">
//                           <button className="btn-Signup" type="button">
//                             Buy Now
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="plans-footer card-footer">
//                           <button className="btn-Signup" type="button">
//                             Signup
//                           </button>
//                         </div>
//                       )} */}
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//       <AboutFooter />
//     </>
//   );
// };

// export default PricingPlans;
