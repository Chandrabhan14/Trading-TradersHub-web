import React, { useEffect, useState } from "react";
import Side from "../sidebar/side";
import NavBottom from "../nav/NavBottom/NavBottom";
import { getBotFeed } from "../../services/UserServices";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import InfiniteScroll from "react-infinite-scroll-component";
 import FsLightbox from "fslightbox-react";
import WithAuth from "../auth/withAuth";
import useSWR from 'swr';
import moment from "moment";



function THFeeds() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [toggler, setToggler] = useState(false);
  const [togglerImage, setTogglerImage] = useState(null);
  const [topGainers, setTopGainers] = useState([]);
  const limit = 6;

  const { data: newData } = useSWR('latest-bot-feed', () => getBotFeed(1, limit).then(res => res.data.data), {
    refreshInterval: 10000,
    revalidate: true,
  });


  useEffect(() => {
    if (newData) {
      console.log("newData:", newData);
      setData(prevData => {
        const combinedData = [...newData, ...prevData];
        const uniqueData = combinedData.reduce((acc, item) => {
          const itemKey = `${item.message}-${item.channel_name}-${item.time}-${item.author}`;
          if (!acc.some(existingItem => {
            const existingKey = `${existingItem.message}-${existingItem.channel_name}-${existingItem.time}-${existingItem.author}`;
            return existingKey === itemKey;
          })) {
            acc.push(item);
          }
          return acc;
        }, []);
        return uniqueData;
      });
      setHasMore(newData.length === limit);
    }
  }, [newData]);
  


  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const response = await getBotFeed(nextPage, limit);
    const nextPageData = response.data.data;
  
    setData(prevData => {
      const combinedData = [...prevData, ...nextPageData];
      const uniqueData = combinedData.reduce((acc, item) => {
        const itemKey = `${item.message}-${item.channel_name}-${item.time}-${item.author}`;
        if (!acc.some(existingItem => {
          const existingKey = `${existingItem.message}-${existingItem.channel_name}-${existingItem.time}-${existingItem.author}`;
          return existingKey === itemKey;
        })) {
          acc.push(item);
        }
        return acc;
      }, []);
      return uniqueData;
    });
  
    setHasMore(nextPageData.length === limit);
    setPage(nextPage);
  };




  function makeTickerLinksClickable(text) {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const tickerRegex = /\$(\w+)(?!\d)/g;
  
    // Function to replace URLs with clickable links
    function replaceURLs(input) {
      return input.replace(urlRegex, (url) => {
        return `<a href="${url}" style="text-decoration: none">${url}</a>`;
      });
    }
  
    // First replace URLs with clickable links
    let replacedText = replaceURLs(text);
  
    // Then replace ticker symbols with clickable links
    replacedText = replacedText.replace(tickerRegex, (match, ticker) => {
      return `<a href="search/${ticker}" style="text-decoration: none">${match}</a>`;
    });
  
    // Regular expression to match bold text enclosed in **
    replacedText = replacedText.replace(
      /\*\*(\s*.*?(\n.*?)*)\*\*/g,
      "<strong>$1</strong>"
    );
  
    // Replace newline characters with <br> tags
    replacedText = replacedText.replace(/\n/g, "<br>");
  
    // Return the replaced text with ticker links, URLs, and bold text
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


    useEffect(() => {
      const socket = new WebSocket("wss://api.tradershub.ninja/ws/top_gainers/");  
      socket.onmessage = (event) => {
        const socketdata = JSON.parse(event.data);
        setTopGainers(socketdata.data);
      };
  
      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
  
      return () => {
        socket.close();
      };
    }, []);

  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding connect_section_hp">
        <div className="container" style={{ maxWidth: "100%" }}>
    
          <Side />


         
          <div className="mb-4 content content_section_hp connect-page-kj">
<div className="row">

<div className="col-xl-6 col-lg-7 col-md-6 mb-4">



                          <InfiniteScroll
                              dataLength={data.length}
                              next={fetchMoreData}
                              hasMore={hasMore}
                              loader={
                                data.length > 0 &&          <div style={{ textAlign: 'center', width: '100%' }}>
                                <div
                                  className="spinner-border"
                                  style={{ width: "3rem", height: "3rem", color: "white" }}
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                              }
                              endMessage={
                                data.length > 0 && (
                                  <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                  </p>
                                )
                              }
                            >
          {data.map((item, index) => (
            <div className="row justify-content-center">

          
                <div className="col-xl-12  mb-4" key={index}>
                  <div className="thFeed_item_area_hp">
                    <div className="d-flex  align-items-center">
                      <div className="profile-circle">
                        {item.author
                          ? item.author
                              .split("")
                              .map((word) => word[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()
                          : "N/A"}
                      </div>
                      <div className="w-100">
                        <div className="d-flex  flex-wrap">
                        <strong className="d-flex text-white ml-2">
                        {item.author}
                      </strong>
                      <span className="d-flex bg-crypto-alerts ml-2" >
                        @{item.author}
                      </span>
                      <span className="d-flex bg-crypto-alerts  ml-2">
                        {" "}
                        {item.channel_name.replaceAll(/[│|]/g, '')}
                      </span>
                        </div>
                      
                      <small className="date-container bg-crypto-alerts  ml-2">
                    {  moment(item.time).format('HH:mm:ss')}
                    </small >
                    </div>
                     
                    </div>
                   
                    <div className="blog_item_content_area mt-3">
                      <div className="blog-meta">
                     {" "}
                      </div>

                      <h4 className="blog_item_content_title">
                        <p className="text-wrap text-break">{makeTickerLinksClickable(item.message)}</p>
                      </h4>

                      {item.image_urls.length > 0 && (
                          <AwesomeSlider>
                            {item.image_urls.map((img, imgIndex) => (
                              <div key={imgIndex}>
                                <img
                                  src={img}
                                  className="w-100"
                                  alt={`Slide ${imgIndex}`}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleImageClick(img)}
                                />
                              </div>
                            ))}
                          </AwesomeSlider>
                        )}
                    </div>
                  </div>
                </div>
            
            </div>
              ))}
    
          </InfiniteScroll>

  </div>
  <div className="col-xl-6 col-lg-5 col-md-6 mb-4 d-none d-sm-block">
  <div className="searching_Reault_Right_overview_table mb-2">
    <h2 className="watchlisthead Heading_content_hp mb-2">
      Top Gainers
    </h2>
    <div className="table-responsive custom-table searching_Reault_Right_table_Responsive">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>%</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {topGainers?.map((gainer, index) => (
            <tr key={index}>
              <td>{gainer.ticker ? gainer.ticker : '--'}</td>
              <td>{gainer.price ? gainer.price.toFixed(2) : '--'}</td>
              <td>{gainer.change_percentage ? gainer.change_percentage.toFixed(2) : '--'}</td>
              <td>{gainer.volume ? gainer.volume.toFixed(2) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
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


export default WithAuth(THFeeds);

