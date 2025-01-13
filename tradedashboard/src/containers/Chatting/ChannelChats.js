import React from "react";
import "./Chat.css";

const ChannelChats = ({ text }) => {
  return (
    <div style={{ height: "15vh" }}>
      <div className=" px-5 pr-5">
        <div className="d-flex">
          <div className="chat-profile-logo">
            <img
              src="https://images.unsplash.com/photo-1679678691010-894374986c54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1798&q=80"
              alt=""
            />
            <h5>username</h5>
            <span style={{ color: "grey" }}>12/20/2023</span>
          </div>
          <div style={{ width: "84%" }}>
            <h4 className="p-5" style={{ display: "flex", flexWrap: "wrap" }}>
              {text}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelChats;
