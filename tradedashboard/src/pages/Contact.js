import React, { useEffect, useRef, useState } from "react";
import NavTop from "../components/nav/NavTop";

import AboutFooter from "../components/footer/AboutFooter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postContactform } from "../services/DashboardServices";
import { AxiosError } from "axios";
import { newsLetterSubscribe } from "../services/DashboardServices";
import ReactGA from "react-ga4";
import welcome_SideImg from "../assets/img/background/Login_slider2.jpg"


const schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  number: Yup.string()
    .trim()
    .matches(/^[1-9]\d{0,14}$/, {
      message: "Number must be up to 15 digits",
    })
    .required("Number is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  subject: Yup.string()
    .trim()
    .required("Subject is required")
    .max(100, "Subject cannot exceed 100 characters"),
  message: Yup.string()
    .trim()
    .required("Message is required")
    .max(500, "Message cannot exceed 500 characters"),
});

const Contact = () => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const buttonRef = useRef(null);
  const skipRef = useRef(null);



  const validateEmail = (input) => {
  
    const emailRegex = /^[0-9a-z]+(?:\.[0-9a-z]+)*@[a-z0-9]{2,}(?:\.[a-z]{2,})+$/;

    if (!input) {
      setError('Email cannot be empty');
      return false;
    } else if (!emailRegex.test(input)) {
      setError('Please enter a valid email address');

      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleSubscription = async () => {
    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);
    try {
      const res = await newsLetterSubscribe(email);
      if (res.status == 200) {
        setLoading(false);
        setEmail("");
        setSuccess("News-letter successfully subscribed.");
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
        
          ReactGA.event(event_name, event_params);
        };
        TrackGoogleAnalyticsEvent(
          "Subscribe-page",
          "Subscribe_" + email.split('@')[0],
          window.location.pathname + window.location.search,
          {}
        );
        setTimeout(() => {
          skipRef.current.click();
        }, 500);
      }
      setLoading(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response.status == 409) {
          setError("Email already subscribe.");
          setLoading(false);

          return;
        }
      }
      setError("News-letter subscription failed.");
      setLoading(false);
    }
  };

  useEffect(() => {
   
    const buttonElement = buttonRef.current;


    if (buttonElement && !sessionStorage.getItem("firstVisit")) {
      sessionStorage.setItem("firstVisit", true);

      buttonElement.click();
    }
  }, []);


  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const postContactData = async (data) => {
      try {
        const response = await postContactform(data);

        if (response.status === 200) {
          console.log("Post successful:", response?.data);
          reset();
        } else {
          console.log("Post failed with status:", response?.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

   
    postContactData(data);
  };

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href="https://staging.tradershub.ninja/contact/"
        />
        <title>
          Contact Us for the Best Online Trading Courses and Education
        </title>
        <meta
          name="description"
          content="Reach out to us with any inquiries about the best trading 
courses online and top-notch trading education. Whether you're seeking information on trading
 education websites or looking for courses near you, our team is here to assist you. Connect 
 with us for a knowledgeable and personalized trading journey."
        />
      </Helmet>
      <main>
        <NavTop />
      </main>

      <section className="container-fluid other_page_hero_Section_hp">
        <div className="container">
          <div className="breadcrumb-title text-center" data-aos="zoom-in-up">
            <h2 className="font-weight-bold">
              Contact us to explore the possibilities and get in touch with our
              team at TradersHub.
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

                  <li className="breadcrumb-items">
                    <a
                      href="/contact"
                      className="font-weight-bold text-white text-decoration-none"
                    >
                      {" "}
                      Contact Us{" "}
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

     
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#WelcomeModal"
        ref={buttonRef}
        style={{ display: "none" }}
      >
        Launch static backdrop modal
      </button>

      <section
        className="container-fluid my-5 Zoom_scheduler_section_hp"
        data-aos="zoom-in-up"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://scheduler.zoom.us/tradershub-ninja/tradershub1-1?embedStyle=%7B%22buttonColor%22%3A%22%23ec0ecf%22%7D&embed=true"
                frameBorder="0"
                style={{ width: "100%", height: "560px" }}
                title="Zoom Scheduler"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid contact_info_section_hp my-5">
        <div className="container">
          <div className="row align-items-stretch">
            <div
              className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
              data-aos="zoom-in-up"
            >
              <div className="contact_info_item">
                <div className="contact_info_item_icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact_info_item_content">
                  <h4>Address</h4>
                  <p>
                    Earth For Now!
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
              data-aos="zoom-in-up"
            >
              <div className="contact_info_item">
                <div className="contact_info_item_icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="contact_info_item_content">
                  <h4>Email</h4>
                  <a href="mailto:marketing@tradershub.ninja">
                    marketing@tradershub.ninja
                  </a>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
              data-aos="zoom-in-up"
            >
              <div className="contact_info_item">
                <div className="contact_info_item_icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contact_info_item_content">
                  <h4>Phone</h4>
                  <a href="tel:9346164136">+91 93461-64136</a>
                  <br />
                  <small className="text-light">
                    Operates Business hours : 24*7
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid contact_form_section my-5">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-6 col-lg-7 col-md-10 col-12 m-auto"
              data-aos="zoom-in-up"
            >
              <div className="Section_heading_area_hp">
                <h1>Contact Form</h1>
                <p>
                  Start trading with us by opening an account, funding it,
                  familiarizing yourself with the platform, and executing
                  informed trades.
                </p>
              </div>
            </div>
          </div>

          <form data-aos="zoom-in-up" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label for="">Name</label>
                  <input
                    type="text"
                    name="name"
                    id=""
                    className={`form-control ${errors.name ? "is-invalid" : ""
                      }`}
                    placeholder="Enter the Name"
                    aria-describedby="helpId"
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label for="">Number</label>
                  <input
                    type="number"
                    name="number"
                    id=""
                    className={`form-control ${errors.number ? "is-invalid" : ""
                      }`}
                    placeholder="Enter the Number"
                    aria-describedby="helpId"
                    {...register("number")}
                  />
                  {errors.number && (
                    <div className="invalid-feedback">
                      {errors.number.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label for="">Email</label>
                  <input
                    type="text"
                    name="email"
                    id=""
                    className={`form-control ${errors.email ? "is-invalid" : ""
                      }`}
                    placeholder="Enter the Email"
                    aria-describedby="helpId"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label for="">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id=""
                    className={`form-control ${errors.subject ? "is-invalid" : ""
                      }`}
                    placeholder="Enter the Subject"
                    aria-describedby="helpId"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <div className="invalid-feedback">
                      {errors.subject.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label for="">Messages</label>
                  <textarea
                    className={`form-control ${errors.message ? "is-invalid" : ""
                      }`}
                    role="4"
                    placeholder="Enter the Message"
                    {...register("message")}
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">
                      {errors.message.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-5 col-12 m-auto pt-3">
                <button type="submit" className="btn_main2_hp w-100">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section
        className="container-fluid mt-5 Customer_Support_section_hp"
        data-aos="zoom-in-up"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-7 col-md-6 col-12 mb-4">
              <div className="Customer_Support_content">
                <h3>Customer Support </h3>
                <p className="mb-0">
                  For any questions, concerns, or assistance related to our
                  platform, products, or services, our dedicated customer
                  support team is here to help. You can reach them via email or
                  phone:
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-6 col-12">
              <div className="d-flex align-items-center flex-wrap justify-content-end">
                <a
                  className="btn btn_main2_hp mx-2"
                  href="https://wa.me/message/4OKFYRZHK5OEF1"
                >
                  WhatsApp
                </a>
                <a
                  className="btn btn_main2_hp mx-2"
                  href="https://discord.gg/NAHwqvudAk"
                >
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutFooter />

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
      </div>

    </>
  );
};

export default Contact;
