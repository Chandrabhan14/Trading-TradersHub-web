import React, { useEffect, useState } from "react";
import NavBottom from "../nav/NavBottom/NavBottom";
import Side from "../sidebar/side";
import { useNavigate } from "react-router-dom";

import {  postprofile } from "../../services/UserServices";
import { getAllPostsOfUser } from "../../services/UserServices";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import FsLightbox from "fslightbox-react";
import { deletePost } from "../../services/DashboardServices";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";



const MyProfile = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    images: [],
    text: "",
    uid: null,
  });
  const [myPosts, setMyPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const dataString = localStorage.getItem("googledata");
  const userDataFromLocalStorage = JSON.parse(dataString);
  const uid = userDataFromLocalStorage?.uid;
  const [profilepic, setProfilepic] = useState(null);



  const postUserPostData = async (e) => {
    e.preventDefault();
    try {
      if (!postData.text.trim()) {
        Swal.fire({
          text: "please fill comment",
          icon: "error",
        });
        return;
      }

      if (postData.images.length > 20) {
        Swal.fire({
          text: "files should be less than 20",
          icon: "error",
        });
        return;

      }
      const newFormData = new FormData();
      postData?.images?.map((i) => {
        newFormData.append("images", i)
      })

      newFormData.append("uid", localStorage.getItem("uid"));
      newFormData.append("text", postData.text)
      const response = await postprofile(newFormData);
      getMyPosts(postData.uid);
      setPostData({
        text: "",
        images: []
      })
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    getMyPosts(uid);
    setPostData({
      ...postData,
      ["uid"]: uid,
    });
  }, [page]);

  const getMyPosts = async (uid) => {
    try {
      const response = await getAllPostsOfUser(uid, page);
      setMyPosts(response?.data?.data?.posts);
      setTotalCount(response.data.data.count)
      setProfilepic(response?.data?.data?.profile_pic)
    } catch (error) {
      console.log(error);
    }
  };


  const handleTextChange = (event, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, text: data });
  };

  const handleChange = (event) => {
    const files = event.target.files;
    console.log(files,"file in profile")
    setPostData({ ...postData, images: [...event.target.files] });
  };

  const handleDelete = async (post_id) => {

    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        icon: "warning",
        dangerMode: true,
      });



      if (result.isConfirmed) {
        // User confirmed the delete action
        deletePost(
          uid,
          post_id
        ).then((res) => {
          if (res?.data?.statusCode == 200) {

            getMyPosts(uid);
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          }
        }).catch((E) => {
          Swal.fire("Failed!", "failed to delete.", "error");
        });



      }

    } catch (error) {
      console.log(error);
    }



  }


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
            <div className="row mb-4">
              <div id="subscription-status" className="col-xl-12 d-flex flex-wrap">
                <h3
                  className="btn btn_main_hp my-1 "
                  onClick={() => navigate("/my-subscription")}
                >
                  My Subs
                </h3>
                <h3
                  className="btn btn_main_hp my-1 active ml-3"
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

            <div className="row">
              <div className="col-lg-8 col-xl-7 col-md-12 col-12">
                <div className="my_subscription_comment_form_area">
                  <h3>Write the comment</h3>
                  <form onSubmit={postUserPostData}>

                    <div class="form-group Select_Images_comment_hp">
                      <label for="">Select Images</label>
                      <input onChange={handleChange}

                        type="file" name="images" multiple id="" class="form-control" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Comment</label>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'fontColor'],

                          fontColor: {
                            colors: ['#000000'], // Set default color to black
                          },
                        }}

                        onChange={handleTextChange}
                        data={postData.text}
                      />
                    </div>
                    <div className="w-100 ">
                      <button type="submit" className="btn_main_hp  mx-0 mt-3">
                        {"Post"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              {myPosts?.map((post, index) => {

                return (
                  <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
                    <div key={index} className="my_subscription_itme_area">
                      <div
                        className=""
                        style={{
                          width: "5px",
                          minHeight: "126px",
                          backgroundColor: "#150550",
                        }}
                      ></div>
                      <div className="my_subscription_item_content_Area">
                        <div className="my_subscription_item_content_profile">
                          {" "}
                          <img
                            src={profilepic}
                           
                            alt=""
                          />
                          <div className="ml-0 mt-2">
                            <h4>{post.username} </h4>
                            <p> {post.created_at?.split("T")[0]} </p>
                          </div>
                        </div>
                        <div className="my_subscription_card_content mt-3">
                          <p className="card-text mb-0"><RenderComment comment={post.text} /></p>
                          <div className="my_subscription_card_content_img">
                            {post?.image_urls?.map((img, index) => {
                              return (
                                <ImageGallery img={img} post={post} index={index} />
                              );
                            })}


                          </div>
                        </div>
                        <button type="button " className="Delete_myProfile_btn btn " onClick={() => handleDelete(post.post_id)}   ><i class="fa-regular fa-trash-can"></i></button>

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



const RenderComment = ({ comment }) => {
  const [showMore, setShowMore] = useState(false)

  const maxLength = 200;
  if (comment.length > maxLength) {
    return (
      <div>
        {comment?.slice(0, maxLength)}
        {showMore && comment?.slice(maxLength)}

        {!showMore && <span>.....</span>}
        <a style={{ color: "#fc0077", cursor: "pointer", fontSize: "16px" }} onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Read Less' : 'Read More'}
        </a>
      </div>
    );
  } else {
    return <div dangerouslySetInnerHTML={{
      __html: comment
    }}></div>;
  }
};

const ImageGallery = ({ img, post, index }) => {
  const [toggler, setToggler] = useState(false);

  return (
    <>
      <img
        key={index}
        className="mb-2"
        src={`${img}`}
        alt="Card image cap"
        onClick={() => {
          setToggler(!toggler);
        }}
        style={{ cursor: 'pointer' }}
      />

      <FsLightbox
        type="image"
        toggler={toggler}
        sources={post?.image_urls}
      />

    </>
  );
};


export default MyProfile;
