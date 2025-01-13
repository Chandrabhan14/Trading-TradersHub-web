import React from 'react';
import launching from "../../assets/img/underconstruction/launching.png";
import Side from '../sidebar/side';
import NavBottom from '../nav/NavBottom/NavBottom';
const HelpSupport = () => {
  return (
    <div>

    <NavBottom isStyleChanged />
    <div className="notify-overlay"></div>
    <div className="dashboard-area bg-color area-padding">
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row">
          <div className="col-md-2">
            <div className="">
              <Side />
            </div>
          </div>
          <div className="col-md-7 mt-5"> 
          <div className="underconstruction">
            <img src={launching}  alt="" />
            <h1 className='my-2'>Launching Soon</h1>
            <h4 className='my-2'>This page is under construction</h4>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HelpSupport
