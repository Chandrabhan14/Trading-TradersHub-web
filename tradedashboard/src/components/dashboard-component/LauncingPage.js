import React from 'react'
import launching from "../../assets/img/underconstruction/launching.png";
import NavBottom from "../nav/NavBottom/NavBottom";

const LaunchingPage = () => {
  return (

    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      <div className='container-fluid area-padding'>
        <div className='row'>
          <div className='col-12'>
            <div className="underconstruction m-0">
              <img src={launching} alt="" />
              <h1 className='my-2'>Launching Soon</h1>
              <h4 className='my-2'>This page is under construction</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LaunchingPage;
