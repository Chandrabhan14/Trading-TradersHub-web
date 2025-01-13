import React from "react";
import NavTop from "../components/nav/NavTop";
import AboutFooter from "../components/footer/AboutFooter";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { blogSelected } from "../components/store/Reducers";
import moment from "moment";
import { useNavigate } from "react-router-dom/dist";

const BlogOverview = () => {

  const blogData = useSelector(blogSelected)
  const tags = blogData.tag.split(",").map(tag => tag.trim());
  console.log(tags,"tags")
  console.log(blogData, 'blogData')


const navigate = useNavigate();
const handleNavigate = (tag)=> {

navigate(`/search/${tag}`)
}

  return (
    <main>
      <NavTop />
      <section className="container-fluid other_page_hero_Section_hp">
        <div className="container">
          <div className="breadcrumb-title text-center" data-aos="zoom-in-up">
            <h2 className="font-weight-bold">
              TradersHub: Empowering traders with a secure and innovative decentralized finance platform.
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

                  <li className="breadcrumb-items mr-2">
                    <i className="fa-solid fa-angle-right text-white"></i>
                  </li>

                  <li className="breadcrumb-items">
                    <a
                      href="/blog-overview"
                      className="font-weight-bold text-white text-decoration-none"
                    >
                      {" "}
                      Blogs Overview{" "}
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-area blog-details container-fluid my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-10 col-md-12 col-12 mb-4">
              <article className="blog-post-wrapper">
                <div className="blog-banner">
                  <a href="#" className="blog-images">
                    <img src={blogData?.image_urls} alt="" />
                  </a>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="admin-type">
                        <i className="fa fa-user"></i>
                        Admin
                      </span>
                      <span className="date-type">
                        <i className="fa fa-calendar"></i>
                        {moment(blogData?.created_at).format(' D MMMM YYYY')}
                      </span>

                    </div>
                    <p>
                 {blogData?.title}
                    </p>
                  
                    <p dangerouslySetInnerHTML={{ __html: blogData?.text }}/> 
                
    
                 
                  {  blogData?.content_image_urls.map((item, i)=>(
                           <div className="img-blog left-blog-img">
                           <img src={item} alt="" width="500" height="300" />
                         </div>
                  ))
               }
                    
                   
                  </div>
                  <div className="blog-single-tags">
                    <div className="list-tag-title">Tags:</div>
                    <ul className="tag-list">
                    {tags.map((tag, index) => (
          <li key={index} onClick={ () =>handleNavigate(tag.toUpperCase())}>
            <a >{tag}</a>
          </li>
        ))}

                    </ul>
                  </div>
                </div>
              </article>

            </div>
          
          </div>
        </div>
      </div>

      <div>
        <AboutFooter />
      </div>
    </main>
  );
};

export default BlogOverview;
