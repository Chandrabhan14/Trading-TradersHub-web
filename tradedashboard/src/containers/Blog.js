import React,{useEffect} from 'react';
import bp12 from "../assets/img/blog/bp12.png";
import bp1 from "../assets/img/blog/bp1.png";
import bp2 from "../assets/img/blog/bp2.png";
import useWebSocket from '../hooks/useWebsocket';

const Blog = () => {
  const { ws, messages, sendMessage } = useWebSocket();
 // Automatically send a message every 5 seconds
 useEffect(() => {
  const interval = setInterval(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
    
    const message = {
      user: uid ? uid : "Anonymous",
      content: "Automatic message from TodaysMarket component",
    };
    sendMessage(message);
  }, 5000);

  // Clean up the interval when the component unmounts
  return () => clearInterval(interval);
}, [sendMessage]);


  return (
    <div className="blog-area bg-color area-padding-2">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="section-headline text-center">
              <h2>Latest Blog</h2>
              <p>Unleashing the Power of Yield Farming: TradersHub's Latest Blog Explores Profitable Opportunities in DeFi.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="single-blog">
              <div className="blog-image">
                <a className="image-scale" href="https://www.patreon.com/posts/importance-of-in-84478682">
                  <img src={bp12} alt="" width="400" height="275" />
                </a>
              </div>
              <div className="blog-content">
                <div className="blog-category">
                  <span>Investor</span>
                </div>
                <div className="blog-meta">
                  <span className="admin-type">
                    <i className="fa fa-user"></i>
                    Admin
                  </span>
                  <span className="date-type">
                    <i className="fa fa-calendar"></i>
                    28 mar, 2021
                  </span>
                  <span className="comments-type">
                    <i className="fa fa-comment-o"></i>
                    32
                  </span>
                </div>
                <div className="blog-title">
                  <a href="https://www.patreon.com/posts/importance-of-in-84478682">
                    <h4>The Power of Dollar Cost Averaging</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="single-blog">
              <div className="blog-image">
                <a className="image-scale" href="#">
                  <img src={bp1} alt="" width="400" height="245" />
                </a>
              </div>
              <div className="blog-content">
                <div className="blog-category">
                  <span>Community</span>
                </div>
                <div className="blog-meta">
                  <span className="admin-type">
                    <i className="fa fa-user"></i>
                    Admin
                  </span>
                  <span className="date-type">
                    <i className="fa fa-calendar"></i>
                    21 mar, 2021
                  </span>
                  <span className="comments-type">
                    <i className="fa fa-comment-o"></i>
                    32
                  </span>
                </div>
                <div className="blog-title">
                  <a href="#">
                    <h4>10 Habits of Successful Traders: A Guide for Aspiring Professionals</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="single-blog">
              <div className="blog-image">
                <a className="image-scale" href="#">
                  <img src={bp2} alt="" />
                </a>
              </div>
              <div className="blog-content">
                <div className="blog-category">
                  <span>Media</span>
                </div>
                <div className="blog-meta">
                  <span className="admin-type">
                    <i className="fa fa-user"></i>
                    Admin
                  </span>
                  <span className="date-type">
                    <i className="fa fa-calendar"></i>
                    14 Mar, 2021
                  </span>
                  <span className="comments-type">
                    <i className="fa fa-comment-o"></i>
                    32
                  </span>
                </div>
                <div className="blog-title">
                  <a href="https://www.patreon.com/posts/money-management-78251926">
                    <h4>Money Management 💰 tips & tricks</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="single-blog">
              <div className="blog-image">
                <a className="image-scale" href="https://www.patreon.com/posts/most-interesting-78373224">
                  <img src={bp12} alt="" />
                </a>
              </div>
              <div className="blog-content">
                <div className="blog-category">
                  <span>Profit</span>
                </div>
                <div className="blog-meta">
                  <span className="admin-type">
                    <i className="fa fa-user"></i>
                    Admin
                  </span>
                  <span className="date-type">
                    <i className="fa fa-calendar"></i>
                    28 Feb, 2021
                  </span>
                  <span className="comments-type">
                    <i className="fa fa-comment-o"></i>
                    32
                  </span>
                </div>
                <div className="blog-title">
                  <a href="https://www.patreon.com/posts/most-interesting-78373224">
                    <h4>Most interesting and impactful moments in stock market history</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="single-blog">
              <div className="blog-image">
                <a className="image-scale" href="https://www.patreon.com/posts/tips-and-tricks-78428384">
                  <img src={bp1} alt="" width="500" height="300" />
                </a>
              </div>
              <div className="blog-content">
                <div className="blog-category">
                  <span>Profit</span>
                </div>
                <div className="blog-meta">
                  <span className="admin-type">
                    <i className="fa fa-user"></i>
                    Admin
                  </span>
                  <span className="date-type">
                    <i className="fa fa-calendar"></i>
                    28 Feb, 2021
                  </span>
                  <span className="comments-type">
                    <i className="fa fa-comment-o"></i>
                    32
                  </span>
                </div>
                <div className="blog-title">
                  <a href="https://www.patreon.com/posts/tips-and-tricks-78428384">
                    <h4>Tips and Tricks for day traders</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="single-blog">
              <div className="blog-image">
                <a className="image-scale" href="https://www.patreon.com/posts/tips-on-78652196">
                  <img src={bp2} alt="" width="500" height="300" />
                </a>
              </div>
              <div className="blog-content">
                <div className="blog-category">
                  <span>Profit</span>
                </div>
                <div className="blog-meta">
                  <span className="admin-type">
                    <i className="fa fa-user"></i>
                    Admin
                  </span>
                  <span className="date-type">
                    <i className="fa fa-calendar"></i>
                    28 Feb, 2021
                  </span>
                  <span className="comments-type">
                    <i className="fa fa-comment-o"></i>
                    32
                  </span>
                </div>
                <div className="blog-title">
                  <a href="https://www.patreon.com/posts/tips-on-78652196">
                    <h4>Tips on portfolio diversification</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="blog-pagination">
              <ul className="pagination">
                <li><a href="#">Prev</a></li>
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">Next</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog