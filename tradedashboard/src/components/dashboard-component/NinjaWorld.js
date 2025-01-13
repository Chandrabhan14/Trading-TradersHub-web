import React, { useEffect, useState } from "react";
import NavBottom from "../nav/NavBottom/NavBottom";
import Side from "../sidebar/side";
import { OptionMessages } from "../../services/UserServices";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const NinjaWorld = () => {
  const [worldData, setWorldData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNinjaWorldData = async () => {
      const limit = 20;
      try {
        setLoading(true);
        const response = await OptionMessages(limit, page);
        if (response.status === 200) {
          setWorldData(response?.data?.data);
          setTotalCount(response?.data?.data?.total_count);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flow data:", error);
      }
    };

    fetchNinjaWorldData();
  }, [page]);

  function makeTickerLinksClickable(text) {
    const tickerRegex = /\$(\w+)(?!\d)/g;
  
    // Replace ticker symbols with clickable links
    let replacedText = text.replace(tickerRegex, (match, ticker) => {
      return `<a href="search/${ticker}" style="text-decoration: none">${match}</a>`;
    });
  
    // Regular expression to match bold text enclosed in **
    replacedText = replacedText.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );
  
    // Regular expression to match text starting with a bullet point
    const bulletRegex = /^(.*?)(?=\w+:)/gm;
    replacedText = replacedText.replace(bulletRegex, "* $1");
  
    // Regular expression to match text starting with <@, <#
    const excludeRegex = /(?:^|\s)(<@|<#)\S*/g;
    replacedText = replacedText.replace(excludeRegex, "");
  
    // Regular expression to match URLs
    const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi;
    replacedText = replacedText.replace(urlRegex, "");
  
    // Return the replaced text with ticker links, bold text, and bullet points
    return (
      <div
        className="text-break"
        dangerouslySetInnerHTML={{ __html: replacedText }}
      />
    );
  }
  

  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding my_subscription_section_hp">
        <div className="container-fluid">
          <Side />
          <div className=" mb-4 content content_section_hp">
            <div className="row mb-3">
              <div id="subscription-status" className="col-4 d-flex">
                <Link className="btn btn_main_hp " to="/DailyLevel">
                  Daily Level
                </Link>
                <Link className="btn btn_main_hp active ml-3" to="/ninjaWorld">
                  Ninja World
                </Link>
              </div>
            </div>
            <div className="row mt-5">
              {loading ? (
                <div
                  className="spinner-border"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    color: "white",
                    margin: " 0 auto 20px",
                  }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : worldData.length > 0 ? (
                worldData?.map((item, index) => (
                  <div
                    key={index}
                    className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4"
                  >
                    <div className="my_subscription_itme_area">
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
                          <div className="ml-0 mt-2">
                            <h4>{item.author}</h4>
                            <p>{item.time}</p>
                          </div>
                        </div>
                        <div className="my_subscription_card_content mt-3">
                          <p className="card-text mb-0">
                            {makeTickerLinksClickable(item.message)}
                          </p>
                        </div>
                        <div className="my_subscription_card_content mt-3">
                         { item?.image_urls.length > 0 && <p className="card-text mb-0">
                         
                            <img src={item?.image_urls} alt=" " />
                          </p>}
                        </div>
                      
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p className="text-center" style={{fontSize: "25px",}}>No Record Found.</p>
                </div>
              )}
            </div>
            {worldData.length > 0 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={(event) => {
                  setPage(event.selected + 1);
                }}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={totalCount / 20}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                renderOnZeroPageCount={null}
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NinjaWorld;
