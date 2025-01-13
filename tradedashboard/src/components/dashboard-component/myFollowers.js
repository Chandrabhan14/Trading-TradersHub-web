import React, { useEffect, useState } from "react";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";
import { useNavigate } from "react-router-dom";
import { getFollowersNumber } from "../../services/UserServices";
import InfiniteScroll from "react-infinite-scroll-component";

const MyFollowers = () => {
  const navigate = useNavigate();
  const [followedUserPosts, setFollowedUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
    mySubs(uid, page);
  }, []);

  const mySubs = async (uid, page) => {
    try {
      const limit = 66;
      setLoading(true);
      const response = await getFollowersNumber(uid, page, limit);
      if (response.status === 200) {
        setFollowedUserPosts(response?.data?.followers);
      }

      if (response?.data?.followers?.length >= 66) {
        setHasMore(true);
      } else {
        setHasMore(false); // No more data available
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
    try {
      const limit = 66;
      const response = await getFollowersNumber(uid, page, limit);

      if (response.status === 200) {
        setFollowedUserPosts((prevPosts) => [
          ...prevPosts,
          ...response?.data?.followers,
        ]);
        if (response?.data?.followers.length > 0) {
          setPage((prevPage) => prevPage + 1); // Increment page for next fetch
        } else {
          setHasMore(false); // No more data available
        }
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding my_subscription_section_hp">
        <div className="container-fluid">
          {/* Sidebar Section */}
          <Side />
          {/* Sidebar Section */}

          <div className="mb-4 content content_section_hp">
            <div className="row">
              <div
                id="subscription-status"
                className="col-xl-12 d-flex flex-wrap"
              >
                <h3
                  className="btn btn_main_hp my-1"
                  onClick={() => navigate("/my-subscription")}
                >
                  My Subs
                </h3>
                <h3
                  className="btn btn_main_hp ml-3 my-1"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </h3>
                <h3
                  className="btn btn_main_hp ml-3 my-1 active"
                  onClick={() => navigate("/my-followers")}
                >
                  My Followers
                </h3>
              </div>
            </div>
            <div className=" mt-4 align-items-stretch">
              {loading ? (
                <div className="loader-container text-center">
                  <div
                    className="spinner-border"
                    style={{ width: "3rem", height: "3rem", color: "white" }}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : followedUserPosts && followedUserPosts.length > 0 ? (
                <InfiniteScroll
                  dataLength={followedUserPosts.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <div className="loader-container text-center">
                      <div
                        className="spinner-border"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          color: "white",
                        }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                  endMessage={
                    <div className="col-12 text-center">
                      <p>No more followers</p>
                    </div>
                  }
                >
                  <div className="row">
                    {followedUserPosts.map((post, index) => (
                      <div
                        key={index}
                        className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4"
                      >
                        <div className="my_subscription_itme_area">
                          <div
                            className=""
                            style={{
                              width: "5px",
                              minHeight: "25px",
                              backgroundColor: "#fc0077",
                            }}
                          ></div>
                          <div
                            className="my_subscription_item_content_Area"
                            style={{ background: "#150550", padding: "10px" }}
                          >
                            <div className="my_subscription_item_content_profile">
                              <p>{post}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              ) : (
                <div className="col-12 text-center">
                  <p>No followers found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFollowers;
