import React, { useEffect, useRef, useState } from "react";
import launching from "../../assets/img/underconstruction/launching.png";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";
import UpdateProfile from "./UpdateProfile";
import WithAuth from "../auth/withAuth";
import moment from "moment";
import Modal from "../../utils/Modal";

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skipRef = useRef(null);

  useEffect(() => {
    // Access the DOM element using the ref
    const SkipElement = skipRef.current;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isFirstLogin = user?.first_login;

    const currentDate = moment().tz("America/New_York");

    // Parse the plan end date string
    const planEndDateString = user?.plan_end_date;
    const planEndDate = moment(planEndDateString).tz("America/New_York");

    // Compare the dates
    if (currentDate.isAfter(planEndDate)) {
      console.log("Plan has expired!");
      setIsModalOpen(true);
    } else {
      console.log("Plan is still active.");
    }
  }, []);

  return (
    <>
      <div>
      
        <NavBottom isStyleChanged />
        <div className="notify-overlay"></div>
        <div className="dashboard-area bg-color area-padding">
          <div className="container" style={{ maxWidth: "100%" }}>
            {/* Sidebar Section */}
            <Side />
            {/* Sidebar Section */}

            <div className="mb-4 content content_section_hp">
              <UpdateProfile />
           
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal />}
    </>
  );
};

export default WithAuth(Settings);
