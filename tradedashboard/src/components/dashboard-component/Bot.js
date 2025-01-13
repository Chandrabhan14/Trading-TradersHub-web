import React, { useState, useEffect } from "react";
import blue from "../../assets/img/logo/blue.jpg";
import green from "../../assets/img/logo/green.jpg";
import orange from "../../assets/img/logo/orange.jpg";
import pink from "../../assets/img/logo/pink.jpg";
import NavBottom from "../nav/NavBottom/NavBottom";
import Side from "../sidebar/side";
import { BsPencil } from "react-icons/bs";
import Editbox1 from "./Editbox1";
import Editbox2 from "./Editbox2";
import useWebSocket from "../../hooks/useWebsocket";
const Bot = () => {
  const [isEditboxVisible1, setEditboxVisible1] = useState(false);
  const [isEditboxVisible2, setEditboxVisible2] = useState(false);
  const { ws, sendMessage } = useWebSocket(
    "ws://3.142.132.115:5000/th_backend/"
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const dataString = localStorage.getItem("googledata");
      const userDataFromLocalStorage = JSON.parse(dataString);
      const uid = userDataFromLocalStorage?.uid;

      const message = {
        user: uid ? uid : "Anonymous",
        content: "Automatic message from WatchList component",
      };
      sendMessage(message);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [sendMessage]);
  const handleEditboxToggle1 = () => {
    setEditboxVisible1(true);
    setEditboxVisible2(false);
  };
  const handleEditboxToggle2 = () => {
    setEditboxVisible1(false);
    setEditboxVisible2(true);
  };
  return (
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid Bot_section_hp">

          {/* Sidebar Section */}
          <Side />
          {/* Sidebar Section */}

          <div className="mb-4 content content_section_hp" >
            <div className="row justify-content-around">
              <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                <div className="thumbnail ">
                  <div className="containerimg">
                    <img src={blue} alt="logo" />
                    <div className="top-right">
                      <button type="button" className="active" onClick={handleEditboxToggle1} data-toggle="modal" data-target="#Bot_TradersHub_ninja" >
                        {" "} <BsPencil />{" "}
                      </button>
                    </div>
                  </div>
                  <strong>TradersHub.ninja</strong>
                  {isEditboxVisible1 && <Editbox2 />}
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                <div className="thumbnail">
                  <div className="containerimg">
                    <img src={blue} alt="logo" />
                    <div className="top-right">
                      <button type="button" className="active" onClick={handleEditboxToggle2} data-toggle="modal" data-target="#Bot_ThPersonal_Bot" >
                        {" "} <BsPencil /> {" "}
                      </button>
                    </div>
                  </div>
                  <strong>Th-Personal-Bot</strong>
                </div>
                {isEditboxVisible2 && <Editbox1 />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bot;
