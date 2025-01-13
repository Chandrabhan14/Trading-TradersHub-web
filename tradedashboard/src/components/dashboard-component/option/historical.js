import React, { useState } from 'react'
import NavBottom from "../../nav/NavBottom/NavBottom";
import ReactDatePicker from 'react-datepicker';

function Historical() {


    const [startDate, setStartDate] = useState(new Date());


    return (
        <div>
            <NavBottom isStyleChanged />
            <div className="notify-overlay"></div>
            <div className="dashboard-area bg-color area-padding">
                <div className="container-fluid Option_main_section_hp">
                    <div className="row mb-3">
                        <div className="col-12 d-flex table-responsive pb-2">
                            <a href="/heatmap" className="btn btn_main_hp ">
                                Heat Map
                            </a>
                            <a href="/ol" className="btn btn_main_hp">
                                Ol
                            </a>
                            <a href="/volume" className="btn btn_main_hp">
                                Volume
                            </a>
                            <a href="/alerts" className="btn btn_main_hp">
                                Alerts
                            </a>
                            <a href="/flow" className="btn btn_main_hp">
                                Flow
                            </a>
                            <a href="/historical" className="btn btn_main_hp active">
                                Historical
                            </a>
                            <a href="/optionwatchlist" className="btn btn_main_hp">
                                Watchlist
                            </a>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-12'>
                            <div className='Heading_content_hp d-flex flex-wrap justify-content-between align-items-center'>
                                <h2 className='pb-0 mb-0'>Historical</h2>
                            </div>
                        </div>
                    </div>

                    <div className='row my-5'>
                        <div className='col-xxl-7 col-xl-8 col-lg-10 col-md-12 col-12 m-auto'>
                            <div className='option_histircal_data_area'>
                                
                                <ReactDatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    monthsShown={2}
                                    inline
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='Option_historical_select_date'>
                                <div>
                                    <h5 className='fw-bold'>Start</h5>
                                    <p className='pl-3'>20/12/2023</p>
                                </div>
                                <div>
                                    <h5 className='fw-bold'>End</h5>
                                    <p className='pl-3'>20/12/2023</p>
                                </div>
                            </div>
                            <div className='text-center Option_historical_apply_btn'>
                                <button className='btn_main_hp'>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Historical