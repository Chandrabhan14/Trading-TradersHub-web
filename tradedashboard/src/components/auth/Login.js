import React, { useEffect, useState } from "react";
import axios from "axios";
import { PiDiscordLogoDuotone } from "react-icons/pi";
import { useNavigate, Link } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import {
  GoogleLoginButton,
  DiscordLoginButton,
} from "react-social-login-buttons";
import { useLocation } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import loginSideImg from "../../assets/img/logo/Full_logo.png";
import { v4 as uuidv4 } from "uuid";
import ReactGA from "react-ga4";
import { useSelector, useDispatch } from 'react-redux'

import {setUser} from "../store/Reducers";
import Login_side_slider1 from "../.././assets/img/background/Login_side_slider1.jpg";
import Login_side_slider2 from "../.././assets/img/background/Login_side_slider2.jpg";
import Login_side_slider3 from "../.././assets/img/background/Login_side_slider3.jpg";
import { useAuth } from "./useAuth";
import apiHandle from "../../services/ApiHandle";

const Login = () => {
  const newGuid = uuidv4();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuth();
  const[loading,setLoading]= useState(false);
  const dispatch = useDispatch();

  if(user){
     window.location.href = "/todays-market"
  }
   
    const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiHandle.post("/login", {
        email,
        password,
      });
      if (response?.data && response?.data?.statusCode === 200) {
        const {
          statusCode,
          uid,
          plan_end_date,
          subscription_type,
          username,
          email,
        } = response?.data?.data;
        // Store the data in localStorage
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("status", statusCode);
        localStorage.setItem("uid", uid);
        localStorage.setItem("subscription_type", subscription_type);
        localStorage.setItem("plan_end_date", plan_end_date);
        dispatch(setUser(response?.data?.data))
        setLoading(false);

        // //Custom event on login  page
        const TrackGoogleAnalyticsEvent = (
          category,
          event_name,
          label,
          data
        ) => {
          console.log("GA event:", category, ":", event_name, ":", label);
          let event_params = {
            category,
            label,
            ...data,
          };
          // Send GA4 Event
          ReactGA.event(event_name, event_params);
        };
        TrackGoogleAnalyticsEvent(
          "Login_page",
          // Register_"+data.username//
          "Login_"+username,
          window.location.pathname + window.location.search,
          {}
        );
        // Redirect the user or perform other actions
        navigate("/todays-market");
      }
      localStorage.setItem("googledata", JSON.stringify(response?.data?.data));
    } catch (error) {
      setLoading(false)
      setError("Invalid credentials");
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const { access_token } = response?.data; // Access the access_token from the response

      // Set up the request headers
      const headers = {
        Authorization: `Bearer ${access_token}`,
        // "Content-Type": "application/json", // You can change the content type if needed
      };

      // Send the request to the backend using axios with the access_token in the header
      const backendResponse = await axios.post(
        "https://api.tradershub.ninja/google_signin",
        {}, // Empty object since we are sending the access_token in the header
        {
          headers: headers,
        }
      );
      console.log(backendResponse, "backendresponse");
      if (backendResponse?.data?.status === "Verified") {
        setIsVerified(true);
  

        const sessionid = backendResponse.headers["sessionid"];
        const csrfttoken = backendResponse.headers["csrfttoken"];
        console.log("Response Headers:", backendResponse.headers);

        console.log("Session ID:", sessionid);
        console.log("CSRF Token:", csrfttoken);

        localStorage.setItem(
          "googledata",
          JSON.stringify(backendResponse?.data)
        );
        localStorage.setItem("status", response.data.statusCode);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("uid", response.data.uid);
        localStorage.setItem(
          "subscription_type",
          response.data.subscription_type
        );

        localStorage.setItem("plan_end_date", response.data.plan_end_date);
        console.log("API Response:", response.data);

        // Navigate to Watchlist component and pass sessionid and csrfttoken as props
        navigate("/todays-market", { state: { sessionid, csrfttoken, headers } });
      } else {
        // If the user is not verified, set the state and redirect to the register page
        setIsVerified(false);
        navigate("/register");
      }
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  return (
    <>
      

      <section className="container-fluid Login_page_section_hp px-0">
        <div className="w-100 ">
          <div className="login_design_area">
            <div className="row align-content-stretch m-0">
              <div className="col-xl-4 col-lg-5 col-md-5 col-12 px-0">
                <div className=" Login_from_area">
                  <img src={loginSideImg} onClick={()=> window.location.href ="/"} className="login_page_logo" />
                  <div className="w-100">
                    <h2 className="text-center mb-4 login_heading">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="d-flex align-items-center">
                          <input type="checkbox" id="RememberMe" />
                          <label
                            for="RememberMe"
                            className="w-100 d-block mb-0 ml-2 font-weight-normal"
                          >
                            Remember me
                          </label>
                        </div>
                        <Link
                          className="linka  text-right"
                          to="/ForgetPassword"
                        >
                          Forgot Password?{" "}
                        </Link>
                      </div>
                      
                                {loading ? (
                                  <div className="text-center">

                                    <div className="spinner-border mt-3 text-center" role="status"></div>
                                  </div>
      ) : (
        <button
          type="submit"
          className="slide-btn login-btn btn btn-block"
        >
          Login
        </button>)}
                      <div
                        id="msgSubmit"
                        className="h3 text-center hidden"
                      ></div>
                      <div className="clearfix"></div>
                      <div className="clear"></div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-7 col-12 px-0 login_side_img">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="DailyLevel_shares_listContent_itme_img">
                        <img src={Login_side_slider1} />
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="DailyLevel_shares_listContent_itme_img">
                        <img src={Login_side_slider2} />
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="DailyLevel_shares_listContent_itme_img">
                        <img src={Login_side_slider3} />
                      </div>
                    </div>
                  </div>
                  {/* <button className="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
