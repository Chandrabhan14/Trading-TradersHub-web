import React, { useEffect, useState } from "react";
import NavBottom from "../components/nav/NavBottom/NavBottom";
import Side from "../components/sidebar/side";
import { useNavigate } from "react-router-dom";
import { adminPostDelete, blogGet, blogPost } from "../services/UserServices";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import WithAdminAuth from "./withAdminAuth";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import moment from "moment";

const Admin = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    text: "",
    tag: "",
    images: [],
    content_images: []
  });
  const [, setMyPosts] = useState([]);
  const [page, setPage] = useState(1);
  const dataString = localStorage.getItem("googledata");
  const userDataFromLocalStorage = JSON.parse(dataString);
  const uid = userDataFromLocalStorage?.uid;

  const [searchData, setSearchData] = useState([]);
  const [loadingb, setLoadingB] = useState(false);
  const [pageb, setPageB] = useState(1);
  const [totalCountB, setTotalCountB] = useState(0);

  const dispatch = useDispatch();

  const getBlogs = async () => {
    try {
      setLoadingB(true);

      const response = await blogGet(pageb);
      if (response?.data?.statusCode === 200) {
        setSearchData(response?.data?.data?.posts);
        setTotalCountB(response?.data?.data?.count);
        setLoadingB(false);
      }
      setLoadingB(false);
    } catch (error) {
      setLoadingB(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page]);


  const postUserPostData = async (e) => {
    e.preventDefault();
    try {
      const newFormData = new FormData();
      postData?.images?.map((i) => {
        newFormData.append("images", i)
      })
      postData?.content_images?.map((i) => {
        newFormData.append("content_images", i)
      })
      newFormData.append("uid", localStorage.getItem("uid"));
      newFormData.append("text", postData.text)
      newFormData.append("title", postData.title)
      newFormData.append("tag", postData.tag)
      const response = await blogPost(newFormData);
      if (response.status === 200 || response.data.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Posted Successfully!",
          showConfirmButton: false,
          timer: 2000, 
          timerProgressBar: true, 
          toast: true, 
          position: "top-end", 
          showCloseButton: true, 
        });


        setPostData({
          title: "",
          text: "",
          tag: "",
          images: [],
          content_images: []
        })

      }


    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "An error occurred while posting",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    setPostData({
      ...postData,
      ["uid"]: uid,
    });
  }, [page]);

  const handleTextChange = (event, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, text: data });
  };

  
  console.log(postData.images, "postData");

  const handleChange = (event) => {

    setPostData({ ...postData, images: [...event.target.files] });
  };


  const handleChangeD = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };
 const handleAdditionalImagesChange = (event) => { 
    setPostData({ ...postData, content_images: [...event.target.files] });
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        const response = await adminPostDelete(id);
        if (response.status == 200 || response.data.statusCode == 200) {
          Swal.fire({
            icon: "success",
            title: "Deleted Successfully!",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: "top-end",
            showCloseButton: true,
          });
          getBlogs(); 
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "An error occurred while deleting",
        icon: "error",
      });
    }
  };
  

  return (
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding my_subscription_section_hp">
        <div className="container-fluid">
        
          <Side />
   

          <div className="mb-4 content content_section_hp">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-xl-7 col-md-12 col-12">
                <div className="my_subscription_comment_form_area">
                  <h3>Add New Post</h3>
                  <form onSubmit={postUserPostData}>

                    <div class="form-group Select_Images_comment_hp">
                      <label for="">Thumbnail Images</label>
                      <input onChange={handleChange}

                        type="file" name="images" multiple id="" class="form-control" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input onChange={handleChangeD} type="text" name="title" value={postData.title} className="form-control" placeholder="Enter Title" />
                    </div>
                    <div className="form-group">
                      <label>Tags</label>
                      <input onChange={handleChangeD} type="text" name="tag" value={postData.tag} className="form-control" placeholder="Enter Tags" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Blog Content</label>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'fontColor'],

                          fontColor: {
                            colors: ['#000000'], 
                          },
                        }}

                        onChange={handleTextChange}
                        data={postData.text}
                      />
                    </div>

                    <div class="form-group Select_Images_comment_hp">
                      <label for="">Select Images</label>
                      <input onChange={handleAdditionalImagesChange}

                        type="file" name="content_images" multiple id="" class="form-control" placeholder="" aria-describedby="helpId" />
                    </div>

                    <div className="w-100 text-start">
                      <button type="submit" className="btn_main_hp  mx-0 mt-3">
                        {"Post"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="row mt-5 blog_listing_table_area_hp">
              <div className="col-12">
                <h2 className="Heading_content_hp">Blog Listing</h2>
                <div className="table-responsive tabalignn custom-table mt-1"
                  style={{
                    backgroundColor: "#020134",
                    color: "white",
                  }}>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Blog Title</th>
                        <th>Blog Des.</th>
                        <th>Blog Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                    {loadingb ? (
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                    ): (
                    searchData.map((item, index) => (
                    <tr key={item.post_id}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td className="Blog_Des">{item.description}</td>
                        <td>{moment(item?.created_at).format(' D MMMM YYYY')}</td>
                        <td>
                            <a><i className="fa-solid fa-trash-can" onClick={() => handleDelete(item?.post_id)}>  </i></a>
                        </td>
                    </tr>
                )))}

        
                    </tbody>
                  </table>
                </div>
                <ReactPaginate
                          breakLabel="..."
                          nextLabel=" >"
                          onPageChange={(event) => {
                            setPageB(event.selected + 1);
                          }}
                          pageRangeDisplayed={1}
                          marginPagesDisplayed={1}
                          pageCount={totalCountB / 9}
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
      </div>
    </div>
  );
};


export default WithAdminAuth(Admin);

