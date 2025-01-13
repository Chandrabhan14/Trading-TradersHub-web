import React from "react";
import NavTop from "../components/nav/NavTop";
import AboutFooter from "../components/footer/AboutFooter";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Newspaper from "../assets/img/Newspaper.gif";
import MoversSpikes from "../assets/img/MoversSpikes.gif";
import Fireworks from "../assets/img/Fireworks.gif";
import Announcement from "../assets/img/Announcement.gif";
import File from "../assets/img/File.gif";
import options from "../assets/img/options.gif";
import Astronot from "../assets/img/Astronot.gif";
import AlertSymbol from "../assets/img/AlertSymbol.gif";
import Newspaperbot from "../assets/img/bot/news.png";
import moversspikesbot from "../assets/img/bot/movers.png";
import nhod from "../assets/img/bot/nhod.png";
import weekhigh from "../assets/img/bot/52H.png";
import weeklow from "../assets/img/bot/52L.png";
import Crypto from "../assets/img/bot/Crypto.png";
import Futures from "../assets/img/bot/Futures.png";
import Optionsbot from "../assets/img/bot/Options.png";
import HALT from "../assets/img/bot/HALT.png";
import Formbot from "../assets/img/bot/Form.png";

function ThBotService() {
  const botServices = [
    {
      image: Newspaper,
      title: "News Feeds",
      botImage: Newspaperbot,
      description: "Get the latest news and updates from your favorite stocks, all in one place."
    },
    {
      image: MoversSpikes,
      title: "Movers Spikes",
      botImage: moversspikesbot,
      description: "Stay on top of the market with real-time updates on stock movers and spikes."
    },
    {
      image: Fireworks,
      title: "Nhod",
      botImage: nhod,
      description: "Get notified when a stock is about to make a new high of day."
    },
    {
      image: AlertSymbol,
      title: "52 week High",
      botImage: weekhigh,
      description: "Get notified when a stock is about to make a new high of year."
    },
    {
      image: AlertSymbol,
      title: "52 week Low",
      botImage: weeklow,
      description: "Get notified when a stock is about to make a new low of year."
    },
    {
      image: Announcement,
      title: "halt alerts",
      botImage: HALT,
      description: "Get notified when a stock is about to halt or resume trading."
    },
    {
      image: File,
      title: "Form Filings",
      botImage: Formbot,
      description: "Get notified when a company files a form with the SEC."
    },
    {
      image: options,
      title: "Option alerts",
      botImage: Optionsbot,
      description: "Get Alerts to buy or sell options based on your criteria."
    },
    {
      image: Astronot,
      title: "Crypto Alerts",
      botImage: Crypto,
      description: "Get Alerts to buy or sell Cryptos based on your criteria."
    },
    {
      image: Astronot,
      title: "Futures Alerts",
      botImage: Futures,
      description: "Get Alerts to buy or sell Futures based on your criteria."
    },
    {
      title: "Contact us: Discord",
      button: {
        text: "Join our Discord",
        link: "https://discord.gg/6eF9keWpjr"
      },
      description: "Join our Discord community to get support and updates.",
      Email: "marketing@tradershub.ninja"
    }
  ];

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href="https://staging.tradershub.ninja/contact/"
        />
        <title>
          Contact Us for the Best Online Trading Courses and Education
        </title>
        <meta
          name="description"
          content="Reach out to us with any inquiries about the best trading courses online and top-notch trading education. Whether you're seeking information on trading education websites or looking for courses near you, our team is here to assist you. Connect with us for a knowledgeable and personalized trading journey."
        />
      </Helmet>
      <main>
        <NavTop />
      </main>

      <section className="container-fluid other_page_hero_Section_hp">
        <div className="container">
          <div className="breadcrumb-title text-center" data-aos="zoom-in-up">
            <h2 className="font-weight-bold">
              Ninja Bot - The Ultimate Trading Bot
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
                      href="/contact"
                      className="font-weight-bold text-white text-decoration-none"
                    >
                      {" "}
                      TH Bot{" "}
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid thbot_section_hp my-5">
        <div className="container">
          <div className="row">
            {botServices.map((service, index) => (
              <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4" data-aos="zoom-in-up">
                <div className="thbot_item_area" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  {service.image && (
                    <div className="thbot_item_img" style={{ marginBottom: '15px' }}>
                      <img src={service.image} alt={service.title} className="transparent-image" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                    </div>
                  )}
                  <div className="thbot_item_content_area" style={{ textAlign: 'center' }}>
                    <h4 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{service.title}</h4>
                    {service.botImage && (
                      <img src={service.botImage} className="thbot_item_img_bot transparent-image" alt={`${service.title} bot image`} style={{ width: '200px', height: '150px', marginBottom: '10px' }} />
                    )}
                    <p style={{ fontSize: '1rem', color: 'white' }}>{service.description}</p>
                    {service.button && (
                        <a href={service.button.link} className="btn btn-primary" style={{ marginTop: '10px' }}>
                          {service.button.text}
                        </a>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutFooter />
    </>
  )
}

export default ThBotService;