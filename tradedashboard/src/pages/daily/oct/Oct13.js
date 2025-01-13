import React from "react";
import NavTop from "../../../components/nav/NavTop";
import blogpic from "../../../assets/img/daily/oct/oct13/1.png";
import blogpic3 from "../../../assets/img/daily/oct/oct13/3.png";
import blogpic4 from "../../../assets/img/daily/oct/oct13/4.png";
import blogpic5 from "../../../assets/img/daily/oct/oct13/7.png";
import blogpic6 from "../../../assets/img/daily/oct/oct13/8.png";
import blogpic7 from "../../../assets/img/daily/oct/oct13/9.jpeg";
import blogpic8 from "../../../assets/img/daily/oct/oct13/6.png";
import blogpic9 from "../../../assets/img/daily/oct/oct13/5.png";

const Oct13 = () => {
  return (
    <main>
      <NavTop />
      <div className="page-area bread-pd">
        <div className="breadcumb-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb-title text-center">
                <h2 className="font-weight-bold">
                  Market Insights | Philadelphia Fed President Harker Recommends
                  Keeping Interest Rates 'Unchanged'
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-area blog-details bg-color blog-sidebar-right fix area-padding pt-0">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 col-sm-8 col-xs-12">
              <article className="blog-post-wrapper">
                <div className="blog-banner">
                  <a href="#" className="blog-images">
                    <img src={blogpic} alt="" />
                  </a>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="admin-type">
                        <i className="fa fa-user"></i>TradersHub
                      </span>
                      <span className="date-type">
                        <i className="fa fa-calendar"></i>13 Oct, 2023
                      </span>
                      <span className="comments-type">
                        <i className="fa fa-comment-o"></i>
                      </span>
                    </div>
                    <p></p>
                    <blockquote>
                      <p>
                        Philadelphia Fed President Patrick Harker believes that
                        the central bank can halt its interest rate increases.
                        As a voting member of the Federal Open Market Committee,
                        his statement holds significance, suggesting a potential
                        pause in rate hikes.
                      </p>
                    </blockquote>
                    <p>
                      {" "}
                      <b>🌍 Global Geopolitical Concerns</b>{" "}
                    </p>
                    <p>
                      JPMorgan Chief Executive Jamie Dimon expresses concerns
                      about the current global geopolitical environment. He
                      highlights the war in Ukraine and recent attacks on Israel
                      as events with far-reaching impacts on energy and food
                      markets, global trade, and geopolitical relationships.
                    </p>

                    <h4>
                      <p>
                        <b>⛽ Oil Price Volatility</b>{" "}
                      </p>
                      <p>
                        Oil prices experienced a volatile week, surging after
                        news of Hamas's attack on Israel. West Texas
                        Intermediate climbed above $87 a barrel, recording its
                        largest weekly gain in a month. Concerns about the
                        Israel-Hamas conflict and US sanctions on crude sales to
                        Russia drove these price fluctuations.
                      </p>
                    </h4>
                    <div>
                      <img src={blogpic5} alt="" width="1000" height="400" />
                    </div>
                    <br />
                    <br />
                    <p>
                      <b>📉📊 Mixed Results in Stocks</b>{" "}
                    </p>
                    <p>
                      The stock market ended the week with mixed results. The
                      Dow Jones Industrial Average was the sole gainer, while
                      the S&P 500 and Nasdaq Composite declined. Strong earnings
                      reports from big US banks, including Wells Fargo and
                      JPMorgan, were closely watched.
                    </p>
                    <div>
                      <img src={blogpic3} alt="" width="2000" height="500" />
                    </div>
                    <br />
                    <div>
                      <img src={blogpic4} alt="" width="2000" height="500" />
                    </div>
                    <br />
                    <p>
                      <b>📈 10-Year Treasury Yield Decline</b>{" "}
                    </p>
                    <p>
                      The 10-year Treasury yield fell nearly 8 basis points to
                      4.63% amid concerns about a potential ground assault in
                      Gaza. This followed a rise in bond yields and the end of a
                      four-day winning streak for stocks after a report
                      indicated persistent US headline inflation.
                    </p>
                    <div>
                      <img src={blogpic6} alt="" width="2000" height="500" />
                    </div>
                    <br />
                    <p>
                      <b>💼 Earnings Season Watch</b>
                    </p>
                    <p>
                      Here's a sneak peek at next week's earnings lineup,
                      featuring major players to keep a close eye on: Bank of
                      America, United, Tesla, Netflix, and AT&T.
                    </p>
                    <div>
                      <img src={blogpic7} alt="" width="2000" height="500" />
                    </div>
                    <br />
                    <p>
                      <b>Currencies:</b>{" "}
                    </p>
                    <p>
                      {" "}
                      The Bloomberg Dollar Spot Index remained relatively
                      unstable.
                    </p>
                    <div>
                      <img src={blogpic8} alt="" width="2000" height="500" />
                    </div>
                    <br />
                    <p>
                      <b>Cryptocurrencies:</b>{" "}
                    </p>
                    <p>
                      {" "}
                      Bitcoin experienced a 0.84% up, while Ether had a slight
                      increase.
                    </p>
                    <div>
                      <img src={blogpic9} alt="" width="1000" height="500" />
                    </div>
                    <br />

                    <p>
                      <b>NOTE: </b>{" "}
                    </p>
                    <p>
                      {" "}
                      Stay Tune for more updates! : <br />
                      <a
                        href="https://twitter.com/TradershubNinja"
                        target="_blank"
                      >
                        X.com
                      </a>
                      <br />
                      <a
                        href="https://www.youtube.com/@TradersHubNinja"
                        target="_blank"
                      >
                        YouTube.com
                      </a>
                    </p>
                  </div>
                  <div className="blog-single-tags">
                    <div className="list-tag-title">Tags:</div>
                    <ul className="tag-list">
                      <li>
                        <a href="#">Daily-Recap</a>
                      </li>
                      <li>
                        <a href="#">Oct12</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
              <div className="clear"></div>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Oct13;
