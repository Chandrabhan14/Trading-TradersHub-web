import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
       <footer className="footer1 dashboard-footer">
        {/* <!-- Start Footer Bottom Area --> */}
        <div className="footer-area-bottom">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="copyright">
                  <p>
                    Copyright © 2021
                    <Link className="link" > TradersHub</Link> All Rights Reserved
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="footer-menu">
                  <ul>
      
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Footer Bottom Area --> */}
      </footer> 
    </div>
  )
}

export default Footer
