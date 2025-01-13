import React from 'react'
import NavBottom from "../../nav/NavBottom/NavBottom";

function ol() {
    return (
        <div>
            <NavBottom isStyleChanged />
            <div className="notify-overlay"></div>
            <div className="dashboard-area bg-color area-padding">
                <div className="container-fluid Option_main_section_hp">
                    <div className="row mb-3">
                        <div  className="col-12 d-flex table-responsive pb-2">
                            <a href="/heatmap" className="btn btn_main_hp ">
                                Heat Map
                            </a>
                            <a href="/ol" className="btn btn_main_hp active">
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
                            <a href="/historical" className="btn btn_main_hp">
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
                                <h2 className='pb-0 mb-0'>OL</h2>
                                <div my-2>
                                    <button className="btn btn_main_hp">
                                        Add Symbol
                                    </button>
                                    <button className="btn btn_main_hp">
                                        Clear List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 Option_heatmap_table_area">
                        <div className="col-lg-12 tab">
                            <div className="table-responsive tabalignn custom-table "   >
                                <table className="table text-white">
                                    <thead>
                                        <tr>
                                            <th>SYMBOL</th>
                                            <th>EXP</th>
                                            <th>C/P</th>
                                            <th>STRIKE</th>
                                            <th>Ol</th>
                                            <th>DOI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ol