import React, { useState } from "react";

import loginSideImg from "../../assets/img/logo/Full_logo.png";
import Login_side_slider1 from "../.././assets/img/background/Login_side_slider1.jpg";
import Login_side_slider2 from "../.././assets/img/background/Login_side_slider2.jpg";
import Login_side_slider3 from "../.././assets/img/background/Login_side_slider3.jpg";
import OTPInput from "react-otp-input";
import { postVerifyCode } from "../../services/DashboardServices";
import {useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const VerifyPhoneOtp = () => {

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleVerify = async () => {
    try {

      if (!otp) {
        setMessage("Please enter OTP");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return;
      }
      const response = await postVerifyCode({ otp });

      if (response?.status == 200) {
        // OTP is valid
        navigate("/todays-market", {});
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(
          error?.response?.data?.message ||
            "Error sending Reset password request:"
        );
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage("Error sending OTP request:");
      }
    }
  };

  return (
    <section className="container-fluid Login_page_section_hp px-0">
      <div className="w-100 ">
        <div className="login_design_area">
          <div className="row align-content-stretch m-0">
            <div className="col-xl-4 col-lg-5 col-md-5 col-12 px-0">
              <div className=" Login_from_area">
                <img
                  src={loginSideImg}
                  onClick={() => (window.location.href = "/")}
                  className="login_page_logo"
                />
                <div className="w-100">
                  <h2 className="text-center mb-4 login_heading">Verify OTP</h2>

                  <form>
                    <div className="form-group">
                      <div className="OTP_Input_filde_area">
                    
                        <OTPInput
                          containerStyle={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                          inputStyle={{
                            width: "50px",
                            height: "50px",
                            border: "none",
                            textAlign: "center",
                            margin: "20px",
                          }}
                          value={otp}
                          onChange={setOtp}
                          numInputs={4}
                          renderInput={(props) => (
                            <input
                              {...props}
                              type="number"
                              className="form-control otp-input"
                              maxLength="1"
                            />
                          )}
                        />
                      </div>
                      {message && <p style={{ color: "red" }}>{message}</p>}
                    </div>

                    <button
                      type="button"
                      className="slide-btn login-btn btn btn-block"
                      onClick={handleVerify}
                    >
                      Verify
                    </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyPhoneOtp;
