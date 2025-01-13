import React, { useEffect, useState } from "react";
import NavBottom from "../nav/NavBottom/NavBottom";
import Side from "../sidebar/side";
import { getBtnStatus } from "../../services/UserServices";
import { useLocation } from "react-router-dom";
import { getAllPostsOfUser } from "../../services/UserServices";

const FollowerProfile = () => {
  const location = useLocation();
  const [followBtn, setFollowBtn] = useState(false);
  const clickedUserId = location.state;
  const [followBtnDetails, setFollowBtnDetails] = useState({
    uid: null,
    follow_uid: clickedUserId.uid,
    action: followBtn ? "unfollow" : "follow",
  });
  const [followerPosts, setFollowerPosts] = useState([]);

  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
    console.log(clickedUserId, "clickedUid");
    getFollowersPosts(clickedUserId.uid);
    setFollowBtnDetails({
      ...followBtnDetails,
      ["uid"]: uid,
    });
  }, []);

  const getFollowersPosts = async (uid) => {
    try {
      const response = await getAllPostsOfUser(uid);
      setFollowerPosts(response.data.posts);
      // console.log(response.data.posts, "repsonse data:----");
    } catch (error) {
      console.log(error);
    }
  };

  const changeBtnStatus = async () => {
    console.log(clickedUserId, "cliackedUserId");
    setFollowBtn(!followBtn);
    try {
      const response = await getBtnStatus(followBtnDetails);
      console.log(response, "Chnage Btn status :_");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid">
          {/* Sidebar Section */}
          <Side />
          {/* Sidebar Section */}

          <div className=" mb-4 content content_section_hp">
            <div className="row mb-3">
              <div
                className="col-lg-10 col-xl-10 col-md-10  d-flex justify-content-between align-items-center "
                style={{ paddingLeft: "15%", width: "100%" }}
              >
                <div className="profile-logo1">
                  {" "}
                  <img
                    style={{ height: "200px" }}
                    src="https://images.unsplash.com/photo-1696251803608-e8893f7fcdf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1784&q=80"
                    alt=""
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: "#790b76",
                      fontSize: "20px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    Empowering traders with cutting-edge tools and insights
                  </p>
                </div>
                <div
                  className="btnFollow"
                  style={
                    followBtn
                      ? { backgroundColor: "lightgreen" }
                      : { backgroundColor: "white" }
                  }
                >
                  <button onClick={changeBtnStatus}>
                    {followBtn ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-3">
              {followerPosts?.map((post, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-center mt-5"
                  >
                    <div
                      className=""
                      style={{
                        width: "3px",
                        minHeight: "126px",
                        backgroundColor: "#ffc505f1",
                      }}
                    ></div>
                    <div
                      className=""
                      style={{
                        minWidth: "29rem",
                        backgroundImage:
                          "linear-gradient(to right, #460000da, #050505da)",
                      }}
                    >
                      <div className="cardspace">
                        <div
                          className="d-flex align-items-center justify-content-evenly"
                          style={{ width: "800px" }}
                        >
                          <div className="profile-logo2">
                            {" "}
                            <img
                              src="https://images.unsplash.com/photo-1696251803608-e8893f7fcdf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1784&q=80"
                              alt=""
                            />
                          </div>
                          <h3
                            style={{
                              color: "#790b76",
                              fontSize: "20px",
                              marginLeft: "20px",
                            }}
                          >
                            {post.username}
                          </h3>
                          <span
                            style={{
                              color: "silver",
                              marginLeft: "12px",
                              fontSize: "10px",
                            }}
                          >
                            {post.created}
                          </span>
                        </div>
                      </div>
                      <div className="d-block justify-content-center align-items-center">
                        <p className="card-text mx-5">{post.text}</p>

                        <div>
                          {post.image_urls?.map((img) => {
                            return (
                              <img
                                key={index}
                                className="card-img-top img-responsive mb-2"
                                src={`${img}`}
                                alt="Card image cap"
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerProfile;
