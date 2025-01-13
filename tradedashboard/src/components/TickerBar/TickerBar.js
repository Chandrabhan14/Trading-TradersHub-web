import React, { useEffect, useState } from "react";
import {
  getStockMarketTopActiversa,
  getStockMarketTopGainersa,
  getTickerBara,
} from "../../services/UserServices";
import useWebSocket from "react-use-websocket";

import ReactHover, { Trigger, Hover } from "react-hover";

function TickerBar() {
  const [tickerList, setTickerList] = useState([]);
  const [topGainersData, setTopGainersData] = useState([]);
  const [topActivesData, setTopActivesData] = useState([]);
  const [tickerBar, setTickerBar] = useState([]);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://3.128.172.201:5000/financial_ws/",
    {
      onOpen: () => console.log("opened"),
      shouldReconnect: (closeEvent) => true,
    }
  );

  const getTickerBar = async (_props) => {
    try {
      const response = await getTickerBara();
      setTickerList(response.data.data);
      const formattedData = response?.data?.data.map((item, index) => {
        return (
          <span>
            {`${item.symbol} : $${item.price} ${item.changesPercentage}%`}
          </span>
        );
      });
      setTickerBar(formattedData);
    } catch (error) {
      console.log("Error:", error);
      setTickerBar([]);
    }
  };


  useEffect(() => {
    getTickerBar();
  }, []);

  useEffect(() => {
    tickerList.map((i) => {
      sendJsonMessage({
        event: "subscribe",
        value: i.symbol,
        ticker: i.symbol,
      });
    });
  }, [tickerList]);

  useEffect(() => {
    if (lastJsonMessage) {
      const updatedTickerList = tickerList?.map((item) => {
        if (item?.symbol?.toLowerCase() === lastJsonMessage?.s?.toLowerCase()) {
          item.price = lastJsonMessage?.price;
          return item;
        }
        return item;
      });
      const formattedData = updatedTickerList?.map((item, index) => {
        return (
          <span>
            {`${item.symbol} : $${item.price} ${item.changesPercentage}%`}
          </span>
        );
      });
      setTickerBar(formattedData);
      setTickerList(updatedTickerList);
    }
  }, [lastJsonMessage]);

  const getStockMarketTopActivers = async () => {
    try {
      const result = await getStockMarketTopActiversa();
      setTopActivesData(result?.data?.data.slice(0, 5));
    } catch (error) {
      setTopActivesData([]);
    }
  };

  const getStockMarketTopGainers = async () => {
    try {
      const result = await getStockMarketTopGainersa();
      setTopGainersData(result?.data?.data.slice(0, 5));
    } catch (error) {
      setTopGainersData([]);
    }
  };

  useEffect(() => {
    getStockMarketTopActivers();
    getStockMarketTopGainers();
  }, []);

  const combinedData = [...topGainersData, ...topActivesData];

  const handleClick = (item) => {
    window.location.href=(`/search/${item}`);
  };

  return (
    <div
      className="ticker-container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          zIndex: "999",
          background: "#010034",
          padding: "0 15px",
        }}
      >
        {tickerList.map((ticker, index) => (
          <ReactHover
            key={index}
            options={{ followCursor: false, shiftX: 20, shiftY: 0 }}
          >
            <Trigger type='trigger'>
              <div
                key={index}
                style={{ display: "flex", margin: "0 5px", cursor: "pointer" }}
              >
                <strong className="mb-0 mr-1">{ticker.symbol}</strong>
                <p
                  className="mb-0"
                  style={{
                    color: ticker.changesPercentage >= 0 ? "green" : "red",
                  }}
                >
                  {ticker.changesPercentage >= 0 ? (
                    <i className="fas fa-arrow-up"></i>
                  ) : (
                    <i className="fas fa-arrow-down"></i>
                  )}
                  {` ${ticker.changesPercentage.toFixed(2)}%`}
                </p>
              </div>
            </Trigger>

            <Hover  type='hover'>
              <div
                onClick={() => handleClick(ticker.symbol)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#010033",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <strong className="mb-1">{ticker.symbol}</strong>
                <p className="mb-1">{ticker.name}</p>
                <hr style={{ border: "1px solid #ccc", width: "100%" }} />
                <h2 className="mb-1">{`$${ticker.price}`}</h2>
                <p
                  className="mb-1"
                  style={{
                    color: ticker.changesPercentage >= 0 ? "green" : "red",
                  }}
                >
                  {" "}
                  {ticker.changesPercentage >= 0 ? (
                    <i className="fas fa-arrow-up"></i>
                  ) : (
                    <i className="fas fa-arrow-down"></i>
                  )}
                  {` ${ticker.changesPercentage.toFixed(2)}%`}
                </p>
              </div>
            </Hover>
          </ReactHover>
        ))}
        <p className="mb-0 ml-3">TRENDING <i class="fa fa-info-circle" aria-hidden="true"></i></p>
      </div>

      <div className="ticker-content">
        <div style={{ display: "flex" }}>
          {combinedData.map((item, index) => (
            <ReactHover
              key={index}
              options={{ followCursor: false, shiftX: 20, shiftY: 0 }}
              style={{ width: "200px" }}
            >
              <Trigger type='trigger'>
                <div style={{ display: "flex", marginRight: "10px" }}>
                  <p className="mb-0 mr-1">{item.symbol}</p>
                  <p
                    className="mb-0"
                    style={{
                      color: item.changesPercentage >= 0 ? "green" : "red",
                    }}
                  >
                    {item.changesPercentage >= 0 ? (
                      <i className="fas fa-arrow-up"></i>
                    ) : (
                      <i className="fas fa-arrow-down"></i>
                    )}
                    {` ${item.changesPercentage.toFixed(2)}%`}
                  </p>
                </div>
              </Trigger>
              <Hover type='hover'>
                <div
                  onClick={() => handleClick(item.symbol)}
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#010033",
                    borderRadius: "5px",
                  }}
                >
                  <strong className="mb-1">{item.symbol}</strong>

                  <p className="mb-1">{item.name}</p>
                  <hr style={{ border: "1px solid #ccc", width: "100%" }} />
                  <h2 className="mb-1">{`$${item.price}`}</h2>
                  <p
                    className="mb-1"
                    style={{
                      color: item.changesPercentage >= 0 ? "green" : "red",
                    }}
                  >
                    {item.changesPercentage >= 0 ? (
                      <i className="fas fa-arrow-up"></i>
                    ) : (
                      <i className="fas fa-arrow-down"></i>
                    )}
                    {` ${item.changesPercentage.toFixed(2)}%`}
                  </p>
                </div>
              </Hover>
            </ReactHover>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TickerBar;
