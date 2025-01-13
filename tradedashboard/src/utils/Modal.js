import moment from "moment";
import React, { useState, useEffect, useRef, useHistory } from "react";
import { useNavigate } from "react-router-dom";


const Modal = () => {


  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const skipRef = useRef(null);

  useEffect(() => {
    // Access the DOM element using the ref
    const SkipElement = skipRef.current;
    const buttonElement = buttonRef.current;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isFirstLogin = user?.first_login;

    const currentDate = moment().tz("America/New_York");

    // Parse the plan end date string
    const planEndDateString = user?.plan_end_date;
    const planEndDate = moment(planEndDateString).tz("America/New_York");

    // Compare the dates
    if (currentDate.isAfter(planEndDate)) {
      console.log("Plan has expired!");
      SkipElement.click();
    } else {
      console.log("Plan is still active.");
    }

    if (buttonElement && isFirstLogin) {
      buttonElement.click();
    }
  }, []);
  const handleCloseModal = () => {
    // Navigate to trade page using history.push()
    navigate("/todays-market"); // Replace with your actual trade page path
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#WelcomeModal1"
        ref={skipRef}
        style={{ display: "none" }}
      >
        backdrop modal
      </button>
      <div
        className="modal fade WelcomeModal_section_hp expiry_free_modal_hp"
        id="WelcomeModal1"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="WelcomeModalLabel"
        aria-hidden="true "
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <div className="row align-items-stretch">
                <div className="col-xl-12 col-lg-12 col-md-12 m-auto">

                  <button
                    type="button"
                    className="close_btn"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal} // Added click handler for closure
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>

                  <div className="welcome_content_Area">
                    <div className="WelcomeModal_Content">
                      <h1>Your free trial has expired</h1>

                      <p className="mt-3 mb-1">
                        Dear user, your free trial has concluded. To continue
                        enjoying our services, please consider subscribing to a
                        paid plan. Unlock exclusive features and seamless
                        experiences. Thank you for trying our platform. We look
                        forward to having you as a valued member.
                      </p>

                      <div className="d-flex align-items-center justify-content-center mt-4">
                        <a href="/PricingPlans">
                          <button className="btn btn_main2_hp">Buy Now</button>
                        </a>
                      </div>



                    </div>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal