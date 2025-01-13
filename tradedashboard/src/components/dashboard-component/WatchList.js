import React, { useState, useEffect, useRef } from "react";
import Side from "../sidebar/side";
import welcome_SideImg from "../../assets/img/background/Login_slider1.png";
import NavBottom from "../nav/NavBottom/NavBottom";
import { getWatchLista } from "../../services/UserServices";
import axios from "axios";
import Table from "../fields/Table";
import { getDiscordChannels, postDaily } from "../../services/DashboardServices";
import { USERTYPES } from "../../utils/enum";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { getFearAndGreed } from "../../services/DashboardServices";

import GaugeComponent from "react-gauge-component";
import html2canvas from "html2canvas";
import thl3 from "../../assets/img/logo/thl3.png";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import Modal from "../../utils/Modal";
import TableOne from "../fields/TableOne";

const apiUrl = process.env.REACT_APP_API_URL;

const WatchList = (props) => {
  const [watchList, setWatchList] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sessionid, csrfttoken, headers } = props;
  const [userData, setUserData] = useState(null);
  const [discordUrl, setDiscordUrl] = useState();
  var subscriptionType = localStorage.getItem("subscription_type");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [fearAndGreedData, setFearAndGreedData] = useState({});
  const navigate = useNavigate();



  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://3.128.172.201:5000/watchlist_ws/",
    {
      onOpen: () => console.log("watchlist  opened"),
  
      shouldReconnect: (closeEvent) => true,
    }
  );

  const url = JSON.parse(localStorage.getItem("user"));
  const discordUr = url?.discord_url;
  console.log("Discord URL:", discordUr);

  const filteredDiscordUrls = discordUrl?.find((item) => {
  
    return item.name == USERTYPES.LIFETIME;
  });

  const getWatchList = async () => {
    try {
      const result = await getWatchLista();
      setWatchList(result?.data?.data);
    } catch (error) {
      setWatchList([]);
      console.log(error);
    }
  };
  const handleScreenshot = () => {
    const element = document.getElementById("capture"); 
    element.style.backgroundColor = "#010033";
    html2canvas(element)
      .then((canvas) => {
        const dataUrl = canvas.toDataURL();
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "screenshot.png";
        a.click();
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
      });
  };

  const fetchData = async () => {
    try {
      const googleData = JSON.parse(localStorage.getItem("googledata"));
      const uid = googleData?.uid;
      if (uid) {
        const response = await axios.get(
          `${apiUrl}/api/admin_data?uid=${uid}&limit=10&page=${page}`
        );
        setData(response?.data?.data.results);
        setTotalCount(response?.data?.data?.total_count);
      } else {
        console.log("UID not available in localStorage");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      const dataString = localStorage.getItem("googledata");
      const userDataFromLocalStorage = JSON.parse(dataString);
      const uid = userDataFromLocalStorage?.uid;
      // console.log(messages, "messagaes from watchlist---");
      const message = {
        user: uid ? uid : "Anonymous",
        content: "Automatic message from Watchlist component",
      };

      sendJsonMessage(message);
    }, 10000);
    getWatchList();
    fetchData();
  }, []);

  useEffect(() => {
  
    if (lastJsonMessage) {
      const updatedWatchList = watchList.map((item) => {
        if (
          item?.symbol?.toLowerCase() === lastJsonMessage?.symbol?.toLowerCase()
        ) {
          item.price = lastJsonMessage?.price;
          item.change = lastJsonMessage?.change;
          item.changesPercentage = lastJsonMessage?.change_perc;
          return item;
        }
        return item;
      });
      setWatchList(updatedWatchList);
    }
  }, [lastJsonMessage]);

  const buttonRef = useRef(null);


  useEffect(() => {
 
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
      setIsModalOpen(true)
      // SkipElement.click();
    } else {
      console.log("Plan is still active.");
    }

    if (buttonElement && isFirstLogin) {
      buttonElement.click();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFearAndGreed();
        setFearAndGreedData(response?.data?.data?.data);
      } catch (error) {
        console.error("Error fetching fear and greed data:", error);
      }
    };

    fetchData();
  }, []);



  


  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid">
          <Side />

          <div className=" mb-4 content content_section_hp">
            {/* <!-- First Table --> */}
            <div className="row mb-3">
              <div id="subscription-status" className="col-4 d-flex" w>
                <h3
                  className="btn btn_main_hp active"
                  onClick={() => navigate("/watchlist")}
                >
                  Daily 
                </h3>
                <h3
                  className="btn btn_main_hp"
                  onClick={() => navigate("/Jcoop")}
                >
                  JCOOP
                </h3>
                <h3
                  className="btn btn_main_hp ml-3"
                  onClick={() => navigate("/Livi")}
                >
                  Livi
                </h3>

                <h3
                  className="btn btn_main_hp ml-3"
                  onClick={() => navigate("/Others")}
                >
                  Others
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 mb-4 col-lg-12 tab">
                <div>
                  <h2 className="watchlisthead Heading_content_hp">
                    Daily Watchlist
                  </h2>

                  <div
                    className="table-responsive tabalignn custom-table"
                    style={{
                      backgroundColor: "#020134",
                 
                      borderTop: "none",
                      borderRadius: " 0 0 10px 10px",
                    }}
                  >
                    <TableOne  postItem={getWatchList}  listItems={watchList} />
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="watchlisthead Heading_content_hp d-flex align-items-center justify-content-between ">
                    Fear and greed
                    <div className="Calender_Screenshot_area">
                      <button
                        onClick={handleScreenshot}
                        className="btn btn_main2_hp"
                        title="Screenshot"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <path d="M22.2402 8H39.0002C39.2655 8 39.5198 8.10536 39.7073 8.29289C39.8949 8.48043 40.0002 8.73478 40.0002 9V10.31C40.0002 10.5752 40.1056 10.8296 40.2931 11.0171C40.4807 11.2046 40.735 11.31 41.0002 11.31C41.2655 11.31 41.5198 11.2046 41.7073 11.0171C41.8949 10.8296 42.0002 10.5752 42.0002 10.31V8H45.0002C45.2655 8 45.5198 7.89464 45.7073 7.70711C45.8949 7.51957 46.0002 7.26522 46.0002 7C46.0002 6.73478 45.8949 6.48043 45.7073 6.29289C45.5198 6.10536 45.2655 6 45.0002 6H42.0002V3C42.0002 2.73478 41.8949 2.48043 41.7073 2.29289C41.5198 2.10536 41.2655 2 41.0002 2C40.735 2 40.4807 2.10536 40.2931 2.29289C40.1056 2.48043 40.0002 2.73478 40.0002 3V6H22.2402C21.975 6 21.7207 6.10536 21.5331 6.29289C21.3456 6.48043 21.2402 6.73478 21.2402 7C21.2402 7.26522 21.3456 7.51957 21.5331 7.70711C21.7207 7.89464 21.975 8 22.2402 8ZM22.7602 19C22.7602 20.0364 23.0676 21.0495 23.6433 21.9112C24.2191 22.7729 25.0375 23.4445 25.995 23.8411C26.9525 24.2377 28.006 24.3415 29.0225 24.1393C30.039 23.9371 30.9726 23.4381 31.7055 22.7052C32.4383 21.9724 32.9374 21.0387 33.1396 20.0223C33.3417 19.0058 33.238 17.9522 32.8414 16.9947C32.4448 16.0373 31.7731 15.2189 30.9114 14.6431C30.0497 14.0673 29.0366 13.76 28.0002 13.76C26.6113 13.7626 25.28 14.3156 24.2979 15.2977C23.3158 16.2798 22.7629 17.6111 22.7602 19ZM31.2402 19C31.2402 19.6408 31.0502 20.2672 30.6942 20.8C30.3382 21.3329 29.8322 21.7481 29.2401 21.9934C28.6481 22.2386 27.9966 22.3028 27.3681 22.1777C26.7396 22.0527 26.1623 21.7441 25.7092 21.291C25.2561 20.8379 24.9475 20.2606 24.8225 19.6321C24.6975 19.0036 24.7616 18.3521 25.0069 17.7601C25.2521 17.1681 25.6674 16.6621 26.2002 16.306C26.733 15.95 27.3594 15.76 28.0002 15.76C28.8587 15.7626 29.6813 16.1048 30.2883 16.7119C30.8954 17.3189 31.2376 18.1415 31.2402 19Z" />
                          <path d="M45 40H42V15.61C42 15.3448 41.8946 15.0904 41.7071 14.9029C41.5196 14.7154 41.2652 14.61 41 14.61C40.7348 14.61 40.4804 14.7154 40.2929 14.9029C40.1054 15.0904 40 15.3448 40 15.61V30.07L38 27.44C37.7148 27.077 37.3544 26.78 36.9436 26.5694C36.5327 26.3588 36.0812 26.2396 35.62 26.22C35.1512 26.1947 34.6824 26.2709 34.2457 26.4435C33.809 26.6161 33.4148 26.881 33.09 27.22L29 31.49C28.8805 31.6149 28.7369 31.7144 28.578 31.7823C28.419 31.8502 28.2479 31.8853 28.075 31.8853C27.9021 31.8853 27.731 31.8502 27.572 31.7823C27.4131 31.7144 27.2695 31.6149 27.15 31.49L22.74 26.2C22.4508 25.8641 22.0956 25.5914 21.6965 25.3987C21.2974 25.206 20.8629 25.0975 20.42 25.08C19.9752 25.0605 19.5312 25.1321 19.1151 25.2903C18.6989 25.4485 18.3195 25.69 18 26L8 35.82V24.43C8 24.1648 7.89464 23.9104 7.70711 23.7229C7.51957 23.5354 7.26522 23.43 7 23.43C6.73478 23.43 6.48043 23.5354 6.29289 23.7229C6.10536 23.9104 6 24.1648 6 24.43V40H3C2.73478 40 2.48043 40.1054 2.29289 40.2929C2.10536 40.4804 2 40.7348 2 41C2 41.2652 2.10536 41.5196 2.29289 41.7071C2.48043 41.8946 2.73478 42 3 42H6V45C6 45.2652 6.10536 45.5196 6.29289 45.7071C6.48043 45.8946 6.73478 46 7 46C7.26522 46 7.51957 45.8946 7.70711 45.7071C7.89464 45.5196 8 45.2652 8 45V42H40V45C40 45.2652 40.1054 45.5196 40.2929 45.7071C40.4804 45.8946 40.7348 46 41 46C41.2652 46 41.5196 45.8946 41.7071 45.7071C41.8946 45.5196 42 45.2652 42 45V42H45C45.2652 42 45.5196 41.8946 45.7071 41.7071C45.8946 41.5196 46 41.2652 46 41C46 40.7348 45.8946 40.4804 45.7071 40.2929C45.5196 40.1054 45.2652 40 45 40ZM38 40H9.17C8.94048 40.0122 8.71262 39.9548 8.51631 39.8352C8.32001 39.7157 8.16444 39.5396 8.07 39.33C8.02815 39.2248 8.00448 39.1132 8 39C7.98968 38.8696 8.00958 38.7387 8.05815 38.6173C8.10671 38.4959 8.18263 38.3873 8.28 38.3L19.38 27.38C19.5034 27.2596 19.6511 27.167 19.8132 27.1084C19.9754 27.0498 20.1481 27.0264 20.32 27.04C20.4877 27.0457 20.6524 27.086 20.8038 27.1583C20.9552 27.2305 21.0901 27.3332 21.2 27.46L25.61 32.7C25.9081 33.0427 26.2742 33.3198 26.685 33.5136C27.0958 33.7074 27.5424 33.8138 27.9964 33.8261C28.4505 33.8383 28.9022 33.7561 29.3228 33.5846C29.7434 33.4131 30.1239 33.1562 30.44 32.83L34.49 28.56C34.6153 28.4353 34.765 28.3378 34.9298 28.2739C35.0946 28.2099 35.2709 28.1807 35.4475 28.1882C35.6241 28.1958 35.7973 28.2398 35.9561 28.3175C36.1148 28.3953 36.2558 28.5051 36.37 28.64L39.79 33.06C39.9125 33.2172 39.9793 33.4107 39.98 33.61V39C39.957 39.2876 39.821 39.5543 39.6017 39.7418C39.3823 39.9292 39.0977 40.0221 38.81 40H38ZM3 8H6V19.12C6 19.3852 6.10536 19.6396 6.29289 19.8271C6.48043 20.0146 6.73478 20.12 7 20.12C7.26522 20.12 7.51957 20.0146 7.70711 19.8271C7.89464 19.6396 8 19.3852 8 19.12V9C8 8.73478 8.10536 8.48043 8.29289 8.29289C8.48043 8.10536 8.73478 8 9 8H16.94C17.2052 8 17.4596 7.89464 17.6471 7.70711C17.8346 7.51957 17.94 7.26522 17.94 7C17.94 6.73478 17.8346 6.48043 17.6471 6.29289C17.4596 6.10536 17.2052 6 16.94 6H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8Z" />
                        </svg>
                      </button>
                    </div>
                  </h2>
                  <div id="capture" className="p-3">
                    <div className="d-flex justify-content-end">
                      <img src={thl3} alt="" width="120px" />
                    </div>
                    <div className="row align-items-center">
                      <div className="col-xxl-6 col-xl-12 col-lg-7 col-md-7 col-12 mb-4">
                        <div className="watchList_Gauge_Section">
                          <div>
                            {/* <span style={{ position: 'absolute', bottom: '-3px', left: '5%', transform: 'translate(-50%, -50%)', fontSize: '9px', color: '#fff', background: '#020134' }}>Fear</span> */}
                            <div className="ExtremeFear_text_area">
                              {" "}
                              Extreme <br /> Fear{" "}
                            </div>
                            <div className="Fear_text_area"> Fear </div>
                            <div className="Neutral_text_area"> Neutral </div>
                            <div className="Greed_text_area"> Greed </div>
                            <div className="ExtremeGreed_text_area">
                              {" "}
                              Extreme <br /> Greed{" "}
                            </div>

            

                            <GaugeComponent
                              value={
                                fearAndGreedData.score
                                  ? Math.round(fearAndGreedData.score)
                                  : 0
                              }
                              type="radial"
                              labels={{
                                tickLabels: {
                                  type: "inner",
                                  ticks: [
                                    { value: 20 },
                                    { value: 40 },
                                    { value: 60 },
                                    { value: 80 },
                                    { value: 100 },
                                  ],
                                },
                              }}
                              arc={{
                                colorArray: ["#f68ec0", "#ed0070"],
                                subArcs: [
                                  { limit: 10 },
                                  { limit: 30 },
                                  {},
                                  {},
                                  {},
                                ],
                                padding: 0.02,
                                width: 0.3,
                              }}
                              pointer={{
                                elastic: true,
                                animationDelay: 0,
                              }}
                            />

                            {/* <span style={{ position: 'absolute', bottom: '-3px', right: '-20px', transform: 'translate(-50%, -50%)', fontSize: '9px', color: '#fff', background: '#020134' }}>Greed</span> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-6 col-xl-12 col-lg-5 col-md-5 col-12 mb-4">
                        <div className="Fear_Greed_detail_item mb-3">
                          <p>Previous close</p>
                          <div className="Fear_Greed_detail_item_content">
                            <h5>extreme greed </h5>
                            <div className="Fear_Greed_detail_item_number">
                              {fearAndGreedData.previous_close
                                ? Math.round(fearAndGreedData.previous_close)
                                : "--"}
                            </div>
                          </div>
                        </div>
                        <div className="Fear_Greed_detail_item mb-3">
                          <p>1 week ago</p>
                          <div className="Fear_Greed_detail_item_content">
                            <h5>extreme greed </h5>
                            <div className="Fear_Greed_detail_item_number">
                              {fearAndGreedData.previous_1_week
                                ? Math.round(fearAndGreedData.previous_1_week)
                                : "--"}
                            </div>
                          </div>
                        </div>
                        <div className="Fear_Greed_detail_item mb-3">
                          <p>1 month ago</p>
                          <div className="Fear_Greed_detail_item_content">
                            <h5>greed </h5>
                            <div className="Fear_Greed_detail_item_number">
                              {fearAndGreedData.previous_1_month
                                ? Math.round(fearAndGreedData.previous_1_month)
                                : "--"}
                            </div>
                          </div>
                        </div>
                        <div className="Fear_Greed_detail_item mb-3">
                          <p>1 year ago</p>
                          <div className="Fear_Greed_detail_item_content">
                            <h5>Fear </h5>
                            <div className="Fear_Greed_detail_item_number">
                              {fearAndGreedData.previous_1_year
                                ? Math.round(fearAndGreedData.previous_1_year)
                                : "--"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="col-xl-6 mb-4 col-lg-12 tab">
                {/* <!-- Second Table --> */}

                <h2 className="watchlisthead Heading_content_hp">
                  TH Bot Alert's
                </h2>
                <div
                  className="table-responsive tabalignn custom-table"
                  style={{ backgroundColor: "#020134", color: "white" }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Notification Message</th>
                      </tr>
                    </thead>
                    <tbody>
                    {data?.map((item, index) => {
  // Regular expression to find words with a dollar sign
  const regex = /\$([^\s$]+)/g;
  // Replace words with a dollar sign with anchor tags
  const msgWithLinks = item?.msg?.replace(regex, (match) => {
  const escapedMatch = match.replace(/\$/g, "");

  return `<a href="/search/${escapedMatch}" style="color: blue; font-size: 16px;">${match}</a>`
});
  
  return (
    <tr
      key={index}
      className={index % 2 === 0 ? "even-row" : "odd-row"}
    >
      <td dangerouslySetInnerHTML={{ __html: msgWithLinks }}></td>
    </tr>
  );
})}

                    </tbody>
                  </table>
                </div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=" >"
                  onPageChange={(event) => {
                    setPage(event.selected + 1);
                  }}
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={1}
                  pageCount={totalCount / 10}
                  previousLabel="< "
                  renderOnZeroPageCount={null}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
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
      <div
        className="modal fade WelcomeModal_section_hp"
        id="WelcomeModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="WelcomeModalLabel"
        aria-hidden="true "
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <button
                className="btn WelcomeModal_skip_btn"
                type="button"
                data-dismiss="modal"
              >
                Skip
              </button>
              <div className="row align-items-stretch">
                <div className="col-xl-12 col-lg-12 col-md-12 m-auto">
                  <div className="welcome_content_Area">
                    <div className="WelcomeModal_Content">
                      <h1>Welcome to Traders Hub</h1>
                      <p className="mt-3 mb-1">
                        Unlock the world of trading with us! Learn the art of
                        trading at your own pace with our user-friendly platform
                        having advance futuristic bots and one-on-one counseling
                        sessions. Dive into our free trial version today to
                        experience the power of informed decisions.
                      </p>
                      <p>
                        You can also join our vibrant community on Discord for
                        real-time discussions and expert insights. Let's trade,
                        learn, and grow together!
                      </p>
                      <div className="d-flex align-items-center justify-content-center mt-4">
                        <a
             
                          href={discordUr}
                          target="_blank"
                        >
                          <button className="btn btn_main2_hp">
                            Join Discord
                          </button>
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


{  isModalOpen &&  < Modal/>}
    </>
  );
};

export default WatchList;
