import React from "react";
import NavTop from "../../../components/nav/NavTop";
import blogpic from "../../../assets/img/daily/oct/oct17/1.png";
import blogpic2 from "../../../assets/img/daily/oct/oct17/2.png";
import blogpic3 from "../../../assets/img/daily/oct/oct17/3.png";
import blogpic4 from "../../../assets/img/daily/oct/oct17/4.png";
import blogpic5 from "../../../assets/img/daily/oct/oct17/5.png";
import blogpic6 from "../../../assets/img/daily/oct/oct17/6.png";

const Oct17 = () => {
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
                  Market Recap | Bond Yields Hit Fresh Highs After Hot Retail
                  Sales Data | October 17, 2023
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
                        <i className="fa fa-calendar"></i>17 Oct, 2023
                      </span>
                      <span className="comments-type">
                        <i className="fa fa-comment-o"></i>
                      </span>
                    </div>
                    <p></p>
                    <blockquote>
                      <p>
                        U.S. government bond yields reached decade-plus highs on
                        Tuesday due to strong economic data, raising concerns
                        about prolonged elevated interest rates.
                      </p>
                    </blockquote>

                    <p>
                      The latest retail sales report revealed a
                      better-than-expected 0.7% increase in spending in
                      September, causing Treasury yields to rise. The benchmark
                      10-year bond yield closed at 4.846%, the highest level
                      since July 2007.
                    </p>

                    <br />

                    <h4>
                      Stock markets experienced fluctuations but closed with
                      minimal changes. The S&P 500 fell slightly, the Dow Jones
                      added a marginal gain, and the Nasdaq Composite was down
                      by 0.3%.
                    </h4>
                    <div>
                      <img src={blogpic2} alt="" width="2000" height="500" />
                    </div>
                    <br />
                    <p>
                      Higher bond yields are leading to increased borrowing
                      costs for various entities, although consumer spending
                      remains strong and supportive of the economy.
                    </p>
                    <div>
                      <img src={blogpic3} alt="" width="1000" height="400" />
                    </div>
                    <br />
                    <p>
                      Positive economic indicators have been surprising analysts
                      in recent weeks, leading bond traders to reassess their
                      expectations regarding the Federal Reserve's monetary
                      policy.
                    </p>
                    <p>
                      Richmond Fed President Tom Barkin suggested that inflation
                      is moving closer to the Federal Reserve's 2% target, but
                      the central bank still has time to decide on further rate
                      hikes.
                    </p>
                    <p>
                      Some investors believe that higher long-term bond yields
                      could help the Fed control inflation without the need for
                      additional rate increases.
                    </p>
                    <br />
                    <p>
                      The impact of earnings reports and the Israel-Hamas
                      conflict is also being considered by investors. Optimism
                      prevailed on Monday as the Middle East situation did not
                      escalate further, prompting a shift away from safer
                      assets.
                    </p>
                    <p>
                      Lululemon Athletica's stock surged 10%, just before its
                      inclusion in the S&P 500 index. Charles Schwab gained 4.7%
                      after reporting that bank-deposit outflows were slowing.
                    </p>
                    <p>
                      Oil prices increased slightly, with Brent crude closing at
                      $89.90 per barrel.
                    </p>
                    <div>
                      <img src={blogpic4} alt="" width="1000" height="400" />
                    </div>
                    <p>
                      In terms of earnings, Goldman Sachs and Bank of America
                      beat third-quarter estimates, Johnson & Johnson raised its
                      full-year sales guidance, and Lockheed Martin expected
                      sales growth despite budget challenges.
                    </p>
                    <p>
                      Chipmaker stocks faced pressure as the Commerce Department
                      announced restrictions on exports of
                      artificial-intelligence chips to China, affecting
                      companies like NVIDIA and Intel.{" "}
                    </p>
                    <div>
                      <img src={blogpic5} alt="" width="1000" height="400" />
                    </div>
                    <br />
                    <p>
                      Moderna shares declined due to uncertainty over U.S.
                      vaccination rates, making projections difficult. It was
                      the S&P 500's worst performer, dropping 6.1%.
                    </p>
                    <div>
                      <img src={blogpic6} alt="" width="1000" height="400" />
                    </div>
                    <br />
                    <p>
                      VF Corp, the owner of brands such as Vans and The North
                      Face, surged 14% higher after reports of activist investor
                      Engaged Capital building a stake in the company and
                      planning cost-cutting changes.
                    </p>
                    <br />
                    <p>
                      <h1>
                        <b>NOTE: </b>{" "}
                      </h1>
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

export default Oct17;
