import React, { useEffect, useState } from "react";

import loginSideImg from "../../assets/img/logo/Full_logo.png";
import Login_side_slider1 from "../.././assets/img/background/Login_side_slider1.jpg";
import Login_side_slider2 from "../.././assets/img/background/Login_side_slider2.jpg";
import Login_side_slider3 from "../.././assets/img/background/Login_side_slider3.jpg";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { postForgot } from "../../services/DashboardServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await postForgot({ email: data.email });
      if (response.status == 200) {
        setMessage("Password reset email sent. Check your inbox.");
        reset();
        sessionStorage.setItem("email", data.email);
        navigate("/VerifyOTP", {
          state: {
            email: data.email,
          },
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(
          error?.response?.data?.message ||
          "Error sending forgot password request:"
        );

        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage("Error sending forgot password request:");
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
                <img src={loginSideImg} onClick={()  => window.location.href="/"} className="login_page_logo" />
                <div className="w-100">
                  <h2 className="text-center mb-4 login_heading">
                    Forgot Password
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        {...register("email")}
                      />
                    </div>
                    {errors?.email && (
                      <p style={{ color: "red" }}>{errors?.email?.message}</p>
                    )}
                    {message && <p style={{ color: "red" }}>{message}</p>}

                    <button
                      type="submit"
                      className="slide-btn login-btn  btn btn-block  "
                    >
                      Forgot Password
                    </button>
                    <div id="msgSubmit" className="h3 text-center hidden"></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
