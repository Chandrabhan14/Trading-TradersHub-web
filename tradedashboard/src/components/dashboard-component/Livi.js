import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBottom from "../nav/NavBottom/NavBottom";
import Side from "../sidebar/side";
import { addLiviData, deleteLivi, getLiviData, getLivinewsData, postLivi } from "../../services/DashboardServices";
import {  liviFeedPosts } from "../../services/UserServices";
import FsLightbox from "fslightbox-react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import moment from "moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import WithAuth from "../auth/withAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  symbol: Yup.string().required('Stock symbol is required') // Define validation rules
});

function Livi() {
  const navigate = useNavigate();
  const [lividata, setLividata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [livinewsdata, setLivinewsdata] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [feedStock, setFeedStock] = useState([]);
  const [isloadingFeed, setIsloadingFeed] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [togglerImage, setTogglerImage] = useState(null);


  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema) // Use Yup resolver
  });



  const sliderRef = useRef(null);
  const handleNavigate = (ticker) => {
    navigate(`/search/${ticker}`)
  }


  const user = JSON.parse(localStorage.getItem("user"));

  const getLividata = async () => {
    try {
      setLoading(true);
      const response = await getLiviData();
      if (response.status == 200) {
        const res = response?.data?.data;
        setLividata(res);
        setLoading(false);
        fetchData();
        getLivinewsdata(res);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getLividata();
  }, []);

  const getLivinewsdata = async (res) => {
    try {
      setIsloading(true);
      const response = await getLivinewsData(res?.map(item => item.symbol));
      if (response.status == 200) {
        const res = response?.data?.data;
        setLivinewsdata(res);
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.error("Error:", error);
    }
  };



  const handleAddStock = async (data) => {
    const Obj1={
        uid: localStorage.getItem("uid"),
        symbol: data.symbol.toUpperCase(),
      }
    try {
      const response = await addLiviData(Obj1);
      if (response?.status === 200) {
        Swal.fire("Post successfully");
        getLividata()
        reset(); 
      } else {
        console.log("Post failed with status:", response?.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const fetchData = async () => {

    const limit = 15;
    setIsloadingFeed(true);
    try {

      const response = await liviFeedPosts(limit, 1);

      if (response.status == 200) {
        const allFlowData = response?.data?.data;
        setFeedStock(allFlowData);
      }
      setIsloadingFeed(false);
    } catch (error) {
      console.error("Error fetching flow data:", error);
    }
    setIsloadingFeed(false);
  };

  function makeTickerLinksClickable(text) {
    const tickerRegex = /\$(\w+)(?!\d)/g;

    // Replace ticker symbols with clickable links
    let replacedText = text.replace(tickerRegex, (match, ticker) => {
      return `<a href="search/${ticker}" style="text-decoration: none">${match}</a>`;
    });

    // Regular expression to match bold text enclosed in **
    replacedText = replacedText.replace(
      /\*\*(\s*.*?(\n.*?)*)\*\*/g,
      "<strong>$1</strong>"
    );

    // Regular expression to match text starting with <@, <#
    const excludeRegex = /(?:^|\s)(<@|<#)\S*/g;
    replacedText = replacedText.replace(excludeRegex, '');

    // Regular expression to match URLs
    const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi;
    replacedText = replacedText.replace(urlRegex, '');

    replacedText = replacedText.replace(/\n/g, "<br>");

    // Return the replaced text with ticker links and bold text
    return (
      <div
        className="text-break"
        dangerouslySetInnerHTML={{ __html: replacedText }}
      />
    );
  }


  const handleImageClick = (imageSrc) => {
    setTogglerImage(imageSrc);
    setToggler(!toggler);
  };






  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (index, value) => {
    setInputValues((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      // Capture the latest value directly from the event
      const data = {
        uid: localStorage.getItem("uid"),
        symbols: event.target.value,
      };
      postLiviData(data);
    }
  };

  const postLiviData = async (data) => {
    try {
      const response = await postLivi(data);

      if (response?.status === 200) {
        setInputValues("")

        console.log("Post successful:", response?.data);
      } else {
        console.log("Post failed with status:", response?.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const deleteItem = async (sym) => {
    // Display confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
      
  
        try {

            const data = {
                uid: localStorage.getItem("uid"),
                symbol: sym,
              };

              const  uid =  localStorage.getItem("uid")
              const     symbol = data?.symbol
          // Call the API to delete the item
          const response = await deleteLivi(uid,symbol);
         
          if(response.status == 200 ){
            Swal.fire(
                'Deleted!',
                'symbol has been deleted.',
                'success'
              );
       
              getLividata()
          }
          
       
        } catch (error) {
          console.error("Error deleting item:", error);
        
        }
      }
    });
  };
  




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
                  className="btn btn_main_hp "
                  onClick={() => navigate("/watchlist")}
                >
                  Daily
                </h3>
                <h3
                  className="btn btn_main_hp "
                  onClick={() => navigate("/Jcoop")}
                >
                  JCOOP
                </h3>
                <h3
                  className="btn btn_main_hp ml-3 active"
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
                    Livi
                  </h2>

                  <div
                    className="table-responsive tabalignn custom-table"
                    style={{ backgroundColor: "#020134", color: "white" }}
                  >
                    <table className="table stock table-hover">
                      <thead>
                        <tr>
                          <th>Symbol</th>
                          <th>Price</th>
                          <th>Change($)</th>
                          <th>Change(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : lividata && lividata?.length > 0 ? (
                          lividata?.map((item, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "even-row" : "odd-row"
                              }
                            // onClick={()=>handleNavigate(item?.symbol)}
                            >
                              <td onClick={() => handleNavigate(item?.symbol)}
                                data-tooltip-id="my-tooltip-1" data-tooltip-content={item?.name}>{item.symbol}

                                <ReactTooltip
                                  id="my-tooltip-1"
                                  place="bottom"
                                  variant="info"
                                /></td>
                              <td>{item?.price.toFixed(2)}</td>
                              <td>{item?.change.toFixed(2)}</td>
                              <td>{item?.changesPercentage.toFixed(2)}</td>
                              {(user?.is_admin  || user?.user_type === "livi") ? (<>
                              <td >
                             
                        <button  className="btn_main2_hp"onClick={() => deleteItem(item.symbol)}>Delete</button> {/* Delete button */}
                  
                              </td></>):''} 
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No records found.
                            </td>
                          </tr>
                        )}
                      </tbody>
    
                    </table>

                    {  (user?.is_admin || user?.user_type === "livi") && ( <form onSubmit={handleSubmit(handleAddStock)}>
      <input className="form-control"
          type="text" 
          placeholder="Enter stock symbol" 
          {...register("symbol")} // Include register and add the "name" attribute
        />
        {errors.symbol && <p>{errors.symbol.message}</p>}
        <button className="btn_main2_hp"type="submit">Add Stock</button>
      </form>)}
                  </div>
                </div>



                <div className="card-search Traders_talk_section">
                  <AwesomeSlider ref={sliderRef}>
                    {
                      isloadingFeed ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ) :

                        feedStock && feedStock.length > 0 ? (
                          feedStock?.map((item, index) => (
                            <div className="card mb-2" key={index}>
                              <div className="card-header">
                                {item?.profile_pic ? (
                                  <img
                                    className="profile_img"
                                    src={item?.profile_pic}

                                  />
                                ) : (
                                  <div className="profile_img">
                                    {user?.username.substring(0, 2).toUpperCase()}
                                  </div>
                                )}
                                <div className="card-content">
                                  <h6>
                                    {item?.name}
                                    <small className="ml-2">
                                      {
                                        moment(
                                          item.date,
                                          "YYYY-MM-DD"
                                        ).isSame(
                                          moment().subtract(1, "days"),
                                          "day" // Check if date is within the last day
                                        )
                                          ? item?.time
                                          : moment(item.date + ' ' + item.time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")
                                      }
                                    </small>
                                    {" "}
                                  </h6>

                                  <p>
                                    {makeTickerLinksClickable(item?.text)}
                                    <span
                                      className={`${item?.tag === "Bullish"
                                          ? "bullish-tag"
                                          : "bearish-tag"
                                        }`}
                                    >
                                      {item?.tag}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="card-body card-img_kj">

                                {item?.image_urls?.map((img, index) => {
                                  return (
                                    <ImageGallery
                                      key={index}
                                      img={img}
                                      post={item}
                                      index={index}
                                      onImageClick={handleImageClick}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-white">
                            No record found.
                          </div>
                        )}
                  </AwesomeSlider>
                </div>
              </div>



              <div className="col-xl-6 mb-4 col-lg-12 mb-3">
                <div className="searching_Reault_Section">
                  <div className="searching_Reault_Right_area">
                    <div className="tab-content">
                      <div className="searching_Reault_Right_overview_table border-0 p-0 ">
                        <h2 className="watchlisthead Heading_content_hp">
                          News
                        </h2>
                        <div className="table-responsive tabalignn custom-table searching_Reault_Right_table_Responsive">
                          <table className="table table-hover mb-0">
                            <tbody>
                              {isloading ? (
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
                              ) : livinewsdata && livinewsdata.length > 0 ? (
                                livinewsdata.map((news, index) => (
                                  <tr key={index}>
                                    <td>
                                      <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <h6 className="mb-0 font-weight-bolder">
                                          {news.title}
                                        </h6>
                                        <p className="mb-0">
                                          {news.publishedDate}
                                          <span className="mx-1">|</span>{" "}
                                          {news.text}
                                        </p>
                                      </a>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    No records found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FsLightbox
        type="image"
        toggler={toggler}
        sources={togglerImage ? [togglerImage] : []}
      />
    </>
  );
}


const ImageGallery = ({ img, post, index, onImageClick }) => {
  return (
    <>
      <img
        key={index}
        className="mb-2"
        src={`${img}`}
        alt="Card image cap"
        style={{ cursor: "pointer" }}
        onClick={() => onImageClick(`${img}`)}
      />
    </>
  );
};


export default WithAuth(Livi);
