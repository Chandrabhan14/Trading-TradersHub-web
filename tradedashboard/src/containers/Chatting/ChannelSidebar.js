import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Link, NavLink, useLocation } from "react-router-dom";

const ChannelSidebar = () => {
  const location = useLocation();

  return (
    <div>
      <aside className="sidebar">
        <div className="dashboard-side">
          <div className="dashboard-head">
           
          </div>
          <div className="dashboard-menu">
            <ul>
              <li className="navlist">
                <NavLink to="/watchlist" className="link">
                  <h4>Community</h4>
                </NavLink>
              </li>
              <li className="navlist">
                <NavLink to="/watchlist" className="link">
                  <i className="ti-dashboard">{"#"}</i>
                  Watchlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/todays-market"
                  className="link"
                  activeclassname="active"
                >
                  <i className="ti-dashboard">{"#"}</i>
                  Today's Market
                </NavLink>
              </li>
              <li>
                <NavLink to="/bot" className="link">
                  <i className="ti-dashboard">{"#"}</i>
                  Bot's
                </NavLink>
              </li>
              <li>
                <NavLink to="/indicator" className="link">
                  <i className="ti-dashboard">{"#"}</i>
                  Indicator's
                </NavLink>
              </li>
              <li className="contact">
                <NavLink to="/paper-trading" className="link">
                  <i className="ti-dashboard">{"#"}</i>
                  Paper Trading
                </NavLink>
              </li>
              <li className="navlist">
                <NavLink to="/watchlist" className="link">
                  <h4>Others</h4>
                </NavLink>
              </li>

              <li>
                <NavLink to="/subscription" className="link">
                  <i className="ti-dashboard">{"#"}</i>
                  
                </NavLink>
              </li>

              <li>
                <NavLink to="/education" className="link">
                  <i className="ti-dashboard">{"#"}</i>
                  Education
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="link">
                  <i className="ti-dashboard">{"#"}</i>
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/connet-us" className="link">
                  <i className="ti-dashboard">{"#"}</i>
                  Connect Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ChannelSidebar;
