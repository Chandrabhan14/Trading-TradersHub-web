import React, { useEffect, useState } from "react";
import WithAuth from "../auth/withAuth";
import NavBottom from "../nav/NavBottom/NavBottom";
import AwesomeSlider from "react-awesome-slider";
import 'react-awesome-slider/dist/styles.css';
import { BotAlerts } from "../../services/UserServices";
import moment from "moment";

const ThBot = () => {
  const [attention, setAttention] = useState([]);
  const [form, setForm] = useState([]);
  const [halt, setHalt] = useState([]);
  const [high, setHigh] = useState([]);
  const [low, setLow] = useState([]);
  const [movers, setMovers] = useState([]);
  const [news, setNews] = useState([]);
  const [nhod, setNhod] = useState([]);
  const [spikes, setSpikes] = useState([]);

  const getBotAlerts = async () => {
    try {
      const response = await BotAlerts();
      if (response.status === 200) {
        const data = response.data;
        setAttention(data.attention || []);
        setForm(data.form || []);
        setHalt(data.halt || []);
        setHigh(data.high || []);
        setLow(data.low || []);
        setMovers(data.movers || []);
        setNews(data.news || []);
        setNhod(data.nhod || []);
        setSpikes(data.spikes || []);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getBotAlerts();
  }, []);

  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid TH_Bot_section_hp">
          <div className="row align-items-stretch">
            <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>Attention</h2>
              <AwesomeSlider>
                {attention.map((item, index) => (
                  <div key={index}>
                    <h3> {item.title}</h3>
                    <p><strong style={{ color: "deeppink" }}>Description:</strong> {item.description}</p>
                    <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                ))}
              </AwesomeSlider>
            </div>
            <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>Halt</h2>
              <AwesomeSlider>
                {halt.map((item, index) => (
                  <div key={index}>
                    <h3> {item.title}</h3>
                    <div className="row">
                      <p className="col-md-6 col-12"> <strong style={{ color: "deeppink" }}>Price:</strong> {item.price}</p>
                      <p className="col-md-6 col-12"> <strong style={{ color: "deeppink" }}>Float:</strong> {item.float}</p>
                      <p className="col-md-6 col-12"> <strong style={{ color: "deeppink" }}>Halt type:</strong> {item.halt_type}</p>
                      <p className="col-md-12 col-12"> <strong style={{ color: "deeppink" }}>Description:</strong> {item.description}</p>
                    </div>
                    <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                ))}
              </AwesomeSlider>
            </div>
            <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>High</h2>
              <AwesomeSlider>
                {high.map((item, index) => (
                  <div key={index}>
                    <h3> {item.title}</h3>
                    <div className="row">
                      <p className="col-md-6"> <strong style={{ color: "deeppink" }}>Price:</strong> {item.price}</p>
                      <p className="col-md-6"> <strong style={{ color: "deeppink" }}>Ticker:</strong> {item.ticker}</p>
                    </div>
                    <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                ))}
              </AwesomeSlider>
            </div>
            <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>Low</h2>
              <AwesomeSlider>
                {low.map((item, index) => (
                  <div key={index}>
                    <h3> {item.title}</h3>
                    <div className="row">
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}> Price:</strong> {item.price}</p>
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}> Ticker:</strong> {item.ticker}</p>
                    </div>

                    <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                ))}
              </AwesomeSlider>
            </div>
            <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>Movers</h2>
              <AwesomeSlider>
                {movers.map((item, index) => (
                  <div key={index}>
                    <h3>{item.title}</h3>
                    <div className="row">
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}>Price:</strong> {item.volume}</p>
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}>Ticker:</strong> {item.ticker}</p>
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}>Share Float:</strong> {item.share_float}</p>
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}>Price:</strong> {item.price}</p>
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}>Volume:</strong> {item.volume}</p>
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}>Market Cap:</strong> {item.marketCap}</p>
                      <p className="col-md-6"><strong style={{ color: "deeppink" }}>Average Volume:</strong> {item.averageVolume}</p>
                    </div>
                    <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                ))}
              </AwesomeSlider>
            </div>
            <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>News</h2>
              <AwesomeSlider>
                {news.map((item, index) => (
                  <div key={index}>
                    <h3>{item.title}</h3>
                    <div className="row">
                      <p className="col-md-6"> <strong style={{ color: "deeppink" }}>Share Float:</strong> {item.share_float}</p>
                      <p className="col-md-6"> <strong style={{ color: "deeppink" }}>Market Cap:</strong> {item.marketCap}</p>
                      <p className="col-md-6"> <strong style={{ color: "deeppink" }}>Short Percentage:</strong> {item.short_percent}</p>
                    </div>
                    <a href={item.link}> {item.link}</a>
                    <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.newsTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                ))}
              </AwesomeSlider>
            </div>
            <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>NHOD</h2>
              <AwesomeSlider>
                {nhod.map((item, index) => (
                  <div key={index}>
                    <h3> {item.title}</h3>
                    <p> <strong style={{ color: "deeppink" }}>price:</strong> {item.price}</p>
                    <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                ))}
              </AwesomeSlider>
            </div>
            <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>Spikes</h2>
              <AwesomeSlider>
                {spikes.map((item, index) => (
                  <div key={index}>
                    <h3> {item.title}</h3>
                    <div className="row">
                      <p className="col-md-6"> <strong style={{ color: "deeppink" }}>Price:</strong> {item.price}</p>
                      <p className="col-md-6"> <strong style={{ color: "deeppink" }}>Ticker:</strong> {item.ticker}</p>
                      <p className="col-md-6"> <strong style={{ color: "deeppink" }}>Change:</strong> {item.change}</p>
                    </div>
                    <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>

                  </div>
                ))}
              </AwesomeSlider>
            </div>
            {/* <div className="col-xl-4 mb-4 col-lg-4 col-md-6 col-sm-12 mb-5">
              <h2>Form</h2>
              {form.length > 0 ? (
                <AwesomeSlider>
                  {form.map((item, index) => (
                    <div key={index}>
                      <h3> {item.title}</h3>

                      <div className="row">
                        <p className="col-md-6"><strong style={{ color: "deeppink" }}>Price:</strong> {item.price}</p>
                        <p className="col-md-6"><strong style={{ color: "deeppink" }}>Ticker:</strong> {item.ticker}</p>
                        <p className="col-md-6"><strong style={{ color: "deeppink" }}>Change:</strong> {item.change}</p>
                      </div>

                      <p className="time_date_area"><i class="fa-regular fa-calendar-days mr-2"></i> {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                  ))}
                </AwesomeSlider>
              ) : (

                <p>No records found</p>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(ThBot);
