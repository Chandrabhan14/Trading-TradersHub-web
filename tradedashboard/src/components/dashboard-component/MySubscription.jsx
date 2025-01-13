import React, { useEffect, useState } from "react";

import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";

import { useNavigate } from "react-router-dom";

import { getFollowersPost } from "../../services/UserServices";
import ReactPaginate from "react-paginate";

const MySubscription = () => {
  const navigate = useNavigate();
  const [followedUserPosts, setFollowedUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;

    mySubs(uid);
  }, [page]);
  const mySubs = async (uid) => {
    try {
      setLoading(true);
      const response = await getFollowersPost(uid, page);
      if (response.status == 200) {
        setFollowedUserPosts(response?.data?.data?.post);
        setTotalCount(response?.data?.data?.total_count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
                  className="btn btn_main_hp my-1 active"
                  onClick={() => navigate("/my-subscription")}
                >
                  My Subs
                </h3>
                <h3
                  className="btn btn_main_hp my-1 ml-3"
                  onClick={() => navigate("/my-profile")}
                >
                  {" "}
                  My Profile{" "}
                </h3>
                <h3
                  className="btn btn_main_hp my-1 ml-3"
                  onClick={() => navigate("/my-followers")}
                >
                  My Followers
                </h3>
              </div>
            </div>
            <div className="row mt-4 align-items-stretch">
              {loading ? (
                <div
                  className="spinner-border text-center m-auto"
                  style={{ width: "3rem", height: "3rem", color: "white" }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : followedUserPosts && followedUserPosts.length > 0 ? (
                followedUserPosts?.map((post, index) => {
                  return (
                    <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                      <div className="my_subscription_itme_area">
                        <div
                          className=""
                          style={{
                            width: "5px",
                            minHeight: "126px",
                            backgroundColor: "#150550",
                          }}
                        ></div>
                        <div
                          className="my_subscription_item_content_Area"
                          key={index}
                        >
                          <div className="my_subscription_item_content_profile">
                            <img
                          
                              src={post?.profile_pic}
                              alt=""
                            />
                            <div className="ml-0 mt-2">
                              <h4> {post?.username} </h4>
                              <p> {post?.created} </p>
                            </div>
                          </div>
                          <div className="my_subscription_card_content mt-2">
                            <p
                              className="card-text "
                              dangerouslySetInnerHTML={{
                                __html: post?.post_text,
                              }}
                            ></p>

                            <div>
                              {post.post_images_url?.map((img) => {
                                return (
                                  <img
                                    key={index}
                                    className="mb-2"
                                    src={`${img}`}
                                    alt="Card image cap"
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12 text-center">
                  <p>No subscribers found</p>
                </div>
              )}
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
      </div>
    </div>
  );
};

export default MySubscription;
