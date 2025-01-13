import React, { useState, useEffect } from "react";

import NavBottom from "../nav/NavBottom/NavBottom";
import {
  get52WeekHigh,
  get52WeekLow,

} from "../../services/UserServices";
import axios from "axios";
import useWebSocket from "../../hooks/useWebsocket";

import launching from "../../assets/img/underconstruction/launching.png";


const Weeks52 = (props) => {

  const [data, setData] = useState([]);
  const [weeks52High, setWeeks52High] = useState();
  const [weeks52Low, setWeeks52Low] = useState();
  const { ws, messages, sendMessage, initializeWebSocket, closeWebSocket } =
    useWebSocket(); 

  const handleWebSocketToggle = () => {
    if (ws?.ws) {
      closeWebSocket();
    } else {
      initializeWebSocket();
    }
  };

  const get_52_WeekHigh = async () => {
    try {
      const response = await get52WeekHigh({
        "X-RapidAPI-Key": "62e93a32c6msh222d6ae51b9a114p1a8179jsna043249ac240",
        "X-RapidAPI-Host": "global-stock-market-api-data.p.rapidapi.com",
      });
      console.log(response.data, "data from get 52 week high:-----");
      setWeeks52High(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_52_WeekLow = async () => {
    try {
      const response = await get52WeekLow();
      console.log(response, "data from get 52 week low:-----");
      setWeeks52Low(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      // Retrieve UID from localStorage
      const googleData = JSON.parse(localStorage.getItem("googledata"));
      const uid = googleData?.uid;

      // If UID is available, proceed with the API call
      if (uid) {
        const response = await axios.get(
          `https://api.tradershub.ninja/api/admin_data?uid=${uid}`
        );
        setData(response?.data?.data?.results);
      } else {
        console.log("UID not available in localStorage");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const dataString = localStorage.getItem("googledata");
      const userDataFromLocalStorage = JSON.parse(dataString);
      const uid = userDataFromLocalStorage?.uid;
      // console.log(messages, "messagaes from watchlist---");
      const message = {
        user: uid ? uid : "Anonymous",
        content: "Automatic message from Watchlist component",
      };

      sendMessage(message);
    }, 10000);

    fetchData();
    get_52_WeekHigh();
    get_52_WeekLow();
    // Clean up WebSocket connection when the component unmounts
    return () => {
      closeWebSocket(); // Ensure the WebSocket is closed when unmounting
    };
  }, []);

  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      
      <div className="container-fluid area-padding">
        <div className="row">
          <div className="col-12">
            <div className="underconstruction m-0">
              <img src={launching} alt="" />
              <h1 className="my-2">Launching Soon</h1>
              <h4 className="my-2">This page is under construction</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weeks52;
