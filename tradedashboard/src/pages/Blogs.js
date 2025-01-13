import React from "react";
import NavTop from "../components/nav/NavTop";
import AboutFooter from "../components/footer/AboutFooter";
import { Link } from "react-router-dom";
import NewBlog from "./NewBlog";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  return (
    <>
      <Helmet>
        <title>
          Unlock Your Trading Potential with Beginner and Advanced Trading
          Courses
        </title>
        <meta
          name="description"
          content="Discover the path to financial success with our curated blog on trading courses. 
          From essential basics for beginners to advanced strategies, explore insights that cater to traders at every level 
          of expertise. Elevate your trading knowledge with our expertly crafted content."
        />
      </Helmet>


      <main>
        <NavTop />

        <section className="container-fluid other_page_hero_Section_hp">
          <div className="container">
            <div className="breadcrumb-title text-center" data-aos="zoom-in-up">
              <h2 className="font-weight-bold">
                Explore the future of trading with TradersHub's latest
                blog, delving into the rise of decentralized exchanges,
                daily recaps, weekly summaries, and more market updates.
              </h2>
              <div className="bread-come">
                <nav aria-label="breadcrumb ">
                  <ol className="list-unstyled d-flex flex-wrap p-0 mb-0 justify-content-center">
                    <li className="breadcrumb-items">
                      <Link to="/" className="text-light text-decoration-none">
                        Home
                      </Link>
                      <i className="ti-angle-right" aria-hidden="true"></i>
                    </li>

                    <li className="breadcrumb-items mr-2">
                      <i className="fa-solid fa-angle-right text-white"></i>
                    </li>

                    <li className="breadcrumb-items">
                      <a
                        href="/blog"
                        className="font-weight-bold text-white text-decoration-none"
                      >
                        {" "}
                        Blogs{" "}
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <NewBlog />

        <AboutFooter />
      </main>
    </>
  );
};

export default Blogs;
