import React from "react";
import AboutFooter from "../components/footer/AboutFooter";
import NavTop from "../components/nav/NavTop";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import h3 from "../assets/img/th_coin.jpg";
// import img from "../assets/img/thcoin_banner.png";
// import img2 from "../assets/img/graph/graph1.png";
import CoverImage1 from "../assets/img/VideoCover/maxresdefault (1).jpg";
import CoverImage2 from "../assets/img/VideoCover/og-image.jpg";
import CoverImage3 from "../assets/img/VideoCover/maxresdefaultnew.jpg";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import WhitePaper from "../../src/assets/pdf/whitePaper/Traders_Hub_Ninja_White_Paper.pdf";
import { postThCoinFrom } from "../services/DashboardServices";


const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be a minimum of 3 characters")
    .max(20, "Name must be a maximum of 20 characters")
    .matches(/^[A-Za-z]+$/, "Name must only contain alphabetic characters"),
  discordId: yup
    .string()
    .trim()
    .required("Discord Id is required")
    .min(3, "Discord Id must be a minimum of 3 characters")
    .max(20, "Discord Id must be a maximum of 20 characters"),
  walletAddress: yup.string().trim().required("Wallet Address is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email format"),
});

function Th_coin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });



  const onSubmit = async (data) => {
    try {

      const response = await postThCoinFrom(data)
      if (response.status == 200) {

        toast.success(response.data.success, { autoClose: 2000 })
        reset()
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
    }
  };



  const handleDownload = () => {
    window.open('https://docs.google.com/document/d/e/2PACX-1vTwfbkf4cnQIvbRc1ORHrLSTQ5TKGm-_j-Hpe-AVxQZKsAriRtSSqM0wa2nOalUOtjl4AURfUT5faQO/pub', '_blank');
  };

  const copyToClipboard = () => {
    const text = "ES2TsW8ZY5GWguteyJtD6jCAeC23XHfMFscLEdmJzQxg";
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Optionally handle success (e.g., show a toast notification)
        toast.success("Copied!", { autoClose: 1000 });
      })
      .catch((err) => {
        // Handle error
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      <Helmet>
        <title>
          Your Trusted Partner for the Best Online Stock Trading Courses and
          Stock Trading Education
        </title>
        <meta
          name="description"
          content="Discover the story behind our commitment to excellence in online stock trading education.
 As your trusted partner, we provide the best stock trading courses online, empowering you with the knowledge and skills
  for financial success. Join us on your journey to master the art of stock trading."
        />
        <link rel="canonical" href="https://staging.tradershub.ninja/about/" />
      </Helmet>

      <main>
        <div>
          <NavTop />
        </div>

        <section className="container-fluid other_page_hero_Section_hp">
          <div className="container">
            <div className="breadcrumb-title text-center" data-aos="zoom-in-up">
              <h2 className="font-weight-bold">
                Traders Hub- The ninja Thn-Coin in market!
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
                    <li className="breadcrumb-items text-light mr-2">
                      Thn Coin
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid wallet_address_bar_section_sl mb-5">
          <div className="container">
            <div className="row">
            <div className="col-12">
                <ToastContainer position="top-right" />

                <div className="wrapper_sl">
                  <h2>Pre-Sale Wallet Address:</h2>
                  <div className="wallet_address_sl">
                    <h5 className="mb-0">
                      ES2TsW8ZY5GWguteyJtD6jCAeC23XHfMFscLEdmJzQxg
                    </h5>
                    <i
                      class="fa-solid fa-copy"
                      onClick={copyToClipboard}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>

                  <h2>Contract Address (ca)</h2>
                  <h5>2rax9aQTeGKU37J7BDwugbDRaC9UkjS9Jd1keG6nY7fA</h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid thcoin_about_section_sl my-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="thcoin_about_left">
                  <h1>About Thn-Coin</h1>
                  <p>
                    We are thrilled to announce the launch of our own
                    cryptocurrency, Traders Hub Ninja (symbol: $THN), on the
                    Thn-Coin network! This coin is designed to enhance and
                    expand our community's experience, offering both value and
                    utility to our members. This is a
                    unique opportunity to be an early adopter and benefit from
                    our coin's growth over time. The goal is to hold and grow
                    $THN, providing both financial benefits and access to our
                    extensive range of services. Stay tuned for the coin address
                    and the link to Dexscreener, which will be updated on
                    Discord within the next day. Join us in this exciting
                    venture to not only enhance your trading experience but also
                    to be part of a growing and dynamic community. Unlock your
                    inner ninja and enjoy the full range of benefits that come
                    with being a Traders Hub Ninja member.
                  </p>
                  <button className="btn btn_thn_coin" onClick={handleDownload}>
                    <i class="fa-solid fa-cloud-arrow-down"></i> Download white
                    paper
                  </button>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="thcoin_about_right text-center">
                  <img src={h3} alt="th_coin" width={"100%"} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid thcoin_video_tutorial_section my-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="heading">
                  <h4>HOW TO BUY VIDEO TUTORIALS: </h4>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="video_tutorial_list">
                  <div class="card" href="#">
                    <a
                      className="link"
                      href="https://youtu.be/3anoR0kwp5Y?si=dPE8Q1n0pqeUr0IY"
                      target="_blank"
                    >
                      <img src={CoverImage1} class="card-img" alt="..." />
                    </a>
                    <div class="card-body">
                      <span class="card-text p-0">YouTube</span>
                      <h5 class="card-title mb-0">
                        How to Buy Solana (SOL) on Coinbase
                      </h5>
                      <p className="mb-0">AMP How To</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="video_tutorial_list">
                  <div class="card" href="#">
                    <a
                      className="link"
                      href=" https://phantom.app"
                      target="_blank"
                    >
                      <img src={CoverImage2} class="card-img" alt="..." />
                    </a>
                    <div class="card-body">
                      <span class="card-text p-0">Phantom</span>
                      <h5 class="card-title mb-0">
                        Phantom — Crypto & NFT Wallet — Solana | Ethereum |
                        Polygon
                      </h5>
                      <p className="mb-0">
                        Your trusted companion for NFTs & DeFi on Solana,
                        Ethereum, & Polygon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="video_tutorial_list">
                  <div class="card" href="#">
                    <a
                      className="link"
                      href="https://www.youtube.com/watch?v=CoyvAyxX0aw"
                      target="_blank"
                    >
                      <img src={CoverImage3} class="card-img" alt="..." />
                    </a>
                    <div class="card-body">
                      <span class="card-text p-0">YouTube</span>
                      <h5 class="card-title mb-0">
                        How to Set Up a Phantom Wallet (Step-by-Step Tutorial)
                      </h5>
                      <p className="mb-0">Dynamo DeFi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid th_coin_steps mb-5">
          <div className="container">
            <div className="th_coin_steps_wrapper">
              <div className="row">
                <div className="col-12">
                  <div className="heading">
                    <h3>Steps:</h3>
                  </div>
                </div>
                <div className="col-12">
                  <div className="list-items mt-3">
                    <ul>
                      <li className="d-flex">
                        <i class="fa-solid fa-check-double"></i>
                        <p>
                          The goal here is to hold and grow this coin overtime
                          in addition to padding our bank accounts. The coin
                          will be called Traders Hub Ninja. Based off of our
                          legitimate business model. As you all know, being an
                          all access member gives you access to: the android
                          app, ios app, our full fledged website/ login
                          interface, custom built trading view indicators,
                          custom built discord alert bot (that has a ton of
                          features), etc.
                        </p>
                      </li>
                      <li className="d-flex">
                        <i class="fa-solid fa-check-double"></i>
                        <p>
                          This will not be just a regular meme coin, but it will
                          have actual utility as holder of the coin will also be
                          able to gain access to all of the Traders Hub paid
                          services. We will be implementing a bot that will
                          track coin balances, and by holding a coin balance,
                          you will also be able to access our services as a
                          member which includes the many features within our
                          ecosystem, mentioned above.
                        </p>
                      </li>
                      <li className="d-flex">
                        <i class="fa-solid fa-check-double"></i>
                        <p>
                          In addition to the coin, we will be launching our own
                          Traders Hub Ninja video game that will be available on
                          Android as well as iOS. And, we will also be launching
                          an NFT where you will be able to purchase an mint
                          Traders Hub Ninja artwork. You will even have the
                          option of having your own custom art designed based on
                          our ninja theme, where you will be able to unlock your
                          inner ninja and have your own art.
                        </p>
                      </li>
                      <li className="d-flex">
                        <i class="fa-solid fa-check-double"></i>
                        <p>
                          We are keeping the window open for presale until
                          tomorrow morning. 1 SOL (Solana) will get you 20
                          million tokens of $THN. Once pre-sale closes, tokens
                          will be distributed to anyone that purchased pre-sale
                          prior to launching. If you are interested in
                          purchasing tokens presale, please follow these
                          instruction
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid contact_form_section my-5">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-6 col-lg-7 col-md-10 col-12 m-auto"
                data-aos="zoom-in-up"
              >
                <div className="Section_heading_area_hp">
                  <h1>Fill out this form</h1>
                  <p>
                    If you have any questions or need guidance, please do not
                    hesitate to reach out to me and I will gladly assist.
                  </p>
                </div>
              </div>
            </div>

            <form data-aos="zoom-in-up" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <label for="">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`form-control `}
                      placeholder="Enter the Name"
                      aria-describedby="helpId"
                      {...register("name")}
                    />
                    <p style={{ color: "red" }}>{errors.name?.message}</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <label for="">Discord Id</label>
                    <input
                      type="text"
                      name="number"
                      id="number"
                      className={`form-control`}
                      placeholder="Enter the DiscordId"
                      aria-describedby="helpId"
                      {...register("discordId")}
                    />
                    <p style={{ color: "red" }}>{errors.discordId?.message}</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <label for="">Wallet Address</label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className={`form-control `}
                      placeholder="Enter the Subject"
                      aria-describedby="helpId"
                      {...register("walletAddress")}
                    />
                    <p style={{ color: "red" }}>
                      {errors.walletAddress?.message}
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <label for="">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className={`form-control`}
                      placeholder="Enter the Email"
                      aria-describedby="helpId"
                      {...register("email")}
                    />
                    <p style={{ color: "red" }}>{errors.email?.message}</p>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-5 col-12 m-auto pt-3">
                  <button type="submit" className="btn_main2_hp w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <AboutFooter />
      </main>
    </>
  );
}

export default Th_coin;
