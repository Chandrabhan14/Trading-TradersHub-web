import React, { useEffect } from 'react'
import error_img from '../../assets/img/background/Error.png';

const PageNotFound = () => {

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    console.log(name, email, 'kkkk');
  }, [])

  return (

    <div className='container-fluid page_not_found_section'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='page_not_found_content_area'>
              <img src={error_img} className='page_not_found_img mb-5' />
              <a href='' className='btn-grad' >Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default PageNotFound;



