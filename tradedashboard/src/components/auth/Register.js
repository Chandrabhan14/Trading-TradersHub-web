import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { AxiosError } from "axios";
import { useParams, useLocation } from "react-router-dom";
import * as yup from "yup";
import ReactGA from "react-ga4";

import loginSideImg from "../../assets/img/logo/Full_logo.png";

import Login_side_slider1 from "../.././assets/img/background/Login_side_slider1.jpg";
import Login_side_slider2 from "../.././assets/img/background/Login_side_slider2.jpg";
import Login_side_slider3 from "../.././assets/img/background/Login_side_slider3.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import apiHandle from "../../services/ApiHandle";

const Register = () => {


  const search = useLocation().search;
  const name = new URLSearchParams(search).get('referral');

  const [referralCode, setReferralCode] = useState(name || "");

  useEffect(() => {
    // Set the referral code in your form when it's available in the params
    setReferralCode(name || "");
    console.log(name, "---------------.>")

  }, [name]);



  console.log(name, "---------------.>")
  const schema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z0-9]+$/, "Username should not contain spaces or special symbols")
      .required("Username is required")
      .min(3, "Username should be at least 3 characters")
      .max(20, "Username should not exceed 20 characters"),

    email: yup.string().trim().email('Invalid email format').max(55, "Email should not exceed 55 characters")
      .matches(/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email format"),
    // .matches(/^[^\s`]+@[^\s`]+\.[^\s`]+$/, 'Invalid email format'),

    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),

    referral: yup
      .string()
      .trim()
      .min(4, " referral code must have 4 digit")
      .max(12, " referral code must not have more than 12 digit"),

      Organisation: yup
      .string()
      .trim()
      .matches(/^[a-z]+$/, 'No special/Capital letter allowed')


  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { username, email, password, confirmPassword } = watch();
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  let { lookupkey, price, validity } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    try {
      let response = await apiHandle.post(`${apiUrl}/signup`, data);

      if (response.status == 200) {
        if (response.data.statusCode == 200) {
          if (price !== "Trial-Version") {
            const checkoutResponse = await apiHandle.post(
              `${apiUrl}/api/create_checkout_session?lookup_key=${lookupkey}&email=${data.email}`,
              null,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  // Authorization: `Bearer ${token}`,
                },
              }
            );

            if (
              checkoutResponse.status === 200 &&
              checkoutResponse.data?.checkout_url
            ) {
              window.location.href = `${checkoutResponse.data.checkout_url}`; // Redirect the user
            }
            return;
          } else {
            sessionStorage.setItem("email", data.email);
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
              "Register-page",
              "Register_" + data.username,
              window.location.pathname + window.location.search,
              {}
            );

            window.location.href = "/signup-verification";
            reset();
            return;
          }
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message || "Signup failed.");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      setError("Registration failed");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    // Use setTimeout for a 5-second delay

  };

  return (
    <>
      <div id="preloader"></div>

      <section className="container-fluid Login_page_section_hp px-0">
        <div className="w-100 ">
          <div className="login_design_area">
            <div className="row align-content-stretch m-0">
              <div className="col-xl-4 col-lg-5 col-md-5 col-12 px-0">
                <div className=" Login_from_area">
                  <img src={loginSideImg} onClick={() => window.location.href = "/"} className="login_page_logo" />
                  <div className="w-100">
                    <h2 className="text-center mb-4 login_heading">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="Register_form_field_area mb-2">
                        <div className="form-group">
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Username"
                            data-error="Please enter your name"
                            {...register("username")}
                          />

                          {errors.username && (
                            <span className="text-danger">
                              {errors.username.message}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <input
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            data-error="Please enter your email"
                            {...register("email")}
                          />

                          {errors.email && (
                            <span className="text-danger">
                              {errors.email.message}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            id="msg_subject"
                            className="form-control"
                            placeholder="Password"
                            {...register("password")}
                          />
                          {errors.password && (
                            <span className="text-danger">
                              {errors.password.message}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            id="cmsg_subject"
                            className="form-control"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                          />
                          {errors.confirmPassword && (
                            <span className="text-danger">
                              {errors.confirmPassword.message}
                            </span>
                          )}
                        </div>

                       
                        { lookupkey !== "custom" && ( <div className="form-group">
                        <input
                          type="number"
                          onKeyDown={(e) =>
                            ["e", "E", "+", "-", "."].includes(e.key) &&
                            e.preventDefault()
                          }
                          id="cmsg_subject"
                          className="form-control"
                          placeholder="referral"
                          defaultValue={referralCode}
                          {...register("referral_code")}
                        />
                        {errors.referral && (
                          <span className="text-danger">
                            {errors.referral.message}
                          </span>
                        )}
                      </div> )}





                     { lookupkey == "custom" && ( 
                      <>
                     <div className="form-group">
                          <input
                            type="text"
                            id="Organisation"
                            className="form-control"
                            placeholder="Organization name"
                            {...register("Organisation")}

                          />
                          {errors.Organisation && (
                            <span className="text-danger">
                              {errors.Organisation.message}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Choose Logo</label>
                          <input
                            type="file"
                            id="logo"
                            className="form-control"
                            placeholder="logo"
                            style={{ padding: "3px 10px" }}
                          />
                        </div> </>
                        )}

                      </div>

                      {price !== "Trial-Version" && (
                        <div className="d-flex justify-content-start align-items-center mb-3">
                          <label className="text-dark" htmlFor="cars">
                            Selected Plan:
                          </label>
                          <h6 className="mx-2">
                            {" "}
                            ( ${price}/{validity} ){" "}
                          </h6>
                        </div>
                      )}

                      <div class="form-check Terms_Conditions_checkBox">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            name=""
                            id=""
                            value={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                          />
                          Terms & Conditions
                        </label>
                      </div>

                      <button
                        type="submit"
                        id="submit"
                        className="slide-btn login-btn btn btn-block"
                        disabled={!termsAccepted || Object.keys(errors).length > 0 || !username ||
                          !email ||
                          !password ||
                          !confirmPassword
                        }

                      >
                        Sign up
                      </button>

                      {error && (
                        <div
                          id="msgSubmit"
                          className="h6 mt-2 text-center hidden text-danger"
                        >
                          {error}
                        </div>
                      )}
                      <div className="clearfix"></div>
                      <div className="clear"></div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-7 col-12 px-0 login_side_img">
                <div
                  id="carouselExampleIndicators"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <ol class="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      class="active"
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
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <div className="DailyLevel_shares_listContent_itme_img">
                        <img src={Login_side_slider1} />
                      </div>
                    </div>
                    <div class="carousel-item">
                      <div className="DailyLevel_shares_listContent_itme_img">
                        <img src={Login_side_slider2} />
                      </div>
                    </div>
                    <div class="carousel-item">
                      <div className="DailyLevel_shares_listContent_itme_img">
                        <img src={Login_side_slider3} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
