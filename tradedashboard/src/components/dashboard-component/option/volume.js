// import React from 'react'
// import NavBottom from "../../nav/NavBottom/NavBottom";

// function volume() {
//     return (
//         <div>
//             <NavBottom isStyleChanged />
//             <div className="notify-overlay"></div>
//             <div className="dashboard-area bg-color area-padding">
//                 <div className="container-fluid Option_main_section_hp">
//                     <div className="row mb-3">
//                         <div  className="col-12 d-flex table-responsive pb-2">
//                             {/* <a href="/heatmap" className="btn btn_main_hp ">
//                                 Heat Map
//                             </a>
//                             <a href="/ol" className="btn btn_main_hp">
//                                 Ol
//                             </a> */}
//                             <a href="/volume" className="btn btn_main_hp active">
//                                 Volume
//                             </a>
//                             <a href="/alerts" className="btn btn_main_hp">
//                                 Alerts
//                             </a>
//                             <a href="/flow" className="btn btn_main_hp">
//                                 Flow
//                             </a>
//                             {/* <a href="/historical" className="btn btn_main_hp">
//                                 Historical
//                             </a>
//                             <a href="/optionwatchlist" className="btn btn_main_hp">
//                                 Watchlist
//                             </a> */}
//                         </div>
//                     </div>

                    
//                     <div className='row mt-3'>
//                         <div className='col-12'>
//                             <div className='Heading_content_hp d-flex flex-wrap justify-content-between align-items-center'>
//                                 <h2 className='pb-0 mb-0'>Volume</h2>
//                                 <div my-2>
//                                     <button className="btn btn_main_hp">
//                                         Add Symbol
//                                     </button>
//                                     <button className="btn btn_main_hp">
//                                         Clear List
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row mt-4 Option_heatmap_table_area">
//                         <div className="col-lg-12 tab">
//                             <div className="table-responsive tabalignn custom-table "   >
//                                 <table className="table text-white">
//                                     <thead>
//                                         <tr>
//                                             <th></th>
//                                             <th>SYMBOl</th>
//                                             <th>BID</th>
//                                             <th>ASK</th>
//                                             <th>LAST</th>
//                                             <th>CHG</th>
//                                             <th>CHG %</th>
//                                             <th>VOLUME</th>
//                                             <th><i class="fa-regular fa-circle-check"></i></th>
//                                             <th><i class="fa-regular fa-circle-xmark"></i></th>
//                                             <th><i class="fa-solid fa-pen-fancy"></i></th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td><i class="fa-solid fa-xmark"></i></td>
//                                             <td> AMD</td>
//                                             <td>$ 139.80</td>
//                                             <td>$ 139.92</td>
//                                             <td>$ 139.94</td>
//                                             <td> $ 1.04</td>
//                                             <td>1%</td>
//                                             <td>63,739,781</td>
//                                             <td>
//                                                 <div class="form-check">
//                                                     <input type="checkbox" class="form-check-input" name="" id="" />
//                                                 </div>
//                                             </td>
//                                             <td>
//                                                 <div class="form-check">
//                                                     <input type="checkbox" class="form-check-input" name="" id="" />
//                                                 </div>
//                                             </td>
//                                             <td>
//                                                 <div class="form-check">
//                                                     <input type="checkbox" class="form-check-input" name="" id="" />
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default volume