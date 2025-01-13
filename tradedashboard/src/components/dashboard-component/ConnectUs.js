import React, { useEffect, useRef, useState } from "react";
import NavBottom from "../../components/nav/NavBottom/NavBottom";
import Side from "../../components/sidebar/side";
import { getDiscordChannels } from "../../services/DashboardServices";
import { json } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import Modal from "../../utils/Modal";

const ConnectUs = () => {
  const [discordUrl, setDiscordUrl] = useState();

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
       setIsModalOpen(true)
    } else {
      console.log("Plan is still active.");
    }
  }, []);
  var subscriptionType = localStorage.getItem("subscription_type");

  var referralCode = JSON.parse(localStorage.getItem('user')).referral_code

 const originWithReferral = `${window.location.origin}/register/lifetime/Trial-Version/free/?referral=${referralCode}`;





 const url=  JSON.parse(localStorage.getItem("user"));
 const discordU = url?.discord_url;


 
  const filteredDiscordUrls = discordUrl?.find(
    (item) => item.name === subscriptionType
  );
  let tweetUrl =
    "https://twitter.com/TradershubNinja/status/1715003156260614579";

  return (
    <>
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding connect_section_hp">
        <div className="container" style={{ maxWidth: "100%" }}>
          {/* Sidebar Section */}
          <Side />
          {/* Sidebar Section */}

          <div className="mb-4 content content_section_hp connect-page-kj">
            <div className="row  ">
              <div className="col-md-12 mb-3">
                <div className="card">
                  {/* <iframe
                       src="https://discord.com/invite/NAHwqvudAk" // Add the URL from your discordUrl array here
                    //  src={item.URL}
                      allowtransparency="true"

                      frameBorder="0"
                      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    ></iframe> */}
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12 mb-4">
                <h3 className="connect_socialMedia_heading Heading_content_hp">
                  social Media
                </h3>
              </div>

              <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
                <a
                  // href={
                  //   filteredDiscordUrls
                  //     ? filteredDiscordUrls?.URL
                  //     : "https://discord.com/invite/NAHwqvudAk"
                  // }
                  href={discordU}
                  className="connect_socialMedia_item"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <div className="connect_socialMedia_icon">
                    <i className="fa-brands fa-discord"></i>
                  </div>
                  <h4 className="p-0 m-0">Discord</h4>
                </a>
              </div>

              <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
                <a
                  href="https://www.instagram.com/tradershub_ninja"
                  className="connect_socialMedia_item text-decoration-none"
                  target="_BLANK"
                >
                  <div className="connect_socialMedia_icon">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <h4 className="p-0 m-0">Instagram</h4>
                </a>
              </div>

              <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100094610353536"
                  className="connect_socialMedia_item text-decoration-none"
                  target="_BLANK"
                >
                  <div className="connect_socialMedia_icon">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <h4 className="p-0 m-0">Facebook</h4>
                </a>
              </div>

              <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
                <a
                  href="https://www.youtube.com/channel/UCxNG-hyVwT72Zq6Nj4h-NyA"
                  className="connect_socialMedia_item  text-decoration-none"
                  target="_BLANK"
                >
                  <div className="connect_socialMedia_icon">
                    <i className="fa-brands fa-youtube"></i>
                  </div>
                  <h4 className="p-0 m-0">Youtube</h4>
                </a>
              </div>

              <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
                <a
                  href="https://twitter.com/TradershubNinja"
                  className="connect_socialMedia_item text-decoration-none"
                  target="_BLANK"
                >
                  <div className="connect_socialMedia_icon">
                    <i className="fa-brands fa-twitter"></i>
                  </div>
                  <h4 className="p-0 m-0">Twitter</h4>
                </a>
              </div>



              <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
                <a
    
                  className="connect_socialMedia_item text-decoration-none"
            style={{cursor:"pointer"}}
                >
                  <div className="connect_socialMedia_icon">
                  <i class="fa-solid fa-code"></i>

                  </div>
                  {/* <h4 className="p-0 m-0">{referralCode}</h4> */}

                  <div>
                  <p className="mb-0 referral_code">Referral Code</p>

                         <CopyToClipboard   className="p-0 m-0" text={originWithReferral} onCopy={() => toast.success('Copied!', { autoClose: 1000 })}>
                          <h4 className="p-0 m-0">{referralCode}</h4>
                         </CopyToClipboard>
                   </div>
                </a>
                <ToastContainer position="top-right" />
              </div>

              {/* <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
                  <div className="card">
                    <iframe
                      src="https://www.instagram.com/p/CxKX0EAvyST/embed/"

                      allowtransparency="true"
                      title="Instagram Post"
                    ></iframe>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
                  <div className="card"                >
                    <iframe
                      src={`https://twitframe.com/show?url=https://twitter.com/_/status/${tweetId}`}

                      allowTransparency="true"
                      title="Twitter Post"
                    ></iframe>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                  <div className="card" >
                    <iframe
                      title="YouTube Video"
                      src={`https://www.youtube.com/embed/L23fYEohhRQ`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                  <div className="card" >
                    <iframe
                      title="Twitch Stream"
                      src={`https://player.twitch.tv/?channel=tradershub_ninja&parent=localhost`}
                      frameBorder="0"
                      allowFullScreen
                      scrolling="no"

                    ></iframe>
                  </div>
                </div> */}
              <div className="col-md-4">
                {/* <div
                    style={{
                      position: "relative",
                      paddingBottom: "100%",
                      height: "350px",
                      overflow: "hidden",
                      maxWidth: "100%",
                    }}
                  >
                    <iframe
                      src={`https://twitframe.com/show?url=https://twitter.com/_/status/${tweetId}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency="true"
                      title="Twitter Post"
                    ></iframe>
                  </div> */}
              </div>
            </div>
          </div>
          {/* <div className="col-md-9  ml-6" style={{ marginLeft: "290px" }}>
               <div className="underconstruction">
                <img src={launching} alt="" />
                <h1 className="my-2">Launching Soon</h1>
                <h4 className="my-2">This page is under construction</h4>
              </div> 
            </div> */}
        </div>
      </div>
    </div>
    {  isModalOpen &&  < Modal/>}
    </>
  );
};

export default ConnectUs;
