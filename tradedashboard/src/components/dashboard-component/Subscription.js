import React, { useEffect, useRef, useState } from "react";

import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";

import graph1 from "../../assets/img/graph/Graph8.gif";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/UserServices";
import { getSubscriptionFollow } from "../../services/UserServices";
import WithAuth from "../auth/withAuth";
import ReactPaginate from "react-paginate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Modal from "../../utils/Modal";

const Subscription = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

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

  const getAllUsersProfiles = async (uid) => {
    try {
      const response = await getAllUsers(uid, page);
      setUserProfile(response?.data?.data?.profile);
      setTotalCount(response?.data?.data?.total_count);
    } catch (error) {
      console.log(error);
    }
  };
  const onFollowUser = async (profile) => {
    try {
      const userId = localStorage.getItem("uid");
      const action = profile.followed ? "unfollow" : "follow";
      const response = await getSubscriptionFollow(userId, profile.uid, action);
      if (response.status == 200) {
        setFollowed(response.data.followed);
        getAllUsersProfiles(userId);

        if (profile.followed == true) {
          toast.error("Unfollowing !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        } else {
          toast.success("Following !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
    getAllUsersProfiles(uid);
  }, [page]);

  return (
    <>
      <div>
        <NavBottom isStyleChanged />
        <div className="notify-overlay"></div>
        <div className="dashboard-area bg-color area-padding subscription_section_hp">
          <div className="container" style={{ maxWidth: "100%" }}>
            {/* Sidebar Section */}
            <Side />
            {/* Sidebar Section */}

            <div className="mb-4 content content_section_hp">
              <div className="row mb-3">
                <div
                  id="subscription-status"
                  className="col-12 d-flex flex-wrap"
                  w
                >
                  <h3
                    className="btn btn_main_hp my-1"
                    onClick={() => navigate("/my-subscription")}
                  >
                    My Subs
                  </h3>
                  <h3
                    className="btn btn_main_hp my-1 ml-3"
                    onClick={() => navigate("/my-profile")}
                  >
                    My Profile
                  </h3>
                  <h3
                    className="btn btn_main_hp my-1 ml-3"
                    onClick={() => navigate("/my-followers")}
                  >
                    My Followers
                  </h3>
                </div>
              </div>

              <div className="row mb-3 align-items-stretch">
                {userProfile?.map((profile, index) => {
                  return (
                    <div
                      className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4"
                      state={{ uid: profile.uid }}
                    >
                      <div key={index} className="card subscription_item_area">
                        <img
                          className="img-responsive subscription_item_img"
                          src={graph1}
                          alt="Card image cap"
                        />
                        <div className="subscription_item_follow_btn">
                          <button
                            className={`btn  mx-0 ${
                              profile.followed
                                ? "btn-success text-white"
                                : "btn_main_hp "
                            }`}
                            onClick={() => onFollowUser(profile)}
                          >
                            {" "}
                            <ToastContainer />
                            <i class="fa-solid fa-user-plus"></i>
                          </button>
                        </div>
                        <div className="subscription_item_content">
                          <h4 className="mb-0">{profile.username}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                previousLabel="<"
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
        </div>
      </div>
      {isModalOpen && <Modal />}
    </>
  );
};

export default WithAuth(Subscription);
